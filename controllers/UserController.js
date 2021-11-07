const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signup = async (req, res, next) => {
  try {
    const searchUser = await User.find({ email: req.body.email });
    if (searchUser.length >= 1) {
      return res.status(409).json({
        message: "this email exist",
      });
    }
  } catch (error) {
    res.status(500).json({ error: err });
  }

  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      try {
        await user.save();
        res.status(201).json({ message: "created user" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  });
};

const login = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log("Found user")
    console.log({ user })
    if (user.length < 1) {
      console.log("User length < 1")
      console.log({ user })
      return res.status(401).json({
        message: "Email failed",
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {

        console.log("Password err")
        console.log({ err })
        return res.status(401).json({
          message: "Password failed",
        });
      }
      if (result) {
        console.log("matched password")
        console.log({result})
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.TOKEN_SECRET /* ,
          {
            expiresIn: "1h",
          } */
        );
        console.log({token})
        return res.status(200).json({
          message: "Auth successful",
          token: token,
        });
      }
      res.status(401).json({
        message: "Auth failed",
      });
    });
  } catch (error) {
    console.log("Didn't find user")

    res.status(500).json({ error: err });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

module.exports = { signup, login, getUsers };

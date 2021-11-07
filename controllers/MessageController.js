const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

require("dotenv").config({ path: global.basedir + "\\env\\config.env" });

const sendMessage = async (req, res, next) => {
  console.log({ body: req.body })

  try {

    let transporter = nodemailer.createTransport(smtpTransport({
      host: "gmail",
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
    }));


    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: `${req.body.name}, ${req.body.email}`,
      subject: `${req.body.subject}`,
      text: `${req.body.message}`,
      html: `We received this: ${req.body.message}. Thank you for connecting!`,
    });

    let info2 = await transporter.sendMail({
      from: process.env.EMAIL,
      to: 'mjrrdn@gmail.com',
      subject: `${req.body.subject}`,
      text: `${req.body.message}`,
      html: `${req.body.name}, ${req.body.email} sent this email: ${req.body.message}. Thank you for emailing!`,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.json({ success: true, info, info2 })
  }
  catch (err) {
    console.log(err)
  }
}


module.exports = {
  sendMessage
};

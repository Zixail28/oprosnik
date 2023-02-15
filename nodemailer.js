require('dotenv').config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
  }
}, {
  from: `Stasika Lomeyki <${process.env.EMAIL}>`,
});

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email sent " + info)
  })
}

module.exports = mailer;
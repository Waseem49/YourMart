const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config/" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.USERPASSWORD,
  },
});
async function sendMail(to, subject, text) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.USEREMAIL, // sender address
    to, //"bar@example.com, baz@example.com", // list of receivers
    subject, //"Hello ✔", // Subject line
    text, // "Hello world?", // plain text body
    //html, // "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;

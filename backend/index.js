const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const nodemailer = require("nodemailer");

app.post("/", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "dmega2301@gmail.com",
      pass: "Bus@1234",
    },
  });

  let mailOptions = {
    from: "dmega2301@gmail.com",
    to: "abhishekjjp23012000@gmail.com",

    subject: "Some Subject",
    text: "hello",
    //   html: htmlEmail
  };

  transporter.sendMail(mailOptions, (err, email) => {
    if (err) {
      console.log("err is ", err);
      res.json({
        status: "fail",
      });
    } else {
      console.log(email);
      res.json({
        status: "success",
      });
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("error in running server", err);
  }

  console.log(`server is running on port: ${port}`);
});

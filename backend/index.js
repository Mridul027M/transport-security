const express = require("express");
const app = express();
var bodyParser = require('body-parser')
const port = process.env.PORT || 8000;
const nodemailer = require("nodemailer");
const mongoose =require('mongoose')
const db=mongoose.connect('mongodb://localhost:27017/transport_security', {useNewUrlParser: true, useUnifiedTopology: true});
const data=require('../src/crimeData')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const crimeDataSchema=new mongoose.Schema({
     pin_code: Number,
    area: String,
    lat: Number,
    long: Number,

    no_of_crimes_per_month: Number,
    types_of_crime:[
      {
        type:String
    }
  ],
    crime_meter: Number
})

const crimeData = mongoose.model('crimeData', crimeDataSchema);
app.post('/saveToDb',(req,res)=>{
  console.log(db)
  /*db.crimedatas.findOne({pin_code:req.body.area},(obj,err)=>{
        console.log(obj)
  })*/
})

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


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
    types_of_crime: [
      {
        crime:String,
        count:Number
      }
      
    
  ],
    crime_meter: Number
})

const crimeData = mongoose.model('crimeData', crimeDataSchema);

app.post('/saveToDb',(req,res)=>{
  console.log(req.body)
  console.log(typeof Number(req.body.area))
  
  
  //"types_of_crime.crime":req.body.crime},{"$push":{types_of_crime:req.body.crime},"$set":{crime_meter:crimeMeter}},(err,obj)=>{
   
  
  
  crimeData.updateOne( {
                          pin_code:Number(req.body.area),
                          
                          
                          "types_of_crime.crime":req.body.crime
                        },
                        { 
                          "$inc":
                                {
                                  "types_of_crime.$[ele].count":1,
                                  "no_of_crimes_per_month":1
                              
                                },
                             

                       } ,         
                        {
                          'arrayFilters':[
                            {
                               "ele.crime":req.body.crime
                            }
                          ]
                        },
                        (err,ob)=>{
                          //console.log(err)
                          console.log(ob)
                          
                        }
   
   
   )

   var crimeMeter=0;
   crimeData.findOne({ pin_code:Number(req.body.area)},(err,obj)=>{
     obj.types_of_crime.map((o,i)=>{
       console.log(o)
      switch(o.crime)
      {
        case 'Murder':crimeMeter+=o.count*9;break;
        case 'Rape':crimeMeter+=o.count*9;break;
        case 'Theft':crimeMeter+=o.count*7;break;
        case 'Robbery':crimeMeter+=o.count*8;break;
        case 'Terrorism':crimeMeter+=o.count*10;break;
      }
     })
     crimeMeter=crimeMeter/obj.no_of_crimes_per_month
   })
   console.log(crimeMeter)
   
  
  
                      })


app.get('/',(req,res)=>{
    crimeData.find({},(err,obj)=>{
      res.send(obj)
    })
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



/*

data.crimeData.map((obj,ind)=>{
  var c=new crimeData({
    pin_code:obj.pin_code,
    area: obj.areas,
    lat: obj.lat,
    long: obj.long,

    no_of_crimes_per_month:obj.no_of_crimes_per_month,
    crime_meter:obj.crime_meter
     
  })
   c.save((err)=>{
      console.log(err)
    })
})*/
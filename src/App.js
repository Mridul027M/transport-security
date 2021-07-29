
import React, { useState, useEffect } from "react";
import * as Data from "./crimeData";
import axios from "axios";
import Police from "./Police";
import ReactMapGL,{Marker} from 'react-map-gl'
import nodemailer from "nodemailer";

function App() {
  const [getLoc,setLoc]= useState({long:28,lat:77});
  const [getEmail,setEmail]=useState('');
  const getValue=(e)=>{
      const {name,value}=e.target
      setLoc(data=>({
          ...data,[name]:value
      }))
      console.log(getLoc)
  }
  const [viewport, setViewport] = useState({
      width: '100vw',
      height: '50vh',
      latitude: 28.7041,
      longitude: 77.1025,
      zoom: 8
    });
 

  const track=()=>{
      const showLoc=(data)=>{
          //console.log(data.coords.latitude);
          let lat=data.coords.latitude
          let long=data.coords.longitude
          setLoc({lat:lat,long:long})
      }
          navigator.geolocation.watchPosition(
              showLoc,error=>console.log(error),
              {
                  enableHighAccuracy:true,
                  timeout:1000
              }
              
          )
  }
  
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          console.log(d)
          return d;
        }
   function deg2rad(deg) {
          return deg * (Math.PI/180)
        }
  //mail
  //   let transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "abhishek.raut1372@gmail.com",
  //       pass: "70502",
  //     },
  //   });

  //   let mailOptions = {
  //     from: "abhishek.raut1372@gmail.com",
  //     to: "abhishekjjp23012000@gmail.com",

  //     subject: "Some Subject",
  //     text: "hello",
  //     //   html: htmlEmail
  //   };

  //   transporter.sendMail(mailOptions, (err, data) => {
  //     if (err) {
  //       console.log("error is ", err);
  //     } else {
  //       console.log("data is", data);
  //     }
  //   });
  const mail = async () => {
    await axios
      .post("http://localhost:8000/", {
        email: "abhishekjjp23012000@gmail.com",
      })
      .then((res) => {
        console.log(res);
      });
  };
 
  const search = () => {
    //console.log(Data)
    //areas that come under 5KM radius of current geolocation of the traveller
    Data.crimeData.map((obj, ind) => {
      // console.log(obj)
      if (
        getDistanceFromLatLonInKm(getLoc.lat, getLoc.long, obj.lat, obj.long) <=
        10
      ) {
        console.log("found");
      }
    });
  };

    return (
        <div>
            <div>
                provide an email to contact
                <input placeholder='user;s email' name='contact' value={getEmail} onChange={(e)=>{setEmail(e.target.value);console.log(getEmail)}}></input>
            </div>
            hello
            <input name='long' value={getLoc.long} onChange={getValue}></input>
            <input name='lat' value={getLoc.lat} onChange={getValue}></input>
            <button onClick={search}>search</button>
            <button onClick={track}>track</button>
            <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoibXJpZHVsc3RhciIsImEiOiJja3JudnBubXc0bDlyMnpwOHNrOXVzNXYwIn0.ryB1v11gBLBBtUTXOnaNmA'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >

      <Marker latitude={getLoc.lat} longitude={getLoc.long}>
        <div>You are here</div>
      </Marker>
      {
          Data.crimeData.map((obj,ind)=>{
            // console.log(obj.lat)
             return(
                <Marker latitude={obj.lat} longitude={obj.long}>
               <div>pin</div>
              </Marker>
             )
         })
      }
        </ReactMapGL>
      <Police/>
        </div>
    )
}

export default App


/*
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: getLoc.lat, lng: getLoc.long }}
     
  > 
ll

  
  {props.isMarkerShown && <Marker title='loc' label='Current Position' icon={iconImage} position={{ lat: getLoc.lat, lng: getLoc.long }} />} 
      
    {
       Data.crimeData.map((obj,ind)=>{
          // console.log(obj.lat)
           return(props.isMarkerShown && <Marker  position={{ lat: obj.lat, lng: obj.long }} />)
  
       })
    }
    </GoogleMap>
))

/////////////////////////////////////////////////////////////////////////////////////////////////////

<MyMapComponent
                isMarkerShown
                positions={getLoc}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
/>

 */

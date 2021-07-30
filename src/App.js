
import React, { useState, useEffect } from "react";
import * as Data from "./crimeData";
import axios from "axios";
import Police from "./Police";
import ReactMapGL,{Marker} from 'react-map-gl'
import RoomIcon from '@material-ui/icons/Room';
import PersonPinIcon from '@material-ui/icons/PersonPin';


function App(props) {
  console.log(props)
  const [getCrimeData,setCrimeData]=useState([])
  const data=[]
  const finalData=[]
  const foundLocs=[]
  const [getLoc,setLoc]= useState({long:28,lat:77});
  
  const getValue=(e)=>{
      const {name,value}=e.target
      setLoc(data=>({
          ...data,[name]:value
      }))
      console.log(getLoc)
  }
  const [viewport, setViewport] = useState({
      width: '100vw',
      height: '70vh',
      latitude: 28.7041,
      longitude: 77.1025,
      zoom: 8
    });
    


    
   useEffect( async () => {
    await axios.get("http://localhost:8000/getCrimeData")
    .then((res)=>{
     
      res.data.map((obj,ind)=>{
        data.push(obj)
        
      })
   })
    Data.crimeData.map((obj, ind) => {
      // console.log(obj)
      if (
        getDistanceFromLatLonInKm(getLoc.lat, getLoc.long, obj.lat, obj.long) <=
        10
      ) {
        foundLocs.push({lat:obj.lat,long:obj.long})
        console.log("found");
      }
      console.log(data)

      foundLocs.map((obj,ind)=>{
        data.map((obj2,ind2)=>{
          
              if(obj2.lat===obj.lat ){
                finalData.push(obj2)
              }
        })
      })
      console.log(finalData)
      if(foundLocs.length!=0)
      {
        axios.post("http://localhost:8000/",{email:props.email,data:{finalData}})
        .then((res)=>{
          console.log(res)
        })
      }
    });
     

    
   }, [getLoc])
   console.log(data)
   console.log(foundLocs)
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
  

    return (
      <>
      <div>hello {props.email}</div>     
        <div>
           
            
            <input name='long' value={getLoc.long} onChange={getValue}></input>
            <input name='lat' value={getLoc.lat} onChange={getValue}></input>
           
            <button onClick={track}>track</button>
            <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoibXJpZHVsc3RhciIsImEiOiJja3JudnBubXc0bDlyMnpwOHNrOXVzNXYwIn0.ryB1v11gBLBBtUTXOnaNmA'
      mapStyle="mapbox://styles/mapbox/satellite-v8"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >

      <Marker latitude={getLoc.lat} longitude={getLoc.long}>
        <div><PersonPinIcon style={{color:"blue",fontSize:40}}/></div>
      </Marker>
      {
          Data.crimeData.map((obj,ind)=>{
            // console.log(obj.lat)
             return(
                <Marker latitude={obj.lat} longitude={obj.long}>
               <div><RoomIcon style={{color:"red",fontSize:40}}/></div>
              </Marker>
             )
         })
      }
        </ReactMapGL>
      <Police/>
      <div>
        {foundLocs.map((obj,i)=>{
          return(
            <div>
              <p>
                {obj.lat}
              </p>

            </div>
          )
        })}
      </div>
        </div>
        </>
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

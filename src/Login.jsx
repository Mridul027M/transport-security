import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from "./App"
function Login() {
    const data=[]
    const [getEmail,setEmail]=useState('');
    
    const login=()=>{
        if(getEmail!='')
        {ReactDOM.render(
            <>
            <App email={getEmail}/>
             
            </>,
          
            document.getElementById("root")
          );}
          else{
              alert("provide an email ID to contact")
          }
    }
    return (
        <div>
             <div>
                provide an email to contact
                <input placeholder='users email' name='contact' value={getEmail} onChange={(e)=>{setEmail(e.target.value);console.log(getEmail)}}></input>
            </div>
            <button onClick={login}>keep me safe</button>
        </div>
    )
}

export default Login

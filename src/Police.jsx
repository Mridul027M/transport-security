import React, { useState } from "react";
import * as Data from "./policeCredential";
import * as locData from "./crimeData";
import axios from "axios";
function Police() {
  //console.log(Data);
  const [val,setVal]=useState(1);
  const [getInput, setInput] = useState({ user: "", pass: "" });
  const getValue = (e) => {
    const { name, value } = e.target;

    setInput((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(getInput);
  };
  const [v, setV] = useState(false);
  const authenticate = (e) => {
    if (
      Data.data.username === getInput.user &&
      Data.data.password === getInput.pass
    ) {
      setV(true);
    } else setV(false);
  };
  const [crime, setCrime] = useState({ area: "", crime: "" });
  const saveToJson = async () => {
    var area = document.getElementById("ar").value;
    var crime = document.getElementById("cr").value;
    console.log(typeof Number(area));
    await axios.post('http://localhost:8000/saveToDb',{area:area,crime:crime,mul:val})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  };
  
  const showMultiplier=()=>{
    var crime = document.getElementById("cr").value;
    console.log(crime);
    switch(crime)
    {
      case 'Murder':setVal(9);break;
      case 'Rape':setVal(9);break;
      case 'Theft':setVal(7);break;
      case 'Robbery':setVal(8);break;
      case 'Terrorism':setVal(10);break;
    }
    console.log(val)
  }
  return (
    <>
      <div>police</div>
      <div>
        <input
          name="user"
          value={getInput.user}
          placeholder="userName"
          onChange={getValue}
        ></input>

        <input
          name="pass"
          value={getInput.pass}
          placeholder="password"
          onChange={getValue}
        ></input>
        <button onClick={authenticate}>check</button>
        {v && (
          <div>
            <select name="area" id="ar">
              {locData.crimeData.map((obj, i) => {
                return (
                  <option name={obj.area} value={obj.pin_code}>
                    {obj.area}
                  </option>
                );
              })}
            </select>
            <select name="crime" id="cr" onChange={showMultiplier}>
              <option name="Murder" value="Murder">
                Murder
              </option>
              <option name="Rape" value="Rape">
                Rape
              </option>
              <option name="Theft" value="Theft">
                Theft
              </option>
              <option name="Robbery" value="Robbery">
                Robbery
              </option>
              <option name="Terrorism" value="Terrorism">
                Terrorism
              </option>
            </select>
            <p>Crime Multiplier of the above crime: {val}</p>
            <button onClick={saveToJson}>Save to database</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Police;

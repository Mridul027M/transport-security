import React, { useState } from "react";
import * as Data from "./policeCredential";
import * as locData from "./crimeData";
function Police() {
  console.log(Data);
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
  const saveToJson = () => {
    var area = document.getElementById("ar").value;
    var crime = document.getElementById("cr").value;
    console.log(typeof Number(area));
    locData.crimeData.map((obj, i) => {
      //console.log(obj);
      if (obj.pin_code === Number(area)) {
        obj.types_of_crime.push(crime);
        console.log(obj.types_of_crime);
      }
    });
  };

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
            <select name="crime" id="cr">
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
            <button onClick={saveToJson}>Save to database</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Police;
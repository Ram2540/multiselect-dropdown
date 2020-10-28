/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import React from 'react';
// material
import DropDown from '../containers/Dropdown/Dropdown';
import importedData from "../data/dataSites.json";
// styles
import './app.css';



/* ========== ~~~~~~~~~~ APP ~~~~~~~~~~ ========== */
const App = (props) => {

  const data = importedData;

  return (
    <div className={`app`}>
      {Object.keys(data).map((name, i) => {
        return <DropDown
          key={i}
          dropdownName={name}
          options={data[name]}
          />
      }
      )}
    </div>
  )
};



/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export default App;
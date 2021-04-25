import "./App.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { useState } from "react";
import * as venn from "venn.js";
import * as d3 from "d3";
import FullVenn from './Full-venn';
import PosPainFatigue from './PosPainFatigue';
import NegPainFatigue from './NegPainFatigue';
import Calendar from './Calendar';

function App() {

  const [state, setState] = useState({
    checkedPositive: true,
    checkedNegative: true, 
    checkedPain: true,
    checkedFatigue: true
  });  
 
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log("toggle pressed");
  };

  if(state.checkedPositive == true && state.checkedNegative == true && state.checkedPain == true && state.checkedFatigue == true) {
    console.log("everything pressed")
    // show the entire venn diagram 
  }

  return (
    <div className="App">
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedPositive}
              onChange={handleChange}
              name="checkedPositive"
              color="primary"
            />
          }
          label="Positive"
        />

<FormControlLabel
          control={
            <Checkbox
              checked={state.checkedNegative}
              onChange={handleChange}
              name="checkedNegative"
              color="primary"
            />
          }
          label="Negative"
        />

<FormControlLabel
          control={
            <Checkbox
              checked={state.checkedPain}
              onChange={handleChange}
              name="checkedPain"
              color="primary"
            />
          }
          label="Pain"
        />

<FormControlLabel
          control={
            <Checkbox
              checked={state.checkedFatigue}
              onChange={handleChange}
              name="checkedFatigue"
              color="primary"
            />
          }
          label="Fatigue"
        />

      </FormGroup>
      {state.checkedPositive == true && state.checkedNegative == true && state.checkedPain == true && state.checkedFatigue == true
      && <FullVenn />}
      {state.checkedPositive == true && state.checkedNegative == false && state.checkedPain == true && state.checkedFatigue == true
      && <PosPainFatigue />}
      {state.checkedPositive == false && state.checkedNegative == true && state.checkedPain == true && state.checkedFatigue == true
      && <NegPainFatigue />}
      <Calendar />
    </div>
  );
}

export default App; 
import * as d3 from "d3";
import * as venn from "venn.js";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
//import "./styles.css";

var sets = [
    {
      size: 6,
      sets: ["Negative", "Pain", "Fatigue"]
    },
    {
      size: 1,
      sets: ["Negative", "Pain"]
    },
    {
      size: 11,
      sets: ["Negative", "Fatigue"]
    },
    {
      size: 7,
      sets: ["Pain", "Fatigue"]
    },
    {
      size: 14,
      sets: ["Negative"],
      label: "Negative"
    },
    {
      size: 10,
      sets: ["Pain"],
      label: "Pain"
    },
    {
      size: 15,
      sets: ["Fatigue"],
      label: "Fatigue"
    }
  ];
  

class NegPainFatigue extends React.Component {
  constructor(props) {
    super(props);
    this.chartView = React.createRef();
  }
  chart = venn.VennDiagram().width(400).height(450);

  componentDidMount() {
    let div = d3.select(this.chartView);
    div.datum(sets).call(this.chart);
    //div.selectAll("text").attr("transform", `translate(120, -80) rotate(25)`);
    //div.selectAll("g").attr("transform", `translate(-70,20) rotate(-25)`);
  }

  render() {
    return (
      <div className="venn-div">
        <h1>Monthly Overview</h1>
        <div className="" ref={(el) => (this.chartView = el)}></div>
      </div>
    );
  }
}

export default NegPainFatigue;
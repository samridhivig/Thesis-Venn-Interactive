import * as d3 from "d3";
import * as venn from "venn.js";
import React from "react";
import "./Venn.css";

var sets = [
  {
    size: 6,
    sets: ["Negative", "Pain", "Fatigue"],
    label: "6", 
  },
  {
    size: 0,
    sets: ["Positive", "Negative"]
  },
  {
    size: 1,
    sets: ["Negative", "Pain"],
    label: "1"
  },
  {
    size: 11,
    sets: ["Negative", "Fatigue"],
    label: "11"
  },
  {
    size: 1,
    sets: ["Positive", "Pain", "Fatigue"],
    label: "1"
  },
  {
    size: 2,
    sets: ["Positive", "Pain"],
    label: "2"
  },
  {
    size: 3,
    sets: ["Positive", "Fatigue"],
    label: "3"
  },
  {
    size: 7,
    sets: ["Pain", "Fatigue"],
    label: "7"
  },
  {
    size: 11,
    sets: ["Positive"],
    label: "11",
    dates : ["15", "17", "19"]
    //label: "Positive"
  },
  {
    size: 14,
    sets: ["Negative"],
    label: "14"
    //label: "Negative"
  },
  {
    size: 10,
    sets: ["Pain"],
    label: "10"
    //label: "Pain"
  },
  {
    size: 15,
    sets: ["Fatigue"],
    label: "15",
    //label: "Fatigue"
  }
];

class FullVenn extends React.Component {
  constructor(props) {
    super(props);
    this.chartView = React.createRef();
  }
  
  chart = venn.VennDiagram().width(400).height(450).styled(false);
  
  componentDidMount() {

    let div = d3.select(this.chartView);
    div.datum(sets).call(this.chart);
    //div.selectAll(".venn-circle path");
    div.selectAll("path")
    .style("fill-opacity", 0.3)
    .style("stroke-opacity", 0)
    .style("stroke", "rgba(22,22,22,1)")
    .style("stroke-width", 2)
    .style("transform-origin", "50% 50%");

    // transform to the entire venn diagram 
    //div.selectAll("text").attr("transform", `translate(120, -80) rotate(25)`);
    div.selectAll("text").style("fill","black");
    //div.selectAll("g").attr("transform", `translate(-70,20) rotate(-25)`);

    //tooltip
    var tooltip = d3
      //.select("body")
      .select(this.chartView)
      .append("div")
      .attr("class", "venntooltip")
      .style("display", "none");

    //mouse interactions
    div
      .selectAll("g")
      .on("mouseover", function (d, i) {
        //detect all the areas in the venn diagram
        venn.sortAreas(div, i);

        d3.select(this).attr("opacity", 1);
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 1)
          .style("display", "inline-block")
          .text(`${i.size} days of ${i.sets}`)
          .style("visibility", "visible");

          div.selectAll("text").style("fill", "black");
        
        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", 0.8)
            .style("stroke-opacity", 0.8)
            .style("transform", "scale(1.01,1.01)")
            .style("transform-origin", "50% 50%");
      })

      .on("mousemove", function(d) {
        tooltip.style("left", (d.pageX + 20) + "px")
               .style("top", (d.pageY + 40) + "px");
    })

      .on("mouseout", function (d, i) {
        d3.select(this).attr("opacity", 0.5);
        tooltip.style("visibility", "hidden");
        //tooltip.text(``);

        // unhighlight
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
                    .style("stroke-width", 3)
                    .style("fill-opacity", 0.3)
                    //.style("fill-opacity", i.sets.length == 1 ? .8 : 0)
                    .style("stroke-opacity", 0);
      });

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

export default FullVenn;
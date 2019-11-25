<template>
  <div id="pattern">
    <div id="pattern_top">
      <font>Pattern View</font>
    </div>
    <div id="pattern_down"></div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import * as d3 from "d3";
export default {
  data: function() {
    return {
      sharedState: store.state
    };
  },
  mounted() {
    store.dispatch("boundaryData_action");
  },
  watch: {
    "sharedState.boundaryData": function(newdata) {
      this.draw(newdata);
    }
  },
  methods: {
    draw(data) {
      var colors = ["#893D98", "#22B184", "#4272B5"];
      document.getElementById("pattern_down").innerHTML = "";
      var margin = { top: 20, right: 20, bottom: 20, left: 20 };
      var width =
        document.getElementById("pattern_down").scrollWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("pattern_down").scrollHeight -
        margin.top -
        margin.bottom;
      var centerLocation = [125.951316, 44.23102];
      var projection = d3
        .geoMercator()
        .center(centerLocation)
        .scale(5000)
        .translate([width / 2, height / 2]);

      var path = d3
        .geoPath() // d3.geo.path avec d3 version 3
        .projection(projection);
      const outerRadius = width > height ? height / 2 : width / 2;
      const innerRadius = outerRadius * 0.9;
      const paddingAngle = (Math.PI / 180) * 5;
      var svg = d3
          .select("#pattern_down")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom),
        g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

      var gg = g
        .append("g")
        .attr(
          "transform",
          () =>
            "translate(" +
            projection(centerLocation)[0] +
            "," +
            projection(centerLocation)[1] +
            ")"
        );
      gg.append("circle")
        .attr("r", function() {
          return innerRadius;
        })
        .style("fill", function() {
          return "#aad3df";
        });

      g.selectAll()
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "#808080")
        .attr("stroke-width", 2)
        .style("fill", function() {
          return "#F2EFE9";
        })
        .on("click", function(d) {
          console.log(d.properties.name);
        });
      // var districtData = [
      //   ["朝阳区CY", [125.318334, 43.64432], 12],
      //   ["南关区NG", [125.447115, 43.739438], 13],
      //   ["宽城区KC", [125.332132, 44.080271], 21],
      //   ["二道区ED", [125.642587, 43.899292], 12],
      //   ["绿园区LY", [125.182654, 43.899292], 32],
      //   ["双阳区SY", [125.667883, 43.522281], 12],
      //   ["九台市JT", [125.854156, 44.154825], 12],
      //   ["德惠市DH", [125.720775, 44.545913], 32],
      //   ["农安县NA", [125.182654, 44.450447], 44],
      //   ["榆树市YS", [126.562452, 44.841186], 22]
      // ];
      var districtData = [
        ["CY", [125.318334, 43.64432], 12],
        ["NG", [125.447115, 43.739438], 13],
        ["KC", [125.332132, 44.080271], 21],
        ["ED", [125.642587, 43.899292], 12],
        ["LY", [125.182654, 43.899292], 32],
        ["SY", [125.667883, 43.522281], 12],
        ["JT", [125.854156, 44.154825], 12],
        ["DH", [125.720775, 44.545913], 32],
        ["NA", [125.182654, 44.450447], 44],
        ["YS", [126.562452, 44.841186], 22]
      ];
      g.selectAll()
        .data(districtData)
        .enter()
        .append("text")
        .attr("x", d => projection(d[1])[0])
        .attr("y", d => projection(d[1])[1])
        .attr("dx", 12)
        .attr("dy", 12)
        .style("font-size", 7)
        .style("font-weight", "bold")
        .style("font-family", "monospace")
        .text(function(d) {
          return d[0];
        });
      var linear = d3
        .scaleLinear()
        .domain(
          d3.extent(districtData, function(d) {
            return d[2];
          })
        )
        .range([5, 20]);
      g.selectAll()
        .data(districtData)
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return projection(d[1])[0];
        })
        .attr("y", function(d) {
          return projection(d[1])[1];
        })
        .attr("width", d => linear(d[2]))
        .attr("height", d => linear(d[2]))
        .style("stroke", function() {
          return "#D4D5D3";
        })
        .style("stroke-width", 0.5)
        .style("fill", colors[2])
        .attr(
          "transform",
          d => "translate(" + -linear(d[2]) / 2 + "," + -linear(d[2]) / 2 + ")"
        );

      //上半圆
      var pieData_top = [1, 1, 1, 1, 1, 1, 1]; //data we want to turn into a pie chart
      var pieData_top_data = [12, 11, 13, 11, 11, 3, 4]; //data we want to turn into a pie chart
      var linear_top = d3
        .scaleLinear()
        .domain([0, d3.max(pieData_top_data)])
        .range([innerRadius, outerRadius]);
      var pies_top = d3
        .pie()
        .startAngle(-Math.PI / 2 + paddingAngle)
        .endAngle(Math.PI / 2 - paddingAngle)(pieData_top); // turns into data for pie chart with start and end angles

      let arc_top = d3
        .arc()
        .innerRadius(innerRadius) //means full circle. if not 0, would be donut
        .outerRadius(function(d, i) {
          return linear_top(pieData_top_data[i]);
        }) //size of circle
        .startAngle(d => d.startAngle) //how does it get d???
        .endAngle(d => d.endAngle);
      gg.selectAll()
        .data(pies_top)
        .enter()
        .append("path")
        .attr("d", arc_top)
        .attr("fill", () => {
          return colors[0];
        })
        .attr("stroke", function() {
          return "#fff";
        });

      //上半圆
      var pieData_down = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; //data we want to turn into a pie chart
      var pieData_down_data = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ]; //data we want to turn into a pie chart
      var linear_down = d3
        .scaleLinear()
        .domain([0, d3.max(pieData_down_data)])
        .range([innerRadius, outerRadius]);
      var pies_down = d3
        .pie()
        .startAngle(Math.PI / 2 + paddingAngle)
        .endAngle((3 * Math.PI) / 2 - paddingAngle)(pieData_down); // turns into data for pie chart with start and end angles

      let arc_down = d3
        .arc()
        .innerRadius(innerRadius) //means full circle. if not 0, would be donut
        .outerRadius(function(d, i) {
          return linear_down(pieData_down_data[i]);
        }) //size of circle
        .startAngle(d => d.startAngle) //how does it get d???
        .endAngle(d => d.endAngle);
      gg.selectAll()
        .data(pies_down)
        .enter()
        .append("path")
        .attr("d", arc_down)
        .attr("fill", () => {
          return colors[1];
        })
        .attr("stroke", function() {
          return "#fff";
        });
    }
  }
};
</script>
<style scoped>
font {
  color: #eeeeee;
  font-family: "Microsoft Yahei";
  font-weight: bold;
  position: relative;
  top: 18%;
  left: 2%;
}
#pattern {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#pattern_top {
  width: 100%;
  height: 6%;
  background: linear-gradient(
    -45deg,
    #333333 25%,
    #3b3b3b 0,
    #3b3b3b 50%,
    #333333 0,
    #333333 75%,
    #3b3b3b 0
  );
  background-size: 30px 30px;
  text-align: left;
  border-radius: 5px;
}
#pattern_down {
  width: 100%;
  height: 94%;
  background-color: #f5f5f5;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>
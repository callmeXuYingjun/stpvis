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
      // var color = d3.scaleOrdinal(d3.schemeCategory10);
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
      var projection = d3
        .geoMercator()
        .center([125.951316, 44.23102])
        .scale(5000)
        .translate([width / 2, height / 2]);

      var path = d3
        .geoPath() // d3.geo.path avec d3 version 3
        .projection(projection);
      g.selectAll()
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("fill", function() {
          return "#6871BA";
        })
        .on("click", function(d) {
          console.log(d.properties.name);
        });

      var districtData = [
        ["朝阳区", [125.318334, 43.64432], 12],
        ["南关区", [125.447115, 43.739438], 13],
        ["宽城区", [125.332132, 44.080271], 21],
        ["二道区", [125.642587, 43.899292], 12],
        ["绿园区", [125.182654, 43.899292], 32],
        ["双阳区", [125.667883, 43.522281], 12],
        ["九台市", [125.854156, 44.154825], 12],
        ["德惠市", [125.720775, 44.545913], 32],
        ["农安县", [125.182654, 44.450447], 44],
        ["榆树市", [126.562452, 44.841186], 22]
      ];

      var linear = d3
        .scaleLinear()
        .domain(
          d3.extent(districtData, function(d) {
            return d[2];
          })
        )
        .range([10, 20]);
      g.selectAll()
        .data(districtData)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return projection(d[1])[0];
        })
        .attr("cy", function(d) {
          return projection(d[1])[1];
        })
        .attr("r", function(d) {
          return linear(d[2]);
        })
        .style("fill", function() {
          return "#93379F";
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
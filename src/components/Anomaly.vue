<template>
  <div id="anomaly">
    <div id="anomaly_top">
      <font>Anomaly View</font>
    </div>
    <div id="anomaly_down"></div>
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
    store.dispatch("anomalyData_action");
  },
  computed: {
    boundary_anomalyData() {
      const [boundaryData, anomalyData] = [
        this.sharedState.boundaryData,
        this.sharedState.anomalyData
      ];
      return [boundaryData, anomalyData];
    }
  },
  watch: {
    boundary_anomalyData: {
      handler: function(val) {
        if (JSON.stringify(val[0]) !== "{}" && val[1].length)
          this.draw(val[0], val[1]);
      },
      deep: true
    }
    // "sharedState.boundaryData": function(newdata) {
    //   this.draw(newdata);
    // }
  },
  methods: {
    draw(data, anomalyData) {
      document.getElementById("anomaly_down").innerHTML = "";
      var margin = { top: 20, right: 20, bottom: 20, left: 20 };
      var width =
        document.getElementById("anomaly_down").scrollWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("anomaly_down").scrollHeight -
        margin.top -
        margin.bottom;
      var centerLocation = [125.951316, 44.23102];
      var projection = d3
        .geoMercator()
        .center(centerLocation)
        .scale(7000)
        .translate([width / 2, height / 2]);

      var path = d3
        .geoPath() // d3.geo.path avec d3 version 3
        .projection(projection);
      // const outerRadius = width > height ? height / 2 : width / 2;
      // const innerRadius = outerRadius * 0.9;
      // const paddingAngle = (Math.PI / 180) * 5;
      var svg = d3
          .select("#anomaly_down")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom),
        g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

      // var gg = g
      //   .append("g")
      //   .attr(
      //     "transform",
      //     () =>
      //       "translate(" +
      //       projection(centerLocation)[0] +
      //       "," +
      //       projection(centerLocation)[1] +
      //       ")"
      //   );
      // gg.append("circle")
      //   .attr("r", function() {
      //     return innerRadius;
      //   })
      //   .style("fill", function() {
      //     return "#aad3df";
      //   });

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
      // var linear = d3
      //   .scaleLinear()
      //   .domain(
      //     d3.extent(districtData, function(d) {
      //       return d[2];
      //     })
      //   )
      //   .range([5, 30]);
      // g.selectAll()
      //   .data(districtData)
      //   .enter()
      //   .append("rect")
      //   .attr("x", function(d) {
      //     return projection(d[1])[0];
      //   })
      //   .attr("y", function(d) {
      //     return projection(d[1])[1];
      //   })
      //   .attr("width", d => linear(d[2]))
      //   .attr("height", d => linear(d[2]))
      //   .style("stroke", function() {
      //     return "#D4D5D3";
      //   })
      //   .style("stroke-width", 0.5)
      //   .style("fill", "red")
      //   .attr(
      //     "transform",
      //     d => "translate(" + -linear(d[2]) / 2 + "," + -linear(d[2]) / 2 + ")"
      //   );
      // g.selectAll()
      //   .data(districtData)
      //   .enter()
      //   .append("rect")
      //   .attr("x", function(d) {
      //     return projection(d[1])[0];
      //   })
      //   .attr("y", function(d) {
      //     return projection(d[1])[1];
      //   })
      //   .attr("width", d => linear(d[2]) / 2)
      //   .attr("height", d => linear(d[2]) / 2)
      //   .style("stroke", function() {
      //     return "#D4D5D3";
      //   })
      //   .style("stroke-width", 0.5)
      //   .style("fill", "white")
      //   .attr(
      //     "transform",
      //     d => "translate(" + -linear(d[2]) / 4 + "," + -linear(d[2]) / 4 + ")"
      //   );

      var petal = [[0, 0], [5, -40], [0, -60], [-5, -40]];
      var linePath = d3.line().curve(d3.curveCardinalClosed);
      var color = d3.scaleOrdinal(d3.schemeCategory10);
        var scaleMax = 0.3;
        var scaleMin = 0.1;
      var linear_scale = d3
        .scaleLinear()
        .domain(
          d3.extent(
            anomalyData.reduce(function(a, b) {
              return a.concat(b);
            })
          )
        )
        .range([scaleMin, scaleMax]);
      districtData.forEach((d, i) => {
        flower(projection(d[1]), i);
      });
      function flower(location, districtIndex) {

        g.append("circle")
          .attr("r", function() {
            return 60 * scaleMax;
          })
          .style("fill", function() {
            return "none";
          })
          .attr("stroke", "grey")
          .attr("stroke-width", 2)
          .attr("transform", function() {
            return "translate(" + location[0] + "," + location[1] + ")";
          });

        for (var i = 0; i < 13; i++) {
          g.append("path")
            .attr("d", linePath(petal))
            .attr("stroke", "black")
            .attr("stroke-width", 0.2)
            .attr("fill", color(i))
            .attr("transform", function() {
              return (
                "translate(" +
                location[0] +
                "," +
                location[1] +
                ") rotate(" +
                (360 / 13) * i +
                ") scale(" +
                linear_scale(anomalyData[districtIndex][i]) +
                ") "
              );
            });
          // .attr("transform", function() {
          //   return "scale(0.5)";
          // });
        }
      }
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
#anomaly {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#anomaly_top {
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
#anomaly_down {
  width: 100%;
  height: 94%;
  background-color: #f5f5f5;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>
<template>
  <div id="matrix">
    <div id="matrix_top">
      <font>matrix View</font>
    </div>
    <div id="matrix_down"></div>
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
  watch: {
    "sharedState.tensorSelectedData": function(newdata) {
      this.draw(newdata);
    }
  },
  methods: {
    draw(tensorSelectedData) {
      var martrixData = tensorSelectedData.C.concat(tensorSelectedData.ce_C);
      // var martrixData = data[1];
      document.getElementById("matrix_down").innerHTML = "";
      var margin = { top: 20, right: 20, bottom: 20, left: 20 };
      var width =
        document.getElementById("matrix_down").scrollWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("matrix_down").scrollHeight -
        margin.top -
        margin.bottom;
      var svg = d3
          .select("#matrix_down")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom),
        g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

      var textLeft = 20,
        textTop = 20;
      var martrixWidth = width - textLeft,
        martrixHeight = height - textTop;
      var cellWidth = martrixWidth / martrixData[0].length,
        cellHeight = martrixHeight / martrixData.length;
      var maxx = d3.max(
        martrixData.reduce(function(a, b) {
          return a.concat(b);
        })
      );
      var linear = d3
        .scaleLinear()
        .domain([0, maxx])
        .range([0, 1]);
      var linear_r = d3
        .scaleLinear()
        .domain([0, maxx])
        .range([0, 10]);
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      var gg = g
        .append("g")
        .attr("transform", "translate(" + textLeft + "," + textTop + ")");
      for (let k = 0; k < martrixData.length; k++) {
        var dy = cellHeight * k;

        gg.selectAll()
          .data(martrixData[k])
          .enter()
          .append("circle")
          .attr("cx", function(d, i) {
            return i * cellWidth;
          })
          .attr("cy", function() {
            return dy;
          })
          .attr("id", function(d, i) {
            return "cell_" + k + "_" + i;
          })
          .attr("r", d => linear_r(d))
          .style("stroke", function() {
            return "#D4D5D3";
          })
          .style("stroke-width", 0.5)
          .style("fill", function(d, i) {
            return color(i);
          })
          .style("fill-opacity", function(d) {
            return linear(d);
          });
        // gg.selectAll()
        //   .data(martrixData[k])
        //   .enter()
        //   .append("rect")
        //   .attr("x", function(d, i) {
        //     return i * cellWidth;
        //   })
        //   .attr("y", function() {
        //     return dy;
        //   })
        //   .attr("id", function(d, i) {
        //     return "cell_" + k + "_" + i;
        //   })
        //   .attr("width", cellWidth)
        //   .attr("height", cellHeight)
        //   .style("stroke", function() {
        //     return "#D4D5D3";
        //   })
        //   .style("stroke-width", 0.5)
        //   .style("fill", function(d, i) {
        //     return color(i);
        //   })
        //   .style("fill-opacity", function(d) {
        //     return linear(d);
        //   });
      }
      var modelName = d3.range(martrixData.length);
      g.selectAll()
        .data(modelName)
        .enter()
        .append("text")
        .attr("x", textLeft - 10)
        .attr("y", (d, i) => cellHeight * i + textTop)
        .attr("dy", "0.8em")
        .style("font-size", "5px")
        .style("font-family", "monospace")
        .text(function(d) {
          if (d >= martrixData.length / 2) {
            return "history" + (d - martrixData.length / 2);
          } else {
            return "current" + d;
          }
        });

      var industryName = d3.range(martrixData[0].length);
      g.selectAll()
        .data(industryName)
        .enter()
        .append("text")
        .attr("x", (d, i) => textLeft + cellWidth * i)
        .attr("y", textTop - 10)
        .attr("dy", "0.8em")
        .style("font-size", "5px")
        .style("font-family", "monospace")
        .text(function(d) {
          return tensorSelectedData.industry[d];
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
#matrix {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#matrix_top {
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
#matrix_down {
  width: 100%;
  height: 94%;
  background-color: #f5f5f5;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>
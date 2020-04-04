<template>
  <div id="scatter">
    <div id="scatter_top">
      <font>Pattern Projection View</font>
    </div>
    <div id="scatter_down"></div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import * as d3 from "d3";
// import {lasso as d3Lasso } from "d3-lasso";
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
      var scatter = tensorSelectedData.pattern2D;
      // console.log(tensorSelectedData.he)
      // console.log(tensorSelectedData.ce_he)
      // console.log(tensorSelectedData.C)
      // console.log(tensorSelectedData.ce_C)
      var he_ce_he = tensorSelectedData.he.concat(tensorSelectedData.ce_he);
      var industryData = tensorSelectedData.B.concat(tensorSelectedData.B);
      var colors = ["#439D3B", "#815BB3", "#B89ECF", "#7C4B4C", "#F36731"]; //maps integers to colors
      // set the dimensions and margins of the graph
      var margin = { top: 20, right: 20, bottom: 30, left: 50 };
      document.getElementById("scatter_down").innerHTML = "";
      var width =
        document.getElementById("scatter_down").scrollWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("scatter_down").scrollHeight -
        margin.top -
        margin.bottom;

      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3
        .select("#scatter_down")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var maxInNumbers_x = d3.max(scatter, function(d) {
        return d[0];
      });
      var minInNumbers_x = d3.min(scatter, function(d) {
        return d[0];
      });
      var maxInNumbers_y = d3.max(scatter, function(d) {
        return d[1];
      });
      var minInNumbers_y = d3.min(scatter, function(d) {
        return d[1];
      });

      var maxInNumbers_r = d3.max(he_ce_he, function(d) {
        return d;
      });
      var minInNumbers_r = d3.min(he_ce_he, function(d) {
        return d;
      });

      var linear_r = d3
        .scaleLinear()
        .domain([minInNumbers_r, maxInNumbers_r])
        .range([5, 20]);

      var maxInNumbers =
        maxInNumbers_x > maxInNumbers_y ? maxInNumbers_x : maxInNumbers_y;
      var minInNumbers =
        minInNumbers_x < minInNumbers_y ? minInNumbers_x : minInNumbers_y;
      var AxisWidth = width > height ? height : width;
      var Scale = d3
        .scaleLinear()
        .domain([minInNumbers, maxInNumbers])
        .range([0, AxisWidth]);
      // var Scale_r = d3
      //   .scaleLinear()
      //   .domain([minInNumbers, maxInNumbers])
      //   .range([0, AxisWidth]);
      let tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("color", "black")
        .style("visibility", "hidden") // 是否可见（一开始设置为隐藏）
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text("");
      // var circles=
      // svg
      //   .selectAll()
      //   .data(scatter)
      //   .enter()
      //   .append("circle")
      //   .attr("r", (d, i) => linear_r(he_ce_he[i]))
      //   .attr("cx", (d, i) => Scale(scatter[i][0]))
      //   .attr("cy", (d, i) => Scale(scatter[i][1]))
      //   .style("fill", function(d, i) {
      //     if (i >= scatter.length / 2) {
      //       return "#D53A35";
      //     } else {
      //       return "#2F4554";
      //     }
      //   })
      //   .on("click", (d, i) => {
      //     store.commit("patternsSelectedData_Update", [i]);
      //   });
      var industryOne = [
        [1, 4, 17, 20, 40],
        [
          2,
          3,
          5,
          9,
          10,
          12,
          15,
          21,
          23,
          27,
          28,
          30,
          31,
          32,
          34,
          35,
          36,
          37,
          41,
          43
        ],
        [0, 6, 11, 14, 16, 18, 29, 33, 38],
        [8, 19, 22, 24, 26, 39],
        [7, 13, 25, 42]
      ];
      for (let i = 0; i < scatter.length; i++) {
        svg
          .append("circle")
          .attr("r", linear_r(he_ce_he[i]))
          .attr("cx", Scale(scatter[i][0]))
          .attr("cy", Scale(scatter[i][1]))
          .style("fill", function() {
            if (i >= scatter.length / 2) {
              return "#D53A35";
              // return "#2F4554";
            } else {
              return "#2F4554";
            }
          })
          .on("click", () => {
            store.commit("patternsSelectedData_Update", [i]);
          });
        var industryOneDis = [0, 0, 0, 0, 0];
        var industryOneName = [
          "公共事业",
          "城市管理",
          "公共服务",
          "乡村建设",
          "环境污染"
        ];
        // for (var n = 0; n < industryData[i].length; n++) {
        //   for (var m = 0; m < 5; m++) {
        //     if (industryOne[m].indexOf(tensorSelectedData.industry[n]) != -1) {
        //       industryOneDis[m] += industryData[i][n];
        //       break;
        //     }
        //   }
        // }
        
        for (var m = 0; m < 5; m++) {
          for (var n = 0; n < industryOne[m].length; n++) {
              industryOneDis[m] += industryData[i][industryOne[m][n]];
          }
        }
        var pieData = industryOneDis; //data we want to turn into a pie chart
        var pies = d3
          .pie()
          .startAngle(0)
          .endAngle(2 * Math.PI)(pieData); // turns into data for pie chart with start and end angles
        var arc = d3
          .arc()
          .innerRadius(linear_r(he_ce_he[i]) / 2) //means full circle. if not 0, would be donut
          .outerRadius(linear_r(he_ce_he[i])) //size of circle
          .startAngle(d => d.startAngle) //how does it get d???
          .endAngle(d => d.endAngle);
        svg
          .selectAll()
          .data(pies)
          .enter()
          .append("path")
          .attr("d", arc)
          .attr("fill", (d, k) => {
            return colors[k];
          })
          .attr("stroke", function() {
            return "#fff";
          })
          .attr("stroke-width", function() {
            return 0.8;
          })
          .attr(
            "transform",
            "translate(" +
              Scale(scatter[i][0]) +
              "," +
              Scale(scatter[i][1]) +
              ")"
          )
          .on("mouseover", function(d, k) {
            return tooltip
              .style("visibility", "visible")
              .text(industryOneName[k]);
          })
          .on("mousemove", function() {
            return tooltip
              .style("top", event.pageY - 10 + "px")
              .style("left", event.pageX + 10 + "px");
          })
          .on("mouseout", function() {
            return tooltip.style("visibility", "hidden");
          });
      }
      svg
        .selectAll()
        .data(colors)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
          return width * 0.1 + 80 * i;
        })
        .attr("y", function() {
          return height + 5;
        })
        .attr("width", 20)
        .attr("height", 20)
        .style("stroke", function() {
          return "#D4D5D3";
        })
        .style("fill", function(d) {
          return d;
        });
      svg
        .selectAll()
        .data(industryOneName)
        .enter()
        .append("text")
        .attr("x", function(d, i) {
          return 20 + width * 0.1 + 80 * i;
        })
        .attr("y", height + 5)
        .attr("dy", "0.8em")
        .style("font-size", "12px")
        .style("font-family", "monospace")
        .text(function(d) {
          return d;
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
#scatter {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#scatter_top {
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
#scatter_down {
  width: 100%;
  height: 94%;
  /* background-color: #f5f5f5; */
  background-color: white;
  border-width: 0px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
/* .axis path {
  stroke: black;
}

.tick line {
  visibility: hidden;
}

.border {
  margin-top: 9px;
  margin-left: 29px;
  border: 0.5px solid black;
  width: 325px;
  height: 335px;
  position: absolute;
}

.lasso path {
  stroke: rgb(80, 80, 80);
  stroke-width: 2px;
}

.lasso .drawn {
  fill-opacity: 0.05;
}

.lasso .loop_close {
  fill: none;
  stroke-dasharray: 4, 4;
}

.lasso .origin {
  fill: #3399ff;
  fill-opacity: 0.5;
}

.not_possible {
  fill: rgb(200, 200, 200);
}

.possible {
  fill: #ec888c;
}

.selected {
  fill: steelblue;
} */
</style>
<template>
  <div id="scatter">
    <div id="scatter_top">
      <font>Scatter View</font>
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
      // var lasso_start = function() {
      //   lasso
      //     .items()
      //     .attr("r", 7)
      //     .classed("not_possible", true)
      //     .classed("selected", false);
      // };

      // var lasso_draw = function() {
      //   lasso
      //     .possibleItems()
      //     .classed("not_possible", false)
      //     .classed("possible", true);

      //   lasso
      //     .notPossibleItems()
      //     .classed("not_possible", true)
      //     .classed("possible", false);
      // };

      // var lasso_end = function() {
      //   lasso
      //     .items()
      //     .classed("not_possible", false)
      //     .classed("possible", false);

      //   lasso
      //     .selectedItems()
      //     .classed("selected", true)
      //     .attr("r", 7);

      //   lasso.notSelectedItems().attr("r", 3.5);
      // };

      // console.log(tensorSelectedData)
      var scatter = tensorSelectedData.pattern2D;
      var he_ce_he = tensorSelectedData.he.concat(tensorSelectedData.ce_he);
      var industryData = tensorSelectedData.B.concat(tensorSelectedData.B);
      var colors = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors
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
        ["物业服务与管理", "供热", "占道经营", "违章建筑"],
        [
          "供水",
          "道路建设与维护",
          "工作效率",
          "噪声污染",
          "土地资源管理",
          "交通规划"
        ],
        [
          "营运管理",
          "养老保险",
          "社会治安",
          "环境卫生",
          "优惠政策",
          "房屋产权办理",
          "工作纪律"
        ],
        [
          "燃气",
          "劳动监察",
          "拆迁管理",
          "下水排水",
          "媒体内容",
          "低保管理",
          "工商活动",
          "农村路桥建设维护",
          "空气污染",
          "特殊扶助"
        ],
        [
          "经营性收费",
          "交通秩序",
          "服务态度与质量",
          "交通设施建设维护",
          "消防安全",
          "人口管理",
          "医疗保险",
          "补课办班",
          "园林绿化",
          "路灯管理",
          "房屋交易",
          "政务公开",
          "基层组织建设",
          "供电",
          "房地产开发",
          "废弃物",
          "教学管理"
        ]
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
            } else {
              return "#2F4554";
            }
          })
          .on("click", () => {
            store.commit("patternsSelectedData_Update", [i]);
          });
        var industryOneDis = [0, 0, 0, 0, 0];
        var industryOneName = [
          "一级行业名称1",
          "一级行业名称2",
          "一级行业名称3",
          "一级行业名称4",
          "一级行业名称5"
        ];
        for (var n = 0; n < industryData[i].length; n++) {
          for (var m = 0; m < 5; m++) {
            if (industryOne[m].indexOf(tensorSelectedData.industry[n]) != -1) {
              industryOneDis[m] += industryData[i][n];
              break;
            }
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
          .attr("fill", d => {
            return colors(d.value);
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
      //   var lasso = d3Lasso()
      //     .closePathDistance(75)
      //     .closePathSelect(true)
      //     .targetArea(svg)
      //     .items(circles)
      //     .on("start",lasso_start)
      //     .on("draw",lasso_draw)
      //     .on("end",lasso_end);

      // svg.call(lasso);
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
  background-color: #f5f5f5;
  border-width: 1px;
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
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
        .scale(3000)
        .translate([width / 2, height / 2]);

      var path = d3
        .geoPath() // d3.geo.path avec d3 version 3
        .projection(projection);
      const outerRadius = width > height ? height / 2.5 : width / 2.5;
      // const innerRadius = outerRadius * 0.9;
      // const paddingAngle = (Math.PI / 180) * 5;
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
          return outerRadius * 0.8;
        })
        .style("fill", function() {
          return "#aad3df";
        });
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

//       var palegreen = d3.rgb(66,251,75);    //浅绿
// var darkgreen = d3.rgb(2,100,7);        //深绿

var mapColor = d3.interpolate("white",colors[2]);        //颜色插值函数
var linear_map = d3.scaleLinear()
        .domain(d3.extent(districtData, function(d) {
            return d[2];
          }))
        .range([0, 1]);

      g.selectAll()
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "#808080")
        .attr("stroke-width", 1)
        .style("fill", function(d,i) {
          return mapColor(linear_map(districtData[i][2]));
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
        .range([2, 10]);
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
        .attr("r", d => linear(d[2]))
        .style("stroke", function() {
          return colors[2];
        })
        .style("stroke-width", 2)
        .style("fill", "rgba(255,255,255,0.5)");

      //行业半圆
      var pieData_industry = d3.range(44).map(function() {
        return 1;
      });
      var pieData_industry_data = RandomArrayOne(44, 0, 100); //data we want to turn into a pie chart
      var pieData_industry_data_1 = RandomArrayOne(44, 0, 100); //data we want to turn into a pie chart

      var linear_industry = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(pieData_industry_data.concat(pieData_industry_data_1))
        ])
        .range([outerRadius * 0.8, outerRadius]);
      var linear_industry_1 = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(pieData_industry_data.concat(pieData_industry_data_1))
        ])
        .range([outerRadius * 0.8, outerRadius * 0.6]);
      var pies_industry = d3
        .pie()
        .startAngle(0)
        .endAngle(Math.PI * 2)(pieData_industry); // turns into data for pie chart with start and end angles

      let arc_industry = d3
        .arc()
        .innerRadius(outerRadius * 0.8) //means full circle. if not 0, would be donut
        .outerRadius(function(d, i) {
          return linear_industry(pieData_industry_data[i]);
        }) //size of circle
        .startAngle(d => d.startAngle) //how does it get d???
        .endAngle(d => d.endAngle);
      let arc_industry_1 = d3
        .arc()
        .innerRadius(outerRadius * 0.8) //means full circle. if not 0, would be donut
        .outerRadius(function(d, i) {
          return linear_industry_1(pieData_industry_data_1[i]);
        }) //size of circle
        .startAngle(d => d.startAngle) //how does it get d???
        .endAngle(d => d.endAngle);
      gg.selectAll()
        .data(pies_industry)
        .enter()
        .append("path")
        .attr("d", arc_industry)
        .attr("fill", () => {
          return colors[1];
        })
        .attr("stroke", function() {
          return "#fff";
        });
      gg.selectAll()
        .data(pies_industry)
        .enter()
        .append("path")
        .attr("d", arc_industry_1)
        .attr("fill", () => {
          return colors[1];
        })
        .attr("stroke", function() {
          return "#fff";
        });
      //面积图
      var pieData_time_data = RandomArrayOne(84, 0, 10);
      var pieData_time_data_1 = RandomArrayOne(84, 0, 10);
      var LinearX_time = d3
        .scaleLinear()
        .domain([0, pieData_time_data.length])
        .range([0, 2 * Math.PI]);
      var LinearY_time = d3
        .scaleLinear()
        .range([outerRadius * 1.2, outerRadius * 1.3])
        .domain([1, 10]);

      var lineR_time = d3
        .lineRadial()
        .defined(function(d) {
          return d + 1;
        })
        .angle(function(d, k) {
          return LinearX_time(k);
        })
        .radius(function(d) {
          return LinearY_time(d);
        });
      var area = d3
        .areaRadial()
        .curve(d3.curveCardinalClosed)
        .defined(lineR_time.defined())
        .angle(lineR_time.angle())
        .outerRadius(lineR_time.radius())
        .innerRadius(outerRadius * 1.2);
      gg.datum(pieData_time_data)
        .append("path")
        .attr("fill", colors[0])
        .attr("d", area);





      var LinearY_time_1 = d3
        .scaleLinear()
        .range([outerRadius * 1.2, outerRadius*1.1])
        .domain([1, 10]);

      var lineR_time_1 = d3
        .lineRadial()
        .defined(function(d) {
          return d + 1;
        })
        .angle(function(d, k) {
          return LinearX_time(k);
        })
        .radius(function(d) {
          return LinearY_time_1(d);
        });
      var area_1 = d3
        .areaRadial()
        .curve(d3.curveCardinalClosed)
        .defined(lineR_time_1.defined())
        .angle(lineR_time_1.angle())
        .outerRadius(lineR_time_1.radius())
        .innerRadius(outerRadius * 1.2);

      gg.datum(pieData_time_data_1)
        .append("path")
        .attr("fill", "grey")
        .attr("d", area_1);

      // gg.datum(pieData_time_data)
      //   .append("path")
      //   .attr("fill", "none")
      //   .attr("stroke", colors[0])
      //   .style("stroke-width", 2)
      //   .attr("d", lineR_time);

      function RandomArrayOne(Len, Min, Max) {
        var Range = Max - Min;
        var out = [];
        for (var j = 0; j < Len; j++) {
          var Rand = Math.random();
          out[j] = Min + Math.round(Rand * Range); //四舍五入
        }
        return out;
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
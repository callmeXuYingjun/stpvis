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
  computed: {
    tensorSelectedData_boundaryData_patternsSelectedData() {
      const [tensorSelectedData, boundaryData, patternsSelectedData] = [
        this.sharedState.tensorSelectedData,
        this.sharedState.boundaryData,
        this.sharedState.patternsSelectedData
      ];
      return [tensorSelectedData, boundaryData, patternsSelectedData];
    }
  },
  watch: {
    tensorSelectedData_boundaryData_patternsSelectedData: {
      handler: function(val) {
        if (
          JSON.stringify(val[0]) !== "{}" &&
          JSON.stringify(val[1]) !== "{}" &&
          val[2].length >= 1
        )
          this.draw(val[0], val[1], val[2]);
      },
      deep: true
    }
  },
  methods: {
    draw(tensorSelectedData, boundaryData, patternsSelectedData) {
      let colors = ["#893D98", "#22B184", "#4272B5"];
      document.getElementById("pattern_down").innerHTML = "";
      let margin = { top: 20, right: 20, bottom: 20, left: 20 };
      let width =
        document.getElementById("pattern_down").scrollWidth -
        margin.left -
        margin.right;
      let height =
        document.getElementById("pattern_down").scrollHeight -
        margin.top -
        margin.bottom;
      let centerLocation = [125.951316, 44.23102];
      let projection = d3
        .geoMercator()
        .center(centerLocation)
        .scale(3000)
        .translate([width / 2, height / 2]);

      let path = d3
        .geoPath() // d3.geo.path avec d3 version 3
        .projection(projection);
      const outerRadius = width > height ? height / 2.5 : width / 2.5;
      // const innerRadius = outerRadius * 0.9;
      // const paddingAngle = (Math.PI / 180) * 5;
      let svg = d3
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

      let gg = g
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

      if (patternsSelectedData.length == 1) {
        let mapColor = d3.interpolate("white", colors[2]); //颜色插值函数
        let linear_map = d3
          .scaleLinear()
          .domain(d3.extent(tensorSelectedData.C[patternsSelectedData[0]]))
          .range([0, 1]);

        g.selectAll()
          .data(boundaryData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("stroke", "#808080")
          .attr("stroke-width", 1)
          .style("fill", function(d) {
            let indexTemp = tensorSelectedData.area.indexOf(d.properties.name);
            if (indexTemp != -1) {
              return mapColor(
                linear_map(
                  tensorSelectedData.C[patternsSelectedData[0]][indexTemp]
                )
              );
            } else {
              return "black";
            }
          })
          .style("opacity", function(d) {
            let indexTemp = tensorSelectedData.area.indexOf(d.properties.name);
            if (indexTemp != -1) {
              return 1;
            } else {
              return 0;
            }
          })
          .on("click", function(d) {
            console.log(d.properties.name);
          });

        g.selectAll()
          .data(tensorSelectedData.areaLocation)
          .enter()
          .append("text")
          .attr("x", d => projection(d)[0])
          .attr("y", d => projection(d)[1])
          .attr("dx", 12)
          .attr("dy", 12)
          .style("font-size", 7)
          .style("font-weight", "bold")
          .style("font-family", "monospace")
          .text(function(d, i) {
            return tensorSelectedData.area[i];
          });
        let linear = d3
          .scaleLinear()
          .domain(d3.extent(tensorSelectedData.C[patternsSelectedData[0]]))
          .range([2, 10]);
        g.selectAll()
          .data(tensorSelectedData.C[patternsSelectedData[0]])
          .enter()
          .append("circle")
          .attr("cx", function(d, i) {
            return projection(tensorSelectedData.areaLocation[i])[0];
          })
          .attr("cy", function(d, i) {
            return projection(tensorSelectedData.areaLocation[i])[1];
          })
          .attr("r", d => linear(d))
          .style("stroke", function() {
            return colors[2];
          })
          .style("stroke-width", 2)
          .style("fill", "rgba(255,255,255,0.5)");

        //行业
        let pieData_industry = d3
          .range(tensorSelectedData.industry.length)
          .map(function() {
            return 1;
          });

        let pieData_industry_data =
          tensorSelectedData.B[patternsSelectedData[0]]; //data we want to turn into a pie chart

        let linear_industry = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(pieData_industry_data)
          ])
          .range([outerRadius * 0.88, outerRadius * 1.1]);
        let pies_industry = d3
          .pie()
          .startAngle(0)
          .endAngle(Math.PI * 2)(pieData_industry); // turns into data for pie chart with start and end angles
        let arc_industry_mid = d3
          .arc()
          .innerRadius(outerRadius * 0.83) //means full circle. if not 0, would be donut
          .outerRadius(outerRadius * 0.87) //size of circle
          .startAngle(d => d.startAngle) //how does it get d???
          .endAngle(d => d.endAngle);

        let arc_industry = d3
          .arc()
          .innerRadius(outerRadius * 0.88) //means full circle. if not 0, would be donut
          .outerRadius(function(d, i) {
            return linear_industry(pieData_industry_data[i]);
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
          .attr("d", arc_industry_mid)
          .attr("fill", () => {
            return "none";
          })
          .attr("stroke", function() {
            return colors[1];
          });
        //面积图
        let pieData_time_data = tensorSelectedData.A[patternsSelectedData[0]];
        let LinearX_time = d3
          .scaleLinear()
          .domain([0, pieData_time_data.length])
          .range([0, 2 * Math.PI]);
        let LinearY_time = d3
          .scaleLinear()
          .domain([0, d3.max(pieData_time_data)])
          .range([outerRadius * 1.23, outerRadius * 1.3]);
        let lineR_time = d3
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
        let area = d3
          .areaRadial()
          .curve(d3.curveCardinalClosed)
          .defined(lineR_time.defined())
          .angle(lineR_time.angle())
          .outerRadius(lineR_time.radius())
          .innerRadius(outerRadius * 1.23);
        gg.datum(pieData_time_data)
          .append("path")
          .attr("fill", colors[0])
          .attr("d", area);
        let arc_area_mid = d3
          .arc()
          .innerRadius(outerRadius * 1.18) //means full circle. if not 0, would be donut
          .outerRadius(outerRadius * 1.22) //size of circle
          .startAngle(d => {
            return d.startAngle;
          }) //how does it get d???
          .endAngle(d => d.endAngle);
        let pies_area = d3
          .pie()
          .startAngle(0)
          .endAngle(Math.PI * 2)(
          d3.range(pieData_time_data.length).map(function() {
            return 1;
          })
        ); // turns into data for pie chart with start and end angles
        gg.selectAll()
          .data(pies_area)
          .enter()
          .append("path")
          .attr("d", arc_area_mid)
          .attr("fill", () => {
            return "none";
          })
          .attr("stroke", function() {
            return colors[0];
          });
      } else {
        let mapColor = d3.interpolate("white", colors[2]); //颜色插值函数
        let linear_map = d3
          .scaleLinear()
          .domain(d3.extent(tensorSelectedData.C[patternsSelectedData[0]]))
          .range([0, 1]);

        g.selectAll()
          .data(boundaryData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("stroke", "#808080")
          .attr("stroke-width", 1)
          .style("fill", function(d) {
            let indexTemp = tensorSelectedData.area.indexOf(d.properties.name);
            if (indexTemp != -1) {
              return mapColor(
                linear_map(
                  tensorSelectedData.C[patternsSelectedData[0]][indexTemp]
                )
              );
            } else {
              return "black";
            }
          })
          .style("opacity", function(d) {
            let indexTemp = tensorSelectedData.area.indexOf(d.properties.name);
            if (indexTemp != -1) {
              return 1;
            } else {
              return 0;
            }
          })
          .on("click", function(d) {
            console.log(d.properties.name);
          });

        g.selectAll()
          .data(tensorSelectedData.areaLocation)
          .enter()
          .append("text")
          .attr("x", d => projection(d)[0])
          .attr("y", d => projection(d)[1])
          .attr("dx", 12)
          .attr("dy", 12)
          .style("font-size", 7)
          .style("font-weight", "bold")
          .style("font-family", "monospace")
          .text(function(d, i) {
            return tensorSelectedData.area[i];
          });
        let linear = d3
          .scaleLinear()
          .domain(d3.extent(tensorSelectedData.C[patternsSelectedData[0]]))
          .range([2, 10]);
        g.selectAll()
          .data(tensorSelectedData.C[patternsSelectedData[0]])
          .enter()
          .append("circle")
          .attr("cx", function(d, i) {
            return projection(tensorSelectedData.areaLocation[i])[0];
          })
          .attr("cy", function(d, i) {
            return projection(tensorSelectedData.areaLocation[i])[1];
          })
          .attr("r", d => linear(d))
          .style("stroke", function() {
            return colors[2];
          })
          .style("stroke-width", 2)
          .style("fill", "rgba(255,255,255,0.5)");

        //行业
        let pieData_industry = d3
          .range(tensorSelectedData.industry.length)
          .map(function() {
            return 1;
          });

        let pieData_industry_data =
          tensorSelectedData.B[patternsSelectedData[0]]; //data we want to turn into a pie chart
        let pieData_industry_data_1 =
          tensorSelectedData.B[patternsSelectedData[1]]; //data we want to turn into a pie chart

        let linear_industry = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(pieData_industry_data.concat(pieData_industry_data_1))
          ])
          .range([outerRadius * 0.88, outerRadius * 1.1]);
        let linear_industry_1 = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(pieData_industry_data.concat(pieData_industry_data_1))
          ])
          .range([outerRadius * 0.82, outerRadius * 0.6]);
        let pies_industry = d3
          .pie()
          .startAngle(0)
          .endAngle(Math.PI * 2)(pieData_industry); // turns into data for pie chart with start and end angles
        let arc_industry_mid = d3
          .arc()
          .innerRadius(outerRadius * 0.83) //means full circle. if not 0, would be donut
          .outerRadius(outerRadius * 0.87) //size of circle
          .startAngle(d => d.startAngle) //how does it get d???
          .endAngle(d => d.endAngle);

        let arc_industry = d3
          .arc()
          .innerRadius(outerRadius * 0.88) //means full circle. if not 0, would be donut
          .outerRadius(function(d, i) {
            return linear_industry(pieData_industry_data[i]);
          }) //size of circle
          .startAngle(d => d.startAngle) //how does it get d???
          .endAngle(d => d.endAngle);
        let arc_industry_1 = d3
          .arc()
          .innerRadius(outerRadius * 0.82) //means full circle. if not 0, would be donut
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
        gg.selectAll()
          .data(pies_industry)
          .enter()
          .append("path")
          .attr("d", arc_industry_mid)
          .attr("fill", () => {
            return "none";
          })
          .attr("stroke", function() {
            return colors[1];
          });
        //面积图
        let pieData_time_data = tensorSelectedData.A[patternsSelectedData[0]];
        let pieData_time_data_1 = tensorSelectedData.A[patternsSelectedData[1]];
        let LinearX_time = d3
          .scaleLinear()
          .domain([0, pieData_time_data.length])
          .range([0, 2 * Math.PI]);
        let LinearY_time = d3
          .scaleLinear()
          .domain([0, d3.max(pieData_time_data.concat(pieData_time_data_1))])
          .range([outerRadius * 1.23, outerRadius * 1.3]);
        let lineR_time = d3
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
        let area = d3
          .areaRadial()
          .curve(d3.curveCardinalClosed)
          .defined(lineR_time.defined())
          .angle(lineR_time.angle())
          .outerRadius(lineR_time.radius())
          .innerRadius(outerRadius * 1.23);
        gg.datum(pieData_time_data)
          .append("path")
          .attr("fill", colors[0])
          .attr("d", area);

        let LinearY_time_1 = d3
          .scaleLinear()
          .range([outerRadius * 1.17, outerRadius * 1.1])
          .domain([0, d3.max(pieData_time_data.concat(pieData_time_data_1))]);

        let lineR_time_1 = d3
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
        let area_1 = d3
          .areaRadial()
          .curve(d3.curveCardinalClosed)
          .defined(lineR_time_1.defined())
          .angle(lineR_time_1.angle())
          .outerRadius(lineR_time_1.radius())
          .innerRadius(outerRadius * 1.17);

        gg.datum(pieData_time_data_1)
          .append("path")
          .attr("fill", colors[0])
          .attr("d", area_1);

        let arc_area_mid = d3
          .arc()
          .innerRadius(outerRadius * 1.18) //means full circle. if not 0, would be donut
          .outerRadius(outerRadius * 1.22) //size of circle
          .startAngle(d => {
            return d.startAngle;
          }) //how does it get d???
          .endAngle(d => d.endAngle);
        let pies_area = d3
          .pie()
          .startAngle(0)
          .endAngle(Math.PI * 2)(
          d3.range(pieData_time_data.length).map(function() {
            return 1;
          })
        ); // turns into data for pie chart with start and end angles
        gg.selectAll()
          .data(pies_area)
          .enter()
          .append("path")
          .attr("d", arc_area_mid)
          .attr("fill", () => {
            return "none";
          })
          .attr("stroke", function() {
            return colors[0];
          });
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
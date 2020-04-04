<template>
  <div id="anomaly">
    <div id="anomaly_top">
      <font>Regional Anomaly View</font>
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
  // mounted() {
  //   store.dispatch("anomalyData_action");
  // },
  computed: {
    boundary_tensorSelectedData() {
      const [boundaryData, tensorSelectedData] = [
        this.sharedState.boundaryData,
        this.sharedState.tensorSelectedData
      ];
      return [boundaryData, tensorSelectedData];
    }
  },
  watch: {
    boundary_tensorSelectedData: {
      handler: function(val) {
        if (JSON.stringify(val[0]) !== "{}" && JSON.stringify(val[1]) !== "{}")
          this.draw(val[0], val[1]);
      },
      deep: true
    }
  },
  methods: {
    draw(data, tensorSelectedData) {
      // console.log(tensorSelectedData.anomalyArea)
      // var anomalyData = tensorSelectedData.anomalyArea;
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
        .style("opacity", function(d) {
          let indexTemp = tensorSelectedData.area.indexOf(d.properties.name);
          if (indexTemp != -1) {
            return 1;
          } else {
            return 0.3;
          }
        })
        .on("click", function(d) {
          let indexTemp = tensorSelectedData.area.indexOf(d.properties.name)
          store.commit("areaSelectedData_Update",indexTemp);
          console.log(d.properties.name);
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
#anomaly {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#anomaly_top {
  width: 100%;
  height: 8%;
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
  height: 92%;
  /* background-color: #f5f5f5; */
  background-color: white;
  border-width: 0px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>
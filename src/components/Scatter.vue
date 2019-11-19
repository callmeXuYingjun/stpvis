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
export default {
  data: function() {
    return {
      sharedState: store.state
    };
  },
  mounted() {
    store.dispatch("scatterData_action");
  },
  watch: {
    "sharedState.scatterData": function(newdata) {
      this.draw(newdata);
    }
  },
  methods: {
    draw(data) {
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

      // format the data
      data.forEach(function(d) {
        d.x = +d.x;
        d.y = +d.y;
        d.he = +d.he;
      });

      var maxInNumbers_x = d3.max(data, function(d) {
        return +d.x;
      });
      var minInNumbers_x = d3.min(data, function(d) {
        return +d.x;
      });
      var maxInNumbers_y = d3.max(data, function(d) {
        return +d.y;
      });
      var minInNumbers_y = d3.min(data, function(d) {
        return +d.y;
      });
      var maxInNumbers_r = d3.max(data, function(d) {
        return +d.he;
      });
      var minInNumbers_r = d3.min(data, function(d) {
        return +d.he;
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

      // add the dots
      svg
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", function(d) {
          return linear_r(d.he);
        })
        .attr("cx", function(d) {
          return Scale(d.x);
        })
        .attr("cy", function(d) {
          return Scale(d.y);
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
  background-color: #f5f5f5;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>
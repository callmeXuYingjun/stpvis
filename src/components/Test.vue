<template>
  <div id="test">
    <div id="test_top">
      <font>Grid Summarization View</font>
    </div>
    <div id="test_down"></div>
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
    store.dispatch("testData_action");
  },
  watch: {
    "sharedState.testData": function(newdata) {
      this.draw(newdata);
    }
  },
  methods: {
    draw(data) {
      console.log(data);
      // Setting the margin and dimensions of the work area
      var margin = { top: 50, right: 20, bottom: 30, left: 30 };
      var width =
        document.getElementById("test_down").scrollWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("test_down").scrollHeight -
        margin.top -
        margin.bottom;

      // Creating new arrays from the data, separating weeks from the numbers
      var weeks = data.map(function(d) {
        return d.key;
      });
      var values = data.map(function(d) {
        return d.value;
      });

      // Creating the scale variables and setting the ranges
      var xScale = d3
          .scaleBand()
          .rangeRound([0, width])
          .padding(0.1),
        yScale = d3.scaleLinear().rangeRound([height, 0]);

      // Adjusting data by assigning domain to the range of the scale
      xScale.domain(weeks);
      yScale.domain([0, d3.max(values)]);

      // Appending the svg object to the div on the page
      var svg = d3
        .select("#test_down")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      // Appending the 'group' element to the svg
      // Moving the 'group' element to the top left margin
      var g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Adding header to the chart
      g.attr("class", "headerText")
        .append("text")
        .attr(
          "transform",
          "translate(" + width / 2 + "," + -margin.top / 2 + ")"
        )
        .attr("text-anchor", "middle")
        .attr("font-weight", 600)
        .text("Simple Bar Chart");

      // Appending X axis and formatting the text
      g.append("g")
        .attr("class", "axisX")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .attr("font-weight", "bold");

      // Appending Y axis
      g.append("g")
        .attr("class", "axisY")
        .call(d3.axisLeft(yScale).ticks(10));

      // Creating chart
      var chart = g
        .selectAll("bar")
        .data(data)
        .enter()
        .append("g");

      // Appending bar chart to the chart
      chart
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
          return xScale(d.key);
        })
        .attr("height", function(d) {
          return height - yScale(d.value);
        })
        .attr("y", function(d) {
          return yScale(d.value);
        })
        .attr("width", xScale.bandwidth());

      // Appending text to each bar chart
      chart
        .append("text")
        .attr("class", "barText")
        .attr("x", function(d) {
          return xScale(d.key);
        })
        .attr("y", function(d) {
          return yScale(d.value);
        })
        .attr("dx", xScale.bandwidth() / 2)
        .attr("dy", 20)
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.value;
        });

      // Adding mouseover and mouseout functions to the chart
      chart
        .on("mouseover", function() {
          d3.select(this).attr("opacity", 0.7);
        })
        .on("mouseout", function() {
          d3.select(this).attr("opacity", 1);
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
#test {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#test_top {
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
#test_down {
  width: 100%;
  height: 94%;
  background-color: #f5f5f5;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>
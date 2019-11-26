<template>
  <div id="wordcloud">
    <div id="wordcloud_top">
      <font>wordcloud View</font>
    </div>
    <div id="wordcloud_down"></div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import * as d3 from "d3";
import d3Cloud  from "d3-cloud"

export default {
  data: function() {
    return {
      sharedState: store.state
    };
  },
  mounted() {
    this.draw();
    // store.dispatch("wordcloudData_action");
  },
  watch: {
    // "sharedState.wordcloudData": function(newdata) {
    //   this.draw(newdata);
    // }
  },
  methods: {
    draw() {
      var data = [
        ["layout", 63],
        ["function", 61],
        ["data", 17],
        ["return", 36],
        ["attr", 29],
        ["chart", 28],
        ["array", 24],
        ["style", 24],
        ["layouts", 22],
        ["values", 22],
        ["need", 21],
        ["nodes", 21],
        ["pie", 21],
        ["use", 21],
        ["figure", 20],
        ["circle", 19],
        ["well", 19],
        ["zoom", 19],
        ["append", 17],
        ["elements", 17]
      ];
      document.getElementById("wordcloud_down").innerHTML = "";
      var margin = { top: 20, right: 20, bottom: 20, left: 20 };
      var width =
        document.getElementById("wordcloud_down").scrollWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("wordcloud_down").scrollHeight -
        margin.top -
        margin.bottom;
      var svg = d3
          .select("#wordcloud_down")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom),
        g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

      const wordScale = d3
        .scaleLinear()
        .domain(d3.extent(data,d=>d[1]))
        .range([10, 80]);
      d3Cloud()
        .size([width, height])
        .timeInterval(20)
        .words(data)
        .rotate(function() {
          return 0;
        })
        .fontSize(d => {
          return wordScale(d[1])})
        //.fontStyle(function(d,i) { return fontSyle(Math.random()); })
        .fontWeight(["bold"])
        .text(function(d) {
          return d[0];
        })
        .spiral("rectangular") // "archimedean" or "rectangular"
        .on("end", drawWordCloud)
        .start();

      var wordcloud = g
        .append("g")
        .attr("class", "wordcloud")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .selectAll("text");
      function drawWordCloud(words) {
        wordcloud
          .selectAll()
          .data(words)
          .enter()
          .append("text")
          .attr("class", "word")
          .style("font-size", function(d) {
            return d.size + "px";
          })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) {
            return d[0];
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
#wordcloud {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#wordcloud_top {
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
#wordcloud_down {
  width: 100%;
  height: 94%;
  background-color: #f5f5f5;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
</style>
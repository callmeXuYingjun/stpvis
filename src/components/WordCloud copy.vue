<template>
  <div id="wordcloud">
    <div id="wordcloud_top">
      <font>WordCloud View</font>
    </div>
    <div id="wordcloud_down"></div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";

export default {
  data: function() {
    return {
      sharedState: store.state
    };
  },
  computed: {
    tensorSelectedData_patternsSelectedData() {
      const [tensorSelectedData, patternsSelectedData] = [
        this.sharedState.tensorSelectedData,
        this.sharedState.patternsSelectedData
      ];
      return [tensorSelectedData, patternsSelectedData];
    }
  },
  watch: {
    tensorSelectedData_patternsSelectedData: {
      handler: function(val) {
        if (JSON.stringify(val[0]) !== "{}" && val[1].length >= 1)
          this.draw(val[0], val[1]);
      },
      deep: true
    }
  },
  methods: {
    draw(tensorSelectedData, patternsSelectedData) {
      console.log(tensorSelectedData, patternsSelectedData);
      // var data = [
      //   ["物业服务与管理", 63],
      //   ["供热", 61],
      //   ["占道经营", 17],
      //   ["违章建筑", 36],
      //   ["供水", 29],
      //   ["道路建设与维护", 28],
      //   ["工作效率", 24],
      //   ["噪声污染", 24],
      //   ["土地资源管理", 22],
      //   ["交通规划", 22],
      //   ["营运管理", 21],
      //   ["养老保险", 21],
      //   ["社会治安", 21],
      //   ["环境卫生", 21],
      //   ["优惠政策", 20],
      //   ["房屋产权办理", 19],
      //   ["工作纪律", 19],
      //   ["劳动监察", 19],
      //   ["拆迁管理", 17],
      //   ["下水排水", 17]
      // ];
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
        .domain(d3.extent(tensorSelectedData.B[patternsSelectedData[0]]))
        .range([2, 10]);
      d3Cloud()
        .size([width, height])
        .timeInterval(20)
        .words(tensorSelectedData.industry)
        .rotate(function() {
          return 0;
        })
        .fontSize((d, i) => {
          return wordScale(tensorSelectedData.B[patternsSelectedData[0]][i]);
        })
        .fontWeight(["bold"])
        .text(function(d) {
          return d;
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
        console.log(words);
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
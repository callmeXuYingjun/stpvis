<template>
  <div id="query">
    <div id="query_top">
      <font>Query View</font>
      <Button type="success" @click="query" size="small" style="width:50px">OK</Button>
      <Select
        v-model="areaSelectSet"
        multiple
        size="small"
        placeholder="region"
        style="width:100px"
      >
        <Option
          v-for="(item,index) in sharedState.tensorSelectedData.area"
          :value="index"
          :key="item"
        >{{ item }}</Option>
      </Select>
      <Select
        v-model="industrySelectSet"
        multiple
        size="small"
        placeholder="industry"
        style="width:100px"
      >
        <Option
          v-for="(item,index) in sharedState.tensorSelectedData.industry"
          :value="index"
          :key="item"
        >{{ item }}</Option>
      </Select>
      <Select v-model="timeSelectSet" multiple size="small" placeholder="time" style="width:100px">
        <Option
          v-for="(item,index) in sharedState.tensorSelectedData.time"
          :value="index"
          :key="item"
        >{{ item }}</Option>
      </Select>
    </div>
    <div id="query_down"></div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import * as d3 from "d3";
export default {
  data: function() {
    return {
      sharedState: store.state,
      timeSelectSet: [],
      industrySelectSet: [],
      areaSelectSet: [],
      cScore: []
    };
  },
  watch: {
    cScore: function(newdata) {
      this.draw(newdata);
    }
  },
  methods: {
    query() {
      this.cScore = [];
      for (let i = 0; i < this.sharedState.tensorSelectedData.A.length; i++) {
        let cScoreOne = 1;
        for (let j = 0; j < this.timeSelectSet.length; j++) {
          cScoreOne *= this.sharedState.tensorSelectedData.A[i][j];
        }
        for (let j = 0; j < this.industrySelectSet.length; j++) {
          cScoreOne *= this.sharedState.tensorSelectedData.B[i][j];
        }
        for (let j = 0; j < this.areaSelectSet.length; j++) {
          cScoreOne *= this.sharedState.tensorSelectedData.C[i][j];
        }
        this.cScore.push([
          i,
          cScoreOne,
          this.sharedState.tensorSelectedData.he[i]
        ]);
      }
      for (
        let i = 0;
        i < this.sharedState.tensorSelectedData.ce_A.length;
        i++
      ) {
        let cScoreOne = 1;
        for (let j = 0; j < this.timeSelectSet.length; j++) {
          cScoreOne *= this.sharedState.tensorSelectedData.ce_A[i][j];
        }
        for (let j = 0; j < this.industrySelectSet.length; j++) {
          cScoreOne *= this.sharedState.tensorSelectedData.B[i][j];
        }
        for (let j = 0; j < this.areaSelectSet.length; j++) {
          cScoreOne *= this.sharedState.tensorSelectedData.ce_C[i][j];
        }
        this.cScore.push([
          i + this.sharedState.tensorSelectedData.ce_A.length,
          cScoreOne,
          this.sharedState.tensorSelectedData.ce_he[i]
        ]);
      }
      this.cScore.sort(function(a, b) {
        return b[1] - a[1];
      });
    },
    draw(cScore) {
      var cScoreTop10 = cScore.slice(0, 10);
      // console.log(cScoreTop10)
      // set the dimensions and margins of the graph
      var margin = { top: 20, right: 20, bottom: 30, left: 20 };
      document.getElementById("query_down").innerHTML = "";
      var width =
        document.getElementById("query_down").scrollWidth -
        margin.left -
        margin.right;
      var height =
        document.getElementById("query_down").scrollHeight -
        margin.top -
        margin.bottom;
      var textLeft = 30,
        textTop = 10;
      var barHeight = (height - textTop) / cScoreTop10.length;
      var wightQuan = barHeight;
      var widthGip=10
      var linear_quan = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(cScoreTop10, function(d) {
            return d[2];
          })
        ])
        .range([0, wightQuan]);
      var linear = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(cScoreTop10, function(d) {
            return d[1];
          })
        ])
        .range([0, width - textLeft - wightQuan-widthGip]);

      var svg = d3
        .select("#query_down")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      var g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      // var gg = g
      //   .append("g")
      //   .attr("transform", "translate(" + textLeft + "," + 0 + ")");
      g.selectAll()
        .data(cScoreTop10)
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return textLeft+barHeight-linear_quan(d[2]);
        })
        .attr("y", function(d, i) {
          return textTop + barHeight * i+(barHeight-linear_quan(d[2]))/2;
        })
        .attr("width", d => linear_quan(d[2]))
        .attr("height", d => linear_quan(d[2]))
        .style("stroke", function() {
          return "#D4D5D3";
        })
        // .style("stroke-width", 0.5)
        .style("fill", function(d) {
          if (d[0] >= cScore.length / 2) {
            return "#D53A35";
          } else {
            return "#2F4554";
          }
        })
        .on("click", d => {
          store.commit("patternsSelectedData_Update", [d[0]]);
        });
      g.selectAll()
        .data(cScoreTop10)
        .enter()
        .append("rect")
        .attr("x", function() {
          return textLeft+wightQuan+widthGip;
        })
        .attr("y", function(d, i) {
          return textTop + barHeight * i;
        })
        .attr("width", d => linear(d[1]))
        .attr("height", barHeight)
        .style("stroke", function() {
          return "#D4D5D3";
        })
        // .style("stroke-width", 0.5)
        .style("fill", function(d) {
          if (d[0] >= cScore.length / 2) {
            return "#D53A35";
          } else {
            return "#2F4554";
          }
        })
        .on("click", d => {
          store.commit("patternsSelectedData_Update", [d[0]]);
        });

      g.selectAll()
        .data(cScoreTop10)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("y", (d, i) => 0.4 * barHeight + barHeight * i + textTop)
        .attr("dy", "0.8em")
        .style("font-size", "12px")
        .style("font-family", "monospace")
        .text(function(d) {
          if (d[0] < cScore.length / 2) {
            return "o-" + d[0];
          } else {
            return "n-" + (d[0] - cScore.length / 2);
          }
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
#query {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#query_top {
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
#query_down {
  width: 100%;
  height: 94%;
  /* background-color: #f5f5f5; */
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
#query_top .ivu-select {
  float: right;
  margin-right: 2%;
  margin-top: 3px;
}
#query_top .ivu-btn {
  float: right;
  margin-right: 2%;
  margin-top: 3px;
}
</style>
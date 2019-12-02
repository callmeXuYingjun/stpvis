<template>
  <div id="scatter">
    <div id="scatter_top">
      <font>Scatter View</font>
      <Select v-model="model10" multiple size="small" placeholder="region" style="width:150px">
        <Option v-for="item in cityList"  :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model10" multiple size="small" placeholder="industry" style="width:150px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model10" multiple size="small" placeholder="time" style="width:150px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
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
      sharedState: store.state,
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model10: []
    };
  },
  mounted() {
    store.dispatch("scatterData_action");
  },
  computed: {
    scatter_patternData() {
      const [scatterData, patternData] = [
        this.sharedState.scatterData,
        this.sharedState.patternData
      ];
      return [scatterData, patternData];
    }
  },
  watch: {
    scatter_patternData: {
      handler: function(val) {
        if (val[0].length && val[1].length) this.draw(val[0], val[1]);
      },
      deep: true
    }
  },
  methods: {
    draw(scatter, pattern) {
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

      // format the scatter
      scatter.forEach(function(d) {
        d.x = +d.x;
        d.y = +d.y;
        d.he = +d.he;
      });

      var maxInNumbers_x = d3.max(scatter, function(d) {
        return +d.x;
      });
      var minInNumbers_x = d3.min(scatter, function(d) {
        return +d.x;
      });
      var maxInNumbers_y = d3.max(scatter, function(d) {
        return +d.y;
      });
      var minInNumbers_y = d3.min(scatter, function(d) {
        return +d.y;
      });
      var maxInNumbers_r = d3.max(scatter, function(d) {
        return +d.he;
      });
      var minInNumbers_r = d3.min(scatter, function(d) {
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
      // var Scale_r = d3
      //   .scaleLinear()
      //   .domain([minInNumbers, maxInNumbers])
      //   .range([0, AxisWidth]);
      var industryData = pattern[1].concat(pattern[1]);
      for (var i = 0; i < scatter.length; i++) {
        svg
          .append("circle")
          .attr("r", linear_r(scatter[i].he))
          .attr("cx", Scale(scatter[i].x))
          .attr("cy", Scale(scatter[i].y))
          .style("fill", function() {
            if (i >= scatter.length / 2) {
              return "grey";
            } else {
              return "red";
            }
          });

        var colors = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors

        var pieData = industryData[i]; //data we want to turn into a pie chart
        var pies = d3
          .pie()
          .startAngle(0)
          .endAngle(2 * Math.PI)(pieData); // turns into data for pie chart with start and end angles
        var arc = d3
          .arc()
          .innerRadius(linear_r(scatter[i].he) / 2) //means full circle. if not 0, would be donut
          .outerRadius(linear_r(scatter[i].he)) //size of circle
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
            "translate(" + Scale(scatter[i].x) + "," + Scale(scatter[i].y) + ")"
          );
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
#scatter_top .ivu-select {
  float: right;
  margin-right: 2%;
  margin-top: 3px;
}
</style>
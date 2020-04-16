<template>
  <div id="tree">
    <div id="tree_top">
      <font>Progressive Partition Tree</font>
      <i-switch true-color="#13ce66" false-color="#ff4949" v-model="switch1" @on-change="change">
        <span slot="open">粗</span>
        <span slot="close">细</span>
      </i-switch>
    </div>
    <div id="tree_down"></div>
    <div id="tree_panel">
      <h3>partition panel</h3>
      <Icon type="md-add-circle" size="24" />
      <Select v-model="dimensionSelect" size="small" style="width:100px">
        <Option v-for="item in dimensionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br />
      <Icon type="md-add-circle" size="24" />
      <Select v-model="clusteringMethodsSelect" size="small" style="width:100px">
        <Option
          v-for="item in clusteringMethodsList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
      </Select>
      <br />
      <Icon type="md-add-circle" size="24" />
      <Input
        v-model="clusterNum"
        placeholder="Enter something..."
        size="small"
        style="width:100px"
      />
      <br />
      <br />
      <Button type="success" @click="partitionSubmit">SUBMIT</Button>
    </div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import * as d3 from "d3";
export default {
  data: function() {
    return {
      sharedState: store.state,
      switch1: false,
      dimensionList: [
        {
          value: "0",
          label: "Time"
        },
        {
          value: "1",
          label: "Industry"
        },
        {
          value: "2",
          label: "Area"
        }
      ],
      dimensionSelect: "",
      clusteringMethodsList: [
        {
          value: "0",
          label: "KMeans"
        },
        {
          value: "1",
          label: "Hierarchical Clustering"
        }
      ],
      clusteringMethodsSelect: "",
      clusterNum: ""
    };
  },
  mounted() {
    store.dispatch("treeData_action");
  },
  watch: {
    "sharedState.treeData": function(newdata) {
      this.draw(newdata);
    }
  },
  methods: {
    change(status) {
        var params = {
        tensorSelectedName: this.sharedState.tensorSelectedData.name,
        liduStatus: status
      };
      store.dispatch("lidu_action", params);
    },
    partitionSubmit() {
      d3.select("#tree_panel").style("visibility", "hidden");
      var params = {
        dimensionSelect: this.dimensionSelect,
        clusteringMethodsSelect: this.clusteringMethodsSelect,
        clusterNum: this.clusterNum,
        tensorSelectedName: this.sharedState.tensorSelectedData.name
      };
      store.dispatch("partition_action", params);
    },
    draw(treeData) {
      treee();
      d3.selectAll("#"+this.sharedState.tensorSelectedData.name).style("fill", "#CCC")
      function treee() {
        document.getElementById("tree_down").innerHTML = "";
        var margin = { top: 20, right: 130, bottom: 20, left: 80 };
        var width =
          document.getElementById("tree_down").scrollWidth -
          margin.left -
          margin.right;
        var height =
          document.getElementById("tree_down").scrollHeight -
          margin.top -
          margin.bottom;
        // declares a tree layout and assigns the size
        var treemap = d3.tree().size([height, width]);
        var nodes = d3.hierarchy(treeData, function(d) {
          return d.children;
        });
        var shendu = nodes.height;
        nodes = treemap(nodes);
        nodes.each(function(d) {
          if (d.depth < shendu && d.depth != 0) {
            d.y -= 40 * d.depth;
          }
        });
        var nodeArray = nodes.descendants();
        store.commit(
          "tensorSelectedData_Update",
          nodeArray[nodeArray.length - 1].data
        );
        var colors = ["#893D98", "#22B184", "#4272B5"];

        var svg = d3
            .select("#tree_down")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom),
          g = svg
            .append("g")
            .attr(
              "transform",
              "translate(" + margin.left + "," + margin.top + ")"
            );
        var LinearLine = d3
          .scaleLinear()
          .domain(d3.extent(nodeArray.slice(1), ele => ele.data.sum))
          .range([2, height / 10]);

        var linkenter = g.selectAll(".link").data(nodes.descendants().slice(1));
        linkenter
          .enter()
          .append("path")
          .attr("class", "link")
          .attr("id", "link")
          .style("stroke", function(d) {
            let temp = d.data.name.split("-");
            if (temp[temp.length - 1][0] == "A") {
              return colors[0];
            } else if (temp[temp.length - 1][0] == "B") {
              return colors[1];
            } else if (temp[temp.length - 1][0] == "C") {
              return colors[2];
            }else{
              return "grey"
            }
          })
          .style("fill", function() {
            return "none";
          })
          .style("stroke-width", function(d) {
            return LinearLine(d.data.sum);
          })
          .attr("d", function(d) {
            return (
              "M" +
              d.y +
              "," +
              d.x +
              "C" +
              (d.y + d.parent.y) / 2 +
              "," +
              d.x +
              " " +
              (d.y + d.parent.y) / 2 +
              "," +
              d.parent.x +
              " " +
              d.parent.y +
              "," +
              d.parent.x
            );
          })
          .on("click", function() {
              d3.selectAll("#link").style("visibility", "hidden")
          });

        var pow = d3
          .scalePow()
          .exponent(0.5)
          .domain(d3.extent(nodeArray, ele => ele.data.sum))
          .rangeRound([height / 20, height / 6]);

        for (let i = 0; i < nodeArray.length; i++) {
          //绘制节点整个的graph
          const outerRadius =
            nodeArray[i].depth == shendu
              ? pow(nodeArray[i].data.sum)
              : pow(nodeArray[i].data.sum) / 2;
          const innerRadius = outerRadius * 0.9;
          const paddingAngle = (Math.PI / 180) * 5;
          var gg = g
            .append("g")
            .attr(
              "transform",
              "translate(" + nodeArray[i].y + "," + nodeArray[i].x + ")"
            );
          gg.append("circle")
            .attr("r", function() {
              return innerRadius;
            })
            .attr("id",nodeArray[i].data.name)
            .attr("class", "circleAll")
            .style("fill", function() {
              return "white";
            })
            .on("click", function() {
              d3.selectAll(".circleAll").style("fill", "white")
              d3.selectAll("#"+nodeArray[i].data.name).style("fill", "#CCC")
              store.commit("tensorSelectedData_Update", nodeArray[i].data);
            });

          //第一扇形
          // var colors_0 = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors
          var pieData_0_data = nodeArray[i].data.marginalA; //data we want to turn into a pie chart
          var pieData_0 = d3.range(pieData_0_data.length).map(() => 1); //data we want to turn into a pie chart
          var max_0 = d3.max(pieData_0_data);
          var min_0 = d3.min(pieData_0_data);
          var linear_0 = d3
            .scaleLinear()
            .domain([min_0/10, max_0])
            .range([outerRadius * 0.3, outerRadius * 1.5]);
          var pies_0 = d3
            .pie()
            .startAngle(0 - paddingAngle)
            .endAngle(-(2 * Math.PI) / 3 + paddingAngle)(pieData_0); // turns into data for pie chart with start and end angles

          let arc_0 = d3
            .arc()
            .innerRadius(innerRadius) //means full circle. if not 0, would be donut
            .outerRadius(function() {
              return outerRadius;
            }) //size of circle
            .startAngle(d => d.startAngle) //how does it get d???
            .endAngle(d => d.endAngle);
          gg.selectAll()
            .data(pies_0)
            .enter()
            .append("path")
            .attr("d", arc_0)
            .attr("fill", () => {
              return colors[0];
            })
            .attr("stroke", function() {
              return "#fff";
            });

          //第二扇形
          // var colors_1 = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors
          var pieData_1_data = nodeArray[i].data.marginalB; //data we want to turn into a pie chart
          var pieData_1 = d3.range(pieData_1_data.length).map(() => 1); //data we want to turn into a pie chart
          var max_1 = d3.max(pieData_1_data);
          var min_1 = d3.min(pieData_1_data);
          var linear_1 = d3
            .scaleLinear()
            .domain([min_1, max_1])
            .range([outerRadius * 0.3, outerRadius * 1.5]);
          var pies_1 = d3
            .pie()
            .startAngle(-(2 * Math.PI) / 3 - paddingAngle)
            .endAngle((-(2 * Math.PI) / 3) * 2 + paddingAngle)(pieData_1); // turns into data for pie chart with start and end angles

          let arc_1 = d3
            .arc()
            .innerRadius(innerRadius) //means full circle. if not 0, would be donut
            .outerRadius(function() {
              return outerRadius;
            }) //size of circle
            .startAngle(d => d.startAngle) //how does it get d???
            .endAngle(d => d.endAngle);
          gg.selectAll()
            .data(pies_1)
            .enter()
            .append("path")
            .attr("d", arc_1)
            .attr("fill", () => {
              return colors[1];
            })
            .attr("stroke-width",0)
            .attr("stroke", function() {
              return "#fff";
            });

          //第三扇形
          // var colors_2 = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors
          var pieData_2_data = nodeArray[i].data.marginalC; //data we want to turn into a pie chart
          var pieData_2 = d3.range(pieData_2_data.length).map(() => 1); //data we want to turn into a pie chart
          var max_2 = d3.max(pieData_2_data);
          var min_2 = d3.min(pieData_2_data);
          var linear_2 = d3
            .scaleLinear()
            .domain([min_2/10, max_2])
            .range([outerRadius * 0.3, outerRadius * 1.5]);
          var pies_2 = d3
            .pie()
            .startAngle((-(2 * Math.PI) / 3) * 2 - paddingAngle)
            .endAngle(-2 * Math.PI + paddingAngle)(pieData_2); // turns into data for pie chart with start and end angles

          let arc_2 = d3
            .arc()
            .innerRadius(innerRadius) //means full circle. if not 0, would be donut
            .outerRadius(function() {
              return outerRadius;
            }) //size of circle
            .startAngle(d => d.startAngle) //how does it get d???
            .endAngle(d => d.endAngle);
          gg.selectAll()
            .data(pies_2)
            .enter()
            .append("path")
            .attr("d", arc_2)
            .attr("fill", () => {
              return colors[2];
            })
            .attr("stroke-width",0)
            .attr("stroke", function() {
              return "#fff";
            });

          //三角形,
          //内半径innerRadius
          var triangleRadius = innerRadius * 0.8;
          var triangleTop = [0, -triangleRadius];
          var triangleLeft = [
            (-Math.sqrt(3) * triangleRadius) / 2,
            triangleRadius / 2
          ];
          var triangleRight = [
            (Math.sqrt(3) * triangleRadius) / 2,
            triangleRadius / 2
          ];

          var lines_0 = [triangleTop, triangleLeft];
          var lines_1 = [triangleLeft, triangleRight];
          var lines_2 = [triangleRight, triangleTop];
          var lines = [lines_0, lines_1, lines_2];
          var linePath = d3.line();
          gg.selectAll()
            .data(lines)
            .enter()
            .append("path")
            .attr("d", function(d) {
              return linePath(d);
            })
            .attr("stroke", (d, k) => {
              return colors[k];
            })
            .attr("stroke-width", 0)
            .attr("fill", "none");

          //文字提示

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

          //三角形边上的分布
          var ggg_0 = gg
            .append("g")
            .attr("transform", [
              "translate(" + 0 + "," + -triangleRadius + ")",
              "rotate(120)"
            ]);
          var width_0 = (Math.sqrt(3) * triangleRadius) / pieData_0_data.length;
          ggg_0
            .selectAll()
            .data(pieData_0_data)
            .enter()
            .append("rect")
            .attr("transform", function(d, k) {
              return "translate(" + k * width_0 + ",0)";
            })
            .attr("width", width_0)
            .attr("y", function() {
              return 0;
            })
            .attr("height", function(d, k) {
              return linear_0(pieData_0_data[k]) / 5; //需要改
            })
            .style("stroke", "#D4D5D3")
            .style("stroke-width", 0.5)
            .style("fill", function() {
              return colors[0];
            })
            .on("mouseover", function(d, k) {
              return tooltip
                .style("visibility", "visible")
                .text(nodeArray[i].data.time[k]);
            })
            .on("mousemove", function() {
              return tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function() {
              return tooltip.style("visibility", "hidden");
            });

          var ggg_1 = gg
            .append("g")
            .attr("transform", [
              "translate(" +
                (-Math.sqrt(3) * triangleRadius) / 2 +
                "," +
                triangleRadius / 2 +
                ")",
              "rotate(0)"
            ]);
          var width_1 = (Math.sqrt(3) * triangleRadius) / pieData_1_data.length;
          ggg_1
            .selectAll()
            .data(pieData_1_data)
            .enter()
            .append("rect")
            .attr("transform", function(d, k) {
              return "translate(" + k * width_1 + ",0)";
            })
            .attr("width", width_1)
            .attr("y", function() {
              return 0;
            })
            .attr("height", function(d, k) {
              return linear_1(pieData_1_data[k]) / 5; //需要改
            })
            .style("stroke", "#D4D5D3")
            .style("stroke-width", 0.5)
            .style("fill", function() {
              return colors[1];
            })
            .on("mouseover", function(d, k) {
              return tooltip
                .style("visibility", "visible")
                .text(nodeArray[i].data.industry[k]);
            })
            .on("mousemove", function() {
              return tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function() {
              return tooltip.style("visibility", "hidden");
            });

          var ggg_2 = gg
            .append("g")
            .attr("transform", [
              "translate(" +
                (Math.sqrt(3) * triangleRadius) / 2 +
                "," +
                triangleRadius / 2 +
                ")",
              "rotate(-120)"
            ]);
          var width_2 = (Math.sqrt(3) * triangleRadius) / pieData_2_data.length;
          ggg_2
            .selectAll()
            .data(pieData_2_data)
            .enter()
            .append("rect")
            .attr("transform", function(d, k) {
              return "translate(" + k * width_2 + ",0)";
            })
            .attr("width", width_2)
            .attr("y", function() {
              return 0;
            })
            .attr("height", function(d, k) {
              return linear_2(pieData_2_data[k]) / 5; //需要改
            })
            .style("stroke", "#D4D5D3")
            .style("stroke-width", 0.5)
            .style("fill", function() {
              return colors[2];
            })
            .on("mouseover", function(d, k) {
              return tooltip
                .style("visibility", "visible")
                .text(nodeArray[i].data.area[k]);
            })
            .on("mousemove", function() {
              return tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function() {
              return tooltip.style("visibility", "hidden");
            });

          //外圈多模式的分布
          var LinearX_0 = d3
            .scaleLinear()
            .domain([0, pieData_0_data.length])
            .range([0 - paddingAngle, -(2 * Math.PI) / 3 + paddingAngle]);

          var LinearY_0 = d3
            .scaleLinear()
            .range([outerRadius * 1.05, outerRadius * 1.4])
            .domain(
              d3.extent(
                nodeArray[i].data.A.reduce(function(a, b) {
                  return a.concat(b);
                })
              )
            );
          var lineR_0 = d3
            .lineRadial()
            .angle(function(d, k) {
              return (
                LinearX_0(k) - (2 * Math.PI) / 3 / 2 / pieData_0_data.length
              );
            })
            .radius(function(d) {
              return LinearY_0(d);
            });
          var modelData_0 = nodeArray[i].data.A;
          gg.selectAll()
            .data(modelData_0)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#D35F89")
            .style("opacity", 0.5)
            .style("stroke-width", 0.2)
            .attr("d", lineR_0);

          var LinearX_1 = d3
            .scaleLinear()
            .domain([0, pieData_1_data.length])
            .range([
              -(2 * Math.PI) / 3 - paddingAngle,
              (-(2 * Math.PI) / 3) * 2 + paddingAngle
            ]);

          var LinearY_1 = d3
            .scaleLinear()
            .range([outerRadius * 1.05, outerRadius * 1.4])
            .domain(
              d3.extent(
                nodeArray[i].data.B.reduce(function(a, b) {
                  return a.concat(b);
                })
              )
            );

          var lineR_1 = d3
            .lineRadial()
            .angle(function(d, k) {
              return (
                LinearX_1(k) - (2 * Math.PI) / 3 / 2 / pieData_1_data.length
              );
            })
            .radius(function(d) {
              return LinearY_1(d);
            });
          var modelData_1 = nodeArray[i].data.B;
          gg.selectAll()
            .data(modelData_1)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#D35F89")
            .style("opacity", 0.5)
            .style("stroke-width", 0.2)
            .attr("d", lineR_1);

          var LinearX_2 = d3
            .scaleLinear()
            .domain([0, pieData_2_data.length])
            .range([
              (-(2 * Math.PI) / 3) * 2 - paddingAngle,
              -2 * Math.PI + paddingAngle
            ]);
          var LinearY_2 = d3
            .scaleLinear()
            .range([outerRadius * 1.05, outerRadius * 1.4])
            .domain(
              d3.extent(
                nodeArray[i].data.C.reduce(function(a, b) {
                  return a.concat(b);
                })
              )
            );

          var lineR_2 = d3
            .lineRadial()
            .angle(function(d, k) {
              return (
                LinearX_2(k) - (2 * Math.PI) / 3 / 2 / pieData_2_data.length
              );
            })
            .radius(function(d) {
              return LinearY_2(d);
            });

          var modelData_2 = nodeArray[i].data.C;
          gg.selectAll()
            .data(modelData_2)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#D35F89")
            .style("opacity", 0.5)
            .style("stroke-width", 0.2)
            .attr("d", lineR_2);

          //三角形内部

          //信息熵的比例尺
          var entropyData = nodeArray[i].data.entropyThree;
          var linear_entropy = d3
            .scaleLinear()
            .domain([0, d3.max(entropyData)])
            .range([0, triangleRadius * 0.5]);
          var pies_entropy = d3
            .pie()
            .startAngle(0)
            .endAngle(-2 * Math.PI)([1, 1, 1]); // turns into data for pie chart with start and end angles
          let arc_entropy_outer = d3
            .arc()
            .innerRadius(0) //means full circle. if not 0, would be donut
            .outerRadius(function(d, k) {
              return linear_entropy(entropyData[k]);
            }) //size of circle
            .startAngle(d => d.startAngle) //how does it get d???
            .endAngle(d => d.endAngle);
          gg.selectAll()
            .data(pies_entropy)
            .enter()
            .append("path")
            .attr("d", arc_entropy_outer)
            .attr("fill", (d, k) => {
              return colors[k];
            })
            .attr("stroke", function() {
              return "#fff";
            })
            .on("click", function() {
              // store.commit("tensorSelectedData_Update", nodeArray[i].data.name);
              d3.select("#tree_panel")
                .style("visibility", "visible")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
            });
        }
        
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
#tree {
  width: 99%;
  height: 99%;
  margin: 0.5% 0.5%;
}
#tree_top {
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
#tree_down {
  width: 100%;
  height: 94%;
  /* background-color: #f5f5f5; */
  background-color: white;
  border-width: 0px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 5px;
}
#tree_panel {
  height: 150px;
  width: 180px;
  position: absolute;
  visibility: hidden;
  border-width: 2px;
  border-style: solid;
  border-color: grey;
  background-color: white;
}
#tree_top .ivu-switch {
  float: right;
  margin-right: 2%;
  margin-top: 3px;
}
</style>
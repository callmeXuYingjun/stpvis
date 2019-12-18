<template>
  <div id="tree">
    <div id="tree_top">
      <font>Tree View</font>
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
    // this.draw();
    store.dispatch("patternData_action");
    store.dispatch("treeData_action");
  },
  computed: {
    patternData_treeData() {
      const [patternData, treeData] = [
        this.sharedState.patternData,
        this.sharedState.treeData
      ];
      return [patternData, treeData];
    }
  },
  watch: {
    // "sharedState.patternData": function(newdata) {
    //   this.draw(newdata);
    // },
    // "sharedState.treeData": function(newdata) {
    //   this.draw(newdata);
    // },
    patternData_treeData: {
      handler: function(val) {
        if (val[0].length && JSON.stringify(val[1]) !== "{}")
          this.draw(val[0], val[1]);
      },
      deep: true
    }
  },
  methods: {
    partitionSubmit() {
       d3.select("#tree_panel").style("visibility", "hidden");
       var params={
         dimensionSelect:this.dimensionSelect,
         clusteringMethodsSelect:this.clusteringMethodsSelect,
         clusterNum:this.clusterNum,
         tensorSelectedData:this.sharedState.tensorSelectedData
       }
       store.dispatch("partition_action",params);
    },
    draw(data, treeData) {
      console.log(treeData)
      // console.log(data,treeData1)
      var num_tree = 2;
      // var treeData = {
      //   name: "初始张量",
      //   id: 1,
      //   id_shunxu: 0,
      //   children: [
      //     {
      //       name: "周末",
      //       id: 11,
      //       id_shunxu: 1,
      //       children: null
      //     },
      //     {
      //       name: "工作日",
      //       id: 12,
      //       id_shunxu: 2,
      //       children: [
      //         {
      //           name: "城区",
      //           id: 121,
      //           id_shunxu: 3,
      //           children: [
      //             {
      //               name: "行业集合1",
      //               id: 1211,
      //               id_shunxu: 5,
      //               children: null
      //             },
      //             {
      //               name: "行业集合2",
      //               id: 1212,
      //               id_shunxu: 6,
      //               children: null
      //             },
      //             {
      //               name: "行业集合3",
      //               id: 1213,
      //               id_shunxu: 7,
      //               children: null
      //             },
      //             {
      //               name: "行业集合4",
      //               id: 1214,
      //               id_shunxu: 8,
      //               children: null
      //             },
      //             {
      //               name: "行业集合5",
      //               id: 1215,
      //               id_shunxu: 9,
      //               children: null
      //             }
      //           ]
      //         },
      //         {
      //           name: "乡村",
      //           id: 122,
      //           id_shunxu: 4,
      //           children: null
      //         }
      //       ]
      //     }
      //   ]
      // };

      var N_all_num_history = [
        45193,
        8680,
        36513,
        1474.9,
        2231.1,
        2426.1,
        2548,
        9337.5,
        12159
      ];

      var N_all_num_ce = [
        15288,
        2791,
        12497,
        283,
        237,
        1045,
        1226,
        3196,
        4437,
        1954
      ];

      var N_all_num_cha = [
        29905,
        5889.1,
        24016,
        19091.9,
        1994.1,
        1381.1,
        122,
        722.4,
        9141.5,
        4234.5
      ];
      var N_all_num = [N_all_num_history, N_all_num_ce, N_all_num_cha];
      var colors = ["#893D98", "#22B184", "#4272B5"];
      treee();
      function treee() {
        document.getElementById("tree_down").innerHTML = "";
        var margin = { top: 20, right: 80, bottom: 20, left: 60 };
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
        // var color_link = ["#893D98", "#22B184", "#4272B5"];
        // function curtail(arr) {
        //   var m = arr.slice(0);
        //   m.splice(0, 1);
        //   return m;
        // }
        // var line_data = curtail(N_all_num[num_tree]);
        // var max_line = d3.max(line_data, function(a) {
        //   return +a;
        // });
        // var min_line = d3.min(line_data, function(a) {
        //   return +a;
        // });

        // var x = d3
        //   .scaleLinear()
        //   .domain([min_line, max_line])
        //   .range([2, height / 10]);

        var linkenter = g.selectAll(".link").data(nodes.descendants().slice(1));
        linkenter
          .enter()
          .append("path")
          .attr("class", "link")
          .style("stroke", function() {
            // return color_link[d.depth - 1];
            return "grey";
          })
          .style("fill", function() {
            return "none";
          })
          .style("stroke-width", function() {
            // return x(line_data[i]);
            return 5;
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
          });

        var maxx = d3.max(N_all_num[num_tree], function(a) {
          return +a;
        });
        var minx = d3.min(N_all_num[num_tree], function(a) {
          return +a;
        });

        var pow = d3
          .scalePow()
          .exponent(0.5)
          .domain([minx, maxx])
          .rangeRound([height / 20, height / 6]);
        var nodeArray = nodes.descendants();

        for (let i = 0; i < nodeArray.length; i++) {
          //绘制节点整个的graph
          const outerRadius =
            nodeArray[i].depth == shendu
              ? pow(N_all_num[num_tree][i])
              : pow(N_all_num[num_tree][i]) / 2;
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
            .style("fill", function() {
              return "white";
            })
            .on("click", function() {
              store.commit("tensorSelectedData_Update", nodeArray[i].data.name);
              // console.log(d3.event);
              d3.select("#tree_panel")
                .style("visibility", "visible")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
              // .on("click", () => {
              //   d3.select("#tree_panel").style("visibility", "hidden");
              // });
            });

          //第一扇形
          // var colors_0 = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors
          var pieData_0 = d3.range(7).map(() => 1); //data we want to turn into a pie chart
          var pieData_0_data = [
            0.07524071,
            0.077525052,
            0.173225796,
            0.174929844,
            0.169244389,
            0.168637343,
            0.161196865
          ]; //data we want to turn into a pie chart
          var max_0 = d3.max(pieData_0_data);
          var min_0 = d3.min(pieData_0_data);
          var linear_0 = d3
            .scaleLinear()
            .domain([min_0, max_0])
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
          // let arc_0_outer = d3
          //   .arc()
          //   .innerRadius(outerRadius * 1.1) //means full circle. if not 0, would be donut
          //   .outerRadius(function(d, k) {
          //     return linear_0(pieData_0_data[k]);
          //   }) //size of circle
          //   .startAngle(d => d.startAngle) //how does it get d???
          //   .endAngle(d => d.endAngle);
          // gg.selectAll()
          //   .data(pies_0)
          //   .enter()
          //   .append("path")
          //   .attr("d", arc_0_outer)
          //   .attr("fill", d => {
          //     return colors_0(d.value);
          //   })
          //   .attr("stroke", function() {
          //     return "#fff";
          //   });

          //第二扇形
          // var colors_1 = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors
          var pieData_1 = d3.range(44).map(() => 1); //data we want to turn into a pie chart
          var pieData_1_data = [
            0.070404158,
            0.190398426,
            0.032909937,
            0.035419277,
            0.115716373,
            0.018819612,
            0.04104331,
            0.026160633,
            0.037437429,
            0.023327005,
            0.020240607,
            0.029662779,
            0.028013357,
            0.014603382,
            0.022933092,
            0.02100244,
            0.019167552,
            0.021910625,
            0.036748618,
            0.025073274,
            0.017891783,
            0.016933394,
            0.020750153,
            0.011238795,
            0.003390082,
            0.008788096,
            0.013478864,
            0.008975319,
            0.002199094,
            0.006905413,
            0.004123819,
            0.005492358,
            0.00698448,
            0.008134062,
            0.004379284,
            0.001297873,
            0.004071546,
            0.003247519,
            0.006212739,
            0.002844376,
            0.004798661,
            0.002853695,
            0.002135364,
            0.001881344
          ]; //data we want to turn into a pie chart
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
            .attr("stroke", function() {
              return "#fff";
            });

          // let arc_1_outer = d3
          //   .arc()
          //   .innerRadius(outerRadius * 1.1) //means full circle. if not 0, would be donut
          //   .outerRadius(function(d, k) {
          //     return linear_1(pieData_1_data[k]);
          //   }) //size of circle
          //   .startAngle(d => d.startAngle) //how does it get d???
          //   .endAngle(d => d.endAngle);
          // gg.selectAll()
          //   .data(pies_1)
          //   .enter()
          //   .append("path")
          //   .attr("d", arc_1_outer)
          //   .attr("fill", d => {
          //     return colors_1(d.value);
          //   })
          //   .attr("stroke", function() {
          //     return "#fff";
          //   });

          //第三扇形
          // var colors_2 = d3.scaleOrdinal(d3.schemeCategory10); //maps integers to colors
          var pieData_2 = d3.range(10).map(() => 1); //data we want to turn into a pie chart
          var pieData_2_data = [
            0.183079937,
            0.167195066,
            0.123041623,
            0.161131554,
            0.15793099,
            0.032298312,
            0.032375012,
            0.034448609,
            0.074161035,
            0.034337862
          ]; //data we want to turn into a pie chart
          var max_2 = d3.max(pieData_2_data);
          var min_2 = d3.min(pieData_2_data);
          var linear_2 = d3
            .scaleLinear()
            .domain([min_2, max_2])
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
            .attr("stroke", function() {
              return "#fff";
            });

          // let arc_2_outer = d3
          //   .arc()
          //   .innerRadius(outerRadius * 1.1) //means full circle. if not 0, would be donut
          //   .outerRadius(function(d, k) {
          //     return linear_2(pieData_2_data[k]);
          //   }) //size of circle
          //   .startAngle(d => d.startAngle) //how does it get d???
          //   .endAngle(d => d.endAngle);
          // gg.selectAll()
          //   .data(pies_2)
          //   .enter()
          //   .append("path")
          //   .attr("d", arc_2_outer)
          //   .attr("fill", d => {
          //     return colors_2(d.value);
          //   })
          //   .attr("stroke", function() {
          //     return "#fff";
          //   });

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
            .attr("stroke-width", "1px")
            .attr("fill", "none");
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
            });

          //外圆模式个个维度分布
          // var sequential_0=d3.range(7)

          var LinearX_0 = d3
            .scaleLinear()
            .domain([0, pieData_0_data.length])
            .range([0 - paddingAngle, -(2 * Math.PI) / 3 + paddingAngle]);

          var LinearY_0 = d3
            .scaleLinear()
            .range([outerRadius * 1.05, outerRadius * 1.4])
            .domain(
              d3.extent(
                data[0].reduce(function(a, b) {
                  return a.concat(b);
                })
              )
            );
          var lineR_0 = d3
            .lineRadial()
            .angle(function(d, k) {
              return LinearX_0(k);
            })
            .radius(function(d) {
              return LinearY_0(d);
            });
          var modelData_0 = data[0];
          gg.selectAll()
            .data(modelData_0)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#D35F89")
            .style("opacity", 0.2)
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
                data[1].reduce(function(a, b) {
                  return a.concat(b);
                })
              )
            );

          var lineR_1 = d3
            .lineRadial()
            .angle(function(d, k) {
              return LinearX_1(k);
            })
            .radius(function(d) {
              return LinearY_1(d);
            });
          var modelData_1 = data[1];
          gg.selectAll()
            .data(modelData_1)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#D35F89")
            .style("opacity", 0.2)
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
                data[2].reduce(function(a, b) {
                  return a.concat(b);
                })
              )
            );

          var lineR_2 = d3
            .lineRadial()
            .angle(function(d, k) {
              return LinearX_2(k);
            })
            .radius(function(d) {
              return LinearY_2(d);
            });

          var modelData_2 = data[2];
          gg.selectAll()
            .data(modelData_2)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "#D35F89")
            .style("opacity", 0.2)
            .style("stroke-width", 0.2)
            .attr("d", lineR_2);

          //三角形内部

          //信息熵的比例尺
          var entropyData = [0.7, 0.3, 0.5];
          var linear_entropy = d3
            .scaleLinear()
            .domain([0, 1])
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
            });
        }
      }
      // function RandomArray(Len, Min, Max) {
      //   var Range = Max - Min;

      //   var out = [];
      //   for (var i = 0; i < 15; i++) {
      //     out[i] = [];
      //     for (var j = 0; j < Len; j++) {
      //       var Rand = Math.random();
      //       out[i][j] = Min + Math.round(Rand * Range); //四舍五入
      //     }
      //   }
      //   return out;
      // }
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
  background-color: #f5f5f5;
  border-width: 1px;
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
</style>
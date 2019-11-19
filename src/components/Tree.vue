<template>
  <div id="tree">
    <div id="tree_top">
      <font>tree View</font>
    </div>
    <div id="tree_down"></div>
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
    this.draw();
    // store.dispatch("treeData_action");
  },
  watch: {
    // "sharedState.treeData": function(newdata) {
    //   this.draw(newdata);
    // }
  },
  methods: {
    draw() {
      var num_tree = 2;

      var treeData = {
        name: "初始张量",
        id: 1,
        id_shunxu: 0,
        children: [
          {
            name: "周末",
            id: 11,
            id_shunxu: 1,
            children: null
          },
          {
            name: "工作日",
            id: 12,
            id_shunxu: 2,
            children: [
              {
                name: "城区",
                id: 121,
                id_shunxu: 3,
                children: [
                  {
                    name: "行业集合1",
                    id: 1211,
                    id_shunxu: 5,
                    children: null
                  },
                  {
                    name: "行业集合2",
                    id: 1212,
                    id_shunxu: 6,
                    children: null
                  },
                  {
                    name: "行业集合3",
                    id: 1213,
                    id_shunxu: 7,
                    children: null
                  },
                  {
                    name: "行业集合4",
                    id: 1214,
                    id_shunxu: 8,
                    children: null
                  },
                  {
                    name: "行业集合5",
                    id: 1215,
                    id_shunxu: 9,
                    children: null
                  }
                ]
              },
              {
                name: "乡村",
                id: 122,
                id_shunxu: 4,
                children: null
              }
            ]
          }
        ]
      };


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
        1191.9,
        1994.1,
        1381.1,
        1322,
        6141.5,
        7722.4,
        4234.5
      ];
      var N_all_num = [N_all_num_history, N_all_num_ce, N_all_num_cha];
      treee();
      function treee() {
        // var treeData = [treeData_0, treeData_1, treeData_2, treeData_3];
        document.getElementById("tree_down").innerHTML = "";
        var margin = { top: 20, right: 30, bottom: 20, left: 30 };
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
          if (d.depth == shendu) {
            d.y -= 40 * (d.depth - 1);
          } else if (d.depth < shendu && d.depth != 0) {
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
        var color_link = ["#f58321", "#77bc45", "#ef1621"];
        function curtail(arr) {
          var m = arr.slice(0);
          m.splice(0, 1);
          return m;
        }
        var line_data = curtail(N_all_num[num_tree]);
        var max_line = d3.max(line_data, function(a) {
          return +a;
        });
        var min_line = d3.min(line_data, function(a) {
          return +a;
        });

        var x = d3
          .scaleLinear()
          .domain([min_line, max_line])
          .range([2, 20]);

        var linkenter = g.selectAll(".link").data(nodes.descendants().slice(1));

        linkenter
          .enter()
          .append("path")
          .attr("class", "link")
          .style("stroke", function(d) {
            return color_link[d.depth - 1];
          })
          .style("fill", function() {
            return "none";
          })
          .style("stroke-width", function(d, i) {
            return x(line_data[i]);
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
          .rangeRound([25, 60]);

        var node = g.selectAll(".node").data(nodes.descendants());
        // Enter the nodes.
        var nodeEnter = node
          .enter()
          .append("g")
          .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
          });
        // adds each node as a group

        nodeEnter
          .append("circle")
          .attr("r", function(d, i) {
            if (d.depth == shendu) {
              return pow(N_all_num[num_tree][i]);
            } else {
              return pow(N_all_num[num_tree][i]) / 3;
            }
          })
          .attr("id", function(d, i) {
            return "circle" + i;
          })
          .style("stroke", function() {
            return "#4C86B6";
          })
          .style("stroke-width", function() {
            return 4;
          })
          .style("fill", function() {
            return "black";
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

</style>
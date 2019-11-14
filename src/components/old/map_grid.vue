<template>
    <div id="map_wangge_div">
      <div id="map_wangge_div_top">
            <font>Grid Summarization View</font>
      </div>
      <div id="map_wangge_div_main"></div>
    </div>
</template>

<script>
import store from '../vuex/store.js'
export default {
  mounted(){
    this.drawGrid();
  },
  methods: {
    drawGrid(){
        var  zoom, zoomable_layer;
        document.getElementById("map_wangge_div_main").innerHTML = "";
        var width=document.getElementById("map_wangge_div_main").scrollWidth;
        var height=document.getElementById("map_wangge_div_main").scrollHeight;
        var svg = d3.select("#map_wangge_div_main").append("svg")
        .attr("width", width)
        .attr("height", height)
        zoomable_layer = svg.append('g');
        zoom = d3.behavior.zoom().scaleExtent([0.5, 4]).on('zoom', function() {
          return zoomable_layer.attr({
            transform: "translate(" + (zoom.translate()) + ")scale(" + (zoom.scale()) + ")"
          });
        });
        svg.call(zoom);
        var margin = {top: 10, right:10, bottom: 10, left:10};
        var wangge_index=[5,6,7,14,15,16,17,18,19,24,25,26,27,28,29,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,81,82,83,84,85,86,87,93,94,95,96];
        var xjiange=(width-margin.left-margin.right)/10
        var yjiange=(height-margin.bottom-margin.top)/10;
        yjiange=xjiange*0.023858499999999998/0.02882489999999933
        var wangge_id=0;
        var wangges_location=[];
        for(let i=0;i<10;i++){   //x
          for(let j=0;j<10;j++){  //y
              if(wangge_index.indexOf(i*10+j)!=-1){
              var y=yjiange*(9-i)
              var x=xjiange*j
              wangges_location.push([x,y])
            }
          }
        }
        zoomable_layer.selectAll()
                    .data(wangges_location)
                    .enter()
                    .append("rect")
                    .attr("transform","translate("+margin.left+","+margin.top + ")")
                    .attr("x",function(d, i){
                        return d[0]
                    })
                    .attr("y",function(d, i){
                        return d[1]
                    })
                    .attr("id",function(d,i){
                        return "wangge"+i
                    })
                    .attr("width",xjiange)
                    .attr("height",yjiange)
                    .style("stroke","#D4D5D3")
                    .style("stroke-width",2)
                    .style("fill",function(d){
                            return "grey"
                    })
                    // .on("mouseover",function(){
                    //   d3.select(this).style("stroke","blue")
                    // })
                    // .on("mouseout",function(){
                    //   d3.select(this).style("stroke","#D4D5D3")
                    // })
                    .on("click",function(d,i){
                        store.commit('wangge_id_update',i)
                        store.commit('selectedSort_update',1)
                        store.commit('selectedID_update',i)
                        store.commit('mobilesensor_set_update',["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"])
                   })
                    // .style("fill-opacity",function(d,i){
                    //     if(i>=time_min_max_index[0]&&i<=time_min_max_index[1]){
                    //         return 1
                    //     }else{
                    //         return 0.3
                    //     }
                    // });
   d3.csv("data/wangge/Num_wangge_hour.csv", function(error,data_num) {
      d3.csv("data/wangge/Avg_wangge_hour.csv", function(error, data_avg) {
        d3.csv("data/wangge/StdSum_wangge_hour.csv", function(error, data_std) {
        var pointstemp=[];
        for(var i=0;i<wangges_location.length;i++){
            var datatemp_num=[];
            var datatemp_avg=[];
            var datatemp_std=[];
          for(var j=0;j<120;j++){
            datatemp_num[j]=data_num[i]["time"+j]
            datatemp_avg[j]=data_avg[i]["time"+j]
            datatemp_std[j]=+data_std[i]["time"+j];
          }
          drawPie([wangges_location[i][0]+0.5*xjiange,wangges_location[i][1]+0.5*yjiange],datatemp_num,datatemp_avg,datatemp_std,i)
          // drawPie([wangges_location[i][0],wangges_location[i][1]],datatemp_num,datatemp_avg,i)
        }
      })
       })
  })



function drawPie(location,wangone_num,wangone_avg,wangone_std,wanggeid){
  var outerRadius_area=yjiange/2;
  var outerRadius=outerRadius_area*0.8;
  var innerRadius=outerRadius*0.8;
  var linear_num = d3.scale.linear()
                    .domain([0,2000])
                    .range([innerRadius,0]);
    var max=Math.max.apply(null,wangone_avg);
    var colorbar=["#FFFFFF","#F8DC21","#6EC953","#2C6B8C","#41367D","#4A1D70"]
    var linear_color = d3.scale.linear()
    .domain([-1,0,45,60,1000,1500])
    .range(colorbar);
    var colorbar1=["#FFFEFF","#F4D8C3","#D66728","#C53129"]
    var linear_color_background = d3.scale.linear()
    .domain([-1,40,70,1000])
    .range(colorbar1);
    d3.select("#wangge"+wanggeid).style("fill",linear_color_background(max))
    var huan=[]
    for(var i=0;i<120;i++){
      huan[i]=1;
    }
    var arc=d3.svg.arc()
    .innerRadius(function(d,i){
      return linear_num(parseInt(wangone_num[i]))
    })
    .outerRadius(function(d,i){
      return innerRadius
    });

    var arc1=d3.svg.arc()
              .innerRadius(function(d,i){
                return innerRadius
              })
              .outerRadius(function(d,i){
                return wangone_avg[i]!=-1?outerRadius:innerRadius
              });

            var pie=d3.layout.pie()
            .value(function(d){return d;})
            var piedata=pie(huan)
            // console.log(wanggeid)
            //颜色
            var color=d3.scale.category20();
            //pie
            zoomable_layer.append("g")
              .attr("transform","translate("+(location[0]+margin.left)+","+(location[1]+margin.top)+")")
              .selectAll()
              .data(piedata)
              .enter()
              .append("path")
              .attr("d",arc1)
              .style("fill",function(d,i){
                return linear_color(wangone_avg[i])
              })
              .on('click', function() {
                store.commit('wangge_id_update',wanggeid)
                store.commit('selectedSort_update',1)
                store.commit('selectedID_update',wanggeid)
                store.commit('mobilesensor_set_update',["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"])
            });	

            zoomable_layer.append("g")
              .attr("transform","translate("+(location[0]+margin.left)+","+(location[1]+margin.top)+")")
              .selectAll()
              .data(piedata)
              .enter()
              .append("path")
              .attr("d",arc)
              .style("fill",function(d,i){return "#131310"})
              .on('click', function(e) {
                store.commit('wangge_id_update',wanggeid)
                store.commit('selectedSort_update',1)
                store.commit('selectedID_update',wanggeid)
                store.commit('mobilesensor_set_update',["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"])
            });	



              ///最外层的标准差
     
      var outerangle = d3.time.scale()
        .domain([0,119])
        .range([0, 2 * Math.PI]);
      var outerradius = d3.scale.linear()
        .domain([0,30])
        .clamp(['true'])
        .range([outerRadius, outerRadius_area]);
      var outerarea = d3.svg.area.radial()
        .interpolate("cardinal-closed")
        .angle(function (d,i) {
            return outerangle(i);
        })
        .innerRadius(function (d) {
            return outerRadius;
        })
        .outerRadius(function (d) {
            return outerradius(d);
        });
        
      var numColors = 10;
      var colorScale = d3.scale.linear()
        .domain([0,(numColors-1)/2,numColors-1])
        .range(["#2c7bb6", "#ffff8c", "#d7191c"])
        .interpolate(d3.interpolateHcl);

      zoomable_layer.append("defs").append("radialGradient")
        .attr("id", "gradientRainbow")
        .attr("gradientUnits", "userSpaceOnUse") 
        .attr("cx", "0%")
        .attr("cy", "0%")
        .attr("r", "45%")
        .selectAll("stop") 
        .data(d3.range(numColors))                  
        .enter().append("stop") 
        .attr("offset", function(d,i) { return (i/(numColors-1)*50 + 40) + "%"; })   
        .attr("stop-color", function(d) { return colorScale(d); });

          zoomable_layer.append("g")
                .attr("transform","translate("+(location[0]+margin.left)+","+(location[1]+margin.top)+")")
                .append('path')
                .attr("d",outerarea(wangone_std))
                .style("fill",'url(#gradientRainbow)')
        }

        //颜色比例尺
 var colorbarData=[["#FFFFFF",-1],["#F8DC21",0],["#6EC953",45],["#2C6B8C",60],["#41367D",1000],["#4A1D70",1500]]
            svg.selectAll()
                .data(colorbarData)
                .enter()
                .append("rect")
                .attr("x",function(d, i){
                    return i*25+30
                })
                .attr("y",function(d, i){
                    return height-30
                })
                .attr("width",20)
                .attr("height",20)
                .style("stroke","#D4D5D3")
                .style("stroke-width",0.5)
                .style("fill",function(d,i){
                    return d[0]
            });

        svg.selectAll()
            .data(colorbarData)
            .enter()
            .append("text")
            .attr("x",function(d, i){
                    return i*25+30
            })
            .attr("y",function(d, i){
                return height-10
            })
            .attr("dy","0.8em")
            .style("font-size", "10px")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  d[1]
            });
        
        svg.append("text")
            .attr("x",0)
            .attr("y",height-25)
            .attr("dy","0.8em")
            .style("font-size", "15px")
            .style("font-weight","bold")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  "AVG"
            });


      //背景比例尺
        //颜色比例尺
 var colorbarData=[["#FFFFFF",-1],["#F4D8C3",50],["#D66728",70],["#C53129",1000]]
            svg.selectAll()
                .data(colorbarData)
                .enter()
                .append("rect")
                .attr("x",function(d, i){
                    return i*25+30
                })
                .attr("y",function(d, i){
                    return height-30-30
                })
                .attr("width",20)
                .attr("height",20)
                .style("stroke","#D4D5D3")
                .style("stroke-width",0.5)
                .style("fill",function(d,i){
                    return d[0]
            });

        svg.selectAll()
            .data(colorbarData)
            .enter()
            .append("text")
            .attr("x",function(d, i){
                    return i*25+30
            })
            .attr("y",function(d, i){
                return height-10-30
            })
            .attr("dy","0.8em")
            .style("font-size", "10px")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  d[1]
            });
        
        svg.append("text")
            .attr("x",0)
            .attr("y",height-25-30)
            .attr("dy","0.8em")
            .style("font-size", "15px")
            .style("font-weight","bold")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  "MAX"
            });



    }
  }
} 
</script>
<style scoped>
font{
   color:#EEEEEE;
   font-family:'Microsoft Yahei';
   font-weight:bold;
    position: relative;
    top: 18%;
    left: 2%;
}
#map_wangge_div{
    width:99%;
    height:99%;
    margin:0.5% 0.5%;
}
#map_wangge_div_top{
    width:100%;
    height:6%;
    background: linear-gradient(-45deg,#333333 25%,#3B3B3B 0,
                                #3B3B3B 50%,#333333 0,
                                #333333 75%,#3B3B3B 0);
    background-size: 30px 30px;
    text-align:left;
    border-radius:5px;
}
#map_wangge_div_main{
    width:100%;
    height:94%;
    background-color: #F5F5F5;
    border-width:1px; border-style: solid; border-color:#C7C7C7;
    border-radius:5px;
}
</style>
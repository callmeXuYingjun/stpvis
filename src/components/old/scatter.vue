<template>
    <div id="scatter_div">
      <div id="scatter_div_top"> 
        <font>Sensor Projection View</font>
      </div>
      <div id="scatter_div_main"></div>
    </div>
</template>

<script>
import store from '../vuex/store.js'
import d3 from 'd3'
import '../assets/dist/lasso'
export default {
  data: function(){
    return {
      sharedState: store.state
    }
  },
  mounted(){
    this.draw_scatter();
  },
  methods: {
    draw_scatter(){
         document.getElementById("scatter_div_main").innerHTML = "";
        var width=document.getElementById("scatter_div_main").scrollWidth;
        var height=document.getElementById("scatter_div_main").scrollHeight;
        var color = d3.scale.category10();
      // var colorbar=["#FFFFFF","#9B9B9B","#009D01","#BDD77E","#FFFB1C","#FFCF88","#FEB758","#FE6D67","#FE91FF"]
        var colorbar=["#6EC953","#2C6B8C","#41367D","#333333"]
        var svg = d3.select("#scatter_div_main").append("svg")
            .attr("width", width)
            .attr("height", height)


        var zoomable_layer = svg.append('g');
        var zoom = d3.behavior.zoom().scaleExtent([0.5, 4]).on('zoom', function() {
          return zoomable_layer.attr({
            transform: "translate(" + (zoom.translate()) + ")scale(" + (zoom.scale()) + ")"
          });
        });
        svg.call(zoom);


 d3.csv("data/sensor/Miss_allsensor_hour.csv", function(error,data_miss) {
      d3.csv("data/sensor/Avg_allsensor_hour.csv", function(error, data_avg) {
        d3.csv("data/points/points.csv", function(csvdata) {
          d3.csv("data/sensor/StdSum_allsensor_hour.csv", function(error, data_std) {
            var innerRadius=0;
            var outerRadius=20;
            var radius =outerRadius;
            var padding = {top: 20, right: 20, bottom:20, left:20};

            var xAxisWidth = width-padding.left-padding.right;   // x轴宽度
            var yAxisWidth = height-padding.top-padding.bottom;   // y轴宽度
            var staticsensorid=["static1","static4","static6","static9","static11","static12","static13","static14","static15"]
            var x = d3.scale.linear()
            .range([0, xAxisWidth])
            .domain(d3.extent(csvdata, function(d) { return +d.locationX; })).nice();
            var y = d3.scale.linear()
                .range([yAxisWidth, 0])
                .domain(d3.extent(csvdata, function(d) { return +d.locationY; })).nice();

  function drawPie(location,sensor_num,sensor_avg,sensor_std,sensorid){
  var linear_num = d3.scale.linear()
                    .domain([0,720])
                    .range([outerRadius*0.6,outerRadius*0.3]);

    var colorbar=["#FFFFFF","#F8DC21","#6EC953","#2C6B8C","#41367D","#4A1D70"]
    var linear_color = d3.scale.linear()
    .domain([-1,0,45,60,1000,1500])
    .range(colorbar);
    var huan=[]
    for(var i=0;i<120;i++){
      huan[i]=1;
    }
    var arc=d3.svg.arc()
    .innerRadius(function(d,i){
      return linear_num(parseInt(sensor_num[i]))
    })
    .outerRadius(function(d,i){
      return outerRadius*0.6
    });

    var arc1=d3.svg.arc()
              .innerRadius(function(d,i){
                return outerRadius*0.6
              })
              .outerRadius(function(d,i){
                return sensor_avg[i]!=-1?outerRadius*0.8:outerRadius*0.6
              });

    var pie=d3.layout.pie()
    .value(function(d){return d;})
    var piedata=pie(huan)
    // console.log(wanggeid)
    //颜色
    var color=d3.scale.category20();
    //pie
    var elemEnter=zoomable_layer.append("g")
      .attr("transform","translate("+location[0]+","+location[1]+")");

    elemEnter.append("text")
      .attr("font-size",7)
      .attr("dx",function(){
        var temp=sensorid.split("c")
        var tempvalue;
            if(temp.length==1){
              tempvalue=sensorid;
            }else{
              tempvalue =temp[1];
            }
            if(tempvalue>=10){
              return -4;
            }else{
              return -2
            }
      })
      .attr("dy",2)
      .text(function() { //添加文字描述
            // alert(sensorid,sensorid.length)
            var temp=sensorid.split("c")
            if(temp.length==1){
              return sensorid;
            }else{
              return temp[1];
            }
           
      });


      elemEnter.selectAll()
      .data(piedata)
      .enter()
      .append("path")
      .attr("d",arc1)
      .attr("id","wangge_shitu")
      .style("fill",function(d,i){
        return linear_color(sensor_avg[i])
      })
      .on('click', function(e) {
        store.commit('wangge_id_update',"all")
        store.commit('selectedSort_update',0)
        store.commit('selectedID_update',sensorid)
        store.commit('mobilesensor_set_update',[sensorid])
        // store.commit('wangge_id_update',sensorid)
    });	

   
      elemEnter.selectAll()
      .data(piedata)
      .enter()
      .append("path")
      .attr("d",arc)
      .attr("id","wangge_shitu")
      .style("fill",function(d,i){
        var temp=sensorid.split("c")
            if(temp.length==1){
              return "#131310"
            }else{
              return "#6B006C"
            }
        })
      .on('click', function(e) {
        store.commit('wangge_id_update',"all")
        store.commit('selectedSort_update',0)
        store.commit('selectedID_update',sensorid)
        store.commit('mobilesensor_set_update',[sensorid])
    });	
               ///最外层的标准差
     
      var outerangle = d3.time.scale()
        .domain([0,119])
        .range([0, 2 * Math.PI]);
      var outerradius = d3.scale.linear()
        .domain([0,10,30])
        .clamp(['true'])
        .range([outerRadius*0.8,outerRadius,outerRadius*1.1]);
      // var outerradius = d3.scale.log()
      //                   .domain([0,30])
      //                   .range([outerRadius*0.8, outerRadius]);
      var outerarea = d3.svg.area.radial()
        .interpolate("cardinal-closed")
        .angle(function (d,i) {
            return outerangle(i);
        })
        .innerRadius(function (d) {
            return outerRadius*0.8;
        })
        .outerRadius(function (d) {
            return outerradius(d);
        });
        

      var numColors = 10;
      var colorScale = d3.scale.linear()
        .domain([0,(numColors-1)/2,numColors-1])
        .range(["#2c7bb6", "#ffff8c", "#d7191c"])
        .interpolate(d3.interpolateHcl);


      //有什么用

      // elemEnter.append("defs").append("radialGradient")
      //   .attr("id", "gradientRainbow")
      //   .attr("gradientUnits", "userSpaceOnUse") 
      //   .attr("cx", "0%")
      //   .attr("cy", "0%")
      //   .attr("r", "45%")
      //   .selectAll("stop") 
      //   .data(d3.range(numColors))                  
      //   .enter().append("stop") 
      //   .attr("offset", function(d,i) { return (i/(numColors-1)*50 + 40) + "%"; })   
      //   .attr("stop-color", function(d) { return colorScale(d); });

          elemEnter.append('path')
                .attr("d",outerarea(sensor_std))
                .style("fill",'url(#gradientRainbow)')



}
  var locations=[
  [
    "251.5203502476507",
    "195.26771431054115"
  ],
  [
    "358.67783626948557",
    "-30.342400927171525"
  ],
  [
    "407.84868625153484",
    "75.54720180404435"
  ],
  [
    "311.9670535429716",
    "123.4662577323421"
  ],
  [
    "191.67101768321288",
    "155.67161619187652"
  ],
  [
    "14.02526318497492",
    "129.46012170162973"
  ],
  [
    "289.18222565408877",
    "19.82630953980659"
  ],
  [
    "252.50188665519076",
    "65.38663766132102"
  ],
  [
    "160.8577194912265",
    "110.41912574117019"
  ],
  [
    "267.00953192964556",
    "43.76256262349971"
  ],
  [
    "319.6099619720068",
    "-7.938749329579424"
  ],
  [
    "237.0611181403094",
    "122.60188237742744"
  ],
  [
    "454.2880817437847",
    "205.65595539648885"
  ],
  [
    "152.46899171063052",
    "147.31312642127293"
  ],
  [
    "321.2505399400764",
    "172.1650771814606"
  ],
  [
    "329.93595153624625",
    "204.51014546044644"
  ],
  [
    "451.29519244047924",
    "49.300243387376455"
  ],
  [
    "377.7782114927208",
    "430.21399326142335"
  ],
  [
    "368.30411511031525",
    "212.24965620471593"
  ],
  [
    "396.1510173038511",
    "173.89310886565445"
  ],
  [
    "220.08173954277711",
    "-11.421879190604209"
  ],
  [
    "162.5304353106477",
    "54.12928869445296"
  ],
  [
    "439.19155341099395",
    "90.72205648187409"
  ],
  [
    "196.60844928697637",
    "67.58773269248819"
  ],
  [
    "259.2826560159749",
    "-30.657976084911972"
  ],
  [
    "339.438895066932",
    "71.64419355182446"
  ],
  [
    "235.27508759539575",
    "14.34952422207674"
  ],
  [
    "281.28782217068124",
    "-27.022660882239858"
  ],
  [
    "136.7489891923364",
    "-7.252374635443559"
  ],
  [
    "245.19386874977957",
    "91.50163301396327"
  ],
  [
    "368.0202281706022",
    "42.185546895974866"
  ],
  [
    "397.0860625037743",
    "147.7263422886234"
  ],
  [
    "378.0505479717572",
    "250.3503125192579"
  ],
  [
    "72.03093976909521",
    "199.88763122644085"
  ],
  [
    "439.4100711844434",
    "172.48641815082578"
  ],
  [
    "323.9660972499813",
    "-32.76569491101477"
  ],
  [
    "332.6116423505533",
    "231.44140832143464"
  ],
  [
    "471.00886977090084",
    "95.26144218526814"
  ],
  [
    "414.1995030430463",
    "32.89951784180975"
  ],
  [
    "279.2780924827785",
    "151.44859209723595"
  ],
  [
    "282.6940183693861",
    "244.39757163081742"
  ],
  [
    "470.06290222306546",
    "160.21344556486088"
  ],
  [
    "393.16909053332546",
    "200.2210789444072"
  ],
  [
    "481.269184478936",
    "132.84191566491916"
  ],
  [
    "186.92131595561986",
    "24.940955426955096"
  ],
  [
    "377.15150493576436",
    "-13.690821952027623"
  ],
  [
    "381.60709951072397",
    "66.07064051792813"
  ],
  [
    "8.469302356763963",
    "211.68539405895348"
  ],
  [
    "24.15247322341784",
    "169.91546234909592"
  ],
  [
    "509.7876820383276",
    "83.55245564822204"
  ],
  [
    "410.85911634583834",
    "123.13377295066864"
  ],
  [
    "275.74722876198877",
    "210.22002938968356"
  ],
  [
    "348.02239181153203",
    "123.38076411750814"
  ],
  [
    "383.98991877258555",
    "105.26122802643563"
  ],
  [
    "345.0820788640597",
    "263.9544192261648"
  ],
  [
    "422.7036298727549",
    "235.83952799353816"
  ],
  [
    "298.9134918410919",
    "204.59964713805064"
  ],
  [
    "357.5024280423743",
    "164.70916693304648"
  ],
  [
    "151.6452956325642",
    "212.73825168730713"
  ]
]
var temp;
temp=locations[31];
locations[31]=locations[55];
locations[55]=temp;

temp=locations[19];
locations[19]=locations[54];
locations[54]=temp;

temp=locations[42];
locations[42]=locations[56];
locations[56]=temp;

temp=locations[18];
locations[18]=locations[51];
locations[51]=temp;

draw()
function draw() {
    for(var i=0;i<csvdata.length;i++){
      var datatemp_num=[];
      var datatemp_avg=[];
      var datatemp_std=[];
      for(var j=0;j<120;j++){
        datatemp_num[j]=720-data_miss[i]["time"+j]
        datatemp_avg[j]=data_avg[i]["time"+j]
        datatemp_std[j]=+data_std[i]["time"+j];
      }
      var sensor_id;
      if(i>=50){
        sensor_id=staticsensorid[i-50]
      }else{
        sensor_id=(i+1)+""
      }
      drawPie(locations[i],datatemp_num,datatemp_avg,datatemp_std,sensor_id)
    }
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

  });
  });
    });
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
#scatter_div{
    width:99%;
    height:99%;
    margin:0.5% 0.5%;
}
#scatter_div_top{
    width:100%;
    height:8%;
    background: linear-gradient(-45deg,#333333 25%,#3B3B3B 0,
                            #3B3B3B 50%,#333333 0,
                            #333333 75%,#3B3B3B 0);
    background-size: 30px 30px;
    text-align:left;
    border-radius:5px;
}
#scatter_div_main{
    width:100%;
    height:92%;
    background-color: #F5F5F5;
    border-width:1px; border-style: solid; border-color:#C7C7C7;
    border-radius:5px;
}

.lasso path {
  stroke: rgb(80,80,80);
  stroke-width:2px;
}

.lasso .drawn {
  fill-opacity:.05 ;
}

.lasso .loop_close {
  fill:none;
  stroke-dasharray: 4,4;
}

.lasso .origin {
  fill:#3399FF;
  fill-opacity:.5;
}

.not_possible {
  fill:rgb(200,200,200);
}

.possible {
  fill:#EC888C;
}
</style>
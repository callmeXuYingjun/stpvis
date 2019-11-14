<template>
    <div id="sensorAndGrid_detial_div">
      <div id="sensorAndGrid_detial_div_top">
        <font>Detail Inspection View</font>
      </div>
    <div id="sensorAndGrid_detial_div_main"></div>
    </div>
</template>
<script>
import store from '../vuex/store.js'
import d3 from 'd3'
export default {
  data: function(){
    return {
      sharedState: store.state
    }
  },
  mounted(){
      this.drawSensorAndGrid_detial(store.state.selectedID,store.state.selectedSort);
  },
  watch: {
  'sharedState.selectedSort':function(){
      this.drawSensorAndGrid_detial(store.state.selectedID,store.state.selectedSort);
  },
  'sharedState.selectedID':function(){
      this.drawSensorAndGrid_detial(store.state.selectedID,store.state.selectedSort);
  }
 },
  methods: {
    drawSensorAndGrid_detial(ID,sort){
        var  zoom, zoomable_layer;
        document.getElementById("sensorAndGrid_detial_div_main").innerHTML = "";
        var width=document.getElementById("sensorAndGrid_detial_div_main").scrollWidth;
        var height=document.getElementById("sensorAndGrid_detial_div_main").scrollHeight;
        var svg = d3.select("#sensorAndGrid_detial_div_main").append("svg")
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
        if(sort==0){ 
          var sensors_id=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"]
          var index=sensors_id.indexOf(ID)
          d3.csv("data/sensor/Miss_allsensor_hour.csv", function(error,data_miss) {
            d3.csv("data/sensor/Avg_allsensor_hour.csv", function(error, data_avg) {
              d3.csv("data/sensor/Dongtai_allsensor_hour.csv", function(error, data_dongtai) {
                 d3.csv("data/sensor/StdSum_allsensor_hour.csv", function(error, data_std) {
                    d3.csv("data/sensor/raw/sensor_"+ID+".csv", function(error, data_raw) {
                var datatemp_num=[];
                var datatemp_avg=[];
                var datatemp_dongtai=[];
                var datatemp_std=[];
                var datatemp_raw=[];
                for(var j=0;j<120;j++){
                  datatemp_num[j]=720-data_miss[index]["time"+j]
                  datatemp_avg[j]=data_avg[index]["time"+j]
                  datatemp_dongtai[j]=data_dongtai[index]["time"+j];
                  datatemp_std[j]=+data_std[index]["time"+j];
                  var datatemp_raw_eachtime=[];
                  for(var k=0;k<data_raw.length;k++)
                  {
                      if(parseInt(data_raw[k].Timestamp.substr(8,2)-6)*24+parseInt(data_raw[k].Timestamp.substr(11,2))==j)
                      datatemp_raw_eachtime.push(parseInt(data_raw[k].Value))
                    }
                    datatemp_raw.push(datatemp_raw_eachtime)
                  }
                drawSensor([width/2,height/2],datatemp_num,datatemp_avg,datatemp_dongtai,datatemp_std,datatemp_raw,ID)
                })
              })
            })
          })
        })
        }else{
          d3.csv("data/wangge/Num_wangge_hour.csv", function(error,data_num) {
            d3.csv("data/wangge/Avg_wangge_hour.csv", function(error, data_avg) {
                d3.csv("data/wangge/StdSum_wangge_hour.csv", function(error, data_std) {
                    d3.csv("data/wangge/raw/wangge_"+ID+".csv", function(error, data_raw) {
                var datatemp_num=[];
                var datatemp_avg=[];
                var datatemp_std=[];
                var datatemp_raw=[];
                for(var j=0;j<120;j++){
                  datatemp_num[j]=data_num[ID]["time"+j]
                  datatemp_avg[j]=data_avg[ID]["time"+j]
                  datatemp_std[j]=+data_std[ID]["time"+j];
                  var datatemp_raw_eachtime=[];
                  for(var k=0;k<data_raw.length;k++)
                  {
                    if(parseInt(data_raw[k].Timestamp.substr(8,2)-6)*24+parseInt(data_raw[k].Timestamp.substr(11,2))==j)
                    datatemp_raw_eachtime.push(parseInt(data_raw[k].Value))
                  }
                  datatemp_raw.push(datatemp_raw_eachtime)
                }
               drawGrid([width/2,height/2],datatemp_num,datatemp_avg,datatemp_std,datatemp_raw)
            })
          })
           })
          })
        }
           

function drawGrid(location,wangone_num,wangone_avg,wangone_std,wangone_raw){
  var outerRadius=(width-margin.left-margin.right)<(height-margin.top-margin.bottom)?(width-margin.left-margin.right)/2:(height-margin.top-margin.bottom)/2;
  var linear_num = d3.scale.linear()
                    .domain([0,2500])
                    .range([outerRadius*0.65,outerRadius*0.53]);
    var colorbar=["#FFFFFF","#F8DC21","#6EC953","#2C6B8C","#41367D","#4A1D70"]
    var linear_color = d3.scale.linear()
    .domain([-1,0,45,60,1000,1500])
    .range(colorbar);
    var huan=[]
    for(var i=0;i<120;i++){
      huan[i]=1;
    }
    var arc=d3.svg.arc()////频次
    .innerRadius(function(d,i){
      return linear_num(parseInt(wangone_num[i]))
    })
    .outerRadius(function(){
      return outerRadius*0.65
    });

    var numOpacityScale=d3.scale.linear()
                    .domain([0,720])
                    .range([0.2,0.7])

    var arc1=d3.svg.arc()////均值
        .innerRadius(function(){
          return outerRadius*0.65
        })
        .outerRadius(function(){
          return outerRadius*0.75//wangone_avg[i]!=-1?outerRadius:innerRadius+2
        });
            var pie=d3.layout.pie()
            .value(function(d){return d;})
            var piedata=pie(huan)

            //pie
            zoomable_layer.append("g")
              .attr("transform","translate("+(location[0])+","+(location[1])+")")
              .selectAll()
              .data(piedata)
              .enter()
              .append("path")
              .attr("d",arc1)
              .style("fill",function(d,i){
                return linear_color(wangone_avg[i])
              })
              .attr("stroke","gray")
              .attr("stroke-width",0.3)
            zoomable_layer.append("g")
              .attr("transform","translate("+(location[0])+","+(location[1])+")")
              .selectAll()
              .data(piedata)
              .enter()
              .append("path")
              .attr("d",arc)
              .style("fill","#131310")
              .style('opacity',function(d,i){return numOpacityScale(wangone_num[i])})


      // var arc_5days=d3.svg.arc()
      //   .innerRadius(outerRadius*0.75)
      //   .outerRadius(function(d,i){
      //     return outerRadius*0.77//wangone_avg[i]!=-1?outerRadius+6:outerRadius
      // });
      // //天颜色
      // var color=d3.scale.category10();
      // zoomable_layer.append("g")
      //       .attr("transform","translate("+(location[0])+","+(location[1])+")")
      //       .selectAll()
      //       .data(piedata)
      //       .enter()
      //       .append("path")
      //       .attr("d",arc_5days)
      //       .style("fill",function(d,i){
      //         return color(parseInt(i/24))
      //       })

      ///最外层的标准差、、
     
      var outerangle = d3.time.scale()
        .domain([0,119])
        .range([0, 2 * Math.PI]);
      var outerradius = d3.scale.linear()
        .domain([0,30])
        .clamp(['true'])
        .range([outerRadius*0.77, outerRadius]);
      var outerarea = d3.svg.area.radial()
        .interpolate("cardinal-closed")
        .angle(function (d,i) {
            return outerangle(i);
        })
        .innerRadius(function () {
            return outerRadius*0.77;
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
                .attr("transform","translate("+(location[0])+","+(location[1])+")")
                .append('path')
                .attr("d",outerarea(wangone_std))
                .style("fill",'url(#gradientRainbow)')
            ///内部分布

      var per=2*Math.PI/120;//每份所占弧度
      var wangone_raw_dealed=[];
      var innerRawScale=d3.scale.linear()
                          .clamp(['true'])
                          .domain([0,2000])
                          //.range([outerRadius*0.7,0])
                          .range([outerRadius*0.18,outerRadius*0.48])

      var innerRawKDE= d3.scale.threshold()
                        .domain([0,45,60,1000,1500])
                        .range([0,1,2,3,4,5]);
      
      var wangone_raw_fenduan=[];
     // var wangone_raw_fenduan_tongji=[];
      wangone_raw.forEach(function(item){
        var temp=[];
        var temptongji=[0,0,0,0,0,0]
        item.forEach(function(d){
          temp.push(parseInt(innerRawKDE(+d)))
          temptongji[parseInt(innerRawKDE(+d))]++;
        })
        var temp2=temp.map(function(d){
          return temptongji[d]
        })
        wangone_raw_fenduan.push(temp2);
      })
    

      
      wangone_raw.forEach(function(item,i){
        var quchongvalue=[];
        item.forEach(function(d,j){
          if(quchongvalue.indexOf(d)==-1){
          quchongvalue.push(d)
          wangone_raw_dealed.push({
            innerRadius:innerRawScale(+d),
            outerRadius:innerRawScale(+d)+2,
            startAngle:per*(i+0.2),
            endAngle:per*(i+0.8),
            value:+d,
            kde:wangone_raw_fenduan[i][j],
          })
          }
        })
      })


      var kdeScale=d3.scale.linear()
                      .domain([0,720])
                      .range([0,1])
      var compute = d3.interpolate('#2C6B8C','red');
        var inner_arc=d3.svg.arc();
      var elemEnter=zoomable_layer.append("g")
      .attr("transform","translate("+(location[0])+","+(location[1])+")")
      elemEnter.append("text")
            .attr("font-size",10)
            .attr("dx",-15)
            .text(function() { //添加文字描述
                  return "grid-"+store.state.selectedID;
            });


        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(0))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr('opacity',0.5)
          .attr("stroke-dasharray",5.5)
       elemEnter.append("text")
          .attr("dy",-innerRawScale(0))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 0;
          });
        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(500))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr("stroke-dasharray",5.5)
          .attr('opacity',0.5)
       elemEnter.append("text")
          .attr("dy",-innerRawScale(500))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 500;
          });
        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(1000))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr("stroke-dasharray",5.5)
          .attr('opacity',0.5)
        elemEnter.append("text")
          .attr("dy",-innerRawScale(1000))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 1000;
          });

        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(1500))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr("stroke-dasharray",5.5)
          .attr('opacity',0.5)
        elemEnter.append("text")
          .attr("dy",-innerRawScale(1500))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 1500;
          });
        elemEnter.selectAll()
                .data(wangone_raw_dealed)
                .enter()
                .append('path')
                .attr("d",function(d){
                    return inner_arc(d);
                })
                //.attr("opacity",0.3)
                .attr("fill",function(d){
                    //return linear_color(d.value);
                    return compute(kdeScale(d.kde))
                })
                .on('click',function(){
                  // console.log(d)
                })
          
  var linePath=d3.svg.line.radial()
                         .radius(outerRadius*0.17)
                         .angle(function(d){
                           return d
                         })
          var per_5=2*Math.PI/5;//每份所占弧度
          var wubianxing=[per_5*0,per_5*1,per_5*2,per_5*3,per_5*4,per_5*5]
          elemEnter.append("path")
                   .attr("d",linePath(wubianxing))
                    .attr("stroke-width","2px")
                    .attr("fill","none")
                    .attr('stroke','gray')
                    .attr("stroke-dasharray",5.5)
                    .attr('opacity',0.5)

          for(var k=0;k<5;k++){
          var temp=[outerRadius*0.17,outerRadius*0.65]
          var linePath_xuxian=d3.svg.line.radial()
                  .radius(function(d){
                    return d
                  })
                  .angle(function(){
                    return per_5*k
                  })
          elemEnter.append("path")
                   .attr("d",linePath_xuxian(temp))
                    .attr("stroke","black")
                    .attr("stroke-width","1px")
                    .attr("fill","none")
                    .attr('stroke','gray')
                    .attr("stroke-dasharray",5.5)
                    .attr('opacity',0.5)
          }

        } 




function drawSensor(location,sensorone_num,sensorone_avg,sensorone_dongtai,sensorone_std,sensorone_raw){
  var outerRadius=(width-margin.left-margin.right)<(height-margin.top-margin.bottom)?(width-margin.left-margin.right)/2:(height-margin.top-margin.bottom)/2;
  var linear_num = d3.scale.linear()
                    .domain([0,720])
                    .range([outerRadius*0.65,outerRadius*0.5]);
    var colorbar=["#FFFFFF","#F8DC21","#6EC953","#2C6B8C","#41367D","#4A1D70"]
    var linear_color = d3.scale.linear()
    .domain([-1,0,45,60,1000,1500])
    .range(colorbar);
    var huan=[]
    for(var i=0;i<120;i++){
      huan[i]=1;
    }
    var arc=d3.svg.arc()////频次
    .innerRadius(function(d,i){
      return linear_num(parseInt(sensorone_num[i]))
    })
    .outerRadius(function(){
      return outerRadius*0.65
    });

    var numOpacityScale=d3.scale.linear()
                    .domain([0,720])
                    .range([0.2,0.7])

    var arc1=d3.svg.arc()////均值
        .innerRadius(function(){
          return outerRadius*0.65
        })
        .outerRadius(function(){
          return outerRadius*0.75//sensorone_avg[i]!=-1?outerRadius:innerRadius+2
        });
            var pie=d3.layout.pie()
            .value(function(d){return d;})
            var piedata=pie(huan)

            //pie
            zoomable_layer.append("g")
              .attr("transform","translate("+(location[0])+","+(location[1])+")")
              .selectAll()
              .data(piedata)
              .enter()
              .append("path")
              .attr("d",arc1)
              .style("fill",function(d,i){
                return linear_color(sensorone_avg[i])
              })
              .attr("stroke",function(d,i){
                return sensorone_dongtai[i]>0?"#7E7EFF":"gray"//sensorone_dongtai[i]>0?"#7E7EFF":"none"
              })
              .attr("stroke-width",function(d,i){
                return sensorone_dongtai[i]>0?2:0.3//sensorone_avg[i]!=-1?2:0
              })
            zoomable_layer.append("g")
              .attr("transform","translate("+(location[0])+","+(location[1])+")")
              .selectAll()
              .data(piedata)
              .enter()
              .append("path")
              .attr("d",arc)
              .style("fill","#131310")
              .style('opacity',function(d,i){return numOpacityScale(sensorone_num[i])})


      // var arc_5days=d3.svg.arc()
      //   .innerRadius(function(d,i){
      //     return outerRadius*0.75
      // })
      //   .outerRadius(function(d,i){
      //     return outerRadius*0.77//sensorone_avg[i]!=-1?outerRadius+6:outerRadius
      // });
      // //天颜色
      // var color=d3.scale.category10();
      // zoomable_layer.append("g")
      //       .attr("transform","translate("+(location[0])+","+(location[1])+")")
      //       .selectAll()
      //       .data(piedata)
      //       .enter()
      //       .append("path")
      //       .attr("d",arc_5days)
      //       .style("fill",function(d,i){
      //         return color(parseInt(i/24))
      //       })

  ///最外层的标准差
     
      var outerangle = d3.time.scale()
        .domain([0,119])
        .range([0, 2 * Math.PI]);
      var outerradius = d3.scale.linear()
        .domain([0,30])
        .clamp(['true'])
        .range([outerRadius*0.77, outerRadius]);
      var outerarea = d3.svg.area.radial()
        .interpolate("cardinal-closed")
        .angle(function (d,i) {
            return outerangle(i);
        })
        .innerRadius(function () {
            return outerRadius*0.77;
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
                .attr("transform","translate("+(location[0])+","+(location[1])+")")
                .append('path')
                .attr("d",outerarea(sensorone_std))
                .style("fill",'url(#gradientRainbow)')
          
                
      ///内部分布

      var per=2*Math.PI/120;//每份所占弧度
      var sensorone_raw_dealed=[];
      var innerRawScale=d3.scale.linear()
                          .clamp(['true'])
                          .domain([0,2000])
                          //.range([outerRadius*0.7,0])
                          .range([outerRadius*0.18,outerRadius*0.48])
      var innerRawKDE= d3.scale.threshold()
                        .domain([0,45,60,1000,1500])
                        .range([0,1,2,3,4,5]);
      
      var sensorone_raw_fenduan=[];
     // var sensorone_raw_fenduan_tongji=[];
      sensorone_raw.forEach(function(item){
        var temp=[];
        var temptongji=[0,0,0,0,0,0]
        item.forEach(function(d){
          temp.push(parseInt(innerRawKDE(+d)))
          temptongji[parseInt(innerRawKDE(+d))]++;
        })
        var temp2=temp.map(function(d){
          return temptongji[d]
        })
        sensorone_raw_fenduan.push(temp2);
      })
    

      
      sensorone_raw.forEach(function(item,i){
        var quchongvalue=[];
        item.forEach(function(d,j){
          if(quchongvalue.indexOf(d)==-1){
          quchongvalue.push(d)
          sensorone_raw_dealed.push({
            innerRadius:innerRawScale(+d),
            outerRadius:innerRawScale(+d)+2,
            startAngle:per*(i+0.2),
            endAngle:per*(i+0.8),
            value:+d,
            kde:sensorone_raw_fenduan[i][j],
          })
          }
        })
      })


      var kdeScale=d3.scale.linear()
                      .domain([0,720])
                      .range([0,1])
      var compute = d3.interpolate('#2C6B8C','red');
        var inner_arc=d3.svg.arc();
      var elemEnter=zoomable_layer.append("g")
      .attr("transform","translate("+(location[0])+","+(location[1])+")")
      elemEnter.append("text")
            .attr("font-size",10)
            .attr("dx",-12)
            .text(function() { //添加文字描述
                var temp=store.state.selectedID.split("c")
                  if(temp.length==1){
                    return "ms-"+temp[0]
                  }else{
                    return "ss-"+temp[1]
                  }
            });


        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(0))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr('opacity',0.5)
       elemEnter.append("text")
          .attr("dy",-innerRawScale(0))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 0;
          });
        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(500))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr('opacity',0.5)
       elemEnter.append("text")
          .attr("dy",-innerRawScale(500))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 500;
          });
        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(1000))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr('opacity',0.5)
        elemEnter.append("text")
          .attr("dy",-innerRawScale(1000))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 1000;
          });

        elemEnter.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',innerRawScale(1500))
          .attr('fill','none')
          .attr('stroke','gray')
          .attr('opacity',0.5)
        elemEnter.append("text")
          .attr("dy",-innerRawScale(1500))
          .attr("font-size",6)
          .text(function() { //添加文字描述
                return 1500;
          });
        elemEnter.selectAll()
                .data(sensorone_raw_dealed)
                .enter()
                .append('path')
                .attr("d",function(d){
                    return inner_arc(d);
                })
                //.attr("opacity",0.3)
                .attr("fill",function(d){
                    //return linear_color(d.value);
                    return compute(kdeScale(d.kde))
                })
                .on('click',function(){
                  // console.log(d)
                })


          var linePath=d3.svg.line.radial()
                         .radius(outerRadius*0.17)
                         .angle(function(d){
                           return d
                         })
          var per_5=2*Math.PI/5;//每份所占弧度
          var wubianxing=[per_5*0,per_5*1,per_5*2,per_5*3,per_5*4,per_5*5]
          elemEnter.append("path")
                   .attr("d",linePath(wubianxing))
                    .attr("stroke-width","2px")
                    .attr("fill","none")
                    .attr('stroke','gray')
                    .attr("stroke-dasharray",5.5)
                    .attr('opacity',0.5)

          for(var k=0;k<5;k++){
          var temp=[outerRadius*0.17,outerRadius*0.65]
          var linePath_xuxian=d3.svg.line.radial()
                  .radius(function(d){
                    return d
                  })
                  .angle(function(){
                    return per_5*k
                  })
          elemEnter.append("path")
                   .attr("d",linePath_xuxian(temp))
                    .attr("stroke","black")
                    .attr("stroke-width","1px")
                    .attr("fill","none")
                    .attr('stroke','gray')
                    .attr("stroke-dasharray",5.5)
                    .attr('opacity',0.5)
          }

        }

//颜色比例尺
  //颜色比例尺
 var colorbarData=[["#FFFFFF",-1],["#F8DC21",0],["#6EC953",45],["#2C6B8C",60],["#41367D",1000],["#4A1D70",1500]]
            svg.selectAll()
                .data(colorbarData)
                .enter()
                .append("rect")
                .attr("x",function(d, i){
                    return i*25+30
                })
                .attr("y",function(){
                    return height-30
                })
                .attr("width",20)
                .attr("height",20)
                .style("stroke","#D4D5D3")
                .style("stroke-width",0.5)
                .style("fill",function(d){
                    return d[0]
            });

        svg.selectAll()
            .data(colorbarData)
            .enter()
            .append("text")
            .attr("x",function(d, i){
                    return i*25+30
            })
            .attr("y",function(){
                return height-10
            })
            .attr("dy","0.8em")
            .style("font-size", "10px")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d) {   
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
            .text(function() {   
                return  "AVG"
            });



    }
  }} 
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
#sensorAndGrid_detial_div{
    width:99%;
    height:99%;
    margin:0.5% 0.5%;
}

#sensorAndGrid_detial_div_top{
    width:100%;
    height:8%;
    background: linear-gradient(-45deg,#333333 25%,#3B3B3B 0,
                            #3B3B3B 50%,#333333 0,
                            #333333 75%,#3B3B3B 0);
    background-size: 30px 30px;
    text-align:left;
    border-radius:5px;
}
#sensorAndGrid_detial_div_main{
    width:100%;
    height:92%;
    background-color: #F5F5F5;
    border-width:1px; border-style: solid; border-color:#C7C7C7;
    border-radius:5px;
}
</style>
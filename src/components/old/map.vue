<template>
    <div id="map_div"></div>
</template>

<script>
import store from '../vuex/store.js'

import leaflet from 'leaflet'
// import HeatmapOverlay from 'leaflet-heatmap'

// import { AdvancedHeatmapLayer } from 'leaflet-advanced-heatmap'
import diqu from '../../public/data/sample-geojson.js'
import 'leaflet/dist/leaflet.css'
Date.prototype.format = function(fmt) { 
  var o = { 
      "M+" : this.getMonth()+1,                 //月份 
      "d+" : this.getDate(),                    //日 
      "h+" : this.getHours(),                   //小时 
      "m+" : this.getMinutes(),                 //分 
      "s+" : this.getSeconds(),                 //秒 
      "q+" : Math.floor((this.getMonth()+3)/3), //季度 
      "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
  return fmt; 
}
var color=d3.scale.category10();

var map;
var svg 
var myGroup;
var pathGroup;
var layers_points=[];
var layers_paths=[];

var colorbar=["#F8DC21","#6EC953","#2C6B8C","#41367D","#4A1D70"]
var linear = d3.scale.linear()
            .domain([0,45,60,1000,1500])
            .range(colorbar);

var linear_r = d3.scale.linear()
            .domain([0,45,60,1000,1500])
            .range([3,5,15,20]);

function map_background(){
map = L.map('map_div').setView([ 0.1192925,-119.855876], 11.2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  zoomControl:false,
  attributionControl:false,
  id: 'mapbox.light'
  }).addTo(map);
  
L.geoJSON(diqu, {
      style: function (feature) {
          feature.properties.fillColor="#F2EFE9";
          feature.properties.fillOpacity=1;
          feature.properties.color='grey';
          feature.properties.weight=3;
          return feature.properties;
      }
  }).addTo(map);
  // drawHeatMap()
  var unclear = L.icon({
    iconUrl: 'icon/Nuclearplant.png',
    iconSize:[30,30], // size of the icon
    });
L.marker([0.162679,-119.784825], {icon: unclear}).addTo(map).bindTooltip("I am Always Safe Nuclear plant.");
  var wangge_index=[5,6,7,14,15,16,17,18,19,24,25,26,27,28,29,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,81,82,83,84,85,86,87,93,94,95,96];
	var zuoxia=[0, -120];
	var youshang=[0.238585,-119.711751];
	var xjiange=(youshang[0]-zuoxia[0])/10;
	var yjiange=(youshang[1]-zuoxia[1])/10;
  var outtt=[]
  var wangge_id_dangji=0;
  // wangges_layer=[]
	for(let i=0;i<10;i++){   //x
		for(let j=0;j<10;j++){  //y
			if(wangge_index.indexOf(i*10+j)!=-1){
				outtt.push([zuoxia[0]+i*xjiange,zuoxia[1]+j*yjiange,zuoxia[0]+(i+1)*xjiange,zuoxia[1]+(j+1)*yjiange])
				var bounds = [[zuoxia[0]+i*xjiange, zuoxia[1]+j*yjiange], [zuoxia[0]+(i+1)*xjiange, zuoxia[1]+(j+1)*yjiange]];
				var wanggeone=L.rectangle(bounds, {color: "grey", weight: 1,id:wangge_id_dangji,fillOpacity:0}).addTo(map)
				.on('click', function(e) { 
            store.commit('wangge_id_update',e.target.options.id)
            store.commit('selectedSort_update',1)
            store.commit('selectedID_update',e.target.options.id)
            store.commit('mobilesensor_set_update',["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"])

        });
        wangge_id_dangji++
			}
		}
  }


  var width=document.getElementById("map_div").scrollWidth;
  var height=document.getElementById("map_div").scrollHeight;
  svg = d3.select(map.getPanes().overlayPane).append('svg')
      .attr("transform","translate(" +0+ ","+(0.6*height)+ ")")
      .attr('class', 'svgTransform')
      .attr("id", "d3_svg")
      .attr("width", 200)
      .attr("height",height*0.2); 
var weizhi=30
 var rbarData=[[3,0,"#F8DC21"],[5,45,"#6EC953"],[15,60,"#2C6B8C"],[20,1000,"#41367D"],[25,1500,"#4A1D70"]]
                 svg.selectAll()
                    .data(rbarData)
                    .enter()
                    .append("circle")
                    .attr("r", function(d){
                        return d[0];
                    })
                    .attr("cx", function(d,i){
                      weizhi+=d[0]*2
                      return weizhi;
                    })
                    .attr("cy", function(d){
                        return 40;
                    })
                    .attr("fill",function(d,i){                       
                           return d[2];
                    })

        weizhi=30
          svg.selectAll()
            .data(rbarData)
            .enter()
            .append("text")
            .attr("x",function(d, i){
                weizhi+=d[0]*2
                  return weizhi;
            })
            .attr("y",function(d, i){
                return  63
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
            .attr("y",35)
            .attr("dy","0.8em")
            .style("font-size", "15px")
            .style("font-weight","bold")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  "CPM"
            });

}
function drawPath(paths){
  if(typeof pathGroup!="undefined"){
      map.removeLayer(pathGroup);
  }
  layers_paths=[];
  var sensorAll=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"];
  store.state.mobilesensor_set.forEach(ele=>{
    if(sensorAll.indexOf(ele)!=-1){
      layers_paths.push(L.polyline(paths[sensorAll.indexOf(ele)], {color: "#FA927F",opacity:1,smoothFactor:0,weight:1}));
    }
  })
  pathGroup=L.layerGroup(layers_paths)
  map.addLayer(pathGroup);
  
}

// function drawHeatMap(data){
// //   var heat = L.heatLayer([
// //     [0.13891, -119.842, 125]// lat, lng, intensity
// // ], {radius:125}).addTo(map);
// var heatdata=[];
// data.forEach(ele=>{
//   heatdata.push({lat:+ele.lat,lng:+ele.lng,count: 3})
// })
// var testData = {
//   max: 1,
//   data:heatdata
// };
// var cfg = {
//   // radius should be small ONLY if scaleRadius is true (or small radius is intended)
//   // if scaleRadius is false it will be the constant radius used in pixels
//   "radius": 20,
//   "maxOpacity": .8, 
//   // scales the radius based on map zoom
//   "scaleRadius": false, 
//   // if set to false the heatmap uses the global maximum for colorization
//   // if activated: uses the data maximum within the current map boundaries 
//   //   (there will always be a red spot with useLocalExtremas true)
//   "useLocalExtrema": true,
//   // which field name in your data represents the latitude - default "lat"
//   latField: 'lat',
//   // which field name in your data represents the longitude - default "lng"
//   lngField: 'lng',
//   // which field name in your data represents the data value - default "value"
//   valueField: 'count'
// };
// console.log(testData)
// var heatmapLayer = new HeatmapOverlay(cfg);
// heatmapLayer.setData(testData);
// map.addLayer(heatmapLayer);


// }
function drawPoint(data_circle){
  var start=store.state.starttime;
  layers_points=[];
  if(typeof myGroup!="undefined"){
    map.removeLayer(myGroup);  
  }
    store.state.mobilesensor_set.forEach(function(key){
        if(typeof data_circle[key][start]!="undefined"){
          if(isNaN(key)){
            var layer = L.circleMarker(data_circle[key][start], {id:key,weight:3,color:"#6B006C",radius:linear_r(data_circle[key][start][2]),fillColor:linear(data_circle[key][start][2]),opacity:1,fillOpacity:1})
            .on('click', function(e) { 
              console.log(e.target.options.id)
              store.commit('wangge_id_update',"all")
              store.commit('selectedSort_update',0)
              store.commit('selectedID_update',e.target.options.id)
              store.commit('mobilesensor_set_update',[e.target.options.id])
             })
             .bindTooltip("sensor:"+key+"  "+"value:"+data_circle[key][start][2])
            layers_points.push(layer); 
          }else{
            var layer = L.circleMarker(data_circle[key][start], {id:key,weight:1.5,color:"black",radius:linear_r(data_circle[key][start][2]),fillColor:linear(data_circle[key][start][2]),opacity:1,fillOpacity:1})
            .on('click', function(e) {
              console.log(e.target.options.id)
              store.commit('wangge_id_update',"all")
              store.commit('selectedSort_update',0)
              store.commit('selectedID_update',e.target.options.id)
              store.commit('mobilesensor_set_update',[e.target.options.id])
             }).bindTooltip("sensor:"+key+"  "+"value:"+data_circle[key][start][2])
            layers_points.push(layer); 
          }
        }else{
          if(isNaN(key)){
           var layer = L.circleMarker([0,0], {id:key,weight:4,color:"#6B006C",opacity:0,fillOpacity:0}).on('click', function(e) { 
              console.log(e.target.options.id)
              store.commit('wangge_id_update',"all")
              store.commit('selectedSort_update',0)
              store.commit('selectedID_update',e.target.options.id)
              store.commit('mobilesensor_set_update',[e.target.options.id])
             })
             layers_points.push(layer); 
            }else{
              var layer = L.circleMarker([0,0], {id:key,weight:1.5,color:"black",opacity:0,fillOpacity:0}).on('click', function(e) { 
              console.log(e.target.options.id)
              store.commit('wangge_id_update',"all")
              store.commit('selectedSort_update',0)
              store.commit('selectedID_update',e.target.options.id)
              store.commit('mobilesensor_set_update',[e.target.options.id])
             })
             layers_points.push(layer); 
            }
        }
    })

    myGroup=L.layerGroup(layers_points); 
    map.addLayer(myGroup);
}

function  dongtai(data_circle){
  var start=store.state.starttime;
  var start_chuo=new Date(start).getTime();
  var end=store.state.endtime;
  var end_chuo=new Date(end).getTime();
  var sudu=60000;
  var nums=(end_chuo-start_chuo)/sudu;
  var  speeddata={"x1":200,"x2":100,"x3":50,"x4":10,"x5":5}
    let index=0;
    store.state.timer=setInterval(function(){
        let temp_chuo=start_chuo+sudu*index;//一个小时的毫秒数
        index++;
        let temp=new Date(temp_chuo).format("yyyy-MM-dd hh:mm:ss");
        store.commit('starttime_update',temp)
        var  i=0;
        // var staticsensorid=["static1","static4","static6","static9","static11","static12","static13","static14","static15"]
        store.state.mobilesensor_set.forEach(function(key){
            if(typeof data_circle[key][temp]!="undefined"){
              layers_points[i].bindTooltip("sensor:"+key+"  "+"value:"+data_circle[key][temp][2])
              layers_points[i].setLatLng(data_circle[key][temp]);
              layers_points[i].setStyle({fillColor:linear(data_circle[key][temp][2]),radius:linear_r(data_circle[key][temp][2]),opacity:1,fillOpacity:1})
            }else{
              layers_points[i].setLatLng([0,0]);
              layers_points[i].setStyle({opacity:0,fillOpacity:0})
            }
            i++
            })
          if(index>nums){
            clearInterval(store.state.timer)
          }
          },speeddata[store.state.speed])
}
function startHua(data_circle){   //滑动更新
        let temp=store.state.starttime;//一个小时的毫秒数
        var  i=0;
        store.state.mobilesensor_set.forEach(function(key){
            if(typeof data_circle[key][temp]!="undefined"){
              layers_points[i].setLatLng(data_circle[key][temp]);
              layers_points[i].setStyle({fillColor:linear(data_circle[key][temp][2]),radius:linear_r(data_circle[key][temp][2]),opacity:1,fillOpacity:1})
            }
            else{
              layers_points[i].setLatLng([0,0]);
               layers_points[i].setStyle({opacity:0,fillOpacity:0})
            }
            i++
            })
}
export default {
  data: function(){
    return {
      sharedState: store.state
    }
  },
  mounted(){
    store.dispatch('map_path') 
    store.dispatch('map_sensor')
    map_background();
  },
  watch: {
    'sharedState.map_path_data':function(newdata){
       drawPath(store.state.map_path_data)
    },
    'sharedState.timequjian':function(newdata){
      store.dispatch('map_path') 
    },
    'sharedState.map_path_data':function(newdata){
       drawPath(store.state.map_path_data)
       if(store.state.map_sensor_data.length!=0){
          drawPoint(store.state.map_sensor_data)
       }
    },
    'sharedState.map_sensor_data':function(newdata){
       drawPoint(store.state.map_sensor_data)
    },
    'sharedState.drawCircle_biaoji':function(newdata){
       dongtai(store.state.map_sensor_data)
    },
    'sharedState.startHua_biaoji':function(newdata){
      drawPoint(store.state.map_sensor_data)
    },
    'sharedState.mobilesensor_set':function(newdata){
      drawPath(store.state.map_path_data)
      drawPoint(store.state.map_sensor_data)
      if(store.state.mobilesensor_set.length==1){
        store.commit('wangge_id_update',"all")
        store.commit('selectedSort_update',0)
        store.commit('selectedID_update',store.state.mobilesensor_set[0])
      }
    },

 }
} 
</script>
<style scoped>
#map_div{
    width:99%;
    height:84%;
    border-width:1px; border-style: solid; border-color:#C7C7C7;
    margin:0 0.5%;
}

</style>


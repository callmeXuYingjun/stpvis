<template>
    <div id="matrix_div">
        <div id="matrix_div_top">
            <font>Sensor Matrix View</font>
        </div>
        <div id="matrix_div_main"></div>
    </div>
</template>

<script>
import store from '../vuex/store.js'
import d3 from 'd3'
import leaflet from 'leaflet'
import { constants } from 'crypto';
var myChart ;
export default {
  data: function(){
    return {
      sharedState: store.state
    }
  },
  mounted(){
    store.dispatch('matrix_csvdata_AVG_action')
  },
  watch: {
    'sharedState.mobilesensor_set':function(newdata){
        this.jzuhen();
    },
    'sharedState.matrix_csvdata_AVG':function(newdata){
        this.jzuhen();
    },
    'sharedState.timequjian':function(newdata){
        this.jzuhen();
    },
  },
  methods: {
    jzuhen(){
        // d3.csv("data/sensor/Dongtai_allsensor_hour.csv", function(error, data_dongtai) {
        //     console.log(data_dongtai)
        var start_initial_chuo=new Date("2020-04-06 00:00:00").getTime();
        var starttime_chuo=new Date(store.state.starttime).getTime();
        var endtime_chuo=new Date(store.state.endtime).getTime();
        var time_min_max_index=[(starttime_chuo-start_initial_chuo)/3600000,(endtime_chuo-start_initial_chuo)/3600000-1];
        var sensorset_paixu=["48","6","49","34","static15","14","9","5","29","22","45","24","21","27","25","28","8","10","30","7","12","36","11","2","46","20","23","32","42","43","44","17","38","33","35","39","47","26","41","40","1","19","3","13","31","15","4","static9","static12","static13","static11","static14","static6","static1","static4","16","37","18","50"]
        var sensorset_index=[48,6,49,34,59,14,9,5,29,22,45,24,21,27,25,28,8,10,30,7,12,36,11,2,46,20,23,32,42,43,44,17,38,33,35,39,47,26,41,40,1,19,3,13,31,15,4,54,56,57,55,58,53,51,52,16,37,18,50]
        document.getElementById("matrix_div_main").innerHTML = "";
        var width=document.getElementById("matrix_div_main").scrollWidth;
        var height=document.getElementById("matrix_div_main").scrollHeight;
        var width_text=55;
        var height_text=0;
        var width_right=50;
        var height_top=50
        var margin = {top: 10, right:10, bottom: 10, left:0},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;
        var data=[];
        for(var i=0;i<sensorset_paixu.length;i++){
            data[i]=[];
            for(var j=0;j<120;j++){
                data[i][j]=parseFloat(store.state.matrix_csvdata_AVG[sensorset_index[i]-1]["time"+j])
            }
        }
        var sensors_avg=[];
        for(var i=0;i<data.length;i++){
            var sum=0;
            var index=0;
            for(var j=0;j<data[0].length;j++){
               if(data[i][j]!=-1){
                   index++;
                   sum+=data[i][j]
               }
            }
            sensors_avg[i]=sum/index;
        }
        var hours_avg=[];
        for(var i=0;i<data[0].length;i++){
            var sum=0;
            var index=0;
            for(var j=0;j<data.length;j++){
               if(data[j][i]!=-1){
                   index++;
                   sum+=data[j][i]
               }
            }
            if(index!=0){
                hours_avg[i]=sum/index;
            }else{
                hours_avg[i]=-1;
            }
        }

        var linear_sensor_avg =d3.scale.log()
                                .domain([Math.min.apply(null,sensors_avg),Math.max.apply(null,sensors_avg)])
                                .range([0,width_text]);
        var linear_hours_avg=d3.scale.log()
                                .domain([Math.min.apply(null,hours_avg),Math.max.apply(null,hours_avg)])
                                .range([0,height_top]);
        var svg = d3.select("#matrix_div_main")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform","translate(" +0+ "," + (margin.top) + ")");
        var colorbar=["#FFFFFF","#F8DC21","#6EC953","#2C6B8C","#41367D","#4A1D70"]
        var linear = d3.scale.linear()
        //  .domain([-1,0,10,20,30,40])
        .domain([-1,0,45,60,1000,1500])
        .range(colorbar);
        var barHeight=(height-height_text-height_top)/data.length;
        var kuan=(width-width_text-width_right)/data[0].length;
        var rect_all=[];
     
        for(let k=0;k<data.length;k++){
            console.log(k)
            if(store.state.mobilesensor_set.indexOf(sensorset_paixu[k])!=-1){
                var dy=barHeight*(k);
                var rect_hang=svg.selectAll()
                    .data(data[k])
                    .enter()
                    .append("rect")
                    .attr("x",function(d, i){
                        return i * (kuan)+width_text
                    })
                    .attr("y",function(d, i){
                        return dy+height_text+height_top
                    })
                    .attr("id",function(d,i){
                        return sensorset_paixu[k]+"_"+i;
                    })
                    .attr("width",kuan)
                    .attr("height", barHeight)
                    .style("stroke",function(d,i){
                        // if(data_dongtai[sensorset_index[k]-1]["time"+i]>0){
                        //     return "#7E7EFF"
                        // }else{
                            return "#D4D5D3"
                        // }
                    })
                    .style("stroke-width",0.5)
                    .style("fill",function(d){
                            return linear(d)
                    })
                    .style("fill-opacity",function(d,i){
                        if(i>=time_min_max_index[0]&&i<=time_min_max_index[1]){
                            return 1
                        }else{
                            return 0.3
                        }
                            
                    });
                    rect_all=rect_all.concat(rect_hang[0])
            }else{
                var dy=barHeight*(k);
                var rect_hang=svg.selectAll()
                    .data(data[k])
                    .enter()
                    .append("rect")
                    .attr("x",function(d, i){
                        return i * (kuan)+width_text
                    })
                    .attr("y",function(d, i){
                        return dy+height_text+height_top
                    })
                    .attr("id",function(d,i){
                        return sensorset_paixu[k]+"_"+i;
                    })
                    .attr("width",kuan)
                    .attr("height", barHeight)
                    .style("stroke",function(d,i){
                        // if(data_dongtai[sensorset_index[k]-1]["time"+i]>0){
                        //     return "#7E7EFF"
                        // }else{
                            return "#D4D5D3"
                        // }
                    })
                    .style("stroke-width",0.5)
                    .style("fill",function(d,i){
                            return linear(d)
                    })
                    .style("fill-opacity",0.3);
                    rect_all=rect_all.concat(rect_hang[0])
            }
        }
            
            svg.selectAll()
            .data(data)
            .enter()
            .append("text")
            .attr("transform", function(d, i) { return "translate("+(5)+"," + (i * (barHeight) +height_text+height_top)+ ")"; })
            .attr("x",0)
            .attr("y",0)
            .attr("dy","0.8em")
            .style("font-size", "10px")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  sensorset_paixu[i]
            });
            
            svg.selectAll()
                .data(sensors_avg)
                .enter()
                .append("rect")
                .attr("transform", function(d, i) {return "translate("+(width-width_text+2)+"," + (i * (barHeight) +height_text+height_top)+ ")";})
                .attr("width",function(d,i){
                    return linear_sensor_avg(d)
                })
                .attr("height", barHeight)
                .style("stroke","#D4D5D3")
                .style("stroke-width",0.5)
                .style("fill",function(d,i){
                    return "#ADC8E6"
            });
            svg.selectAll()
                .data(hours_avg)
                .enter()
                .append("rect")
                .attr("transform", function(d, i) {return "translate("+(i * (kuan)+width_text)+"," + (height_text)+")";})
                .attr("width",kuan)
                .attr("y",function(d,i){
                    return height_top-linear_hours_avg(d)-2
                })
                .attr("height",function(d,i){
                    return linear_hours_avg(d)
                })
                .style("stroke","#D4D5D3")
                .style("stroke-width",0.5)
                .style("fill",function(d,i){
                    return "#ADC8E6"
                 });
            svg.append("text")
                    .attr("x",0)
                    .attr("y",30)
                    .attr("dy","0.8em")
                    .style("font-size", "15px")
                    .style("font-family", "monospace")
                    // .style("fill","#8C8C8C")
                    .text(function(d,i) {   
                        return  "sensor"
                    });
                    svg.append("text")
                    .attr("x",width-50)
                    .attr("y",height-15)
                    .attr("dy","0.8em")
                    .style("font-size", "15px")
                    .style("font-family", "monospace")
                    // .style("fill","#8C8C8C")
                    .text(function(d,i) {   
                        return  "hour"
                    });
            var xScale = d3.scale.linear()
                        .domain([0,width])
                        .range([0,width]);
            var yScale = d3.scale.linear()
                        .domain([0,height])
                        .range([0,height]);


            var brush=d3.svg.brush()
                    .x(xScale)
                    .y(yScale)
                    .extent([[0,0],[0,0]])
                    // .on("brushstart",brushstart)
                    .on("brushend",brushed)
                    
            function brushstart() {
                
                rect_all.forEach(function(ele,i){
                    d3.select(ele).style("fill",function(d){
                        var hang=parseInt(i/120)
                        var lie=i%120
                        return linear(data[hang][lie])
                    })
                })
            }

            function brushed() {
                var extent = brush.extent();
                var sensorselected=[];
                var timeselected=[];
                rect_all.forEach(function(ele){
                    var x_1=d3.select(ele).attr("x")
                    var y_1=d3.select(ele).attr("y")
                    var x_2=parseFloat(x_1)+kuan;
                    var y_2=parseFloat(y_1)+barHeight;
                    var v1=false;
                    var v2=false;
                    var v3=false;
                    var v4=false;
                    if(x_1>=extent[0][0]&&x_1<=extent[1][0]&&y_1>=extent[0][1]&&y_1<=extent[1][1]){v1=true}
                    if(x_2>=extent[0][0]&&x_2<=extent[1][0]&&y_1>=extent[0][1]&&y_1<=extent[1][1]){v2=true}
                    if(x_1>=extent[0][0]&&x_1<=extent[1][0]&&y_2>=extent[0][1]&&y_2<=extent[1][1]){v3=true}
                    if(x_2>=extent[0][0]&&x_2<=extent[1][0]&&y_2>=extent[0][1]&&y_2<=extent[1][1]){v4=true}
                    if(v1||v2||v3||v4){
                        var arr=d3.select(ele).attr("id").split("_");
                        if(sensorselected.indexOf(arr[0])==-1){
                            sensorselected.push(arr[0])
                        }
                        if(timeselected.indexOf(parseInt(arr[1]))==-1){
                            timeselected.push(parseInt(arr[1]))
                        }
                    }                    
                })
                // console.log(sensorselected)
                
                var starttime_index=Math.min.apply(null,timeselected)
                var endtime_index=Math.max.apply(null,timeselected)
                var start_initial_chuo=new Date("2020-04-06 00:00:00").getTime();
                var starttime=new Date(start_initial_chuo+3600000*starttime_index).format("yyyy-MM-dd hh:mm:ss");
                var endtime=new Date(start_initial_chuo+3600000*(endtime_index+1)).format("yyyy-MM-dd hh:mm:ss");
                clearInterval(store.state.timer)
                 store.commit('wangge_id_update',"all")
                 store.commit('starttime_update',starttime)
                 store.commit('endtime_update',endtime)
                 store.commit('mobilesensor_set_update',sensorselected)
                 store.commit('timequjian_update', [starttime,endtime])

                // console.log(starttime,endtime)
            }
            
            svg.append("g")
                .call(brush)
                .selectAll("rect")
                .style("fill-opacity",0.3)
    // }


        
        var colorbarData=[["#FFFFFF",-1],["#F8DC21",0],["#6EC953",45],["#2C6B8C",60],["#41367D",1000],["#4A1D70",1500]]
            svg.selectAll()
                .data(colorbarData)
                .enter()
                .append("rect")
                .attr("x",function(d, i){
                    return i*25+50
                })
                .attr("y",function(d, i){
                    return 0
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
                    return i*25+50
            })
            .attr("y",function(d, i){
                return  20
            })
            .attr("dy","0.8em")
            .style("font-size", "10px")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  d[1]
            });
        
        svg.append("text")
            .attr("x",20)
            .attr("y",5)
            .attr("dy","0.8em")
            .style("font-size", "15px")
            .style("font-weight","bold")
            .style("font-family", "monospace")
            // .style("fill","#8C8C8C")
            .text(function(d,i) {   
                return  "AVG"
            });
        // });
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
#matrix_div{
    width:99%;
    height:99%;
    margin:0.5% 0.5%;
}
#matrix_div_top{
    width:100%;
    height:6%;
    /* background-color: #333333; */
    background: linear-gradient(-45deg,#333333 25%,#3B3B3B 0,
                                    #3B3B3B 50%,#333333 0,
                                    #333333 75%,#3B3B3B 0);
    background-size: 30px 30px;
    text-align:left;
    border-radius:5px;
}
#matrix_div_main{
    width:100%;
    height:94%;
    background-color: #F5F5F5;
    border-width:1px; border-style: solid; border-color:#C7C7C7;
    border-radius:5px;
}

</style>
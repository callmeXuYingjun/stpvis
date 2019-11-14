<template>
    <div id="line_div">
        <div id="line_div_top">
            <font>Temporal Variation View</font>
        </div>
        <div id="line_div_main"></div>
    </div>
</template>

<script>
import store from '../vuex/store.js'
import d3 from 'd3'
import echarts from 'echarts'
import { constants } from 'crypto';
import { type } from 'os';
var myChart ;
export default {
  data: function(){
    return {
      sharedState: store.state
    }
  },
  mounted(){
    this.drawlines(store.state.wangge_id);
  },
  watch: {
   'sharedState.wangge_id':function(newdata){
        this.drawlines(newdata)
   },
    'sharedState.mobilesensor_set':function(newdata){
        this.drawlines(store.state.wangge_id)
   },
   'sharedState.timequjian':function(newdata){
        this.drawlines(store.state.wangge_id)
   }
  },
  methods: {
    drawlines(id){
        d3.csv("data/lines/sensor_time_wangge/sensor_time_avg_wangge_"+id+".csv", function(sensordata) {
        var xdata=[]
        var start_chuo=new Date(store.state.timequjian[0]).getTime()
        var end_chuo=new Date(store.state.timequjian[1]).getTime();
        var chushi_chuo=new Date("2020-04-06 00:00:00").getTime()
        var startstep=parseInt((start_chuo-chushi_chuo)/(60*5*1000))
        var endstep=Math.ceil((end_chuo-chushi_chuo)/(60*5*1000))

        var start5minu=new Date(chushi_chuo+60*5*1000*startstep).format("yyyy-MM-dd hh:mm:ss")
        var end5minu=new Date(chushi_chuo+60*5*1000*endstep).format("yyyy-MM-dd hh:mm:ss")
        for(var i=startstep;i<=endstep;i++){
            let temp_chuo=chushi_chuo+60*5*1000*i;//一个小时的毫秒数
            let temp=new Date(temp_chuo).format("yyyy-MM-dd hh:mm:ss");
            xdata.push(temp);
        }
        var data=[]
        var sensorset=store.state.mobilesensor_set;
        var sen_ids=[];
        for(var i=0;i<sensordata.length;i++){
            if(sensorset.indexOf(sensordata[i].id)!=-1){ 
                var biaozhi=false;
                for(var j=startstep;j<=endstep;j++){
                    var temp=sensordata[i]["time"+j];
                    if(temp!=-1){
                        biaozhi=true
                    }
                }
                if(biaozhi){
                    var temp1=[]
                    sen_ids.push(sensordata[i].id)
                    for(var j=startstep;j<=endstep;j++){
                        var temp=parseFloat(sensordata[i]["time"+j]);
                        if(temp!=-1){
                            temp1.push(temp);
                        }else{
                            temp1.push(null);
                        }
                    }
                    data.push(temp1)
                }
                
            }
        }
        if(typeof myChart!="undefined"){
            myChart.dispose();
        }
        myChart = echarts.init(document.getElementById('line_div_main'));
        // 指定图表的配置项和数据
        var option = {
            backgroundColor:'#F5F5F5',
            grid: {
                left:"5%",
                right:"2%",
                // containLabel: true
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                        precision:2
                    }
                },
                // confine:true,
                formatter: function (params) {
                      var string=""
                      params=params.filter(ele=>{
                        //   console.log(ele)
                          return ele.value!=null
                      })
                    //   params.forEach(element => {
                    //       string=string+"sensor:"+element.seriesName+"   value:"+Math.floor(element.data*100)/100+"<br />"
                    //   });
                     if(params.length<10){
                         for(var i=0;i<params.length;i++){
                             string=string+"sensor:"+params[i].seriesName+"   value:"+Math.floor(params[i].data*100)/100+"<br />"
                         }
                     }else{
                         for(var i=0;i<10;i++){
                             string=string+"sensor:"+params[i].seriesName+"   value:"+Math.floor(params[i].data*100)/100+"<br />"
                         }
                     }

                      
                      return string
                }

            },
            xAxis: {
                type: 'category',
                data: xdata,
                axisLabel:{
                    rotate:45,
                    formatter: function (value, index) {
                        // 格式化成月/日，只在第一个刻度显示年份
                        var date = new Date(value);
                        var texts = [date.getDate(),date.getHours(),date.getMinutes()];
                        return texts[0]+" "+texts[1]+":"+texts[2];
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#DDD'
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#333"
                    },
                },
                
            },
            dataZoom:[{
     　　　　   type:"inside",         //详细配置可见echarts官网
               startValue:start5minu,
               endValue:end5minu
    　　　   }],
            legend: {
                data:sen_ids
            },
            series: []
        };
        for(var i=0;i<data.length;i++){
            option.series.push({
                // symbol:'circle',//拐点样式
                // symbolSize: 8,//拐点大小
                data: data[i],
                type: 'line',
                animation:false,
                lineStyle:{
                    width:1
                },
                name:sen_ids[i]
            })
        }
        
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option,true)
        myChart.on('click', function (params) {
            console.log(params.seriesName);
            // store.commit('mobilesensor_set_update', this.checkAllGroup.map(function(ele){return +ele.split("_")[1]}))
        });
    })
  
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
#line_div{
    width:99%;
    height:99%;
    margin:0.3% 0.5% 0.5% 0.5%;
    
}
#line_div_top{
    width:100%;
    height:8%;
    background: linear-gradient(-45deg,#333333 25%,#3B3B3B 0,
                            #3B3B3B 50%,#333333 0,
                            #333333 75%,#3B3B3B 0);
    background-size: 30px 30px;
    text-align:left;
    border-radius:5px;
}
#line_div_main{
    width:100%;
    height:92%;
    border-width:1px; border-style: solid; border-color:#C7C7C7;
    border-radius:5px;
    background-color:#F5F5F5;
}
</style>
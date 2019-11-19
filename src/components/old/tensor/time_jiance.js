// time_yichang()
var myChart_time_jiance;
function time_yichang(){

var path=["data/phone/changgui_new/Time_yichang"+id+".csv","data/phone/changgui_new/Time_yichang"+id+"_wangge.csv"];
d3v3.csv(path[lidu], function(csvdata) {
// d3.csv("data/phone/jiance/Time_yichang"+id+".csv", function(csvdata) {
var yichang=[];
  for(var i=0;i<csvdata.length;i++){
    yichang[i]=csvdata[i].yichang;
  }
if (myChart_time_jiance != null && myChart_time_jiance != "" && myChart_time_jiance != undefined) {
            myChart_time_jiance.dispose();
        }
myChart_time_jiance = echarts.init(document.getElementById('Top-Horizontal2-vertikal2'));
var xData=shijian;
// var xData_all=["Sat","Sun","Mon","Tue","Wed","Thu","Fri"];
// var xData_gongzuori=["Mon","Tue","Wed","Thu","Fri"];
// var xData_zhoumo=["Sat","Sun"];
// if(csvdata.length==xData_all.length){
//     xData=xData_all;
// }else if(csvdata.length==xData_gongzuori.length){
//     xData=xData_gongzuori;
// }else{
//     xData=xData_zhoumo;
// }

// var num=[10,33,62,10,19,15,48,75,9,3,65,8];
option={
    backgroundColor: "#fff",
    // "title": {
    //     x: 'center',
    //     textStyle: {
    //         color: '#90979c',
    //         fontSize: '22'
    //     },
    //     text: '导师学生数量变化',
    //     // subtext: '数据来自西安兰特水电测控技术有限公司',
    //     // subtextStyle: {
    //     //     color: '#90979c',
    //     //     fontSize: '16',

    //     // },
    // },
    "tooltip": {
        "trigger": "axis",
        "axisPointer": {
            "type": "shadow",
            textStyle: {
                color: "#fff"
            }

        },
    },
    "grid": {
        "borderWidth": 0,
        "top": "15%",
        "bottom": "5%",
        textStyle: {
            color: "#fff"
        }
    },
    "calculable": true,
    "xAxis": [{
        "type": "category",
        "axisLine": {
            lineStyle: {
                color: '#90979c'
            }
        },
        "splitLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        },
        "splitArea": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "data": xData,
    }],
    "yAxis": [{
        "type": "value",
        "splitLine": {
            "show": false
        },
        "axisLine": {
            lineStyle: {
                color: '#90979c'
            }
        },
        "axisTick": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "splitArea": {
            "show": false
        },

    }],
    "series": [{
            "name": "总数",
            "type": "line",
            "stack": "总量",
            symbolSize:10,
            symbol:'circle',
            "itemStyle": {
                "normal": {
                    "color": "#ccc",
                    "barBorderRadius": 0,
                    "label": {
                        "show": true,
                        "position": "top",
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": yichang
        }
    ]
}

        // 使用刚指定的配置项和数据显示图表。
        myChart_time_jiance.setOption(option);
 });
  // }); 
	
}
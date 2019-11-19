function C_B(num){

var path=["data/phone/changgui_new/Map_C_B_"+id+".csv","data/phone/changgui_new/Map_C_B_"+id+"_wangge.csv"];
d3v3.csv(path[lidu], function(C_B_data) {
// console.log(num);
// num=2;
// var tian=5,hangye=4;
var data_A_C=[];
for(var i=0;i<shijian.length;i++){
    data_A_C[i]=[];
    for(h=0;h<hangye.length;h++){
        data_A_C[i][h]=C_B_data[num*shijian.length+i]["b"+(h+1)]
    }
}
// console.log(data_A_C);
// console.log(data_A_C[4])

var myChart = echarts.init(document.getElementById('Content-Yun_bian'));
// var num=[10,33,62,10,19,15,48,75,9,3,65,8]; 
var x_name=hangye;
option = {
    backgroundColor:'rgba(255,255,255,0.8)', //rgba设置透明度0.1,
    angleAxis: {
        type: 'category',
        data: x_name,
        z: 10
    },
    radiusAxis: {
    },
    polar: {
    },
    series: [{
        type: 'bar',
        data: data_A_C[0],
        coordinateSystem: 'polar',
        name: 'Mon',
        stack: 'a'
    }, {
        type: 'bar',
        data: data_A_C[1],
        coordinateSystem: 'polar',
        name: 'Tue',
        stack: 'a'
    }, {
        type: 'bar',
        data: data_A_C[2],
        coordinateSystem: 'polar',
        name: 'Wed',
        stack: 'a'
    }, {
        type: 'bar',
        data: data_A_C[3],
        coordinateSystem: 'polar',
        name: 'Thu',
        stack: 'a'
    }, {
        type: 'bar',
        data: data_A_C[4],
        coordinateSystem: 'polar',
        name: 'Fri',
        stack: 'a'
    }
    ],
    legend: {
        show: true,
        data: ["Mon","Tue","Wed","Thu","Fri"]
    },
        tooltip: {
        trigger: 'item',
    }
};
myChart.setOption(option);
}); 	
}
var id=1;
var id_shunxu=0;
var num_tree=0;
var lidu=0;  
// var shunxu=2;
 var treeData_0 ={
    "name": "初始张量",
    "id":1,
    "id_shunxu":0,
    "children":null
  }; 
   var treeData_1 ={
    "name": "初始张量",
    "id":1,
    "id_shunxu":0,
    "children": [
      {
        "name": "周末",
        "id":11,
        "id_shunxu":1,
        "children":null
      },
      {
        "name": "工作日",
        "id":12,
        "id_shunxu":2,
        "children":null
      }
    ]
  }; 
   var treeData_2 ={
    "name": "初始张量",
    "id":1,
    "id_shunxu":0,
    "children": [
      {
        "name": "周末",
        "id":11,
        "id_shunxu":1,
        "children":null
      },
      {
        "name": "工作日",
        "id":12,
        "id_shunxu":2,
        "children":
            [
            {
              "name": "城区",
              "id":121,
              "id_shunxu":3,
              "children":null
            },
            {
              "name": "乡村",
              "id":122,
              "id_shunxu":4,
              "children":null
            }
          ]
      }
    ]
  }; 
  var treeData_3={
    "name": "初始张量",
    "id":1,
    "id_shunxu":0,
    "children": [
      {
        "name": "周末",
        "id":11,
        "id_shunxu":1,
        "children":null
      },
      {
        "name": "工作日",
        "id":12,
        "id_shunxu":2,
        "children":
            [
            {
              "name": "城区",
              "id":121,
              "id_shunxu":3,
              "children":
                  [
                    {
                      "name": "行业集合1",
                      "id":1211,
                      "id_shunxu":5,
                      "children":null
                    },
                    {
                      "name": "行业集合2",
                      "id":1212,
                      "id_shunxu":6,
                      "children":null
                    },
                    {
                      "name": "行业集合3",
                      "id":1213,
                      "id_shunxu":7,
                      "children":null
                    },
                    {
                      "name": "行业集合4",
                      "id":1214,
                      "id_shunxu":8,
                      "children":null
                    },
                    {
                      "name": "行业集合5",
                      "id":1215,
                      "id_shunxu":9,
                      "children":null
                    }
                  ]
            },
            {
              "name": "乡村",
              "id":122,
              "id_shunxu":4,
              "children":null
            }
          ]
      }
    ]
  }; 
var a1=[["Sat","Sun","Mon","Tues","Wed","Thur","Fri"],
        ["物业服务与管理","供热","占道经营","违章建筑","供水","道路建设与维护","工作效率","噪声污染","土地资源管理","交通规划","营运管理","养老保险","社会治安","环境卫生","优惠政策","房屋产权办理","工作纪律","燃气","劳动监察","拆迁管理","下水排水","媒体内容","低保管理","工商活动","农村路桥建设维护","空气污染","特殊扶助","经营性收费","交通秩序","服务态度与质量","交通设施建设维护","消防安全","人口管理","医疗保险","补课办班","园林绿化","路灯管理","房屋交易","政务公开","基层组织建设","供电","房地产开发","废弃物","教学管理"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区","长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市"]];
var a11=[["Sat","Sun"],
        ["物业服务与管理","供热","占道经营","违章建筑","供水","道路建设与维护","工作效率","噪声污染","土地资源管理","交通规划","营运管理","养老保险","社会治安","环境卫生","优惠政策","房屋产权办理","工作纪律","燃气","劳动监察","拆迁管理","下水排水","媒体内容","低保管理","工商活动","农村路桥建设维护","空气污染","特殊扶助","经营性收费","交通秩序","服务态度与质量","交通设施建设维护","消防安全","人口管理","医疗保险","补课办班","园林绿化","路灯管理","房屋交易","政务公开","基层组织建设","供电","房地产开发","废弃物","教学管理"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区","长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市"]];
var a12=[["Mon","Tues","Wed","Thur","Fri"],
        ["物业服务与管理","供热","占道经营","违章建筑","供水","道路建设与维护","工作效率","噪声污染","土地资源管理","交通规划","营运管理","养老保险","社会治安","环境卫生","优惠政策","房屋产权办理","工作纪律","燃气","劳动监察","拆迁管理","下水排水","媒体内容","低保管理","工商活动","农村路桥建设维护","空气污染","特殊扶助","经营性收费","交通秩序","服务态度与质量","交通设施建设维护","消防安全","人口管理","医疗保险","补课办班","园林绿化","路灯管理","房屋交易","政务公开","基层组织建设","供电","房地产开发","废弃物","教学管理"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区","长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市"]];
var a121=[["Mon","Tues","Wed","Thur","Fri"],
        ["物业服务与管理","供热","占道经营","违章建筑","供水","道路建设与维护","工作效率","噪声污染","土地资源管理","交通规划","营运管理","养老保险","社会治安","环境卫生","优惠政策","房屋产权办理","工作纪律","燃气","劳动监察","拆迁管理","下水排水","媒体内容","低保管理","工商活动","农村路桥建设维护","空气污染","特殊扶助","经营性收费","交通秩序","服务态度与质量","交通设施建设维护","消防安全","人口管理","医疗保险","补课办班","园林绿化","路灯管理","房屋交易","政务公开","基层组织建设","供电","房地产开发","废弃物","教学管理"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区"]];
var  a122=[["Mon","Tues","Wed","Thur","Fri"],
        ["物业服务与管理","供热","占道经营","违章建筑","供水","道路建设与维护","工作效率","噪声污染","土地资源管理","交通规划","营运管理","养老保险","社会治安","环境卫生","优惠政策","房屋产权办理","工作纪律","燃气","劳动监察","拆迁管理","下水排水","媒体内容","低保管理","工商活动","农村路桥建设维护","空气污染","特殊扶助","经营性收费","交通秩序","服务态度与质量","交通设施建设维护","消防安全","人口管理","医疗保险","补课办班","园林绿化","路灯管理","房屋交易","政务公开","基层组织建设","供电","房地产开发","废弃物","教学管理"],
        ["长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市"]];
var  a1211=[["Mon","Tues","Wed","Thur","Fri"],
        ["供热","供水","燃气","供电"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区"]];
var  a1212=[["Mon","Tues","Wed","Thur","Fri"],
        ["占道经营","违章建筑","道路建设与维护","交通规划","营运管理","环境卫生","下水排水","工商活动","经营性收费","交通秩序","交通设施建设维护","园林绿化","路灯管理"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区"]];
var  a1213=[["Mon","Tues","Wed","Thur","Fri"],
        ["社会治安","消防安全","人口管理"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区"]];
var  a1214=[["Mon","Tues","Wed","Thur","Fri"],
        ["噪声污染","空气污染","废弃物"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区"]];
var  a1215=[["Mon","Tues","Wed","Thur","Fri"],
        ["物业服务与管理","工作效率","土地资源管理","养老保险","优惠政策","房屋产权办理","工作纪律","劳动监察","拆迁管理","媒体内容","低保管理","农村路桥建设维护","特殊扶助","服务态度与质量","医疗保险","补课办班","房屋交易","政务公开","基层组织建设","房地产开发","教学管理"],
        ["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区"]];

var link_data=[["Sat","Sun"],
["Mon","Tues","Wed","Thur","Fri"],
["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区"],
["长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市"],
["供热","供水","燃气","供电"],
["占道经营","违章建筑","道路建设与维护","交通规划","营运管理","环境卫生","下水排水","工商活动","经营性收费","交通秩序","交通设施建设维护","园林绿化","路灯管理"],
["社会治安","消防安全","人口管理"],
["噪声污染","空气污染","废弃物"],
["物业服务与管理","工作效率","土地资源管理","养老保险","优惠政策","房屋产权办理","工作纪律","劳动监察","拆迁管理","媒体内容","低保管理","农村路桥建设维护","特殊扶助","服务态度与质量","医疗保险","补课办班","房屋交易","政务公开","基层组织建设","房地产开发","教学管理"]
];
var depth_data=["time","region","industry"];
var aall=[];
    aall[0]=a1;
    aall[1]=a11;
    aall[2]=a12;
    aall[3]=a121;
    aall[4]=a122;
    aall[5]=a1211;
    aall[6]=a1212;
    aall[7]=a1213;
    aall[8]=a1214;
    aall[9]=a1215;    

var shijian=aall[id_shunxu][0]; 
var hangye=aall[id_shunxu][1];  
var quyu=aall[id_shunxu][2];    
treee(0);
function treee(numm){
  var treeData=[treeData_0,treeData_1,treeData_2,treeData_3];
  var shijian=aall[id_shunxu][0]; 
  var hangye=aall[id_shunxu][1];  
  var quyu=aall[id_shunxu][2];

  document.getElementById("Top-Horizontal0-vertikal2").innerHTML = "";
  var width=document.getElementById("Top-Horizontal0-vertikal2").scrollWidth;
  var height=document.getElementById("Top-Horizontal0-vertikal2").scrollHeight;
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = width - margin.left - margin.right,
      height = height - margin.top - margin.bottom;
  var svg = d3.select("#Top-Horizontal0-vertikal2").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("transform","translate(0," + margin.top + ")");
  
var colorbar=["#000202","#0F6366","#169195","#19A3A8","#1DBFC5","#33D6DC","#F2F92D"]

  var num=10;
  for(var j=0;j<=9;j++){
    var data=aall[j];
    for(var i=0;i<3;i++){
      var barHeight =height/(data[i].length);
      var kuan=parseInt(width/num/3)-3;
      var dx=(kuan+1)*i+j*3*(kuan+2);
      svg.selectAll()
      .data(data[i])
      .enter()
      .append("g")
      .attr("transform", function(d, i) { return "translate("+dx+"," + i * (barHeight) + ")"; })
      .append("rect")
      .attr("width",kuan)
      .attr("height", barHeight-2)
      .style("fill",function(d,i){
        return colorbar[i%7]
      });
  
    }

  }




//   function cexu(root){
//     var duilie=[root];
//     var shuzi=[];
//     while(duilie.length!=0){
//         var chu_temp=duilie.shift()
//         shuzi.push(chu_temp.id_shunxu);
//         if(chu_temp.children){
//           chu_temp.children.forEach(element => {
//             duilie.push(element)
//           });   
//         }
//      }
//     return shuzi;
// }

//   var out=cexu(treeData[numm])
//   console.log(treeData[numm])
//   console.log(out)

}
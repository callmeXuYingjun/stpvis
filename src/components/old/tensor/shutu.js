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
treee(shunxu);
function treee(numm){

var treeData=[treeData_0,treeData_1,treeData_2,treeData_3];
document.getElementById("Top-Horizontal0-vertikal2").innerHTML = "";
var width=document.getElementById("Top-Horizontal0-vertikal2").scrollWidth;
var height=document.getElementById("Top-Horizontal0-vertikal2").scrollHeight;
var margin = {top: 20, right: 30, bottom: 20, left: 30},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

// declares a tree layout and assigns the size
var treemap = d3.tree()
    .size([height, width]);
var nodes = d3.hierarchy(treeData[numm], function(d) {
    return d.children;
  });
var shendu=nodes.height;
nodes = treemap(nodes);
nodes.each(function(d){
  if(d.depth==shendu){
      d.y-=40*(d.depth-1)
  }else if(d.depth<shendu&&d.depth!=0){
     d.y-=40*d.depth
  }
})

var svg = d3.select("#Top-Horizontal0-vertikal2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom),
    g = svg.append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  var color_link=["#f58321","#77bc45","#ef1621"];
function curtail(arr) {
var m = arr.slice(0);
    m.splice(0,1);
    return m;
}
var line_data=curtail(N_all_num[num_tree]);
 var max_line=d3.max(line_data,function(a){
    return +a;
  });
  var min_line=d3.min(line_data,function(a){
    return +a;
  });

  var x = d3.scaleLinear()
    .domain([min_line, max_line])
    .range([2, 20]);

var linkenter = g.selectAll(".link")
    .data(nodes.descendants().slice(1));
    
    linkenter.enter()
    .append("path")
    .attr("class", "link")
    .style("stroke", function(d) { 
      return color_link[d.depth-1]; })
    .style("stroke-width", function(d,i) { 
      return x(line_data[i]); })
    .attr("d", function(d) {  
       return "M" + d.y + "," + d.x
         + "C" + (d.y + d.parent.y) / 2 + "," + d.x
         + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
         + " " + d.parent.y + "," + d.parent.x;
       });

  

  var maxx=d3.max(N_all_num[num_tree],function(a){
    return +a;
  });
  var minx=d3.min(N_all_num[num_tree],function(a){
    return +a;
  });

  var pow=d3.scalePow()
            .exponent(0.5)
            .domain([minx,maxx])
            .rangeRound([25,60]);



var node = g.selectAll(".node")
    .data(nodes.descendants());
  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
    .attr("transform", function(d) { 
      return "translate(" + d.y + "," + d.x + ")"; });
// adds each node as a group


  nodeEnter.append("circle")
    .attr("r", function(d,i) { 
      if(d.depth==shendu){
        return pow(N_all_num[num_tree][i]); 
      }else{
        return pow(N_all_num[num_tree][i])/3;
      }

    })
    .attr("id",function(d,i){
      return "circle"+i;
    })
    .style("stroke", function(d) { 
      return "#4C86B6"; })
    .style("stroke-width", function(d,i) { 
      return 4 })   
    .style("fill", function(d) { return "white"; });

   nodeEnter.append("g")
    .attr("d",function(d,i){
      if(d.depth==shendu){
        return weinuo(d3.select(this),pow(N_all_num[num_tree][i]),i);
      }
    })
    .on("click",function(d,i){
        // stroke: steelblue;
        // stroke-width: 3px;
    // d3.selectAll(".node").style("stroke","white").style("stroke-width",0);
    // g.selectAll("circle").attr("r",function(d,i){return pow(N_all_num[num_tree][i])}).style("stroke","white").style("stroke-width",0);
    // d3.select("#circle"+i).attr("r",pow(N_all_num[num_tree][i])+5).style("stroke","#9540A4").style("stroke-width",5);
      id=d.data.id;
      id_shunxu=d.data.id_shunxu;
      shijian=aall[id_shunxu][0]; 
      hangye=aall[id_shunxu][1];  
      quyu=aall[id_shunxu][2]; 

      draw_sandian();
      // map_jiance();
      // time_yichang();
    });
    }
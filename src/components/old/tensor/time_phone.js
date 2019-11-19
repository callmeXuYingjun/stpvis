// var num_time=0; //展示历史的结果为0，现在的为1 
var myChart_time_phone;
function time_phone(){
var path=["data/phone/changgui_new/A"+id+".csv","data/phone/changgui_new/A"+id+"_wangge.csv"];
d3v3.csv(path[lidu], function(csvdata) {
  var changgui_A=[];
  var changgui_Ce=[];
  var changgui_cha=[];
  for(var k=0;k<he.length;k++){
    var temp="a"+(k+1);
    var temp_ce="ce_A"+(k+1);
    changgui_A[k]=[];
    changgui_Ce[k]=[];
    changgui_cha[k]=[];
    for(var i=0;i<csvdata.length;i++){
      changgui_A[k][i]=parseFloat(csvdata[i][temp]);
      changgui_Ce[k][i]=parseFloat(csvdata[i][temp_ce]);
      changgui_cha[k][i]=Math.abs(parseFloat(changgui_Ce[k][i]-changgui_A[k][i]));
    }
  }
  var data_time_phone=[changgui_A,changgui_Ce,changgui_cha];

  var xData=shijian;
  for(var i=0;i<4;i++){
    dtime(i)
  }
  
  function dtime(model_num){
    document.getElementById("Down-Horizontal"+(model_num+2)+"-vertikal3").innerHTML = "";
    var width=document.getElementById("Down-Horizontal"+(model_num+2)+"-vertikal3").scrollWidth;
    var height=document.getElementById("Down-Horizontal"+(model_num+2)+"-vertikal3").scrollHeight;
    var svg = d3v3.select("#Down-Horizontal"+(model_num+2)+"-vertikal3").append("svg")
          .attr("width", width)
          .attr("height", height);
  
  var x = d3v3.scale.ordinal()
      .rangeRoundBands([0, width], .5);

  
  var y = d3v3.scale.linear()
      .range([height-20,30]);
      x.domain(xData);
  y.domain([0, Math.max.apply(null,data_time_phone[0][model_num]>data_time_phone[1][model_num]?data_time_phone[0][model_num]:data_time_phone[1][model_num]    )]);
  var line = d3v3.svg.line()
      .x(function(d,i) { return x(xData[i]); })
      .y(function(d) { return y(d); })


    var maxx=Math.max.apply(null,changgui_cha[model_num]);
      var linear = d3v3.scale.linear()
      .domain([0,maxx])
      .range(["white", "#D56728"]);

  svg.selectAll().data(changgui_cha[model_num]).enter()
      .append("rect")
      .attr("width",width/xData.length)
      .attr("height", height)
      .attr("transform", function(d, i) { return "translate("+ i * width/xData.length + ",0)"; })
      .style("fill",function(d){
        return linear(d)
      });


  svg.selectAll("text").data(xData).enter()
      .append("text")
      .text(function(d) { return d; })
      .attr("y", height-20)
      .attr("x", function(d) { return x(d); })
      .style("font-size", 10)
      .style("font-family", "monospace");
  
     svg.selectAll(".value").data(data_time_phone[0][model_num]).enter()
          .append("circle")
          .attr("cx", function(d,i) { return x(xData[i]); })
          .attr("cy", function(d) { return y(d); })
          .attr("r", 5)
          .style("fill", "#88AFDE");
  
    svg.selectAll("path").data([data_time_phone[0][model_num]]).enter().append("path")
      .attr("class", "line")
      .attr("d", line)
      .attr("fill","none")
      .attr("stroke","#88AFDE")
      .attr("stroke-width","3px")
  
      svg.selectAll(".value").data(data_time_phone[1][model_num]).enter()
      .append("circle")
      .attr("cx", function(d,i) { return x(xData[i]); })
      .attr("cy", function(d) { return y(d); })
      .attr("r", 5)
      .style("fill", "#8EC685");
  
      svg.selectAll().data([data_time_phone[1][model_num]]).enter().append("path")
      .attr("class", "line")
      .attr("d", line)
      .attr("fill","none")
      .attr("stroke","#8EC685")
      .attr("stroke-width","3px")




  }
 });
}
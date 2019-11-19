// var num_time=0; //展示历史的结果为0，现在的为1 
relfit_loss()
function relfit_loss(){
var path=["data/phone/loss/relfit"+id+".csv","data/phone/loss/relfit"+id+"_wangge.csv"];
d3v3.csv(path[lidu], function(csvdata) {
  var data=[[],[]];
  var xData=[];
  for(var i=0;i<csvdata.length;i++){
      xData[i]=i;
      data[0][i]=parseFloat(csvdata[i].relfit_h);
      data[1][i]=parseFloat(csvdata[i].relfit_n);
    //   if(maxx<data[0][i]){
    //     maxx=data[0][i]
    //   }
    //   if(maxx<data[1][i]){
    //     maxx=data[1][i]
    //   }
  }

    document.getElementById("Top-Horizontal2-vertikal1").innerHTML = "";
    var width=document.getElementById("Top-Horizontal2-vertikal1").scrollWidth;
    var height=document.getElementById("Top-Horizontal2-vertikal1").scrollHeight;
    var svg = d3v3.select("#Top-Horizontal2-vertikal1").append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("transform", "translate(20,20)");

  var x = d3v3.scale.ordinal()
      .rangePoints([0, width-40])
      .domain(xData);
  var y = d3v3.scale.linear()
      .range([height-40,0])
      .domain([60,100]);

    var line = d3v3.svg.line()
      .x(function(d,i) { 
        return x(xData[i]); })
      .y(function(d) { 
        return y(d); })
    svg.selectAll().data([data[0]]).enter().append("path")
      .attr("d", line)
      .attr("fill","none")
      .attr("stroke","#88AFDE")
      .attr("stroke-width","3px")
  
  
      svg.selectAll().data([data[1]]).enter().append("path")
      .attr("d", line)
      .attr("fill","none")
      .attr("stroke","red")
      .attr("stroke-width","3px")
 });
}
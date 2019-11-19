var num_sandian=0; //展示历史的结果为0，现在的为1 
var model=1;
var he;
var models=[]
draw_sandian()

function draw_sandian(){
var path1=["data/phone/sandian/points"+id+".csv","data/phone/sandian/points"+id+"_wangge.csv"];
var path2=["data/phone/sandian/he"+id+".csv","data/phone/sandian/he"+id+"_wangge.csv"];


d3v3.csv(path1[lidu], function(csvdata) {
  d3v3.csv(path2[lidu], function(hedata) {
he=hedata;
var dataset=[];
for(var i=0;i<csvdata.length;i++){
      dataset[i]=[];
      dataset[i][0]=csvdata[i].x;
      dataset[i][1]=csvdata[i].y;
      dataset[i][2]=hedata[i%(csvdata.length/2)].he;
    }

var datasetline=[];
for(var i=0;i<csvdata.length/2;i++){
      datasetline[i]=[];
      datasetline[i][0]=csvdata[i].x;
      datasetline[i][1]=csvdata[i].y;
      datasetline[i][2]=csvdata[i+csvdata.length/2].x;
      datasetline[i][3]=csvdata[i+csvdata.length/2].y;
}
hangye_phone();
map_phone();
time_phone();
document.getElementById("Down-Horizontal1").innerHTML = "";
var width=document.getElementById("Down-Horizontal1").scrollWidth;
var height=document.getElementById("Down-Horizontal1").scrollHeight;
// console.log(width+"   "+height)
var svg = d3v3.select("#Down-Horizontal1").append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background","#2B5196");
      var maxInNumbers_1 = d3v3.max(dataset, function(d) {
        return +d[0];
      })
      var minInNumbers_1 = d3v3.min(dataset, function(d) {
        return +d[0];
      })
      var maxInNumbers_2 = d3v3.max(dataset, function(d) {
        return +d[1];
      })
      var minInNumbers_2 = d3v3.min(dataset, function(d) {
        return +d[1];
      })
      var maxInNumbers_yuan = d3v3.max(dataset, function(d) {
        return +d[2]; 
      })
      var minInNumbers_yuan = d3v3.min(dataset, function(d) {
        return +d[2];
      })

      var linear_yuan = d3v3.scale.linear()
                                .domain([minInNumbers_yuan,maxInNumbers_yuan])
                                .range([5,20]);
      var padding = {top: 20, right: 20, bottom:20, left:20};
      var xAxisWidth = width-padding.left-padding.right;   // x轴宽度
      var yAxisWidth = height-padding.top-padding.bottom;   // y轴宽度

      var maxInNumbers=(maxInNumbers_1>maxInNumbers_2)?maxInNumbers_1:maxInNumbers_2;
      var minInNumbers=(minInNumbers_1<minInNumbers_2)?minInNumbers_1:minInNumbers_2;
      var AxisWidth=(xAxisWidth>yAxisWidth)?yAxisWidth:xAxisWidth;
      var Scale = d3v3.scale.linear()
                .domain([minInNumbers, maxInNumbers])
                .range([0, AxisWidth]);

            var circleUpdate = svg.selectAll("circle")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("id","sandian")
                    .attr("r", function(d){
                        return linear_yuan(d[2]);
                    })
                    .attr("cx", function(d){
                        return padding.left + Scale(d[0]);
                    })
                    .attr("cy", function(d){
                        return height - padding.bottom - Scale(d[1]);
                    })
                    .attr("fill",function(d,i){
                        if(i<csvdata.length/2){
                          return "#FEFEE3";
                        }else{
                          return "#79CDCD";
                        }
                        
                    })
                    .attr("opacity",0.4)
                    .on("click",function(d,i){
                      models.push([parseInt(i/(csvdata.length/2)),i%(csvdata.length/2)])
                      console.log(models)
                      // console.log(i+"  "+parseInt(i/(csvdata.length/2))+"  "+i%(csvdata.length/2))
                      // svg.selectAll("#sandian").style("stroke","white").style("stroke-width",0);
                      // d3.selectAll("#sandian").filter(function(dd,ii){
                      //     if(ii%(csvdata.length/2)==i%(csvdata.length/2)){
                      //       return true;
                      //     }else{
                      //       return false;
                      //     }
                      // }).style("stroke","#9540A4").style("stroke-width",3);
                      // model=i%(csvdata.length/2);
                      hangye_phone();
                      time_phone();
                      map_phone();
                    });

                // var lineset=svg.selectAll()
                //     .data(datasetline)
                //     .enter()
                //     .append("line")
                //     .attr("x1",function(d,i){
                //       return padding.left + Scale(d[0]);
                //     })
                //     .attr("y1",function(d,i){
                //       return height - padding.bottom - Scale(d[1]);
                //     })
                //     .attr("x2",function(d,i){
                //       return padding.left + Scale(d[2]);
                //     })
                //     .attr("y2",function(d,i){
                //       return height - padding.bottom - Scale(d[3]);
                //     })
                //     .attr("stroke","#F58518")
                //     .attr("stroke-width","2px");

  });
  });
}
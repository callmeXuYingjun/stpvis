function hangye_phone(){
var path=["data/phone/model/B"+id+".csv","data/phone/model/B"+id+"_wangge.csv"];
d3v3.csv(path[lidu], function(csvdata) {
  var changgui_B=[];
  for(var k=0;k<he.length;k++){
    var temp="b"+(k+1);
    changgui_B[k]=[];
    for(var i=0;i<csvdata.length;i++){
      changgui_B[k][i]=parseFloat(csvdata[i][temp]);
    }
  }

  for(var i=0;i<models.length;i++){
    dhangye(i);
  }
  function dhangye(index1){

    var xdata_all=hangye;
    var data_all=changgui_B[models[index1][0]];
    var xdata=[];
    var data=[];
  
    for(var i=0;i<10;i++){
      var maxx=Math.max.apply(null,data_all);
      var index=data_all.indexOf(maxx);
      data.push(data_all[index])
      xdata.push(xdata_all[index])
      data_all[index]=-1;
    }
  
    document.getElementById("Down-Horizontal"+(index1+2)+"-vertikal2-Horizontal2").innerHTML = "";
    var width=document.getElementById("Down-Horizontal"+(index1+2)+"-vertikal2-Horizontal2").scrollWidth;
    var height=document.getElementById("Down-Horizontal"+(index1+2)+"-vertikal2-Horizontal2").scrollHeight;
    var svg = d3v3.select("#Down-Horizontal"+(index1+2)+"-vertikal2-Horizontal2").append("svg")
          .attr("width", width)
          .attr("height", height);
    var barHeight = 15;
    var x = d3v3.scale.linear()
    .range([0, width-60]);
    x.domain([0,Math.max.apply(null,data)]);
  
    var bar = svg.selectAll("g")
                 .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(50," + i * (barHeight+2) + ")"; });
    bar.append("rect")
      .attr("width", function(d) { return x(d); })
      .attr("height", barHeight - 1)
      .style("fill","#8E9BB9");
    bar.append("text")
      .attr("x",0)
      .attr("y",barHeight / 2)
      .attr("dy",".35em")
      .attr("dx","-50px")
      .style("font-size", 5)
      .style("font-family", "monospace")
      .style("fill","#8C8C8C")
      .text(function(d,i) {   
        return xdata[i].split("").slice(0,4).join(""); 
      });

  }





	});
  // }); 
}
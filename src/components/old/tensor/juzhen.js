jzuhen(0)
function jzuhen(num){
    var path=["data/phone/changgui_new/Map_C_B_"+id+".csv","data/phone/changgui_new/Map_C_B_"+id+"_wangge.csv"];
    d3v3.csv(path[lidu], function(C_B_data) {

    var data_B_A=[];
    var maxx=-1;
    for(var i=0;i<shijian.length;i++){
        data_B_A[i]=[]; 
        for(h=0;h<hangye.length;h++){
            data_B_A[i][h]=C_B_data[num*shijian.length+i]["b"+(h+1)]
            if(maxx<data_B_A[i][h]){
                maxx=data_B_A[i][h];
            }
        }
    }

    document.getElementById("Top-Horizontal2-vertikal2").innerHTML = "";
    var width=document.getElementById("Top-Horizontal2-vertikal2").scrollWidth;
    var height=document.getElementById("Top-Horizontal2-vertikal2").scrollHeight;
    var width_text=60;
    var height_text=20;
    var margin = {top: 10, right:0, bottom: 20, left:0},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    
    var svg = d3.select("#Top-Horizontal2-vertikal2").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform","translate(" +0+ "," + (margin.top) + ")");
    var colorbar=["#000202","#0F6366","#169195","#19A3A8","#1DBFC5","#33D6DC","#FFFFFF"].reverse();
    var linear = d3v3.scale.linear()
    .domain([0/7*maxx,1/7*maxx,2/7*maxx,3/7*maxx,4/7*maxx,5/7*maxx,6/7*maxx,7/7*maxx])
    .range(colorbar);

    var barHeight=(height-height_text)/data_B_A[0].length;
    var kuan=(width-width_text)/data_B_A.length;
    var x_name=hangye;

    for(var k=0;k<data_B_A.length;k++){
        var dx=kuan*(k);
        svg.selectAll()
        .data(data_B_A[k])
        .enter()
        .append("rect")
        .attr("transform", function(d, i) { return "translate("+(dx+width_text)+"," + (i * (barHeight) +height_text)+")"; })
        .attr("width",kuan-2)
        .attr("height", barHeight-2)
        .style("stroke","#D4D5D3")
        .style("stroke-width",0.5)
        .style("fill",function(d,i){
            return linear(d)
        });
    
        }
        svg.selectAll()
        .data(x_name)
        .enter()
        .append("text")
        .attr("transform", function(d, i) { return "translate("+(5)+"," + (i * (barHeight) +height_text)+ ")"; })
        .attr("x",0)
        .attr("y",0)
        .attr("dy","0.8em")
        .style("font-size", 1)
        .style("font-family", "monospace")
        .style("fill","#8C8C8C")
        .text(function(d,i) {   
            return d.split("").slice(0,4).join(""); 
        });

        svg.selectAll()
        .data(shijian)
        .enter()
        .append("text")
        .attr("transform", function(d, i) { return "translate("+(kuan*(i)+width_text)+"," +2+ ")"; })
        .attr("x",0)
        .attr("y",0)
        .attr("dy","0.8em")
        .style("font-size", 1)
        .style("font-family", "monospace")
        .style("fill","#8C8C8C")
        .text(function(d,i) {   
            return d
        });
    })
}
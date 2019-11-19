map_main()
function map_main(){
    if(lidu==0){
      f1();
    }else{
      f2();
    }
function f2(){
d3v3.csv("data/phone/changgui_new/Map_yichang"+id+"_wangge.csv", function(csvdata) {
  var path_temp;
  var zhongxin;
  var zoom;
  if(csvdata.length==1283){
      path_temp="data/phone/wang/phone_all.csv";
      zhongxin=[125.82426,44.267305];
      zoom=8;
  }else if(csvdata.length==1184){
      path_temp="data/phone/wang/phone_xiangcun.csv";
      zhongxin=[125.82426,44.267305];
      zoom=8;
  }else if(csvdata.length==141){
      path_temp="data/phone/wang/phone_shiqu.csv";
      zhongxin=[125.344899,43.7582524];
      zoom=10;
  }
  d3v3.csv(path_temp, function(wangdata) {
  var yichang=[];
  for(var i=0;i<csvdata.length;i++){
    yichang[i]=csvdata[i].yichang;
  }
  var b = d3v3.rgb(149, 64, 164);  //红色
  var a = d3v3.rgb(255,255,255);  //白色
  var compute = d3v3.interpolate(a,b);
  var maxx=Math.max.apply(Math, yichang);
  var linear=d3v3.scale.linear()
        .domain([0,maxx])
        .range([0,1]);
  var map = new BMap.Map("Top-Horizontal1");
  map.setMapStyleV2({styleJson:styleJson_main});
  map.centerAndZoom(new BMap.Point(zhongxin[0],zhongxin[1]),zoom);
  map.enableScrollWheelZoom();
  var bdary = new BMap.Boundary();

for(var i=0;i<wangdata.length;i++){

  var pStart = new BMap.Point(wangdata[i].zuoxia_lng,wangdata[i].zuoxia_lat); 
  var pEnd = new BMap.Point(wangdata[i].youshang_lng,wangdata[i].youshang_lat);
  var rectangle= new BMap.Polygon([
    new BMap.Point(pStart.lng,pStart.lat),
    new BMap.Point(pEnd.lng,pStart.lat),
    new BMap.Point(pEnd.lng,pEnd.lat),
    new BMap.Point(pStart.lng,pEnd.lat)
  ], {strokeColor:"#CCCCCC", strokeWeight:2, strokeOpacity:0.8,fillColor:compute(linear(yichang[i])),fillOpacity:0.5});  //创建矩形
  rectangle.id =i;
  rectangle.addEventListener('click', function(e) {
        // console.log(e.currentTarget.id);
        var model_gongxian=[];
        for(var g=0;g<he.length;g++){
            model_gongxian[g]=csvdata[e.currentTarget.id]["model"+(g+1)];
            model_gongxian[g+he.length]=csvdata[e.currentTarget.id]["model"+(g+1)];
        }
          var b_temp = d3v3.rgb(255,0,0);  //红色
          var a_temp = d3v3.rgb(100,100,100);  //白色
          var compute_temp = d3v3.interpolate(a_temp,b_temp);
          var maxx_temp=Math.max.apply(Math, model_gongxian);
          var linear_temp=d3v3.scale.linear()
                .domain([0,maxx_temp])
                .range([0,1]);
        d3.selectAll("#sandian")
          .data(model_gongxian)
          .attr("fill",function(d){
              return compute_temp(linear_temp(d));
          })

        d3v3.selectAll("#Content-Yun_bian").remove();
            var tooltip=d3v3.select("body").append("div") 
                          .attr("id","Content-Yun_bian") 
                          .on("click",function()
                          {
                            // d3v3.selectAll("#Container").style("opacity",1);
                            d3v3.selectAll("#Content-Yun_bian").remove()
                          });
              C_B(e.currentTarget.id);
             // draw_wordcloud_bian(e.source.id,e.target.id,10,"#298B92");
             tooltip.style("left", (e.domEvent.clientX-400) + "px")
                    .style("top", (e.domEvent.clientY) + "px");
  });
  map.addOverlay(rectangle);  //添加矩形
  };

  }); 

  }); 
}
  function f1(){
    d3v3.csv("data/phone/changgui_new/Map_yichang"+id+".csv", function(csvdata) {
      d3v3.csv("data/phone/hotmap/hotmap.csv", function(hotdata) {
    var yichang=[];
    for(var i=0;i<csvdata.length;i++){
        yichang[i]=csvdata[i].yichang;
    }
  // console.log(yichang);
//   var b = d3v3.rgb(149, 64, 164);  //红色
//   var a = d3v3.rgb(255,255,255);  //白色
//   var compute = d3v3.interpolate(a,b);
  var maxx=Math.max.apply(Math, yichang);
  var linear = d3v3.scale.linear()
  .domain([0,maxx*1/5,maxx*2/5,maxx*3/5,maxx*4/5,maxx*5/5])
  .range(["#FEFEFE","#FFFEE1","#FFFEC5","#C53E2D","#DD8F73","#C53129"]);
//   var linear=d3v3.scale.linear()
//         .domain([0,maxx])
//         .range([0,1]);
  var input_quyu=[0,1,2,3,4,5,6,7,8,9];
  var quyu_all=[0,1,2,3,4,5,6,7,8,9];
  var quyu_shiqu=[0,1,2,3,4];
  var quyu_xiangcun=[5,6,7,8,9];
  var zhongxin;
  var zoom;
  if(id==1||id==11||id==12){
      input_quyu=quyu_all;
      zhongxin=[125.82426,44.267305];
      zoom=9;
  }else if(id==121||id==1211||id==1212||id==1213||id==1214||id==1215){
      input_quyu=quyu_shiqu;
      zhongxin=[125.82426,44.267305];
      zoom=9;
  }else if(id==122){
      input_quyu=quyu_xiangcun;
      zhongxin=[125.82426,44.267305];
      zoom=9;
  }
  var points=[];
  for(var i=0;i<hotdata.length;i++){
    points[i]={"lng":hotdata[i].lng,"lat":hotdata[i].lat,"count":100}
  }
  var fenqu=["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区","长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市","长春市"];
  // var fenqu_1=[chaoyang,nanguan,kuancheng,erdao,lvyuan,shuangyang,jiutai,dehui,nongan,yushu,changchun];
  var map = new BMap.Map("Top-Horizontal1");
  map.centerAndZoom(new BMap.Point(zhongxin[0],zhongxin[1]),zoom);
  map.enableScrollWheelZoom();
  map.setMapStyleV2({styleJson:styleJson_main});
  var bdary = new BMap.Boundary();

  function getBoundary(qu,qu_id){ 
    bdary.get(qu, function(rs){      //获取行政区域 
    var ply= new BMap.Polygon(rs.boundaries[0], {strokeWeight: 2, strokeColor: "white"});
    // console.log(ply)
    ply.setFillColor(linear(yichang[qu_id]));
    ply.setFillOpacity(0.5);
    ply.addEventListener('click', function (e) {
        // console.log(fenqu[qu_id],e.point)
        // console.log(qu_id)
        jzuhen(qu_id)
        // var model_gongxian=[];
        // for(var g=0;g<he.length;g++){
        //     model_gongxian[g]=csvdata[qu_id]["model"+(g+1)];
        //     model_gongxian[g+he.length]=csvdata[qu_id]["model"+(g+1)];
        // }
        //   var b_temp = d3v3.rgb(255,0,0);  //红色
        //   var a_temp = d3v3.rgb(100,100,100);  //白色
        //   var compute_temp = d3v3.interpolate(a_temp,b_temp);
        //   var maxx_temp=Math.max.apply(Math, model_gongxian);
        //   var linear_temp=d3v3.scale.linear()
        //         .domain([0,maxx_temp])
        //         .range([0,1]);
        // d3.selectAll("#sandian")
        //   .data(model_gongxian)
        //   .attr("fill",function(d){
        //       return compute_temp(linear_temp(d));
        //   })
        // // console.log(d3.selectAll("#sandian"));
        // d3v3.selectAll("#Content-Yun_bian").remove();
        //     var tooltip=d3v3.select("body").append("div") 
        //                   .attr("id","Content-Yun_bian") 
        //                   .on("click",function()
        //                   {
        //                     // d3v3.selectAll("#Container").style("opacity",1);
        //                     d3v3.selectAll("#Content-Yun_bian").remove()
        //                   });
        //       C_B(qu_id);
        //      // draw_wordcloud_bian(e.source.id,e.target.id,10,"#298B92");
        //      tooltip.style("left", (e.domEvent.clientX-400) + "px")
        //             .style("top", (e.domEvent.clientY) + "px");
    });
    map.addOverlay(ply);  //添加覆盖物
    });
  
  }
  for(var m=0;m<input_quyu.length;m++){
    getBoundary(fenqu[input_quyu[m]],m)
  }
  heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":5});
  map.addOverlay(heatmapOverlay);
  heatmapOverlay.setDataSet({data:points,max:100});
  heatmapOverlay.show();
  	// 复杂的自定义覆盖物
    function ComplexCustomOverlay(point){
      this._point = point;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.backgroundColor = "rgba(255,255,255,0)";
      div.style.border = "3px solid rgba(255,255,255,0)";
      div.style.width="50px";
      div.style.height="50px";
      div.style.transform="translate(-50%,-50%)";
      map.getPanes().labelPane.appendChild(div);
      return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x + "px";
      this._div.style.top  = pixel.y + "px";
    }   
    var pointas=[[125.318334,43.64432],[125.447115,43.739438 ],[125.332132,44.080271],[125.642587,43.899292],[125.182654,43.899292],[125.667883,43.522281],[125.854156,44.154825],[125.720775,44.545913],[125.182654,44.450447],[126.562452,44.841186]]
    for(var i=0;i<10;i++){
      var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(pointas[i][0],pointas[i][1]));
      map.addOverlay(myCompOverlay);

      // div中的可视化图形
      var width=myCompOverlay._div.scrollWidth;
      var height=myCompOverlay._div.scrollHeight;
      var svg = d3v3.select(myCompOverlay._div).append("svg")
      .attr("width", width)
      .attr("height", height);

      svg.append("circle")
      .attr("cx",width/2)
      .attr("cy",height/2)
      .attr("r",width/4)
      .style("stroke", function() { 
        return "#17969A"; })
      .style("stroke-width", function() { 
        return 4})  
      .attr("fill","white")
    }
 });
});
  }
}
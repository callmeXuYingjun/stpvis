// map_jiance()

function map_jiance(){
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
  var map = new BMap.Map("Top-Horizontal2-vertikal1");
  map.setMapStyle({styleJson:styleJson}); 
  // map.setMapStyle({style:'grassgreen'});
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
  var yichang=[];
  for(var i=0;i<csvdata.length;i++){
    yichang[i]=csvdata[i].yichang;
  }
  // console.log(yichang);
  var b = d3v3.rgb(149, 64, 164);  //红色
  var a = d3v3.rgb(255,255,255);  //白色
  var compute = d3v3.interpolate(a,b);
  var maxx=Math.max.apply(Math, yichang);
  var linear=d3v3.scale.linear()
        .domain([0,maxx])
        .range([0,1]);
  var input_quyu=[0,1,2,3,4,5,6,7,8,9];
  var quyu_all=[0,1,2,3,4,5,6,7,8,9];
  var quyu_shiqu=[0,1,2,3,4];
  var quyu_xiangcun=[5,6,7,8,9];
  var zhongxin;
  var zoom;
  if(id==1||id==11||id==12){
      input_quyu=quyu_all;
      zhongxin=[125.82426,44.267305];
      zoom=8;
  }else if(id==121||id==1211||id==1212||id==1213||id==1214||id==1215){
      input_quyu=quyu_shiqu;
      zhongxin=[125.82426,44.267305];
      zoom=8;
  }else if(id==122){
      input_quyu=quyu_xiangcun;
      zhongxin=[125.82426,44.267305];
      zoom=8;
  }

  
  var fenqu=["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区","长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市","长春市"];
  // var fenqu_1=[chaoyang,nanguan,kuancheng,erdao,lvyuan,shuangyang,jiutai,dehui,nongan,yushu,changchun];
  var map = new BMap.Map("Top-Horizontal2-vertikal1");
  map.setMapStyle({styleJson:styleJson}); 
  map.centerAndZoom(new BMap.Point(zhongxin[0],zhongxin[1]),zoom);
  map.enableScrollWheelZoom();
  var bdary = new BMap.Boundary();

  function getBoundary(qu,qu_id){ 
    bdary.get(qu, function(rs){      //获取行政区域 
    var ply= new BMap.Polygon(rs.boundaries[0], {strokeWeight: 2, strokeColor: "gray"});
    ply.setFillColor(compute(linear(yichang[qu_id])));
    ply.addEventListener('click', function (e) {
        // console.log(qu_id);
        var model_gongxian=[];
        for(var g=0;g<he.length;g++){
            model_gongxian[g]=csvdata[qu_id]["model"+(g+1)];
            model_gongxian[g+he.length]=csvdata[qu_id]["model"+(g+1)];
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
        // console.log(d3.selectAll("#sandian"));
        d3v3.selectAll("#Content-Yun_bian").remove();
            var tooltip=d3v3.select("body").append("div") 
                          .attr("id","Content-Yun_bian") 
                          .on("click",function()
                          {
                            // d3v3.selectAll("#Container").style("opacity",1);
                            d3v3.selectAll("#Content-Yun_bian").remove()
                          });
              C_B(qu_id);
             // draw_wordcloud_bian(e.source.id,e.target.id,10,"#298B92");
             tooltip.style("left", (e.domEvent.clientX-400) + "px")
                    .style("top", (e.domEvent.clientY) + "px");


        



    });
    map.addOverlay(ply);  //添加覆盖物
    });
  
  }
  for(var m=0;m<input_quyu.length;m++){
    getBoundary(fenqu[input_quyu[m]],m)
  }
 });









  }
}
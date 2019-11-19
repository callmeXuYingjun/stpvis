var num_map=0; //展示历史的结果为0，现在的为1 
function map_phone(){
    // console.log(num_map);
    if(lidu==0){
      f1();
    }else{
      f2();
    }
function f1(){

d3v3.csv("data/phone/changgui_new/C"+id+".csv", function(csvdata) {
  var changgui_C_history=[];
  var changgui_C_now=[];
  var changgui_C_cha=[];
  for(var k=0;k<he.length;k++){
    var temp="c"+(k+1);
    var temp_ce="ce_C"+(k+1);
    changgui_C_history[k]=[];
    changgui_C_now[k]=[];
    changgui_C_cha[k]=[];
    for(var i=0;i<csvdata.length;i++){
      changgui_C_history[k][i]=parseFloat(csvdata[i][temp]);
      changgui_C_now[k][i]=parseFloat(csvdata[i][temp_ce]);
      changgui_C_cha[k][i]=changgui_C_now[k][i]-changgui_C_history[k][i];
    }
  }
  var data_all=[changgui_C_history,changgui_C_now,changgui_C_cha];
  for(var i=0;i<4;i++){
    dmap(i);
  }
  function dmap(model_num){
    var changgui_C=data_all[num_map];
    var maxx=Math.max.apply(Math, changgui_C[model_num]);
    var minn=Math.min.apply(Math, changgui_C[model_num]);
  var linear = d3v3.scale.linear()
      .domain([0,maxx/2,maxx])
      .range(["#DFB2AD", "#67000D","#000000"]);
    var input_quyu=[0,1,2,3,4,5,6,7,8,9];
    var quyu_all=[0,1,2,3,4,5,6,7,8,9];
    var quyu_shiqu=[0,1,2,3,4];
    var quyu_xiangcun=[5,6,7,8,9];
    var zhongxin;
    var zoom;
    if(id==1||id==11||id==12){
        input_quyu=quyu_all;
        zhongxin=[125.82426,44.267305];
        zoom=7;
    }else if(id==121||id==1211||id==1212||id==1213||id==1214||id==1215){
        input_quyu=quyu_shiqu;
        zhongxin=[125.82426,44.267305];
        zoom=7;
    }else if(id==122){
        input_quyu=quyu_xiangcun;
        zhongxin=[125.82426,44.267305];
        zoom=7;
    }
  
    
    var fenqu=["长春市朝阳区","长春市南关区","长春市宽城区","长春市二道区","长春市绿园区","长春市双阳区","长春市九台市","长春市德惠市","长春市农安县","长春市榆树市","长春市"];
    // var fenqu_1=[chaoyang,nanguan,kuancheng,erdao,lvyuan,shuangyang,jiutai,dehui,nongan,yushu,changchun];
    var map = new BMap.Map("Down-Horizontal"+(model_num+2)+"-vertikal2-Horizontal1");
    // map.setMapStyle({styleJson:styleJson}); 
    map.setMapStyle({style:'grayscale'});
    map.centerAndZoom(new BMap.Point(zhongxin[0],zhongxin[1]),zoom);
    map.enableScrollWheelZoom();
    var bdary = new BMap.Boundary();
  
    function getBoundary(qu,qu_id){ 
      bdary.get(qu, function(rs){      //获取行政区域 
      var ply= new BMap.Polygon(rs.boundaries[0], {strokeWeight:1.5, strokeColor: "white"});
      ply.setFillColor(linear(changgui_C[model_num][qu_id]));
      ply.setFillOpacity(1);
      ply.addEventListener('click', function (e) {
          console.log(qu_id)
      });
      map.addOverlay(ply);  //添加覆盖物
      });
    
    }
    for(var m=0;m<input_quyu.length;m++){
      getBoundary(fenqu[input_quyu[m]],m)
    }

  }




 });
}


function f2(){
  d3v3.csv("data/phone/changgui_new/C"+id+"_wangge.csv", function(csvdata) {
  var path_temp;
  var zhongxin;
  var zoom;
  if(csvdata.length==1283){
      path_temp="data/phone/wang/phone_all.csv";
      zhongxin=[125.82426,44.267305];
      zoom=7;
  }else if(csvdata.length==1184){
      path_temp="data/phone/wang/phone_xiangcun.csv";
      zhongxin=[125.82426,44.267305];
      zoom=7;
  }else if(csvdata.length==141){
      path_temp="data/phone/wang/phone_shiqu.csv";
      zhongxin=[125.344899,43.7582524];
      zoom=9;
  }
  d3v3.csv(path_temp, function(wangdata) {
  // var yichang=[];
  // for(var i=0;i<csvdata.length;i++){
  //   yichang[i]=csvdata[i].yichang;
  // }

 
  var changgui_C_history=[];
  var changgui_C_now=[];
  var changgui_C_cha=[];
  for(var k=0;k<he.length;k++){
    var temp="c"+(k+1);
    var temp_ce="ce_C"+(k+1);
    changgui_C_history[k]=[];
    changgui_C_now[k]=[];
    changgui_C_cha[k]=[];
    for(var i=0;i<csvdata.length;i++){
      changgui_C_history[k][i]=parseFloat(csvdata[i][temp]);
      changgui_C_now[k][i]=parseFloat(csvdata[i][temp_ce]);
      changgui_C_cha[k][i]=changgui_C_now[k][i]-changgui_C_history[k][i];
    }
  }
  var data_all=[changgui_C_history,changgui_C_now,changgui_C_cha];
  for(var i=0;i<4;i++){
    dmap(i);
  }
  function dmap(model_num){
    var changgui_C=data_all[num_map];

    var maxx=Math.max.apply(Math, changgui_C[model_num]);
    var minn=Math.min.apply(Math, changgui_C[model_num]);
  
    var linear = d3v3.scale.linear()
    .domain([0,maxx/2,maxx])
    .range(["#DFB2AD", "#67000D","#000000"]);
    var map = new BMap.Map("Down-Horizontal"+(model_num+2)+"-vertikal2-Horizontal1");
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
    ], {strokeColor:"#CCCCCC", strokeWeight:2, strokeOpacity:0.8,fillColor:linear(changgui_C[model_num][i]),fillOpacity:1});  //创建矩形
    rectangle.id =i;
    rectangle.addEventListener('click', function(e) {
          console.log(e.currentTarget.id);
    });
    map.addOverlay(rectangle);  //添加矩形
    };

    
  }





  }); 

  }); 


}
}
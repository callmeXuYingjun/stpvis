function weinuo(node_one,treemapRadius,id_temp){
  // alert(111)
  //     console.log(node);
      // begin: constants
      var _2PI = 2*Math.PI;
      //end: constants
      
      //begin: layout conf.
      // var treemapRadius = 50;

      //end: layout conf.
      
      //begin: treemap conf.
      var _voronoiTreemap = d3.voronoiTreemap();
      var mySeededPrng = new Math.seedrandom('my seed'); // (from seedrandom's doc) Use "new" to create a local prng without altering Math.random
      _voronoiTreemap.prng(mySeededPrng);
      var minWeightRatio =  0.00000000001 ;
      _voronoiTreemap.minWeightRatio(minWeightRatio);
      var hierarchy, circlingPolygon;
      //end: treemap conf.
      
      //begin: drawing conf.
      var fontScale = d3.scaleLinear();
      //end: drawing conf.
      
      //begin: reusable d3Selection
      var svg, drawingArea, treemapContainer;
      //end: reusable d3Selection
      
      // d3.json("tree_java_1.json", function(error, rootData) {
        // if (error) throw error;
        var rootData=N_all[num_tree][id_temp];
        initData();
        initLayout(rootData);
        hierarchy = d3.hierarchy(rootData).sum(function(d){ 
          // return d.weight.toFixed(2); 
          return d.weight;
        });
        _voronoiTreemap
          .clip(circlingPolygon)
          (hierarchy);
        // console.log("hierarchy",hierarchy)
        drawTreemap(hierarchy);
      // });
      
      function initData(rootData) {
        circlingPolygon = computeCirclingPolygon(treemapRadius);
        fontScale.domain([3, 20]).range([8, 20]).clamp(true);
      }
      
      function computeCirclingPolygon(radius) {
        var points = 60,
            increment = _2PI/points,
            circlingPolygon = [];
        for (var a=0, i=0; i<points; i++, a+=increment) {
          circlingPolygon.push(
            [radius + radius*Math.cos(a), radius + radius*Math.sin(a)]
          )
        }
        
        return circlingPolygon;
      };
      
      function initLayout() {

        drawingArea = node_one.append("g")
          .classed("drawingArea", true);
        treemapContainer = drawingArea.append("g")
          .classed("treemap-container", true);

      }

      
      function drawTreemap(hierarchy) {
        var leaves=hierarchy.leaves();
        
        var cells = treemapContainer.append("g")
          .classed('cells', true)
          .attr("transform", "translate("+[-treemapRadius,-treemapRadius]+")")
          .selectAll(".cell")
          .data(leaves)
          .enter()
            .append("path")
              .classed("cell", true)
              .attr("d", function(d){ return "M"+d.polygon.join(",")+"z"; })
              .style("fill", function(d){
                // console.log(d.data.biaozhi)
                if(d.data.biaozhi==1){
                  return d.parent.data.color;
                }else if(d.data.biaozhi==0){
                  return "yellow";
                }else if(d.data.biaozhi==-1){
                  return "grey";
                }else{
                  return d.parent.data.color;
                }
                // console.log(typeof(d.data.biaozhi)!="undefined");
                
              });
        
        var labels = treemapContainer.append("g")
          .classed('labels', true)
          .attr("transform", "translate("+[-treemapRadius,-treemapRadius]+")")
          .selectAll(".label")
          .data(leaves)
          .enter()
            .append("g")
              .classed("label", true)
              .attr("transform", function(d){
                return "translate("+[d.polygon.site.x, d.polygon.site.y]+")";
              })
              .style("font-size", function(d){ return fontScale(d.data.weight.toFixed(2)); });
        var hoverers = treemapContainer.append("g")
          .classed('hoverers', true)
          .attr("transform", "translate("+[-treemapRadius,-treemapRadius]+")")
          .selectAll(".hoverer")
          .data(leaves)
          .enter()
            .append("path")
              .classed("hoverer", true)
              .attr("d", function(d){ return "M"+d.polygon.join(",")+"z"; });
      labels.append("text")
          .classed("name", true)
          .style("font-size","4px")
          .html(function(d){
            return d.data.weight>0.1?d.data.name:null;
            // return (d.data.weight<1)? d.data.code : d.data.name;
          });
        // labels.append("text")
        //   .classed("value", true)
        //   .text(function(d){ return d.data.weight.toFixed(2);+"%"; });     

        hoverers.append("title")
          .text(function(d) { return d.data.name + "\n" + d.value+"%"; });
      }

      }
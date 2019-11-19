    var shunxu=3;
    var menu=document.getElementById("menu");
    document.oncontextmenu=function(ev){
        var ev=ev||event;
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        menu.style.display="block";
        menu.style.left=ev.clientX+"px";
        //当滑动滚动条时也能准确获取菜单位置
        menu.style.top=ev.clientY+scrollTop+"px";
        //阻止默认事件
        return false;
    }
    var oBtn = document.getElementById('but');
    oBtn.onclick = function(){
        var select_mode = document.getElementById("select_mode"); 
        var select_mode_index = select_mode.selectedIndex; 
        var select_julei = document.getElementById("select_julei");
        var select_julei_index = select_julei.selectedIndex; 
        var inputDom = document.getElementById("julei_num");
        var text_temp = inputDom.value; 
        // console.log(select_mode_index+"  "+select_julei_index+"   "+text_temp);
        document.getElementById('menu').style.display='none';
        shunxu++;
        treee(shunxu);
    };
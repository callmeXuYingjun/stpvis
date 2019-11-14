<template>
<div id="Slider_div">
   
    
    <!-- <Select  style="width:100px"></Select> -->
    <h3>{{new Date(new Date("2020-04-06 00:00:00").getTime()+60000*value[0]).format("yyyy-MM-dd hh:mm:ss")}}</h3>
    <Icon :type=bofang_zhuangtai  @click="bofang"  size="34"/>
    <Slider v-model="value" :min=0 :max=7200  :tip-format="format" @on-change="say" range></Slider>
    
    
</div>
</template>

<script>
import store from '../vuex/store.js'
var start_initial="2020-04-06 00:00:00";
var start_initial_chuo=new Date(start_initial).getTime();
export default {
        data(){
                var starttime_chuo=new Date(store.state.starttime).getTime();
                var endtime_chuo=new Date(store.state.endtime).getTime();
                // var nowtime_chuo=new Date(store.state.nowtime).getTime();
            return {
                value:[(starttime_chuo-start_initial_chuo)/60000,(endtime_chuo-start_initial_chuo)/60000],// 一分钟
                sharedState: store.state,
                bofang_zhuangtai:"md-play"
            }
        },
         mounted: function () {
            var _this=this;
            var btn1=document.getElementsByClassName("ivu-slider-button-wrap");
            btn1[0].onmousedown=function(){
                 clearInterval(store.state.timer)
                }
            btn1[0].onmouseup=function(){
                store.commit('startHua_biaoji_update')
            }
            btn1[1].onmousedown=function(){
                 clearInterval(store.state.timer)
                }
            btn1[1].onmouseup=function(){
                store.commit('startHua_biaoji_update')
            }
            var btn2=document.getElementsByClassName("ivu-slider-wrap");
            btn2[0].onclick=function(){
                 clearInterval(store.state.timer)
                 store.commit('timequjian_update', [new Date(start_initial_chuo+60000*_this.value[0]).format("yyyy-MM-dd hh:mm:ss"),new Date(start_initial_chuo+60000*_this.value[1]).format("yyyy-MM-dd hh:mm:ss")])
                 store.commit('starttime_update', new Date(start_initial_chuo+60000*_this.value[0]).format("yyyy-MM-dd hh:mm:ss"))
                 store.commit('endtime_update',new Date(start_initial_chuo+60000*_this.value[1]).format("yyyy-MM-dd hh:mm:ss"))
                }       
        },
        watch:{
            'sharedState.mobilesensor_set':function(newdata){
                this.bofang_zhuangtai="md-play";
                clearInterval(store.state.timer)
            },
            'sharedState.speed':function(newdata){
                this.bofang_zhuangtai="md-play";
                clearInterval(store.state.timer)
            },
            'sharedState.starttime':function(newdata){
                var starttime_chuo=new Date(store.state.starttime).getTime();
                var endtime_chuo=new Date(store.state.endtime).getTime();
                this.value=[(starttime_chuo-start_initial_chuo)/60000,(endtime_chuo-start_initial_chuo)/60000];
            },
            'sharedState.endtime':function(newdata){
                var starttime_chuo=new Date(store.state.starttime).getTime();
                var endtime_chuo=new Date(store.state.endtime).getTime();
                this.value=[(starttime_chuo-start_initial_chuo)/60000,(endtime_chuo-start_initial_chuo)/60000];
            }
        },
        methods: {
            format (val) {
                let time=new Date(start_initial_chuo+60000*val).format("yyyy-MM-dd hh:mm:ss");
                return time;
            },
            bofang:function(e){
                if(this.bofang_zhuangtai=="md-play"){
                    if(store.state.map_sensor_data.length!=0){
                        this.bofang_zhuangtai="md-pause";
                        store.commit('drawCircle_biaoji_update')
                    }else{
                        alert("加载数据中")
                    }
                    // store.dispatch('map_sensor') 
                }else{
                    this.bofang_zhuangtai="md-play";
                    clearInterval(store.state.timer)
                }
            },
            say: function () { 
              clearInterval(store.state.timer)
              this.bofang_zhuangtai="md-play";
              store.commit('starttime_update', new Date(start_initial_chuo+60000*this.value[0]).format("yyyy-MM-dd hh:mm:ss"))
              store.commit('endtime_update',new Date(start_initial_chuo+60000*this.value[1]).format("yyyy-MM-dd hh:mm:ss"))
              store.commit('timequjian_update', [new Date(start_initial_chuo+60000*this.value[0]).format("yyyy-MM-dd hh:mm:ss"),new Date(start_initial_chuo+60000*this.value[1]).format("yyyy-MM-dd hh:mm:ss")])

           }
        }
    }
</script>
<style scoped>
#Slider_div{
    width:99%;
    height:9.5%;
    background-color: #F5F5F5;
    border-width:1px; border-style: solid; border-color:#C7C7C7;
    margin:0% 0.5% 0.5% 0.5%;
}
#Slider_div .ivu-icon{
    float: left;
    width:5%;
    height:50%;
}
#Slider_div .ivu-slider-range{
    float: left;
    width:95%;
    height:50%;
}

#font1{
   /* color:#EEEEEE; */
   font-family:'Microsoft Yahei';
   /* font-weight:bold; */
   float: right;
   /* margin-top:5px; */
   /* margin-left:%; */
    
}

</style>
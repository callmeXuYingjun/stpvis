<template>
<div id="Option_div">
<!-- <div id="Checkbox_div"> -->
    <font id="font1">Trajectory View</font> 
    <Select v-model="model16" multiple :max-tag-count="2"   style="width:200px;height:5px" size="small"  @on-change="say">
        <Option v-for="item in sensorset" :value="item" :key="item">{{ item }}</Option>
    </Select>
    <font id="font2">sensors:&nbsp;</font>
    <Select v-model="modelspeed"  style="width:50px;height:5px" size="small"  @on-change="sayspeed">
        <Option v-for="item in speedset" :value="item" :key="item">{{ item }}</Option>
    </Select>
    <font id="font3">speed:&nbsp;</font>
</div>
</template>
<script>
import store from '../vuex/store.js'
    export default {
        data () {
            return {
                sensorset:["all","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"],
                speedset:["x1","x2","x3","x4","x5"],
                modelspeed:["x3"],
                model16:store.state.mobilesensor_set,
                sharedState: store.state,
            }
        },
        methods: {
            maxTagPlaceholder (num) {
                return 'more '+ num;
            },
            say: function () {
                    if(this.model16.indexOf("all")!=-1){
                        this.model16=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"];
                    }
                    if(this.model16.indexOf("null")!=-1){
                        this.model16=[];
                    }
                    if(this.model16.length==0){
                         this.sensorset[0]="all"
                    }
                    if(this.model16.length==59){
                        this.sensorset[0]="null"
                    }
                    // console.log(this.sharedState.mobilesensor_set)
                    if(this.model16.toString()!=this.sharedState.mobilesensor_set.toString()){
                        store.commit('mobilesensor_set_update', this.model16)
                    }   
            },
            sayspeed: function () {        
                store.commit('speed_update', this.modelspeed) 
            }
        },
        watch:{
            'sharedState.mobilesensor_set':function(newdata){
                this.model16=newdata;
            },
            'sharedState.speed':function(newdata){
                this.modelspeed=newdata;
            }
        }
    }
</script>
<style scoped>
#Option_div{
    width:99%;
    height:5.5%;
    background: linear-gradient(-45deg,#333333 25%,#3B3B3B 0,
                            #3B3B3B 50%,#333333 0,
                            #333333 75%,#3B3B3B 0);
    background-size: 30px 30px;
    border-radius:6px;
    margin:0.5% 0.5% 0 0.5%;
}
font{
   color:#EEEEEE;
   font-family:'Microsoft Yahei';
   font-weight:bold;
   float: left;
   margin-left:2%;
    /* position: relative;
    top: 18%;
    left: 2%; */
}
#font1{
   color:#EEEEEE;
   font-family:'Microsoft Yahei';
   font-weight:bold;
   float: left;
   margin-top:5px;
   margin-left:2%;
}
#font2{
   color:#EEEEEE;
   font-family:'Microsoft Yahei';
   /* font-weight:bold; */
   float: right;
   margin-top:5px;
   /* margin-left:%; */
    
}
#font3{
   color:#EEEEEE;
   font-family:'Microsoft Yahei';
   /* font-weight:bold; */
   float: right;
   margin-top:5px;
   /* margin-left:%; */
    
}

#Option_div .ivu-select{
    float: right;
    width:30%;
    height:100%;
    margin-right:2%;
    margin-top:3px;
}

</style>


// 4. new Vuex.Store() 实例，得到一个 数据仓储对象
import Vue from 'vue'
import Vuex from 'vuex'
import d3 from 'd3'
Vue.use(Vuex)
var store = new Vuex.Store({
  state: {
    // 大家可以把 state 想象成 组件中的 data ,专门用来存储数据的
    // 如果在 组件中，想要访问，store 中的数据，只能通过 this.$store.state.*** 来访问
    wangge_id:"all",
    map_path_data:[],
    map_sensor_data:[],
    heatmap_data:[],
    starttime:'2020-04-06 00:00:00',
    endtime:'2020-04-11 00:00:00',
    timequjian:['2020-04-06 00:00:00','2020-04-11 00:00:00'],
    timer:"",
    wangge_yichang_hour:"",
    mobilesensor_set:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","static1","static4","static6","static9","static11","static12","static13","static14","static15"],
    drawCircle_biaoji:0,
    startHua_biaoji:0,
    tab_pingxing_biaoji:0,
    matrix_csvdata_AVG:[],
    selectedSort:0,//0->sensor,1->grid
    selectedID:"10",//sensor,grid的id
    speed:"x3",//sensor,grid的id

  },
  mutations: {
    // 注意： 如果要操作 store 中的 state 值，只能通过 调用 mutations 提供的方法，才能操作对应的数据，不推荐直接操作 state 中的数据，因为 万一导致了数据的紊乱，不能快速定位到错误的原因，因为，每个组件都可能有操作数据的方法；
    selectedSort_update(state,newsort) {
      state.selectedSort=newsort
    },
    speed_update(state,newsort) {
      state.speed=newsort
    },
    timequjian_update(state,newsort) {
      state.timequjian=newsort
    },
    heatmap_data_update(state,newsort) {
      state.heatmap_data=newsort
    },
    selectedID_update(state,newID) {
      state.selectedID=newID
    },
    drawCircle_biaoji_update(state) {
      state.drawCircle_biaoji++
    },
    startHua_biaoji_update(state) {
      state.startHua_biaoji++
    },
    starttime_update(state,newtime) {
      state.starttime=newtime;
    },
    nowtime_update(state,newtime) {
      state.nowtime=newtime;
    },
    endtime_update(state,newtime) {
      state.endtime=newtime;
    },
    wangge_id_update(state,newid) {
      state.wangge_id=newid;
    },
    mobilesensor_set_update(state,newset) {
      state.mobilesensor_set=newset;
    },
    tab_pingxing_biaoji_update(state,data) {
      state.tab_pingxing_biaoji=data;
    },
    matrix_csvdata_AVG_update(state,newdata) {
      state.matrix_csvdata_AVG=newdata;
    },
    // // 注意： 如果组件想要调用 mutations 中的方法，只能使用 this.$store.commit('方法名')
    // // 这种 调用 mutations 方法的格式，和 this.$emit('父组件中方法名')
    // subtract(state, obj) {
    //   // 注意： mutations 的 函数参数列表中，最多支持两个参数，其中，参数1： 是 state 状态； 参数2： 通过 commit 提交过来的参数；
    //   console.log(obj)
    //   state.count -= (obj.c + obj.d)
    // },
    map_path(state,data) {
      state.map_path_data=data;
    },
    map_sensor(state,data) {
      state.map_sensor_data=data;
    },
    wangge_yichang_hour_update(state,data) {
      state.wangge_yichang_hour=data;
    },
  },
  actions: {
    matrix_csvdata_AVG_action({ commit }) {
        d3.csv("data/matrix/allsensor_avg.csv", function(zhandata){
          commit('matrix_csvdata_AVG_update',zhandata)
        });
    },
    heatmap_data_action({ commit }) {
      d3.csv("data/heatmap/value_1500.csv", function(data){
        commit('heatmap_data_update',data)
      });
    },
    map_path({ commit, state  }) {
        function readcsv_pi(id){
          return new Promise(function(resolve) {
          d3.csv("data/path/sensorpaths/sensor_path_new"+id+".csv", function(zhandata){
            var temp=[];
            for(var i=0;i<zhandata.length;i++){
              var starttime_chuo=new Date(state.timequjian[0]).getTime();
              var endtime_chuo=new Date(state.timequjian[1]).getTime();
              var temp_chuo=new Date(zhandata[i].timestamp).getTime();
              if(temp_chuo>=starttime_chuo&&temp_chuo<=endtime_chuo)
                temp.push([parseFloat(zhandata[i].lat),parseFloat(zhandata[i].lng)])
              }
            resolve(temp)
          })
          });
        }
        var promise_set=[];
        for(var i=0;i<50;i++){
          promise_set.push(readcsv_pi(i+1))
        }

        Promise.all(promise_set).then(function(value) {
          commit('map_path',value)
        });
    },

    // map_sensor({ commit }) {
    //   function readcsv_all(){
    //     return new Promise(function(resolve, reject) {
    //       axios.get('/sensor_all_path')
    //         .then(function (response) {
    //           resolve(response.data.data)
    //         })
    //         .catch(function (error) {
    //            console.log(error);
    //         });

    //     });
    //   }
    //   readcsv_all()
    //   .then(data=>{
    //     commit('map_sensor',data)
    //   })
         
    // },


    
    map_sensor({ commit }) {
      function readcsv_all(){
        return new Promise(function(resolve) {
          d3.csv("data/sensorreadings_minute/sensorreadings_minute.csv", function(results){
            // console.log(results)
            var temp={};
            for(var i=0;i<results.length;i++){
              if(typeof temp[results[i].sensor_id]=="undefined"){
                temp[results[i].sensor_id]={};
              }
              var date = new Date(results[i].timestamp1);  
              var date_value=new Date(date).format("yyyy-MM-dd hh:mm:ss");
              // alert(date_value)
              temp[results[i].sensor_id][date_value]=[];
              temp[results[i].sensor_id][date_value][0]=parseFloat(results[i].lat1);
              temp[results[i].sensor_id][date_value][1]=parseFloat(results[i].long1);
              temp[results[i].sensor_id][date_value][2]=parseFloat(results[i].value1);
              }
            resolve(temp)
          })
        });
      }
      readcsv_all()
      .then(data=>{
        // console.log(data)
        commit('map_sensor',data)
      })    
    },

    wangge_yichang_hour_action({ commit }) {
      function read_wangge_yichang_hour(){
        return new Promise(function(resolve) {
          d3.csv("data/map/wangge_time_yichang/sensor_time_wangge_yicahng_hour.csv", function(csvdata){
            var out={};
            var start_initial="2020-04-06 00:00:00";
            var start_initial_chuo=new Date(start_initial).getTime();
            for(var i=0;i<120;i++){
                var temp=new Date(start_initial_chuo+3600000*i).format("yyyy-MM-dd hh:mm:ss")
                out[temp]=[];
                var lie="time"+i;
                for(var j=0;j<csvdata.length;j++){
                  out[temp][j]=csvdata[j][lie];
                  // console.log(csvdata[j][lie])
                }
            }
            resolve(out)
          })
        });
      }
      read_wangge_yichang_hour()
      .then(data=>{
        commit('wangge_yichang_hour_update',data)
      })
    }











    // map_sensor({ commit },time_s_e) {
    //   function readcsv_all(id){
    //     return new Promise(function(resolve, reject) {
    //       axios.get('/sensor_all_path', {
    //           params: {
    //             id: id,
    //             starttime:time_s_e.starttime,
    //             endtime:time_s_e.endtime
    //           }
    //         })
    //         .then(function (response) {
    //           resolve(response.data.data)
    //         })
    //         .catch(function (error) {
    //            console.log(error);
    //         });

    //     });
    //   }
    //   var promise_set1=[];
    //   for(var i=0;i<10;i++){
    //     promise_set1.push(readcsv_all(i+1))
    //   }
    //   Promise.all(promise_set1).then(function(value) {
    //      commit('map_sensor',value)
    //   });
    // }
  },
  getters: {
    // 注意：这里的 getters， 只负责 对外提供数据，不负责 修改数据，如果想要修改 state 中的数据，请 去找 mutations
    optCount: function (state) {
      return '当前最新的count值是：' + state.count
    }
    // 经过咱们回顾对比，发现 getters 中的方法， 和组件中的过滤器比较类似，因为 过滤器和 getters 都没有修改原数据， 都是把原数据做了一层包装，提供给了 调用者；
    // 其次， getters 也和 computed 比较像， 只要 state 中的数据发生变化了，那么，如果 getters 正好也引用了这个数据，那么 就会立即触发 getters 的重新求值；
  }
})

export default store
// 4. new Vuex.Store() 实例，得到一个 数据仓储对象
import Vue from 'vue'
import Vuex from 'vuex'
import * as d3 from "d3";
Vue.use(Vuex)
var store = new Vuex.Store({
  state: {
    // 大家可以把 state 想象成 组件中的 data ,专门用来存储数据的
    // 如果在 组件中，想要访问，store 中的数据，只能通过 this.$store.state.*** 来访问
    wangge_id: "all",
    testData: {}
  },
  mutations: {
    testData_Update(state,data) {
      state.testData = data
    },
  },
  actions: {
    testData_action({ commit }) {
      function read_testData() {
        return new Promise(function (resolve) {
          d3.csv("data/test/testData.csv", function (csvdata) {
            // var out=[];
            // console.log("!!!!!!!!!!!!!!!!!!!")
            // console.log(csvdata)
            resolve(csvdata)
          })
        });
      }
      read_testData()
        .then(data => {
          commit('testData_Update', data)
        })
    }
  },
  getters: {
  }
})

export default store
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
    testData: {},
    scatterData: [],
    boundaryData: {},
  },
  mutations: {
    testData_Update(state, data) {
      state.testData = data
    },
    scatterData_Update(state, data) {
      state.scatterData = data
    },
    boundaryData_Update(state, data) {
      state.boundaryData = data
    },
  },
  actions: {
    testData_action({ commit }) {
      function read_testData() {
        return new Promise(function (resolve) {
          d3.csv("data/test/testData.csv").then(function (csvdata) {
            resolve(csvdata)
          });
        });
      }
      read_testData()
        .then(data => {
          commit('testData_Update', data)
        })
    },
    scatterData_action({ commit }) {
      function read_scatterData() {
        return new Promise(function (resolve) {
          d3.csv("data/scatter/scatter.csv").then(function (csvdata) {
            resolve(csvdata)
          });
        });
      }
      read_scatterData()
        .then(data => {
          commit('scatterData_Update', data)
        })
    },
    boundaryData_action({ commit }) {
      function read_boundaryData() {
        return new Promise(function (resolve) {
          d3.json("data/boundary/ChangchunBoundary.json").then(function (csvdata) {
            resolve(csvdata)
          });
        });
      }
      read_boundaryData()
        .then(data => {
          commit('boundaryData_Update', data)
        })
    }
  },
  getters: {
  }
})

export default store
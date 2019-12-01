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
    marginalDistributionData: [],
    patternData: [],
    anomalyData: [],
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
    marginalDistributionData_Update(state, data) {
      state.marginalDistributionData = data
    },
    patternData_Update(state, data) {
      state.patternData = data
    },
    anomalyData_Update(state, data) {
      state.anomalyData = data
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
          d3.csv("data/scatter/scatter1.csv").then(function (csvdata) {
            resolve(csvdata)
          });
        });
      }
      read_scatterData()
        .then(data => {
          commit('scatterData_Update', data)
        })
    },
    anomalyData_action({ commit }) {
      function read_anomalyData() {
        return new Promise(function (resolve) {
          d3.csv("data/anomaly/C1.csv").then(function (csvdata) {
            var out = []
            for (var i = 0; i <csvdata.length ; i++) {
              out[i] = []
              for (var j = 0; j < 13; j++) {
                out[i][j] = parseFloat(csvdata[i]['anomaly' + (j + 1)])
              }
            }
            resolve(out)
          });
        });
      }
      read_anomalyData()
        .then(data => {
          commit('anomalyData_Update', data)
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
    },
    marginalDistributionData_action({ commit }) {
      function read_marginalDistributionData() {
        return new Promise(function (resolve) {
          d3.csv("data/marginalDistribution/A1.csv").then(function (csvdata_A) {
            d3.csv("data/marginalDistribution/B1.csv").then(function (csvdata_B) {
              d3.csv("data/marginalDistribution/C1.csv").then(function (csvdata_C) {
                resolve([csvdata_A, csvdata_B, csvdata_C])
              });
            });
          });
        });
      }
      read_marginalDistributionData()
        .then(data => {
          commit('marginalDistributionData_Update', data)
        })
    },
    patternData_action({ commit }) {
      function read_patternData() {
        return new Promise(function (resolve) {
          d3.csv("data/pattern/A1.csv").then(function (csvdata_A) {
            d3.csv("data/pattern/B1.csv").then(function (csvdata_B) {
              d3.csv("data/pattern/C1.csv").then(function (csvdata_C) {
                var out = [[], [], []]
                for (var i = 0; i < 117; i++) {
                  out[0][i] = []
                  for (var a = 0; a < csvdata_A.length; a++) {
                    out[0][i][a] = parseFloat(csvdata_A[a]['a' + (i + 1)])
                  }
                  out[1][i] = []
                  for (var b = 0; b < csvdata_B.length; b++) {
                    out[1][i][b] = parseFloat(csvdata_B[b]['b' + (i + 1)])
                  }
                  out[2][i] = []
                  for (var c = 0; c < csvdata_C.length; c++) {
                    out[2][i][c] = parseFloat(csvdata_C[c]['c' + (i + 1)])
                  }
                }
                resolve(out)
              });
            });
          });
        });
      }
      read_patternData()
        .then(data => {
          commit('patternData_Update', data)
        })
    },
  },
  getters: {
  }
})

export default store
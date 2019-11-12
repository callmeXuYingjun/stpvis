// 4. new Vuex.Store() 实例，得到一个 数据仓储对象
import Vue from 'vue'
import Vuex from 'vuex'
// import d3 from 'd3'
Vue.use(Vuex)
var store = new Vuex.Store({
  state: {
    // 大家可以把 state 想象成 组件中的 data ,专门用来存储数据的
    // 如果在 组件中，想要访问，store 中的数据，只能通过 this.$store.state.*** 来访问
    wangge_id:"all",
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  }
})

export default store
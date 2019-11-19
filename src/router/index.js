import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Scatter from '@/components/Scatter'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
         'HelloWorld':HelloWorld,
         'Test':Test,
         'Scatter':Scatter,
      }
    }
  ]
})

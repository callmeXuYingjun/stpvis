import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Scatter from '@/components/Scatter'
import Tree from '@/components/Tree'
import Matrix from '@/components/Matrix'
import Pattern from '@/components/Pattern'
import WordCloud from '@/components/WordCloud'
import Anomaly from '@/components/Anomaly'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        'HelloWorld': HelloWorld,
        'Test': Test,
        'Scatter': Scatter,
        'Tree': Tree,
        'Matrix': Matrix,
        'Pattern': Pattern,
        'WordCloud': WordCloud,
        'Anomaly': Anomaly,
      }
    }
  ]
})

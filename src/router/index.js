import Vue from 'vue'
import Router from 'vue-router'
import Scatter from '@/components/Scatter'
import Tree from '@/components/Tree'
import Matrix from '@/components/Matrix'
import Pattern from '@/components/Pattern'
import WordCloud from '@/components/WordCloud'
import Anomaly from '@/components/Anomaly'
import Query from '@/components/Query'
// import Select from '@/components/Select'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        'Scatter': Scatter,
        'Tree': Tree,
        'Matrix': Matrix,
        'Pattern': Pattern,
        'WordCloud': WordCloud,
        'Anomaly': Anomaly,
        'Query':Query
        // 'Select':Select,
      }
    }
  ]
})

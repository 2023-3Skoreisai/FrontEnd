import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import Score from "../views/score.vue"
import Data from "../views/data.vue"
import Support from "../views/support.vue"
import Score_detail from "../views/page/score_detail.vue"
import Result_detail from "../views/page/result_detail.vue"
import Error from "../views/error.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    },
    {
      path: '/page/score',
      name: 'score_detail',
      component: Score_detail
    },
    {
      path: '/page/result',
      name: 'result_detail',
      component: Result_detail
    },
    {
      path: '/error',
      name: 'error',
      component: Error
    },

  ]
})

export default router

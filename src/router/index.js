import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'
import Favorites from "../views/Favorites";
import Questionnaires from "../views/Questionnaires";
import Questionnaire from "../views/Questionnaire";

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/questionnaires',
    name: 'Questionnaires',
    component: Questionnaires
  }
  ,
  {
    path: '/questionnaire',
    name: 'Questionnaire',
    component: Questionnaire
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

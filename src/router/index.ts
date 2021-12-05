import { createWebHistory, createRouter } from 'vue-router';
import News from '../views/News.vue';
import Politic from '../views/Politic.vue';

const routes = [
  {
    path: '/',
    name: 'News',
    component: News,
  },
  {
    path: '/politic',
    name: 'Politic',
    component: Politic,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

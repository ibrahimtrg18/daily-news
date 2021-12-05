import { createWebHistory, createRouter } from 'vue-router';
import News from '../views/News.vue';
import Politic from '../views/Politic.vue';
import Health from '../views/Health.vue';

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
  {
    path: '/health',
    name: 'Health',
    component: Health,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

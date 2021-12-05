import { createWebHistory, createRouter } from 'vue-router';
import News from '../views/News.vue';
import Politic from '../views/Politic.vue';
import Health from '../views/Health.vue';
import Search from '../views/Search.vue';

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
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

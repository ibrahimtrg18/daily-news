import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import translation from './utils/translation';

const i18n = createI18n({
  locale: 'en',
  messages: translation,
});

createApp(App).use(i18n).use(router).mount('#app');

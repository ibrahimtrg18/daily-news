import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import messages from './utils/messages';

const i18n = createI18n({
  locale: 'id',
  messages,
});

createApp(App).use(i18n).use(router).mount('#app');

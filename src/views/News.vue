<template>
  <div class="content">
    <LastestNews />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LastestNews from '../components/LastestNews.vue';

export default defineComponent({
  name: 'News',
  components: {
    LastestNews,
  },
});
</script>

<style></style>

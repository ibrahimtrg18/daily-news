<template>
  <div class="content">
    <LastestNews :language="language" />
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
  props: ['language'],
});
</script>

<style></style>

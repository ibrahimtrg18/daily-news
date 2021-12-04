<template>
  <div class="content">
    <LastestNews :language="language" />
    <FeatureNews :language="language" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LastestNews from '../components/LastestNews.vue';
import FeatureNews from '../components/FeatureNews.vue';

export default defineComponent({
  name: 'News',
  components: {
    LastestNews,
    FeatureNews,
  },
  props: ['language'],
});
</script>

<style></style>

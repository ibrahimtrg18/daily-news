<template>
  <div class="content">
    <ListNews :language="language" />
    <FeatureNews :language="language" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ListNews from '../components/ListNews.vue';
import FeatureNews from '../components/FeatureNews.vue';

export default defineComponent({
  name: 'News',
  components: {
    ListNews,
    FeatureNews,
  },
  props: ['language'],
});
</script>

<style></style>

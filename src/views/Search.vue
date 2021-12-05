<template>
  <div class="content">Search: {{ query }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Article } from '../interfaces/Articles';
import { fetchEverything } from '../utils/services';

export default defineComponent({
  name: 'Search',
  props: ['language'],
  data() {
    return {
      articles: [] as Article[],
      isLoading: false,
      page: 1,
    };
  },
  computed: {
    query() {
      return this.$route.query.query as string;
    },
  },
});
</script>

<style lang="scss"></style>

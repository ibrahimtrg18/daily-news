<template>
  <div class="content">Search</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Article } from '../interfaces/Articles';

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
});
</script>

<style lang="scss"></style>

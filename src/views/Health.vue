<template>
  <div class="content">
    <CategoryNews :title="$t('health.title')" :articles="articles"> </CategoryNews>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Article } from '../interfaces/Articles';
import CategoryNews from '../components/CategoryNews.vue';
import { fetchTopHeadlines } from '../utils/services';

export default defineComponent({
  name: 'Health',
  components: {
    CategoryNews,
  },
  props: ['language'],
  data() {
    return {
      articles: [] as Article[],
      isLoading: false,
    };
  },
  methods: {
    async fetchTopHeadlinesByLanguage(language: string) {
      try {
        const data = await fetchTopHeadlines({
          country: language,
          limit: 10,
          page: 1,
          category: 'health',
        });
        return data;
      } catch (err) {
        console.error(err);
        return {
          articles: [],
        };
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    const data = await this.fetchTopHeadlinesByLanguage(this.language!);
    if (data.articles) {
      this.articles = data.articles;
    }
    this.isLoading = false;
  },
});
</script>

<style lang="scss"></style>

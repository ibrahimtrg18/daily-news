<template>
  <div class="content">
    <CategoryNews
      :title="$t('health.title')"
      :articles="articles"
      :page="page"
      @update:page="onPageChange"
    />
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
      page: 1,
    };
  },
  methods: {
    async getTopHeadlines({ language, page }: { language?: string; page?: number }) {
      try {
        const data = await fetchTopHeadlines({
          country: language,
          limit: 10,
          page,
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
    onPageChange(newPageValue: number) {
      if (newPageValue !== 0) {
        this.page = newPageValue;
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    const data = await this.getTopHeadlines({ language: this.language });
    if (data.articles) {
      this.articles = data.articles;
    }
    this.isLoading = false;
  },
  watch: {
    async language(value) {
      this.isLoading = true;
      const data = await this.getTopHeadlines({ language: value });

      if (data.articles) {
        this.articles = data.articles;
      }

      this.isLoading = false;
    },
    async page(value) {
      this.isLoading = true;
      const data = await this.getTopHeadlines({ page: value });
      if (data.articles) {
        this.articles = data.articles;
      }
      this.isLoading = false;
    },
  },
});
</script>

<style lang="scss"></style>

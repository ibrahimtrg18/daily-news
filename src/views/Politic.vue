<template>
  <div class="content">
    <CategoryNews
      :title="$t('politic.title')"
      :articles="articles"
      :page="page"
      :isLoading="isLoading"
      :disabledRightButton="disabledRightButton"
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
  name: 'Politic',
  components: {
    CategoryNews,
  },
  props: ['language'],
  data() {
    return {
      articles: [] as Article[],
      isLoading: false,
      page: 1,
      limit: 10,
      disabledRightButton: false,
    };
  },
  methods: {
    async getArticles({ language, page }: { language?: string; page?: number }) {
      try {
        this.isLoading = true;
        const data = await fetchTopHeadlines({
          country: language,
          limit: this.limit,
          page,
          category: 'politics',
        });
        this.isLoading = false;
        if (this.limit * this.page >= data.totalResults) {
          this.disabledRightButton = true;
        } else {
          this.disabledRightButton = false;
        }
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
    const data = await this.getArticles({ language: this.language, page: this.page });
    if (data.articles) {
      this.articles = data.articles;
    }
  },
  watch: {
    async language(value) {
      const data = await this.getArticles({ language: value, page: this.page });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
    async page(value) {
      const data = await this.getArticles({ language: this.language, page: value });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
  },
});
</script>

<style lang="scss"></style>

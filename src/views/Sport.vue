<template>
  <div class="content">
    <CategoryNews
      :title="$t('sport.title')"
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
import { fetchNews } from '../services/news';

export default defineComponent({
  name: 'Sports',
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
    async getArticles({ language, page }: { language?: string; page: number }) {
      try {
        this.isLoading = true;
        const data = await fetchNews({
          limit: this.limit,
          offset: page - 1,
          categories: 'sports',
          languages: language,
        });
        this.isLoading = false;
        if (this.limit * this.page >= data.pagination.total) {
          this.disabledRightButton = true;
        } else {
          this.disabledRightButton = false;
        }
        return data;
      } catch (err) {
        console.error(err);
        return {
          data: [],
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
    if (data.data) {
      this.articles = data.data;
    }
  },
  watch: {
    async language(value) {
      const data = await this.getArticles({ language: value, page: this.page });
      if (data.data) {
        this.articles = data.data;
      }
    },
    async page(value) {
      const data = await this.getArticles({ language: this.language, page: value });
      if (data.data) {
        this.articles = data.data;
      }
    },
  },
});
</script>

<style lang="scss"></style>

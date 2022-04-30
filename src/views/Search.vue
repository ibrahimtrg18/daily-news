<template>
  <div class="content"></div>
  <ListNews
    :language="language"
    :articles="articles"
    :title="$t('search.title', { query })"
    :isLoading="isLoading"
  />
  <Pagination :page="page" @update:page="onPageChange" :disabledRightButton="disabledRightButton" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListNews from '../components/ListNews.vue';
import Pagination from '../components/Pagination.vue';
import { Article } from '../interfaces/Articles';
import { fetchNews } from '../services/news';

export default defineComponent({
  name: 'Search',
  components: {
    ListNews,
    Pagination,
  },
  props: ['language'],
  data() {
    return {
      articles: [] as Article[],
      isLoading: false,
      page: 1,
      limit: 12,
      disabledRightButton: false,
    };
  },
  computed: {
    query() {
      return this.$route.query.query as string;
    },
  },
  methods: {
    async getArticles({
      query,
      language,
      page,
    }: {
      query: string;
      language?: string;
      page: number;
    }) {
      try {
        this.isLoading = true;
        const data = await fetchNews({
          keywords: query,
          limit: this.limit,
          offset: page - 1,
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
    const data = await this.getArticles({
      language: this.language,
      query: this.query,
      page: this.page,
    });
    if (data.data) {
      this.articles = data.data;
    }
  },
  watch: {
    async language(value) {
      const data = await this.getArticles({
        query: this.query,
        language: value,
        page: this.page,
      });
      if (data.data) {
        this.articles = data.data;
      }
    },
    async query(value) {
      this.page = 1;
      const data = await this.getArticles({
        query: value,
        language: this.language,
        page: value,
      });
      if (data.data) {
        this.articles = data.data;
      }
    },
    async page(value) {
      const data = await this.getArticles({
        query: this.query,
        language: this.language,
        page: value,
      });
      if (data.data) {
        this.articles = data.data;
      }
    },
  },
});
</script>

<style lang="scss"></style>

<template>
  <div class="content"></div>
  <ListNews :language="language" :articles="articles" :title="$t('search.title', { query })" />
  <Pagination :page="page" @update:page="onPageChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListNews from '../components/ListNews.vue';
import Pagination from '../components/Pagination.vue';
import { Article } from '../interfaces/Articles';
import { fetchEverything } from '../utils/services';

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
      page?: number;
    }) {
      try {
        this.isLoading = true;
        const data = await fetchEverything({
          query,
          language,
          limit: 10,
          page,
        });
        this.isLoading = false;
        return data;
      } catch (err) {
        console.error(err);
        return {
          articles: [],
        };
      }
    },
    onPageChange(newPageValue: number) {
      console.log(newPageValue);
      if (newPageValue !== 0) {
        this.page = newPageValue;
      }
    },
  },
  watch: {
    async language(value) {
      const data = await this.getArticles({ query: this.query, language: value });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
    async query(value) {
      this.page = 1;
      const data = await this.getArticles({ query: value });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
    async page(value) {
      const data = await this.getArticles({ query: this.query, page: value });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
  },
});
</script>

<style lang="scss"></style>

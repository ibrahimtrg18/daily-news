<template>
  <div class="content"></div>
  <ListNews :language="language" :articles="articles" :title="$t('search.title', { query })" />
  <Pagination :page="page" @update:page="onPageChange" :disabledRightButton="disabledRightButton" />
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
      page?: number;
    }) {
      try {
        this.isLoading = true;
        const data = await fetchEverything({
          query,
          language,
          limit: this.limit,
          page,
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
    const data = await this.getArticles({
      language: this.language,
      query: this.query,
      page: this.page,
    });
    if (data.articles) {
      this.articles = data.articles;
    }
  },
  watch: {
    async language(value) {
      const data = await this.getArticles({
        query: this.query,
        language: value,
        page: this.page,
      });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
    async query(value) {
      this.page = 1;
      const data = await this.getArticles({
        query: value,
        language: this.language,
        page: value,
      });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
    async page(value) {
      const data = await this.getArticles({
        query: this.query,
        language: this.language,
        page: value,
      });
      if (data.articles) {
        this.articles = data.articles;
      }
    },
  },
});
</script>

<style lang="scss"></style>

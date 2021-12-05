<template>
  <div class="lastest-news">
    <h1 class="title">{{ $t('message.newsTitle') }}</h1>
    <div class="loading" v-if="isLoading">Loading...</div>
    <div class="news-list" v-else-if="articles.length > 0">
      <Card
        v-for="article in articles"
        :key="article.title"
        :title="article.title"
        :description="article.description"
        :image="article.urlToImage"
        :publishedAt="article.publishedAt"
        :source="article.source.name"
        :url="article.url"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchTopHeadlines } from '../utils/services';
import Card from './Card.vue';
import { Article } from '../interfaces/Articles';

export default defineComponent({
  name: 'LastestNews',
  components: {
    Card,
  },
  props: {
    language: {
      type: String,
    },
  },
  data() {
    return {
      articles: [] as Article[],
      isLoading: false,
    };
  },
  methods: {
    fetchTopHeadlines,
  },
  async mounted() {
    this.isLoading = true;
    const data = await fetchTopHeadlines({ country: this.language });

    this.isLoading = false;
    this.articles = data;
  },
  watch: {
    async language(value) {
      this.isLoading = true;
      const data = await fetchTopHeadlines({
        country: value,
      });

      this.isLoading = false;
      this.articles = data;
    },
  },
});
</script>

<style lang="scss">
.lastest-news {
  margin-bottom: 25px;

  & > .news-list {
    position: relative;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    gap: 10px;

    @media screen and (min-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 720px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 960px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  & > .title {
    @include title(1.75rem, center, 0 0 25px 0);
  }
}
</style>

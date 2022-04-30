<template>
  <div class="lastest-news">
    <h1 class="title">{{ title }}</h1>
    <div class="loading" v-if="isLoading">Loading...</div>
    <div class="news-list" v-else-if="articles?.length > 0">
      <Card
        v-for="article in articles"
        :key="article.title"
        :title="article.title"
        :description="article.description"
        :image="article.image"
        :publishedAt="article.published_at"
        :source="article.source"
        :url="article.url"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Card from './Card.vue';
import { Article } from '../interfaces/Articles';

export default defineComponent({
  name: 'ListNews',
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
    },
    language: {
      type: String,
    },
    articles: {
      type: Array as PropType<Array<Article>>,
    },
    isLoading: {
      type: Boolean,
    },
  },
});
</script>

<style lang="scss" scoped>
.lastest-news {
  margin-bottom: 25px;

  & > .news-list {
    position: relative;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-template-rows: auto;
    gap: 10px;

    @media screen and (min-width: 480px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media screen and (min-width: 720px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media screen and (min-width: 960px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  & > .title {
    @include title(1.75rem, center, 0 0 25px 0);
  }
}
</style>

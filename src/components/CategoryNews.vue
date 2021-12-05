<template>
  <div class="category-news">
    <h1 class="title">{{ title }}</h1>
    <div class="news-list">
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
import { defineComponent, PropType } from 'vue';
import Card from './Card.vue';
import { Article } from '../interfaces/Articles';

export default defineComponent({
  name: 'CategoryNews',
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
    },
    articles: {
      type: Array as PropType<Array<Article>>,
    },
  },
});
</script>

<style lang="scss">
.category-news {
  & > .title {
    @include title(1.75rem, center, 25px);
  }

  & > .news-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: minmax(auto, 1fr);
    gap: 10px;

    @media screen and (min-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 720px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 960px) {
      grid-template-columns: repeat(3, 1fr);
    }

    & > .card {
      &:nth-child(1) {
        grid-column: unset;

        @media screen and (min-width: 480px) {
          grid-column: 1 / 3;
        }
      }

      &:nth-child(6) {
        grid-column-start: unset;
        grid-row-start: unset;
        grid-column: unset;

        @media screen and (min-width: 480px) {
          grid-column: 1 / 3;
        }

        @media screen and (min-width: 960px) {
          grid-column-start: 3;
          grid-row-start: 3;
          grid-column: 2 / 4;
        }
      }
    }
  }
}
</style>

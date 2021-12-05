<template>
  <div class="feature-news">
    <div class="header">
      <h1 class="title">Yesterday</h1>
      <div class="action">
        <span class="icon left" @click="onSlideToLeft(slide + 1)">
          <Icon name="arrow-left" />
        </span>
        <span class="icon right" @click="onSlideToRight(slide - 1)">
          <Icon name="arrow-right" />
        </span>
      </div>
    </div>
    <div class="loading" v-if="isLoading">Loading...</div>
    <div class="news-list" v-show="articles.length > 0">
      <NewsItem
        v-for="article in articles"
        :key="article.title"
        :title="article.title"
        :description="article.description"
        :image="article.urlToImage"
        :publishedAt="article.publishedAt"
        :source="article.source.name"
        :url="article.url"
        :style="{ transform: 'translateX(' + slide * 500 + 'px)' }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchTopHeadlines } from '../utils/services';
import NewsItem from './NewsItem.vue';
import Icon from './Icon.vue';
import { Article } from '../interfaces/Articles';

export default defineComponent({
  name: 'FeatureNews',
  components: {
    NewsItem,
    Icon,
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
      slide: 0,
    };
  },
  methods: {
    fetchTopHeadlines,
    onSlideToLeft(value: number) {
      if (this.slide < 0) {
        this.slide = value;
      }
    },
    onSlideToRight(value: number) {
      if (this.slide >= -10) {
        this.slide = value;
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    const data = await fetchTopHeadlines({ country: this.language, limit: 10, page: 3 });

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
body {
  overflow-x: hidden;
}

.feature-news {
  & .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $borderColor;
    padding-bottom: 10px;
    margin-bottom: 15px;

    & > .title {
      @include title(1.5rem, left, 0);
    }

    & > .action {
      display: none;
      align-items: center;
      gap: 10px;

      @media screen and (min-width: 480px) {
        display: flex;
      }

      & > .icon {
        cursor: pointer;
        padding: 5px;
        &:hover {
          background-color: $whiteColor;
        }
      }
    }
  }

  & > .news-list {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 10px;
    -webkit-overflow-scrolling: touch;
    transition: transform 0.3s linear;

    &::-webkit-scrollbar {
      display: none;
    }

    @media screen and (min-width: 480px) {
      overflow: unset;
    }
  }
}
</style>

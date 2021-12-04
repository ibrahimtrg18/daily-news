<template>
  <div class="feature-news">
    <div class="header">
      <h1 class="title">Yesterday</h1>
      <div class="action">
        <span class="icon left">
          <Icon name="arrow-left" />
        </span>
        <span class="icon right">
          <Icon name="arrow-right" />
        </span>
      </div>
    </div>
    <div class="loading" v-if="isLoading">Loading...</div>
    <div class="news-list" v-else-if="articles.length > 0">
      <NewsItem
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
import NewsItem from './NewsItem.vue';
import Icon from './Icon.vue';

interface Article {
  author?: string | null;
  title?: string | null;
  description?: string | null;
  url?: string | null;
  source?: string | null;
  image?: string | null;
  category?: string | null;
  language?: string | null;
  country?: string | null;
  published_at?: string | null;
}

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
    };
  },
  methods: {
    fetchTopHeadlines,
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
.feature-news {
  & .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $borderColor;
    padding-bottom: 10px;
    margin-bottom: 15px;

    & > .title {
      @include title(left);
      margin-bottom: 0;
    }

    & > .action {
      display: flex;
      align-items: center;
      gap: 10px;

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
    gap: 10px;
    overflow: hidden;
  }
}
</style>

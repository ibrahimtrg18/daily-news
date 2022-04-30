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
    <div class="news-list" v-show="articles?.length > 0">
      <NewsItem
        v-for="article in articles"
        :key="article.title"
        ref="newsItem"
        :title="article.title"
        :description="article.description"
        :image="article.image"
        :publishedAt="article.published_at"
        :source="article.source"
        :url="article.url"
        :style="{ transform: 'translateX(' + slide * 500 + 'px)' }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewsItem from './NewsItem.vue';
import Icon from './Icon.vue';
import { fetchNews } from '../services/news';
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
      required: true,
    },
  },
  data() {
    return {
      articles: [] as Array<Article> | undefined,
      isLoading: false,
      slide: 0,
    };
  },
  methods: {
    async fetchNewsByLanguage(language: string) {
      try {
        this.isLoading = true;
        const data = await fetchNews({
          limit: 10,
          offset: 0,
          languages: language,
        });
        this.isLoading = false;

        return data;
      } catch (err) {
        console.error(err);
        const data = {
          data: [],
        };
        return data;
      }
    },
    onSlideToLeft(value: number) {
      if (this.slide < 0) {
        this.slide = value;
      }
    },
    onSlideToRight(value: number) {
      if (this.slide >= -7) {
        this.slide = value;
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    const data = await this.fetchNewsByLanguage(this.language);

    this.articles = data.data;

    this.isLoading = false;

    this.$nextTick(() => {
      console.log((this.$refs.newsItem as any).$el.clientWidth);
    });
  },
  watch: {
    async language(value) {
      this.isLoading = true;
      const data = await this.fetchNewsByLanguage(value);

      this.articles = data.data;
      this.isLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
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
    overflow-x: scroll;
    gap: 10px;
    -webkit-overflow-scrolling: touch;
    transition: transform 0.3s linear;

    &::-webkit-scrollbar {
      display: none;
    }

    @media screen and (min-width: 480px) {
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="content">
    <ListNews
      :language="language"
      :articles="articles"
      :title="$t('news.title')"
      :isLoading="isLoading"
    />
    <FeatureNews :language="language" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ResponseNews } from '@/interfaces/ResponseNews';
import ListNews from '../components/ListNews.vue';
import FeatureNews from '../components/FeatureNews.vue';
import { fetchNews } from '../services/news';
import { Article } from '../interfaces/Articles';

export default defineComponent({
  name: 'News',
  components: {
    ListNews,
    FeatureNews,
  },
  props: ['language'],
  data() {
    return {
      isLoading: false,
      articles: [] as Array<Article> | undefined,
      limit: 8,
    };
  },
  methods: {
    async fetchNewsByLanguage(language: string) {
      try {
        this.isLoading = true;
        const data = await fetchNews({
          limit: this.limit,
          offset: 0,
          languages: language,
        });
        this.isLoading = false;

        return data;
      } catch (err) {
        console.error(err);
        const data: ResponseNews = {
          pagination: {
            limit: 0,
            offset: 0,
            count: 0,
            total: 0,
          },
          data: [],
        };
        return data;
      }
    },
  },
  async mounted() {
    const data = await this.fetchNewsByLanguage(this.language);
    this.articles = data.data;
  },
  watch: {
    async language(value) {
      const data = await this.fetchNewsByLanguage(value);
      this.articles = data.data;
    },
  },
});
</script>

<style></style>

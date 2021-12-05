<template>
  <div class="content">
    <ListNews :language="language" :articles="articles" :title="$t('news.title')" />
    <FeatureNews :language="language" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListNews from '../components/ListNews.vue';
import FeatureNews from '../components/FeatureNews.vue';
import { fetchTopHeadlines } from '../utils/services';
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
      articles: [] as Article[],
      limit: 10,
    };
  },
  methods: {
    async fetchTopHeadlinesByLanguage(language: string) {
      try {
        this.isLoading = true;
        const data = await fetchTopHeadlines({
          country: language,
          limit: this.limit,
          page: 1,
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
  },
  async mounted() {
    const data = await this.fetchTopHeadlinesByLanguage(this.language!);
    if (data.articles) {
      this.articles = data.articles;
    }
  },
  watch: {
    async language(value) {
      const data = await this.fetchTopHeadlinesByLanguage(value!);
      if (data.articles) {
        this.articles = data.articles;
      }
    },
  },
});
</script>

<style></style>

<template>
  <a class="news-item" :href="url" target="_blank">
    <div class="news-image" v-if="image">
      <img :src="image" :alt="title" />
    </div>
    <div class="news-image" v-else-if="!image">
      <img src="@/assets/images/no-image.png" alt="not found" />
    </div>
    <div class="news-content">
      <h1 class="news-title" v-html="title" />
      <p class="news-description" v-html="description" />
    </div>
  </a>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewsItem',
  props: {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    publishedAt: {
      type: String,
    },
    source: {
      type: [Object, String],
    },
    url: {
      type: String,
    },
  },
});
</script>

<style lang="scss">
.news-item {
  display: flex;
  text-decoration: none;
  color: $textColor;
  transition: transform 0.3s linear;
  min-width: 500px;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 20px 10px $cardBoxShadowColor;
  }

  & > .news-image {
    display: block;
    flex: 1 0 200px;
    height: 100%;

    & > img {
      height: 100%;
      object-fit: cover;
    }
  }

  & > .news-content {
    flex: 1 1 auto;
    padding: 10px;

    & > .news-title {
      font-size: 1.15rem;
      line-height: 110%;
      color: $primaryColor;
      font-weight: 600;
      margin-bottom: 10px;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;

      &::first-letter {
        text-transform: capitalize;
      }
    }

    & > .news-description {
      font-size: 0.75rem;
      line-height: 110%;
      margin-bottom: 10px;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <a :href="url" target="_blank" class="card">
    <img class="card-image" :src="image" alt="title" v-if="image" />
    <div class="card-content">
      <h1 class="card-title" v-html="title" />
      <p class="card-description" v-html="description" />
      <div class="card-footer">
        <span class="card-source">{{ source }}</span>
        <span class="card-line"></span>
        <span class="card-time">{{ convertDateTimeFromNow(publishedAt) }}</span>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { convertDateTimeFromNow } from '../utils/convertDateTime';

export default defineComponent({
  name: 'Card',
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
  methods: {
    convertDateTimeFromNow,
  },
});
</script>

<style lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px 10px $cardBoxShadowColor;
  text-decoration: none;
  color: $textColor;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    background-color: #fff;
  }

  & > .card-image {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
  }

  & > .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 15px;

    & > .card-title {
      font-size: 1.25rem;
      line-height: 110%;
      color: $primaryColor;
      font-weight: 600;
      margin-bottom: 10px;

      &::first-letter {
        text-transform: capitalize;
      }
    }

    & > .card-description {
      font-size: 0.85rem;
      line-height: 110%;
      margin-bottom: 10px;
    }

    & > .card-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      align-items: center;
      font-size: 0.75rem;
      line-height: 100%;
      margin-top: auto;

      & > .card-source {
        color: $secondaryColor;
      }

      & > .card-line {
        width: 1px;
        height: 0.75rem;
        background-color: $textColor;
      }

      & > .card-time {
      }
    }
  }
}
</style>

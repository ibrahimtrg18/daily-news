<template>
  <div class="card">
    <img class="card-image" :src="image" />
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-description">{{ description }}</div>
      <div class="card-time">{{ published_at }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
    published_at: {
      type: String,
    },
  },
});
</script>

<style lang="scss"></style>

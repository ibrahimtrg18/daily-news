<template>
  <div class="category-news">
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoryNews',
  props: {
    title: {
      type: String,
    },
  },
});
</script>

<style lang="scss">
.category-news {
  & > .title {
    @include title(1.5rem, left, 0);
  }
}
</style>

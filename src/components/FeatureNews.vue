<template>
  <div class="feature-news">
    <div class="header">
      <h1 class="title">Feature News</h1>
      <div class="action">
        <span class="icon left">
          <Icon name="arrow-left" />
        </span>
        <span class="icon right">
          <Icon name="arrow-right" />
        </span>
      </div>
    </div>
    <div class="news-list"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'FeatureNews',
  components: {
    Icon,
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
    padding-bottom: 5px;

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
}
</style>

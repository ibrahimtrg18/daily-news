<template>
  <div class="lastest-news">
    <h1 class="title">Lastest News</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LastestNews',
});
</script>

<style lang="scss">
.lastest-news {
  & > .title {
    color: $primaryColor;
    text-transform: capitalize;
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 120%;
    text-align: center;
    margin-bottom: 25px;
  }
}
</style>

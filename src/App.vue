<template>
  <Navbar />
  <main class="container">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: 'Open Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
  background-color: $backgroundColor;
  font-size: 16px;
  line-height: 100%;
  font-weight: 400;
}

img {
  display: block;
  width: 100%;
  height: auto;
}

.container {
  padding: 0 10px;
  @media screen and (min-width: 480px) {
    padding: 0 15px;
  }
  @media screen and (min-width: 720px) {
    padding: 0 25px;
  }
  @media screen and (min-width: 960px) {
    padding: 0 35px;
  }
  @media screen and (min-width: 1200px) {
    padding: 0 45px;
  }

  & > .content {
    padding: 10px 0;
    @media screen and (min-width: 720px) {
      padding: 15px 0;
    }
    @media screen and (min-width: 960px) {
      padding: 20px 0;
    }
    @media screen and (min-width: 1200px) {
      padding: 25px 0;
    }
  }
}
</style>

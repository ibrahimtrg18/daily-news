<template>
  <Navbar :language="language" @update:language="changeLanguage" />
  <main class="container">
    <router-view :language="language.code" />
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
  data() {
    return {
      language: { label: 'English', code: 'en', filename: 'United Kingdom' },
    };
  },
  methods: {
    changeLanguage(value: any) {
      this.language = value;
    },
  },
  watch: {
    language(value) {
      this.$i18n.locale = value.code;
    },
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: 'Outfit', Avenir, Helvetica, Arial, sans-serif;
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

span.icon {
  display: flex;
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
    max-width: 1200px;
    margin: 0 auto;
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

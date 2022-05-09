<template>
  <nav class="nav" :class="{ fixed: isScrolled }">
    <div class="navbar container">
      <div class="navbar-content">
        <span @click="toggleSidebar()" class="icon drawer"><Icon name="menu" /></span>
        <div class="logo">dailynews</div>
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/">{{ $t('news.menu') }}</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/politic">{{ $t('politic.menu') }}</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/health">{{ $t('health.menu') }}</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/business">{{ $t('business.menu') }}</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/entertainment">{{ $t('entertainment.menu') }}</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/sport">{{ $t('sport.menu') }}</router-link>
          </li>
        </ul>
        <ul class="menu group">
          <li class="menu-item">
            <router-link to="/">{{ $t('news.menu') }}</router-link>
          </li>
          <li class="menu-item">
            <span @click="openDropdown = !openDropdown">{{ $t('category.menu') }}</span>
            <ul class="menu-dropdown" :class="{ show: openDropdown }">
              <li class="menu-item">
                <router-link to="/politic">{{ $t('politic.menu') }}</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/health">{{ $t('health.menu') }}</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/business">{{ $t('business.menu') }}</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/entertainment">{{ $t('entertainment.menu') }}</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/sport">{{ $t('sport.menu') }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="navbar-search">
          <input
            type="text"
            :placeholder="$t('search.title')"
            class="search"
            :class="{ show: showSearchInput }"
            v-model="search"
            @keypress="searchNews"
          />
          <span class="icon search" @click="showSearchInput = !showSearchInput"
            ><Icon :name="showSearchInput ? 'x' : 'search'"
          /></span>
        </div>
        <div class="navbar-language">
          <!-- <select v-model="propsLanguage">
            <option v-for="language in languages" :key="language.label" :value="language.code">
              {{ language.label }}
            </option>
          </select> -->
          <div
            class="navbar-language-selected"
            :class="{ active: showLanguageList }"
            @click="showLanguageList = !showLanguageList"
            v-click-outside="() => (showLanguageList = false)"
          >
            <!-- {{ language.label }} -->
            <img :src="getImg(language.filename)" />
          </div>
          <ul class="navbar-language-list" :class="{ show: showLanguageList }">
            <li
              class="navbar-language-item"
              v-for="language in languages"
              :key="language.label"
              :value="language.code"
              @click="onLanguageChange(language)"
            >
              <img :src="getImg(language.filename)" />
              <!-- {{ language.label }} -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="sidebar" :class="{ active: openSidebar }">
      <div class="sidebar-content">
        <div class="logo">
          <span @click="toggleSidebar()" class="icon close"><Icon name="x" /></span>
          dailynews
        </div>
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/">{{ $t('news.menu') }}</router-link>
            <router-link to="/politic">{{ $t('politic.menu') }}</router-link>
            <router-link to="/health">{{ $t('health.menu') }}</router-link>
            <router-link to="/business">{{ $t('business.menu') }}</router-link>
            <router-link to="/entertainment">{{ $t('entertainment.menu') }}</router-link>
            <router-link to="/sport">{{ $t('sport.menu') }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

const clickOutside = {
  beforeMount: (el, binding) => {
    // eslint-disable-next-line no-param-reassign
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};

export default defineComponent({
  name: 'Navbar',
  components: {
    Icon,
  },
  directives: {
    'click-outside': clickOutside,
  },
  props: ['language'],
  data() {
    return {
      openSidebar: false,
      languages: [
        { label: 'Arabic', code: 'ar', filename: 'Saudi Arabia' },
        { label: 'German', code: 'de', filename: 'German' },
        { label: 'English', code: 'en', filename: 'United Kingdom' },
        { label: 'Spanish', code: 'es', filename: 'Spain' },
        { label: 'French', code: 'fr', filename: 'France' },
        { label: 'Italian', code: 'it', filename: 'Italy' },
        { label: 'Dutch', code: 'nl', filename: 'Netherlands' },
        { label: 'Norwegian', code: 'no', filename: 'Norway' },
        { label: 'Portuguese', code: 'pt', filename: 'Portugal' },
        { label: 'Russian', code: 'ru', filename: 'Russia' },
        { label: 'Swedish', code: 'se', filename: 'Sweden' },
        { label: 'Chinese', code: 'zh', filename: 'China' },
      ],
      showSearchInput: false,
      search: '',
      debounceOnScroll: false,
      timeoutIdScroll: null,
      isScrolled: false,
      openDropdown: false,
      showLanguageList: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },
    searchNews(e) {
      if (e.keyCode === 13) {
        this.$router.push({
          path: 'search',
          query: { ...this.$route.query, query: this.search },
        });
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY !== 0;
    },
    onLanguageChange(value) {
      this.$emit('update:language', value);
    },
    getImg(filename) {
      return require(`../assets/images/${filename}.png`);
    },
  },
  computed: {
    propsLanguage: {
      get() {
        return this.language;
      },
      set(value) {
        this.$emit('update:language', value);
      },
    },
    debounceQuery() {
      return this.$route.query.query;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    debounceQuery() {
      this.search = this.debounceQuery;
    },
    isScrolled(value) {
      if (this.timeoutIdScroll) {
        clearTimeout(this.timeoutIdScroll);
      }
      this.timeoutIdScroll = setTimeout(() => {
        this.isScrolled = value;
      }, 500);
    },
    showLanguageList(value) {
      console.log(value);
    },
  },
});
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  background-color: $backgroundColor;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  top: 0;

  &.fixed {
    position: fixed;
    box-shadow: 0 0 2px 1px $borderColor;
    animation: slideDown 0.3s ease-out;

    & ~ .container {
      padding-top: 60px;
    }
  }

  .navbar {
    color: $primaryColor;
    text-transform: uppercase;

    .navbar-content {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 58px;
      padding: 20px 0 14px;

      @media screen and (min-width: 480px) {
        min-height: unset;
      }

      .logo {
        font-weight: 800;
        font-size: 1.5rem;
        line-height: 100%;
        margin-right: 20px;
        color: $primaryColor;
        user-select: none;
      }

      .menu {
        display: none;
        list-style: none;
        font-size: 1rem;
        align-self: center;
        line-height: normal;

        @media screen and (min-width: 480px) {
          display: none;

          &.group {
            display: flex;
          }
        }

        @media screen and (min-width: 960px) {
          display: flex;

          &.group {
            display: none;
          }
        }
      }

      li {
        position: relative;

        a,
        span {
          color: $primaryColor;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          line-height: 100%;
          padding: 0 10px;
          margin: 0 10px;

          &:hover {
            color: $secondaryColor;
          }
        }

        & > .menu-dropdown {
          list-style: none;
          position: absolute;
          background-color: $backgroundColor;
          z-index: 1;
          box-shadow: 0 0 1px 1px $borderColor;
          top: calc(100%);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.3s ease-out;

          &.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(10px);
          }

          &:before {
            content: '';
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid $backgroundColor;
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            filter: drop-shadow(0 -2px 1px $borderColor);
          }

          & > li {
            display: block;
            width: 100%;

            a,
            span {
              display: block;
              padding: 0.5rem 10px;
              margin: 0;
            }
          }
        }
      }
    }
  }

  .sidebar {
    z-index: 10;
    background-color: $backgroundColor;
    color: $primaryColor;
    text-transform: uppercase;
    position: fixed;
    top: 0;
    min-width: 230px;
    width: 70%;
    max-width: 350px;
    height: 100vh;
    box-shadow: 0 0 20px 0 $borderColor;
    left: -350px;
    transition: all 0.3s ease-in-out;

    &.active {
      left: 0;
      @media screen and (min-width: 480px) {
        display: none;
      }
    }

    .sidebar-content {
      width: 100%;

      .logo {
        font-weight: 800;
        font-size: 1.5rem;
        line-height: 100%;
        padding: 20px 10px 14px;
        box-shadow: -2px 0 2px 0 $borderColor;
        display: flex;
        align-items: center;
      }

      .menu {
        list-style: none;
        font-size: 1rem;
      }

      li {
        a {
          text-decoration: none;
          display: block;
          font-size: 1rem;
          font-weight: 600;
          line-height: 100%;
          color: $primaryColor;
          padding: 10px;

          &:hover {
            color: $secondaryColor;
          }
        }
      }
    }
  }

  .icon.drawer {
    margin-right: 8px;
    cursor: pointer;
    display: block;

    @media screen and (min-width: 480px) {
      display: none;
    }
  }

  .icon.close {
    margin-right: 16px;
    cursor: pointer;
  }

  .navbar-search {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-left: auto;

    @media screen and (min-width: 480px) {
      position: relative;
    }

    & > input.search {
      font-size: 1.5rem;
      padding: 0.5rem 0.75rem;
      border: transparent;
      background-color: $backgroundColor;
      font-family: 'Outfit';
      color: $primaryColor;
      width: 0;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-out;
      position: absolute;
      right: 0;
      top: 100%;

      @media screen and (min-width: 480px) {
        font-size: 0.9rem;
        padding: 0.15rem 0.45rem;
        top: unset;
      }

      &.show {
        width: 100%;
        opacity: 1;
        visibility: visible;
        border-bottom: 1px solid $primaryColor;

        @media screen and (min-width: 480px) {
          position: relative;
          width: 200px;
        }
      }

      &:focus {
        background-color: #fff;
      }

      &::placeholder {
        color: $textColor;
      }
    }

    & > .icon.search {
      z-index: 1;
      cursor: pointer;
      background-color: $backgroundColor;
      @media screen and (min-width: 480px) {
        position: absolute;
        right: 0;
      }

      & > svg {
        padding: 4px;
      }
    }
  }

  .navbar-language {
    position: relative;
    margin-left: 10px;

    & > .navbar-language-selected {
      width: 40px;
      padding: 4px;
      cursor: pointer;

      &:hover {
        background-color: $whiteColor;
      }

      &.active {
        background-color: #fff;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);
      }
    }

    & > .navbar-language-list {
      list-style: none;
      position: absolute;
      top: 100%;
      left: 0;
      display: none;
      max-height: 200px;
      overflow: auto;
      background-color: #fff;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);

      &.show {
        display: block;
      }

      & > .navbar-language-item {
        display: inline-block;
        width: 40px;
        padding: 4px;
        cursor: pointer;

        &:hover {
          background-color: $primaryColor;
        }
      }
    }

    & > select {
      background: transparent;
      border: transparent;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      line-height: 100%;
      padding: 5px 10px;
      -webkit-appearance: none;
      cursor: pointer;
      color: $primaryColor;

      &:hover {
        background-color: $whiteColor;
        color: $secondaryColor;
      }

      &::-ms-expand {
        display: none;
      }

      & > option {
        background: $whiteColor;
        border: 1px solid $darkColor;
        font-size: 0.95rem;
        font-weight: 600;
        text-transform: uppercase;
        line-height: 120%;
        cursor: pointer;
        color: $primaryColor;
      }
    }
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(-60px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>

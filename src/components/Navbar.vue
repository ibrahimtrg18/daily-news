<template>
  <nav class="nav">
    <div class="navbar container">
      <div class="navbar-content">
        <span @click="toggleSidebar()" class="icon drawer"><Icon name="menu" /></span>
        <div class="logo">dailynews</div>
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/">{{ $t('news.menu') }}</router-link>
            <router-link to="/politic">{{ $t('politic.menu') }}</router-link>
            <router-link to="/health">{{ $t('health.menu') }}</router-link>
          </li>
        </ul>
        <div class="navbar-search">
          <input
            type="text"
            placeholder="Search"
            class="search"
            :class="{ show: showSearchInput }"
          />
          <span class="icon search" @click="showSearchInput = !showSearchInput"
            ><Icon :name="showSearchInput ? 'x' : 'search'"
          /></span>
        </div>
        <div class="navbar-language">
          <select v-model="propsLanguage">
            <option v-for="language in languages" :key="language" :value="language">
              {{ language }}
            </option>
          </select>
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
            <router-link to="/">{{ $t('menu.news') }}</router-link>
            <router-link to="/politic">{{ $t('politic.menu') }}</router-link>
            <router-link to="/health">{{ $t('health.menu') }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'Navbar',
  components: {
    Icon,
  },
  props: ['language'],
  data() {
    return {
      openSidebar: false,
      languages: ['id', 'en'],
      showSearchInput: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
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
  },
});
</script>

<style lang="scss">
nav {
  position: relative;
  box-shadow: 0 0 2px 0 $borderColor;

  .navbar {
    background-color: $backgroundColor;
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
      }

      .menu {
        display: none;
        list-style: none;
        font-size: 1rem;
        align-self: flex-end;
        line-height: normal;

        @media screen and (min-width: 480px) {
          display: flex;
        }
      }

      li {
        a {
          color: $primaryColor;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          line-height: 100%;
          padding: 0 10px;
          margin: 0 10px;
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
      font-size: 0.9rem;
      padding: 0.15rem 0.45rem;
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
      top: calc(100% + 2px);

      @media screen and (min-width: 480px) {
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
    margin-left: 10px;

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

      &:hover {
        background-color: $whiteColor;
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
      }
    }
  }
}
</style>

<template>
  <nav class="nav">
    <div class="navbar">
      <div class="navbar-content">
        <span @click="toggleSidebar()" class="icon drawer"><Icon name="menu" /></span>
        <div class="logo">dailynews</div>
        <ul class="menu">
          <li class="menu-item"><router-link to="/">news</router-link></li>
        </ul>
      </div>
    </div>
    <div class="sidebar" :class="{ active: openSidebar }">
      <div class="sidebar-content">
        <div class="logo">
          <span @click="toggleSidebar()" class="icon close"><Icon name="x" /></span>
          dailynews
        </div>
        <ul class="menu">
          <li class="menu-item"><router-link to="/">news</router-link></li>
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
  data() {
    return {
      openSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },
  },
  components: {
    Icon,
  },
});
</script>

<style lang="scss">
nav {
  position: relative;

  .navbar {
    background-color: $backgroundColor;
    color: $primaryColor;
    text-transform: uppercase;

    .navbar-content {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 58px;
      padding: 20px 10px 14px;
      box-shadow: 0 0 2px 0 $borderColor;

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
          display: block;
        }
      }

      li {
        a {
          color: $primaryColor;
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 100%;
          padding: 0 10px;
          margin: 0 10px;
        }
      }
    }
  }

  .sidebar {
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
          font-size: 1.25rem;
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
}
</style>

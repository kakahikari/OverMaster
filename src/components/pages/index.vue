<template lang="pug">
  .layout__viewport
    nav-bar(@toggleMenu="toggleMenu()")
    section.container-fluid
      .row
        transition(name="menu-slide")
          template(v-if="!menuHidden")
            .col.col-2.left-nav
              side-menu
              .version.text-muted v{{ VERSION }}
        section.layout__container.col(":class"="{'col-10': !menuHidden}")
          transition(name="fade" mode="out-in")
            router-view
</template>

<script>
  import sideMenu from 'layout/side-menu'
  import navBar from 'layout/nav-bar'
  import { _VERSION } from 'src/version'

  export default {
    name: 'body-contents',

    data () {
      return {
        VERSION: _VERSION,
        menuHidden: false
      }
    },

    methods: {
      toggleMenu () {
        this.menuHidden = !this.menuHidden
      }
    },

    components: {
      navBar,
      sideMenu
    }
  }
</script>

<style lang="scss" scoped>
  @import "~src/assets/scss/share";

  .row {
    min-height: calc(100vh - 54px);
  }

  .left-nav {
    background-color: $white;
  }

  .version {
    position: absolute;
    bottom: 1em;
    right: 1em;
  }

  .menu-slide-enter-active,
  .menu-slide-leave-active {
    transition: transform $transit ease;
    transform-origin: left;
  }

  .menu-slide-enter,
  .menu-slide-leave-active {
    transform: scale(0, 1);
  }
</style>

<template lang="pug">
  b-navbar.bg-primary.sticky-top(type="inverse" toggleable)
    b-nav.is-nav-bar
      b-nav-item(@click="toggleMenu()")
        icon.menu-icon(name="bars")
    b-link.navbar-brand
      router-link(":to"="{name:'index'}") Money-Agent
    b-nav.ml-auto(is-nav-bar)
      b-nav-item-dropdown(right-alignment @click="test()")
        template(slot="text")
          span Language
        b-dropdown-item.nav-item
          div(@click="setLanguage('cn')") 中文
        b-dropdown-item.nav-item
          div(@click="setLanguage('en')") English
      b-nav-item(right-alignment ":to"="{name: 'index'}") {{ $store.state.AUTH.username }}
      b-nav-item(@click="logout()")
        icon(name="sign-out")
</template>

<script>
  export default {
    name: 'nav-bar',

    methods: {
      setLanguage (lang) {
        const params = {context: this, language: lang}
        this.$store.dispatch('setLanguage', params)
        this.$router.push({name: 'index'})
      },
      toggleMenu () {
        this.$emit('toggleMenu')
      },
      logout () {
        this.$root.logout()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~src/assets/scss/share";

  .navbar-brand {
    a {
      color: $reverse_color0;
      text-decoration: none;
    }
  }
  .nav-item {
    list-style: none;
  }

  .nav-link {
    i {
      font-size: 1.142em;
    }
  }

  .menu-icon {
    color: rgba($reverse_color0, .5);
    &:hover {
      color: rgba($reverse_color0, .75);
    }
  }
</style>

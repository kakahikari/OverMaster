<template lang="pug">
  li.nav-item
    .nav-item__title(@click="toggle()" "v-waves.block"="")
      slot(name="icon")
      slot(name="text")
    transition(name="slide")
      ul.nav-item__child(v-if="active")
        slot(name="child")
</template>

<script>
export default {
  name: 'side-menu__node',

  data () {
    return {
      active: false
    }
  },

  methods: {
    toggle () {
      this.active = !this.active
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

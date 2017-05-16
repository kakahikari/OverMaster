<template lang="pug">
  li.nav-item
    .nav-item__title(@click="toggle(name)" "v-waves.block"="")
      slot(name="icon")
      slot(name="text")
</template>

<script>
export default {
  name: 'side-menu__node',

  props: {
    name: {
      type: String
    }
  },

  methods: {
    toggle (name) {
      this.$emit('toggle', name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

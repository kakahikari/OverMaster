<template lang="pug">
  li
    slot
</template>

<script>
  export default {
    name: 'form-error'
  }
</script>

<style lang="scss" scoped>
  li {
    list-style: circle;
  }
</style>

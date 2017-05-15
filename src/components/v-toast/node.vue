<template lang="pug">
  li(":class"="type", @click="onDestroy()")
    slot
</template>

<script>
  export default {
    name: 'v-toast',

    props: {
      type: {
        type: String,
        default: 'normal'
      },
      no: {
        type: Number,
        required: true
      },
      destroyTime: {
        type: String,
        default: '1000'
      },
      onDestroy: {
        type: Function,
        required: true
      }
    },

    mounted () {
      window.setTimeout(() => {
        this.onDestroy()
      }, this.destroyTime)
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

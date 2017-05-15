<template lang="pug">
  form(@submit.prevent="submit")
    slot
    vSpinner(ref="vSpinner")
</template>

<script>
  import vSpinner from 'components/v-spinner'

  export default {
    name: 'v-form',

    data () {
      return {
        inProgress: false
      }
    },

    methods: {
      onRequest () {
        this.$refs.vSpinner.onRequest()
      },
      onResponse () {
        this.$refs.vSpinner.onResponse()
      },
      submit () {
        if (this.inProgress) return
        this.$emit('submit', '')
      }
    },

    components: {
      vSpinner
    }
  }
</script>

<style lang="scss" scoped>
  @import "~src/assets/scss/share";

  form {
    position: relative;
  }
</style>

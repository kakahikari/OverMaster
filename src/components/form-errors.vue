<template lang="pug">
  ol.form-errors.form-group(v-if="errors.$error")
    form-error(v-if="typeof(errors.required) !== 'undefined' && !errors.required") {{ $root.i18n('required') }}
    form-error(v-if="typeof(errors.alphaNum) !== 'undefined' && !errors.alphaNum") {{ $root.i18n('must be characters or numbers') }}
    form-error(v-if="typeof(errors.numeric) !== 'undefined' && !errors.numeric") {{ $root.i18n('must be numbers') }}
    slot
</template>

<script>
  import formError from './form-error'

  export default {
    name: 'form-errors',

    props: {
      errors: {
        default: {}
      }
    },

    components: {
      formError
    }
  }
</script>

<style lang="scss" scoped>
  .form-errors {
    margin: 0;
    margin-top: .3em;
    padding-left: 1.5em;
    font-size: .6em;
    color: #FF6779;
  }
</style>

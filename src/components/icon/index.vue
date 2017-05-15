<template lang="pug">
  i.fa( ":class"="'fa-'+name" aria-hidden="true")
</template>

<script>
  export default {
    name: 'icons',

    props: {
      name: {
        type: String,
        default: 'user'
      }
    }
  }
</script>

<style lang="scss" scoped>
  $fa-font-size-base:   14px !default;
  $fa-line-height-base: 1 !default;
  $fa-font-path:        "./fonts" !default;
  $fa-css-prefix:       fa !default;
  $fa-version:          "4.7.0" !default;
  $fa-border-color:     #eee !default;
  $fa-inverse:          #fff !default;
  $fa-li-width:         (30em / 14) !default;
  @import "./font-awesome/_font-awesome.scss";
</style>

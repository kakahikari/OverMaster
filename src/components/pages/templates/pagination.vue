<template lang="pug">
  .row.justify-content-center
    .btn-group.pagination
      button.btn.btn-secondary.btn-md(@click="pageChange(value-1)" v-if="value > 1")
        span
          icon(name="angle-double-left")
      template(v-for="n in totalPage")
        button.btn.btn-md(
          v-if="value + Math.floor(displayPage / 2) >= n && value - Math.floor(displayPage / 2) <= n"
          @click="pageChange(n)"
          ":class"="[n==value ? 'active btn-primary' : 'btn-secondary']"
        )
          span {{ n }}
      button.btn.btn-secondary.btn-md(@click="pageChange(value+1)" v-if="value < totalPage")
        span
          icon(name="angle-double-right")
</template>

<script>
export default {
  name: 'v-pagination',

  props: {
    value: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    },
    displayPage: {
      type: Number,
      default: 10
    }
  },

  methods: {
    pageChange (val) {
      return this.$emit('pageChange', Number(val))
    }
  }
}
</script>

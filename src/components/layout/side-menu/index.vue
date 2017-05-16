<template lang="pug">
  nav
    div.text-muted.nav-title {{ $root.i18n('Navigation') }}
    ul.nav.nav-pills.flex-column
      template(v-for="item in $store.state.AUTH.sideMenu")
        node(@toggle="action" ":name"="item.page")
          template(slot="icon")
            icon(":name"="iconList[item.page]")
          template(slot="text") {{ $root.i18n(item.page) }}
</template>

<script>
  import node from './node'
  // import UiService from 'services/uiService'

  export default {
    name: 'side-menu',

    data () {
      return {
        iconList: {
          statisticsList: 'bar-chart',
          OperationList: 'cogs',
          QuotaManage: 'money',
          UserManage: 'user',
          AuthManage: 'lock'
        }
      }
    },

    mounted () {
      if (this.$store.state.AUTH.sideMenu.length === 0) {
        this.$store.dispatch('getSideMenu', {context: this})
      }
    },

    methods: {
      action (pageName) {
        this.$router.push({ name: pageName })
      }
    },

    components: {
      node
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

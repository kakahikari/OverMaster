<template lang="pug">
  section.AuthManage.templates
    h4.page-title {{ $root.i18n('AuthManage') }}
    .card
      .card-block
        b-table.table-bordered(striped ":items"="list" ":fields"="fields" v-if="authorityGroupList.length == list.length")
          template(slot="id" scope="item")
            template(v-for="auth in authorityGroupList.filter(node => node.id == item.value)[0].list")
              label.form-checkbox
                input(type="checkbox" v-model="auth.status")
                | {{ $root.i18n(auth.page) }}
        span(v-else) {{ $root.i18n('權限管理群組對應錯誤') }}
</template>

<script>
  import AdminService from 'services/adminService'

  export default {
    name: 'templates__AuthManage',

    data () {
      return {
        currentPage: 1,
        list: [],
        authorityGroupList: [],
        fields: {
          name: { label: this.$root.i18n('name'), sortable: true },
          id: { label: this.$root.i18n('authority') }
        }
      }
    },

    mounted () {
      AdminService.getAuthority({context: this}).then((res) => {
        this.list = res
        this.authorityGroupList = []
        res.forEach((node) => {
          AdminService.getAuthority({context: this, body: {auth_id: node.id}}).then((res) => {
            res.forEach((authorityNode) => {
              if (authorityNode.status === '1') authorityNode.status = true
              else authorityNode.status = false
            })
            this.authorityGroupList.push({id: node.id, list: res})
          })
          .catch((err) => {
            this.$root.showToast({type: 'warning', content: err})
          })
        })
      })
    }
  }
</script>

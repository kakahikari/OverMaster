<template lang="pug">
  section.UserManage.templates
    h4.page-title {{ $root.i18n('UserManage') }}
    .card
      .card-block
        b-table.table-bordered(striped ":items"="list" ":fields"="fields")
          template(slot="site" scope="item")
            template(v-for="(site, index) in item.value.split(',')")
              template(v-if="$store.state.AUTH.language == 'cn'")
                | {{ $store.state.AUTH.sideList.filter(node => node.site == site)[0].cn_name }}
              template(v-if="$store.state.AUTH.language == 'en'")
                | {{ $store.state.AUTH.sideList.filter(node => node.site == site)[0].en_name }}
              template(v-if="index !== item.value.split(',').length - 1")
                | ,
          template(slot="authority" scope="item")
            | {{ $store.state.AUTH.authorityList.filter(node => node.id == item.value)[0].name }}
</template>

<script>
  import AdminService from 'services/adminService'

  export default {
    name: 'templates__UserManage',

    data () {
      return {
        list: [],
        fields: {
          account: { label: this.$root.i18n('account'), sortable: true },
          name: { label: this.$root.i18n('name'), sortable: true },
          authority: { label: this.$root.i18n('authority'), sortable: true },
          site: { label: this.$root.i18n('site'), sortable: true },
          last_login_ip: { label: this.$root.i18n('last login ip'), sortable: true },
          last_login_time: { label: this.$root.i18n('last login time'), sortable: true }
        }
      }
    },

    mounted () {
      AdminService.getUser({context: this, body: {id: '', name: '', site: ''}}).then((res) => {
        this.list = res
      })
    }
  }
</script>

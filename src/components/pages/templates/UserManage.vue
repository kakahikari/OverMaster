<template lang="pug">
  section.UserManage.templates
    h4.page-title {{ $root.i18n('UserManage') }}
    .card
      .card-block
        form(@submit.prevent="action()")
          .form-group.col-3
            label  {{ $root.i18n('site') }}
            b-form-select(
            ":options"="siteOptions"
            v-model="formData.site"
            )
          .form-group.col-3
            label  {{ $root.i18n('account') }}
            b-form-input(
              v-model="formData.account"
              type="text"
            )
          .form-group.col-3
            label  {{ $root.i18n('name') }}
            b-form-input(
              v-model="formData.name"
              type="text"
            )
          .form-group.col
            button.btn.btn-primary(type="submit") {{ $root.i18n('Submit', $store.state.AUTH.language) }}
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
        siteOptions: [],
        fields: {
          account: { label: this.$root.i18n('account'), sortable: true },
          name: { label: this.$root.i18n('name'), sortable: true },
          authority: { label: this.$root.i18n('authority'), sortable: true },
          site: { label: this.$root.i18n('site'), sortable: true },
          last_login_ip: { label: this.$root.i18n('last login ip'), sortable: true },
          last_login_time: { label: this.$root.i18n('last login time'), sortable: true }
        },
        formData: {
          account: '',
          name: '',
          site: ''
        }
      }
    },

    mounted () {
      if (this.$store.state.AUTH.sideList.length < 1) {
        this.$store.dispatch('getSiteList', {context: this}).then((res) => {
          this.getSiteOptions()
        })
      } else {
        this.getSiteOptions()
      }
      this.action()
    },

    methods: {
      action () {
        AdminService.getUser({context: this, body: {account: this.formData.account, name: this.formData.name, site: this.formData.site}}).then((res) => {
          this.list = res
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      getSiteOptions () {
        let out = []
        out.push({ text: this.$root.i18n('please select'), value: '' })
        this.$store.state.AUTH.sideList.forEach((node) => {
          let name = ''
          if (this.$store.state.AUTH.language === 'cn') {
            name = node.cn_name
          } else if (this.$store.state.AUTH.language === 'en') {
            name = node.en_name
          }
          out.push({ text: name, value: node.site })
        })
        this.siteOptions = out
      }
    }
  }
</script>

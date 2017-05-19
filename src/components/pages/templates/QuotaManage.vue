<template lang="pug">
  section.QuotaManage.templates
    h4.page-title {{ $root.i18n('QuotaManage') }}
    .card
      .card-block
        form(@submit.prevent="action()")
          .form-group.col-3
            label  {{ $root.i18n('site') }}
            b-form-select(
              ":options"="siteOptions"
              v-model="formData.site_code"
            )
          .form-group.col
            button.btn.btn-primary(type="submit") {{ $root.i18n('Submit', $store.state.AUTH.language) }}
    .card
      .card-block
        b-table.table-bordered(striped ":items"="list" ":fields"="fields")
          template(slot="quota" scope="item")
            | {{ item.value | toNumber }}
          template(slot="quota_temporary" scope="item")
            | {{ item.value | toNumber }}
          template(slot="quota_used" scope="item")
            | {{ item.value | toNumber }}
          template(slot="quota_left" scope="item")
            | {{ item.value | toNumber }}
</template>

<script>
  import SiteService from 'services/siteService'

  export default {
    name: 'templates__QuotaManage',

    data () {
      return {
        list: [],
        siteOptions: [],
        fields: {
          name: { label: this.$root.i18n('name'), sortable: true },
          quota: { label: this.$root.i18n('当月基本额度'), sortable: true },
          quota_temporary: { label: this.$root.i18n('临时额度'), sortable: true },
          quota_used: { label: this.$root.i18n('已使用额度'), sortable: true },
          quota_left: { label: this.$root.i18n('剩余额度'), sortable: true }
        },
        formData: {
          site_code: ''
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
        SiteService.getSiteList({context: this, body: this.formData}).then((res) => {
          let out = []
          res.forEach((node) => {
            let name = ''
            let quotaLeft = Number(node.quota) + Number(node.quota_temporary) - Number(node.quota_used)
            if (this.$store.state.AUTH.language === 'cn') {
              name = node.cn_name
            } else if (this.$store.state.AUTH.language === 'en') {
              name = node.en_name
            }
            out.push({ name: name, quota: node.quota, quota_temporary: node.quota_temporary, quota_used: node.quota_used, quota_left: quotaLeft })
          })
          this.list = out
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

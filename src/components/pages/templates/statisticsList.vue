<template lang="pug">
  section.statisticsList.templates
    h4.page-title {{ $root.i18n('statisticsList') }}
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
</template>

<script>
  import SiteService from 'services/siteService'

  export default {
    name: 'templates__statisticsList',

    data () {
      return {
        list: [],
        siteOptions: [],
        fields: {
          name: { label: this.$root.i18n('name'), sortable: true },
          link: { label: this.$root.i18n('site link'), sortable: true },
          member_count: { label: this.$root.i18n('number of active members'), sortable: true }
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
            if (this.$store.state.AUTH.language === 'cn') {
              name = node.cn_name
            } else if (this.$store.state.AUTH.language === 'en') {
              name = node.en_name
            }
            out.push({ name: name, link: node.link, member_count: node.member_count })
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

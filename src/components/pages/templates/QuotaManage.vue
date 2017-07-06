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
          template(slot="operating" scope="item")
            button.btn.btn-secondary.btn-sm(
              @click="editForm({site: item.item.site, quota: item.item.quota, quotaTemporary: item.item.quota_temporary})"
            )
              icon(name="pencil-square-o")
              | &nbsp;{{ $root.i18n('edit allowance') }}
    b-modal(@ok="submitEditForm" id="editForm" ":title"="$root.i18n('edit allowance')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
      form(@submit.stop.prevent="")
        .form-group.col
          label {{ $root.i18n('site') }}
          span {{ editFormData.name }}
        .form-group.col
          label {{ $root.i18n('Monthly basic allowance') }}
          b-form-input(v-model="editFormData.quota" type="number")
          form-errors(":errors"="$v.editFormData.quota")
        .form-group.col
          label {{ $root.i18n('Temporary allowance') }}
          b-form-input(v-model="editFormData.quota_temporary" type="number")
          form-errors(":errors"="$v.editFormData.quota_temporary")
</template>

<script>
  import SiteService from 'services/siteService'
  import formErrors from 'components/form-errors'
  import formError from 'components/form-error'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'templates__QuotaManage',

    data () {
      return {
        list: [],
        siteOptions: [],
        fields: {
          name: { label: this.$root.i18n('name'), sortable: true },
          quota: { label: this.$root.i18n('Monthly basic allowance'), sortable: true },
          quota_temporary: { label: this.$root.i18n('Temporary allowance'), sortable: true },
          quota_used: { label: this.$root.i18n('The used amt'), sortable: true },
          quota_left: { label: this.$root.i18n('Balance'), sortable: true },
          operating: { label: this.$root.i18n('operating') }
        },
        formData: {
          site_code: ''
        },
        editFormData: {
          site: '',
          quota: 0,
          quota_temporary: 0
        }
      }
    },

    mounted () {
      if (this.$store.state.AUTH.siteList.length < 1) {
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
            out.push({ site: node.site, name: name, quota: node.quota, quota_temporary: node.quota_temporary, quota_used: node.quota_used, quota_left: quotaLeft })
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
        this.$store.state.AUTH.siteList.forEach((node) => {
          let name = ''
          if (this.$store.state.AUTH.language === 'cn') {
            name = node.cn_name
          } else if (this.$store.state.AUTH.language === 'en') {
            name = node.en_name
          }
          out.push({ text: name, value: node.site })
        })
        this.siteOptions = out
      },
      editForm ({site, quota, quotaTemporary}) {
        let name = ''
        let target = this.$store.state.AUTH.siteList.filter(node => node.site === site)[0]
        if (this.$store.state.AUTH.language === 'cn') {
          name = target.cn_name
        } else if (this.$store.state.AUTH.language === 'en') {
          name = target.en_name
        }
        this.editFormData = {
          name: name,
          site: site,
          quota: quota,
          quota_temporary: quotaTemporary
        }
        this.$root.$emit('show::modal', 'editForm')
      },
      submitEditForm (e) {
        this.$v.editFormData.$touch()
        if (this.$v.editFormData.$error) return e.cancel()

        SiteService.editSiteQuota({context: this, body: this.editFormData}).then((res) => {
          this.$root.showToast({content: this.$root.i18n('success')})
          this.action()
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      }
    },

    components: {
      formErrors,
      formError
    },

    validations: {
      editFormData: {
        quota: { required },
        quota_temporary: { required }
      }
    }
  }
</script>

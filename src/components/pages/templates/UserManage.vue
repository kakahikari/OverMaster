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
            v-model="formData.sch_site"
            )
          .form-group.col-3
            label  {{ $root.i18n('account') }}
            b-form-input(
              v-model="formData.sch_account"
              type="text"
            )
          .form-group.col-3
            label  {{ $root.i18n('name') }}
            b-form-input(
              v-model="formData.sch_name"
              type="text"
            )
          .form-group.col
            button.btn.btn-primary(type="submit") {{ $root.i18n('Submit', $store.state.AUTH.language) }}
    .card
      .card-block
        .card-text.text-right
          button.btn.btn-success.btn-sm(@click="addForm")
            icon(name="plus")
            | &nbsp;{{ $root.i18n('Add user') }}
        b-table.table-bordered(striped ":items"="list" ":fields"="fields" v-if="authorityGroupList.length > 0")
          template(slot="water" scope="item")
            template(v-for="node in item.value.filter(node => node.water_type === 'q')")
              template(v-if="$store.state.AUTH.language == 'cn'")
                | {{ siteList.filter(x => x.site === node.site)[0].cn_name }} / {{ node.value_max }}
              template(v-if="$store.state.AUTH.language == 'en'")
                | {{ siteList.filter(x => x.site === node.site)[0].en_name }} / {{ node.value_max }}
              br
          //- template(slot="site" scope="item")
            //- template(v-for="(site, index) in item.value.split(',')" v-if="item.value !== ''")
            //-   template(v-if="$store.state.AUTH.language == 'cn'")
            //-     | {{ $store.state.AUTH.siteList.filter(node => node.site == site)[0].cn_name }}
            //-   template(v-if="$store.state.AUTH.language == 'en'")
            //-     | {{ $store.state.AUTH.siteList.filter(node => node.site == site)[0].en_name }}
            //-   template(v-if="index !== item.value.split(',').length - 1")
            //-     | ,
          template(slot="authority" scope="item")
            | {{ authorityGroupList.filter(node => node.id == item.value)[0].name }}
          template(slot="operating" scope="item")
            button.btn.btn-secondary.btn-sm(
              @click="editForm({userId: item.item.id, name: item.item.name, status: item.item.status, authority: item.item.authority, site: item.item.site, account: item.item.account})"
            )
              icon(name="pencil-square-o")
              | &nbsp;{{ $root.i18n('edit') }}
            button.btn.btn-secondary.btn-sm(
              @click="editAllowanceForm({userId: item.item.id, site: item.item.site, account: item.item.account})"
              v-if="item.item.site !== '' && item.item.account !== 'admin'"
            )
              icon(name="pencil-square-o")
              | &nbsp;{{ $root.i18n('edit allowance') }}
      b-modal(@ok="submitAddForm" id="addForm" ":title"="$root.i18n('Add user')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
        form(@submit.stop.prevent="")
          .form-group.col
            label {{ $root.i18n('account') }}
            b-form-input(v-model="addFormData.account")
            small.text-muted {{ $root.i18n('Must be 5 to 20 characters, numbers or /') }}
          .form-group.col
            label {{ $root.i18n('name') }}
            b-form-input(v-model="addFormData.name")
          .form-group.col
            label {{ $root.i18n('password') }}
            b-form-input(v-model="addFormData.password" type="password")
            small.text-muted {{ $root.i18n('Must be 8 to 20 characters or numbers') }}
          .form-group.col
            label {{ $root.i18n('authority') }}
            b-form-select(v-model="addFormData.authority" ":options"="authorityGroupOptions")
          .form-group.col
            label {{ $root.i18n('site') }}
            template(v-for="node in $store.state.AUTH.siteList")
              label
                input(type="checkbox" v-model="addFormSelectSites" ":value"="node.site")
                template(v-if="$store.state.AUTH.language == 'cn'")
                  span &nbsp;{{ node.cn_name }}
                template(v-if="$store.state.AUTH.language == 'en'")
                  span &nbsp;{{ node.en_name }}
      b-modal(@ok="submitEditForm" id="editForm" ":title"="$root.i18n('Edit user')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
        form(@submit.stop.prevent="")
          .form-group.col
            label {{ $root.i18n('account') }}
            span {{ editFormData.account }}
          .form-group.col
            label {{ $root.i18n('name') }}
            b-form-input(v-model="editFormData.name")
          .form-group.col
            label {{ $root.i18n('change password') }}
            b-form-input(v-model="editFormData.password" type="password")
            small.text-muted {{ $root.i18n('Must be 8 to 20 characters or numbers') }}
          .form-group.col
            label {{ $root.i18n('authority') }}
            b-form-select(v-if="editFormData.account !== $store.state.AUTH.username" v-model="editFormData.authority" ":options"="authorityGroupOptions")
            b-form-select(v-else v-model="editFormData.authority" ":options"="authorityGroupOptions" disabled)
          .form-group.col
            label {{ $root.i18n('status') }}
            b-form-radio(v-model="editFormData.status" :options="statusOptions")
          .form-group.col
            label {{ $root.i18n('site') }}
            template(v-for="node in $store.state.AUTH.siteList")
              label
                input(type="checkbox" v-model="editFormSelectSites" ":value"="node.site")
                template(v-if="$store.state.AUTH.language == 'cn'")
                  span &nbsp;{{ node.cn_name }}
                template(v-if="$store.state.AUTH.language == 'en'")
                  span &nbsp;{{ node.en_name }}
      b-modal(@ok="submitAllowanceForm" id="allowanceForm" ":title"="$root.i18n('Edit allowance')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
        form(@submit.stop.prevent="")
          .form-group.col
            label {{ $root.i18n('account') }}
            span {{ allowanceFormData.account }}
          .form-group.col
            label {{ $root.i18n('site') }}
            b-form-select(v-model="allowanceFormData.site" ":options"="editFormSelectSites")
          .form-group.col
            label {{ $root.i18n('max allowance') }}
            b-form-input(v-model="allowanceFormData.value_max")
</template>

<script>
  import AdminService from 'services/adminService'
  import { mapState } from 'vuex'

  export default {
    name: 'templates__UserManage',

    data () {
      return {
        list: [],
        authorityGroupList: [],
        authorityGroupOptions: [],
        siteOptions: [],
        fields: {
          account: { label: this.$root.i18n('account'), sortable: true },
          name: { label: this.$root.i18n('name'), sortable: true },
          authority: { label: this.$root.i18n('authority'), sortable: true },
          water: { label: this.$root.i18n('site/allowance'), sortable: true },
          last_login_ip: { label: this.$root.i18n('last login ip'), sortable: true },
          last_login_time: { label: this.$root.i18n('last login time'), sortable: true },
          operating: { label: this.$root.i18n('operating') }
        },
        formData: {
          sch_account: '',
          sch_name: '',
          sch_site: ''
        },
        addFormSelectSites: [],
        addFormData: {
          account: '',
          name: '',
          password: '',
          authority: '',
          site: ''
        },
        editFormSelectSites: [],
        editFormData: {
          user_id: '',
          name: '',
          password: '',
          status: '',
          authority: '',
          site: '',
          account: ''
        },
        statusOptions: [
          {text: this.$root.i18n('enable'), value: '1'},
          {text: this.$root.i18n('disable'), value: '0'}
        ],
        allowanceFormData: {
          user_id: '',
          site: '',
          value_max: '',
          account: ''
        }
      }
    },

    computed: mapState({
      siteList: function (state) {
        return state.AUTH.siteList
      },
      language: function (state) {
        return state.AUTH.language
      }
    }),

    watch: {
      addFormSelectSites (newVal) {
        let temp = ''
        newVal.forEach((node, index, array) => {
          temp += node
          if (index !== array.length - 1) temp += ','
        })
        this.addFormData.site = temp
      },
      editFormSelectSites (newVal) {
        let temp = ''
        newVal.forEach((node, index, array) => {
          temp += node
          if (index !== array.length - 1) temp += ','
        })
        this.editFormData.site = temp
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
      AdminService.getAuthority({context: this}).then((res) => {
        this.authorityGroupList = res
        this.authorityGroupOptions.push({text: this.$root.i18n('please select'), value: ''})
        this.authorityGroupList.forEach((node) => {
          let row = {text: node.name, value: node.id}
          this.authorityGroupOptions.push(row)
        })
      })
      this.action()
    },

    methods: {
      action () {
        AdminService.getUserList({context: this, body: this.formData}).then(async (res) => {
          let out = []
          await res.forEach(async (node) => {
            node.water = await this.getUserWater(node.id)
            out.push(node)
          })
          this.list = out
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      getUserWater (userId) {
        return new Promise((resolve, reject) => {
          AdminService.getUserWater({context: this, body: {'user_id': userId}}).then((res) => {
            return resolve(res)
          })
          .catch((err) => {
            return reject(err)
          })
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
      addForm () {
        this.addFormSelectSites = []
        this.addFormData = {
          account: '',
          name: '',
          password: '',
          authority: '',
          site: ''
        }
        this.$root.$emit('show::modal', 'addForm')
      },
      submitAddForm () {
        AdminService.addUser({context: this, body: this.addFormData}).then((res) => {
          this.$root.showToast({content: this.$root.i18n('success')})
          this.action()
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      editForm ({userId, name, status, authority, site, account}) {
        this.editFormData = {
          user_id: userId,
          name: name,
          password: '',
          status: status,
          authority: authority,
          site: '',
          account: account
        }
        this.editFormSelectSites = []
        site.split(',').forEach((node) => {
          this.editFormSelectSites.push(node)
        })
        this.$root.$emit('show::modal', 'editForm')
      },
      submitEditForm () {
        if (this.editFormData.account === this.$store.state.AUTH.username) this.editFormData.account = ''
        AdminService.editUser({context: this, body: this.editFormData}).then((res) => {
          this.$root.showToast({content: this.$root.i18n('success')})
          this.action()
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      editAllowanceForm ({userId, site, account}) {
        this.allowanceFormData = {
          user_id: userId,
          site: '',
          value_max: 0,
          account: account
        }
        this.editFormSelectSites = []
        this.editFormSelectSites.push({text: this.$root.i18n('please select'), value: ''})
        site.split(',').forEach((node) => {
          let site = this.siteList.filter(x => x.site === node)[0]
          let siteName = ''
          if (this.language === 'cn') siteName = site.cn_name
          if (this.language === 'en') siteName = site.en_name
          this.editFormSelectSites.push({text: siteName, value: node})
        })
        this.$root.$emit('show::modal', 'allowanceForm')
      },
      submitAllowanceForm () {
        AdminService.editUserWater({context: this, body: this.allowanceFormData}).then((res) => {
          this.$root.showToast({content: this.$root.i18n('success')})
          this.action()
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      }
    }
  }
</script>

<template lang="pug">
  section.AuthManage.templates
    h4.page-title {{ $root.i18n('AuthManage') }}
    .card
      .card-block
        .card-text.text-right
          button.btn.btn-success.btn-sm(@click="addForm")
            icon(name="plus")
            | &nbsp;{{ $root.i18n('Add authority') }}
        b-table.table-bordered(striped ":items"="list" ":fields"="fields" v-if="authorityGroupList.length == list.length")
          template(slot="id" scope="item")
            template(v-for="auth in authorityGroupList.filter(node => node.id == item.value)[0].list")
              label.form-checkbox
                input(type="checkbox" v-model="auth.status" disabled="disabled")
                | {{ $root.i18n(auth.page) }}
          template(slot="operating" scope="item")
            template(v-if="item.item.id !== '1' && item.item.id !== $store.state.AUTH.auth")
              button.btn.btn-secondary.btn-sm(
                @click="editForm({authId: item.item.id, name: item.item.name})"
              )
                icon(name="pencil-square-o")
                | &nbsp;{{ $root.i18n('edit') }}
              button.btn.btn-secondary.btn-sm(
                @click="deleteForm({authId: item.item.id, name: item.item.name})"
              )
                icon(name="trash")
                | &nbsp;{{ $root.i18n('delete') }}
        span(v-else) {{ $root.i18n('corresponding error in permission mgmt group') }}
      b-modal(@ok="submitAddForm" id="addForm" ":title"="$root.i18n('Add authority')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
        form(@submit.stop.prevent="submitAddForm")
          .form-group.col
            label {{ $root.i18n('name') }}
            b-form-input(v-model="addFormData.name")
          .form-group.col
            label {{ $root.i18n('authority') }}
            template(v-for="node in $store.state.AUTH.authorityList" )
              label
                input(type="checkbox" v-model="addFormSelectCodes" ":value"="node.page")
                | &nbsp;{{ node.name }}
      b-modal(@ok="submitEditForm" id="editForm" ":title"="$root.i18n('Edit authority')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
        form(@submit.stop.prevent="submitEditForm")
          .form-group.col
            label {{ $root.i18n('name') }}
            b-form-input(v-model="editFormData.name")
          .form-group.col
            label {{ $root.i18n('authority') }}
            template(v-for="node in $store.state.AUTH.authorityList" )
              label
                input(type="checkbox" v-model="editFormSelectCodes" ":value"="node.page")
                | &nbsp;{{ node.name }}
      b-modal(@ok="submitDeleteForm" id="deleteForm" ":title"="$root.i18n('Delete authority')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
        form(@submit.stop.prevent="submitDeleteForm")
          span {{ $root.i18n('Are you sure to delete') }} {{deleteFormData.name}} ?
</template>

<script>
  import AdminService from 'services/adminService'

  export default {
    name: 'templates__AuthManage',

    data () {
      return {
        list: [],
        authorityGroupList: [],
        fields: {
          name: { label: this.$root.i18n('name'), sortable: true },
          id: { label: this.$root.i18n('authority') },
          operating: { label: this.$root.i18n('operating') }
        },
        addFormSelectCodes: [],
        addFormData: {
          name: '',
          code: []
        },
        editFormSelectCodes: [],
        editFormData: {
          auth_id: '',
          name: '',
          code: []
        },
        deleteFormData: {
          name: '',
          auth_id: ''
        }
      }
    },

    mounted () {
      this.action()
    },

    methods: {
      action () {
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
      },
      addForm () {
        this.addFormSelectCodes = []
        this.addFormData = {
          name: '',
          code: []
        }
        this.$root.$emit('show::modal', 'addForm')
      },
      submitAddForm () {
        this.addFormSelectCodes.forEach((node) => {
          this.addFormData.code.push({page: node, status: 1})
        })
        this.addFormData.code = JSON.stringify(this.addFormData.code)

        AdminService.addAuthority({context: this, body: this.addFormData}).then((res) => {
          this.$root.showToast({content: this.$root.i18n('success')})
          this.action()
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      editForm ({authId, name}) {
        let target = this.authorityGroupList.filter(node => node.id === authId)[0].list
        this.editFormSelectCodes = []
        target.forEach((node) => {
          if (node.status === true) this.editFormSelectCodes.push(node.page)
        })
        this.editFormData = {
          auth_id: authId,
          name: name,
          code: []
        }
        this.$root.$emit('show::modal', 'editForm')
      },
      submitEditForm () {
        this.editFormSelectCodes.forEach((node) => {
          this.editFormData.code.push({page: node, status: 1})
        })
        this.editFormData.code = JSON.stringify(this.editFormData.code)

        AdminService.editAuthority({context: this, body: this.editFormData}).then((res) => {
          this.$root.showToast({content: this.$root.i18n('success')})
          this.action()
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      deleteForm ({authId, name}) {
        this.deleteFormData = {
          name: name,
          auth_id: authId
        }
        this.$root.$emit('show::modal', 'deleteForm')
      },
      submitDeleteForm () {
        AdminService.delAuthority({context: this, body: this.deleteFormData}).then((res) => {
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

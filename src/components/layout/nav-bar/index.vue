<template lang="pug">
  b-navbar.bg-primary.sticky-top(type="inverse" toggleable)
    b-nav.is-nav-bar
      b-nav-item(@click="toggleMenu()")
        icon.menu-icon(name="bars")
    b-link.navbar-brand
      router-link(":to"="{name:'index'}") OverMaster
    b-nav.ml-auto(is-nav-bar)
      b-nav-item-dropdown(right-alignment)
        template(slot="text")
          span Language
        b-dropdown-item.nav-item
          div(@click="setLanguage('cn')") 中文
        b-dropdown-item.nav-item
          div(@click="setLanguage('en')") English
      b-nav-item(right-alignment @click="editForm(account)") {{ account }}
      b-nav-item(@click="logout()")
        icon(name="sign-out")
    b-modal(@ok="submitEditForm" id="userEditForm" ":title"="$root.i18n('Edit user')" ":ok-title"="$root.i18n('ok')" ":ok-only"="true" ":size"="'sm'")
      form(@submit.stop.prevent="submitEditForm")
        .form-group.col
          label {{ $root.i18n('change password') }}
          b-form-input(v-model="editFormData.password" type="password")
          small.text-muted {{ $root.i18n('Must be 8 to 20 characters or numbers') }}
</template>

<script>
  import { mapState } from 'vuex'
  import AdminService from 'services/adminService'

  export default {
    name: 'nav-bar',

    data () {
      return {
        editFormData: {
          user_id: '',
          name: '',
          password: '',
          status: '',
          authority: '',
          site: ''
        }
      }
    },

    computed: mapState({
      account: state => state.AUTH.account
    }),

    methods: {
      setLanguage (lang) {
        const params = {context: this, language: lang}
        this.$store.dispatch('setLanguage', params)
        this.$router.push({name: 'index'})
      },
      toggleMenu () {
        this.$emit('toggleMenu')
      },
      logout () {
        this.$root.logout()
      },
      editForm ({account}) {
        this.$root.$emit('show::modal', 'userEditForm')
      },
      submitEditForm () {
        AdminService.editUser({context: this, body: this.editFormData}).then((res) => {
          this.$root.showToast({type: 'warning', content: this.$root.i18n('success')})
          this.action()
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~src/assets/scss/share";

  .navbar-brand {
    a {
      color: $reverse_color0;
      text-decoration: none;
    }
  }
  .nav-item {
    list-style: none;
  }

  .nav-link {
    i {
      font-size: 1.142em;
    }
  }

  .menu-icon {
    color: rgba($reverse_color0, .5);
    &:hover {
      color: rgba($reverse_color0, .75);
    }
  }
</style>

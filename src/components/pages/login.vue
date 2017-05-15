<template lang="pug">
  .layout__viewport.container-fluid
    section.layout__container
      .card.text-center
        .card-block
          h4.card-title {{ $root.i18n('Login', language) }}
          v-form(@submit="login(formData)")
            .form-group
              b-form-input(":placeholder"="$root.i18n('Account', language)" v-model="formData.username")
              b-form-input(type="password" ":placeholder"="$root.i18n('Password', language)" v-model="formData.password")
              label Language
              select.form-control.col(v-model="language")
                option(value="cn") 中文
                option(value="en") English
            button.btn.btn-primary(type="submit") {{ $root.i18n('Submit', language) }}
          .card-text.text-right
            small.text-muted v{{ VERSION }}
</template>

<script>
import { _VERSION } from 'src/version'
import { DEFAULT_LNG } from 'src/config'

export default {
  name: 'login',

  data () {
    return {
      VERSION: _VERSION,
      language: '',
      formData: {
        username: '',
        password: ''
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.default()
    })
  },

  watch: {
    language (val) {
      const params = {context: this, language: val}
      this.$store.dispatch('setLanguage', params)
    }
  },

  methods: {
    default () {
      this.language = this.$store.state.AUTH.language
      if (this.language === '') {
        this.language = DEFAULT_LNG
      }
      this.formData = {
        username: '',
        password: ''
      }
    },
    login (formData) {
      this.$root.login(formData).then((res) => {
        return this.$router.replace({path: '/'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    margin-bottom: 1em;
  }

  .layout__container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .card {
    width: 25em;
  }
</style>

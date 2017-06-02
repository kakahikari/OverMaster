<template lang="pug">
  section.statisticsList.templates
    h4.page-title {{ $root.i18n('OperationList') }}
    .card
      .card-block
        form(@submit.prevent="action()")
          .form-group.col-3
            label  {{ $root.i18n('site') }}
            b-form-select(
              ":options"="siteOptions"
              v-model="formData.site_code"
            )
          .form-group.col-3
            label  {{ $root.i18n('start time') }}
            Flatpickr.form-control(
              v-model="formData.start_time"
              ":options"="{enableTime: true}"
            )
          .form-group.col-3
            label  {{ $root.i18n('end time') }}
            Flatpickr.form-control(
              v-model="formData.end_time"
              ":options"="{enableTime: true}"
            )
          .form-group.col
            button.btn.btn-primary(type="submit") {{ $root.i18n('Submit', $store.state.AUTH.language) }}
    .card
      .card-block
        b-table.table-bordered(striped ":items"="list" ":fields"="fields")
          template(slot="in_money_sum" scope="item")
            | {{ item.value | toNumber }}
          template(slot="out_money_sum" scope="item")
            | {{ item.value | toNumber }}
          template(slot="win_lose" scope="item")
            | {{ item.value | toNumber }}
</template>

<script>
  import SiteService from 'services/siteService'

  export default {
    name: 'templates__OperationList',

    data () {
      return {
        list: [],
        siteOptions: [],
        fields: {
          name: { label: this.$root.i18n('name'), sortable: true },
          in_people_num: { label: this.$root.i18n('Number of deposits'), sortable: true },
          in_times: { label: this.$root.i18n('Times of deposits'), sortable: true },
          in_money_sum: { label: this.$root.i18n('Total deposits'), sortable: true },
          out_money_sum: { label: this.$root.i18n('Total withdrawals '), sortable: true },
          win_lose: { label: this.$root.i18n('Site Win/Loss'), sortable: true }
        },
        formData: {
          site_code: '',
          start_time: '',
          end_time: ''
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
        SiteService.getStatistics({context: this, body: this.formData}).then((res) => {
          let out = []
          res.forEach((node) => {
            let name = ''
            if (this.$store.state.AUTH.language === 'cn') {
              name = node.cn_name
            } else if (this.$store.state.AUTH.language === 'en') {
              name = node.en_name
            }
            out.push({ name: name, in_people_num: node.in_people_num, in_times: node.in_times, in_money_sum: node.in_money_sum, out_money_sum: node.out_money_sum, win_lose: node.win_lose })
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
      }
    }
  }
</script>

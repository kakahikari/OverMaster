<template lang="pug">
  .card(v-if="list.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Total number of records') }}: {{ total }}
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
        template(slot="kind" scope="item")
          | {{ $root.i18n(kindCodeList[item.value]) }}
      .row.justify-content-center
        pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import ReportService from 'services/reportService'
  import { kindCodeList } from 'src/xhrConfig'

  export default {
    name: 'templates__betReportList',

    data () {
      return {
        currentPage: 1,
        total: 0,
        list: [],
        fields: {
          user_account: { label: this.$root.i18n('user account'), sortable: true },
          user_game_account: { label: this.$root.i18n('game account'), sortable: true },
          bet_time: { label: this.$root.i18n('betting time'), sortable: true },
          billing_time: { label: this.$root.i18n('billing time'), sortable: true },
          bet_amount: { label: this.$root.i18n('bet amount'), sortable: true },
          valid_bet_amount: { label: this.$root.i18n('valid bet amount'), sortable: true },
          pay_off: { label: this.$root.i18n('member tally'), sortable: true },
          kind: { label: this.$root.i18n('4 categories'), sortable: true },
          game_kind: { label: this.$root.i18n('game code'), sortable: true },
          bet_num: { label: this.$root.i18n('betting sheet code'), sortable: true }
        },
        kindCodeList: kindCodeList
      }
    },

    props: {
      formData: {
        default: null,
        type: Object
      }
    },

    computed: {
      totalPage () {
        return Math.ceil(Math.ceil(this.total) / this.formData.page_size)
      }
    },

    watch: {
      formData (val) {
        this.doRequest(val)
      }
    },

    methods: {
      doRequest (formData, pageNum = 1) {
        this.list = []
        const body = {}
        body.game_company = formData.game_company
        body.user_account = formData.user_account
        body.page_size = formData.page_size
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_num = pageNum
        ReportService.getBetReportList({context: this, body: body}).then((res) => {
          this.currentPage = pageNum
          this.list = res.list
          this.total = res.total
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      pageChange (val) {
        if (val <= this.totalPage && val > 0) {
          this.currentPage = val
          this.doRequest(this.formData, val)
        }
      }
    },

    components: {
      pagination
    }
  }
</script>

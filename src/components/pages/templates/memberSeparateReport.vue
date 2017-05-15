<template lang="pug">
  .card(v-if="list.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Total member of records') }}: {{ total }}
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
        template(slot="sum_bet" scope="item")
          | {{ item.value | toNumber }}
        template(slot="sum_win" scope="item")
          | {{ item.value | toNumber }}
        template(slot="kind_code" scope="item")
          | {{ $root.i18n(item.value) }}
      .row.justify-content-center(v-if="this.total>0")
        pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import ReportService from 'services/reportService'

  export default {
    name: 'templates__memberSeparateReport',

    data () {
      return {
        currentPage: 1,
        total: 0,
        list: [],
        fields: {
          game_company: { label: this.$root.i18n('game company'), sortable: true },
          kind_code: { label: this.$root.i18n('4 categories'), sortable: true },
          user_account: { label: this.$root.i18n('user account'), sortable: true },
          sum_bet: { label: this.$root.i18n('combined bet (valid bet)'), sortable: true },
          sum_win: { label: this.$root.i18n('member tally'), sortable: true }
        }
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
        body.user_account = formData.user_account
        body.page_size = formData.page_size
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_num = pageNum
        ReportService.getMemberSeparateReportList({context: this, body: body}).then((res) => {
          this.currentPage = pageNum
          this.list = res.list
          this.total = res.user_total
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      pageChange (val) {
        if (val <= this.totalPage && val > 0) {
          this.doRequest(this.formData, val)
        }
      }
    },

    components: {
      pagination
    }
  }
</script>

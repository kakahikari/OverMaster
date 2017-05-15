<template lang="pug">
  .card(v-if="list.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Total number of records') }}: {{ total }}
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
        template(slot="money" scope="item")
          | {{ item.value | toNumber }}
      .row.justify-content-center(v-if="this.total>0")
        pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import ReportService from 'services/reportService'

  export default {
    name: 'templates__promotionRecordList',

    data () {
      return {
        currentPage: 1,
        total: 0,
        list: [],
        fields: {
          gift_money_date: { label: this.$root.i18n('issued time'), sortable: true },
          agent: { label: this.$root.i18n('agent'), sortable: true },
          user: { label: this.$root.i18n('membership account'), sortable: true },
          user_name: { label: this.$root.i18n('member'), sortable: true },
          promotion_kind: { label: this.$root.i18n('promotion kind'), sortable: true },
          promotion_name: { label: this.$root.i18n('promotion name'), sortable: true },
          money: { label: this.$root.i18n('amount'), sortable: true }
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
        body.agent_id = formData.agent_id
        body.user_account = formData.user_account
        body.promotion_kind = formData.promotion_kind
        body.promotion_name = formData.promotion_name
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_size = formData.page_size
        body.page_num = pageNum
        ReportService.getPromotionRecordList({context: this, body: body}).then((res) => {
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
          this.doRequest(this.formData, val)
        }
      }
    },

    components: {
      pagination
    }
  }
</script>

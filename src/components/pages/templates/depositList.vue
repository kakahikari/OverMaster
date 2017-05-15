<template lang="pug">
  .card(v-if="list.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Total number of records') }}: {{ total }}
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
        template(slot="order_status" scope="item")
          template(v-if="item.value === '1'")
            | {{ $root.i18n('validated') }}
          template(v-else-if="item.value === '2'")
            | {{ $root.i18n('rejected') }}
          template(v-else-if="item.value === '3'")
            | {{ $root.i18n('charged') }}
          template(v-else)
            | {{ $root.i18n('pending validation') }}
        template(slot="trans_way" scope="item")
            | {{ $root.i18n(transWayList[item.value]) }}
        template(slot="money" scope="item")
          | {{ item.value | toNumber }}
      .row.justify-content-center(v-if="this.total>0")
        pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import HistoryService from 'services/historyService'
  import { transWayList } from 'src/xhrConfig'

  export default {
    name: 'templates__depositList',

    data () {
      return {
        currentPage: 1,
        total: 0,
        list: [],
        fields: {
          agent: { label: this.$root.i18n('agent'), sortable: true },
          user_account: { label: this.$root.i18n('membership account'), sortable: true },
          user_name: { label: this.$root.i18n('member'), sortable: true },
          add_date: { label: this.$root.i18n('add time'), sortable: true },
          trans_way: { label: this.$root.i18n('trans way'), sortable: true },
          company_bank: { label: this.$root.i18n('company bank'), sortable: true },
          review_account: { label: this.$root.i18n('review account'), sortable: true },
          grant_account: { label: this.$root.i18n('grant account'), sortable: true },
          money: { label: this.$root.i18n('amount'), sortable: true },
          order_status: { label: this.$root.i18n('order status'), sortable: true }
        },
        transWayList: transWayList
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
        body.order_status = formData.order_status
        body.company_bank = formData.company_bank
        body.trans_way = formData.trans_way
        body.page_size = formData.page_size
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_num = pageNum
        HistoryService.getDeposit({context: this, body: body}).then((res) => {
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

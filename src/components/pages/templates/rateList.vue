<template lang="pug">
  .card(v-if="list.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Total number of records') }}: {{ total }}
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
        template(slot="status" scope="item")
          template(v-if="item.value === '1'")
            | {{ $root.i18n('issued') }}
          template(v-else)
            | {{ $root.i18n('pending validation') }}
        template(slot="time_kind" scope="item")
          template(v-if="item.value === '1'")
            | {{ $root.i18n('weekly rebate') }}
          template(v-else-if="item.value === '2'")
            | {{ $root.i18n('monthly rebate') }}
          template(v-else-if="item.value === '3'")
            | {{ $root.i18n('quarterly rebate') }}
          template(v-else)
            | {{ $root.i18n('daily rebate') }}
      .row.justify-content-center(v-if="this.total>0")
        pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import HistoryService from 'services/historyService'

  export default {
    name: 'templates__rateList',

    data () {
      return {
        currentPage: 1,
        total: 0,
        list: [],
        fields: {
          user_account: { label: this.$root.i18n('user account'), sortable: true },
          user_name: { label: this.$root.i18n('user name'), sortable: true },
          rate_money: { label: this.$root.i18n('rebate amount'), sortable: true },
          time_kind: { label: this.$root.i18n('rebate period'), sortable: true },
          rate_proportion: { label: this.$root.i18n('rebate rate'), sortable: true },
          start_date: { label: this.$root.i18n('rebate start time'), sortable: true },
          end_date: { label: this.$root.i18n('rebate end time'), sortable: true },
          act_date: { label: this.$root.i18n('period taken into account'), sortable: true },
          operator: { label: this.$root.i18n('operator'), sortable: true },
          status: { label: this.$root.i18n('order status'), sortable: true }
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
        body.page_size = formData.page_size
        body.page_num = pageNum
        HistoryService.getRateList({context: this, body: body}).then((res) => {
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

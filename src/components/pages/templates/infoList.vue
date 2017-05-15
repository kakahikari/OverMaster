<template lang="pug">
  div
    .card(v-if="totalList.length > 0")
      .card-block
        b-table.table-bordered(striped ":items"="totalList" ":fields"="fields")
    .card(v-if="list.length > 0")
      .card-block
        .card-text.text-right
          .text-muted {{ $root.i18n('Total number of records') }}: {{ total }}
        b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
          template(slot="totalDeposit" scope="item")
            | {{ item.value | toNumber }}
          template(slot="totalWithdraw" scope="item")
            | {{ item.value | toNumber }}
          template(slot="sum_win" scope="item")
            | {{ item.value | toNumber }}
          template(slot="sum_bet" scope="item")
            | {{ item.value | toNumber }}
        .row.justify-content-center
          pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import AgentService from 'services/agentService'

  export default {
    name: 'templates__infoList',

    data () {
      return {
        currentPage: 1,
        total: 0,
        list: [],
        totalList: [],
        fields: {
          name: { label: this.$root.i18n('agent'), sortable: true },
          totalDeposit: { label: this.$root.i18n('amount of deposit'), sortable: true },
          timeDeposit: { label: this.$root.i18n('number of deposits'), sortable: true },
          peopleDeposit: { label: this.$root.i18n('number of people making deposits'), sortable: true },
          totalWithdraw: { label: this.$root.i18n('withdrawal amount'), sortable: true },
          timeWithdraw: { label: this.$root.i18n('number of withdrawals') },
          peopleWithdraw: { label: this.$root.i18n('number of people making withdrawals'), sortable: true },
          login_num: { label: this.$root.i18n('number of logins'), sortable: true },
          register_num: { label: this.$root.i18n('number of registration'), sortable: true },
          sum_win: { label: this.$root.i18n('combined winning'), sortable: true },
          sum_bet: { label: this.$root.i18n('combined bet'), sortable: true }
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
        body.page_size = formData.page_size
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_num = pageNum
        AgentService.getInfoListTotal({context: this, body: body}).then((res) => {
          this.totalList = []
          res.name = this.$root.i18n('total')
          this.totalList.push(res)
          return AgentService.getInfoList({context: this, body: body})
        }).then((res) => {
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

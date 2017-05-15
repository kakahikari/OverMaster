<template lang="pug">
  .card(v-if="list.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Total number of records') }}: {{ total }}
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
        template(slot="status" scope="item")
          | {{ item.value? $root.i18n('activate') : $root.i18n('forbid') }}
        template(slot="deposit_withdrawl" scope="item")
          template(v-if="item.item.sum_in_money")
            | {{ item.item.sum_in_money | toNumber }}
          template(v-else) 0
          |  /
          template(v-if="item.item.sum_out_money")
            | {{ item.item.sum_out_money | toNumber }}
          template(v-else) 0
        template(slot="money" scope="item")
          | {{ item.value | toNumber }}
      .row.justify-content-center(v-if="this.total>0")
        pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import MemberService from 'services/memberService'

  export default {
    name: 'templates__memberList',

    data () {
      return {
        currentPage: 1,
        total: 0,
        list: [],
        fields: {
          agent: { label: this.$root.i18n('agent'), sortable: true },
          // rate_level: { label: this.$root.i18n('rebate level'), sortable: true },
          user: { label: this.$root.i18n('membership account'), sortable: true },
          // name: { label: this.$root.i18n('member'), sortable: true },
          status: { label: this.$root.i18n('user status'), sortable: true },
          register_date: { label: this.$root.i18n('register time'), sortable: true },
          login_date: { label: this.$root.i18n('last login time'), sortable: true },
          login_ip: { label: this.$root.i18n('last login IP'), sortable: true },
          deposit_withdrawl: { label: this.$root.i18n('total deposit amount/total withdrawl amount') },
          money: { label: this.$root.i18n('account balance'), sortable: true },
          note: { label: this.$root.i18n('note') }
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
        body.login_ip = formData.login_ip
        body.page_size = formData.page_size
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.user_account = formData.user_account
        body.user_status = formData.user_status
        body.page_num = pageNum
        MemberService.getMemberList({context: this, body: body}).then((res) => {
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

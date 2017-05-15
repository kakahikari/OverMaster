<template lang="pug">
  .card(v-if="mainList.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Compute kind') }}: {{$root.i18n(computeKindList[kind])}}
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="mainList" ":fields"="mainFields[kind]")
        template(slot="agent_name" scope="item")
          template(v-if="item.value == '' || item.value == null")
            | {{ $root.i18n('total') }}
          template(v-else)
            | {{ item.value }}
      template(v-if="backList.length > 0")
        b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="backList" ":fields"="backFields[kind]")
          template(slot="kind_code" scope="item")
            | {{ $root.i18n(kindCodeList[item.value]) }}
</template>

<script>
  import ReportService from 'services/reportService'
  import { computeKindList, kindCodeList } from 'src/xhrConfig'

  export default {
    name: 'templates__backBetList',

    data () {
      return {
        currentPage: 1,
        mainList: [],
        mainFields: {
          0: {
            agent_name: { label: this.$root.i18n('agent') },
            sum_bet: { label: this.$root.i18n('combined valid bet') },
            profit: { label: this.$root.i18n('profits (valid bet-payout)') },
            back_money: { label: this.$root.i18n('amount of return commission rate') },
            cheap_money: { label: this.$root.i18n('promotion') },
            fee_money: { label: this.$root.i18n('processing fees') },
            rake_money: { label: this.$root.i18n('member rebate') },
            Sub_total: { label: this.$root.i18n('return commission tally') }
          },
          1: {
            agent_name: { label: this.$root.i18n('agent') },
            name: { label: this.$root.i18n('game company') },
            kind_code: { label: this.$root.i18n('4 categories') },
            sum_bet: { label: this.$root.i18n('combined valid bet') },
            profit: { label: this.$root.i18n('profits (valid bet-payout)') },
            back_money: { label: this.$root.i18n('amount of return commission rate') },
            cheap_money: { label: this.$root.i18n('promotion') },
            fee_money: { label: this.$root.i18n('processing fees') },
            rake_money: { label: this.$root.i18n('member rebate') },
            Sub_total: { label: this.$root.i18n('return commission tally') }
          },
          2: {
            agent_name: { label: this.$root.i18n('agent') },
            sum_bet: { label: this.$root.i18n('combined valid bet') },
            profit: { label: this.$root.i18n('profits (valid bet-payout)') },
            back_money: { label: this.$root.i18n('amount of return commission rate') },
            cheap_money: { label: this.$root.i18n('promotion') },
            fee_money: { label: this.$root.i18n('processing fees') },
            rake_money: { label: this.$root.i18n('member rebate') },
            Sub_total: { label: this.$root.i18n('return commission tally') }
          },
          3: {
            agent_name: { label: this.$root.i18n('agent') },
            name: { label: this.$root.i18n('game company') },
            kind_code: { label: this.$root.i18n('4 categories') },
            sum_bet: { label: this.$root.i18n('combined valid bet') },
            profit: { label: this.$root.i18n('profits (valid bet-payout)') },
            back_money: { label: this.$root.i18n('amount of return commission rate') },
            cheap_money: { label: this.$root.i18n('promotion') },
            fee_money: { label: this.$root.i18n('processing fees') },
            rake_money: { label: this.$root.i18n('member rebate') },
            Sub_total: { label: this.$root.i18n('return commission tally') }
          },
          4: {
            agent_name: { label: this.$root.i18n('agent') },
            sum_bet: { label: this.$root.i18n('combined valid bet') },
            profit: { label: this.$root.i18n('profits (valid bet-payout)') },
            back_money: { label: this.$root.i18n('amount of return commission rate') },
            cheap_money: { label: this.$root.i18n('promotion') },
            fee_money: { label: this.$root.i18n('processing fees') },
            rake_money: { label: this.$root.i18n('member rebate') },
            Sub_total: { label: this.$root.i18n('return commission tally') }
          },
          5: {
            agent_name: { label: this.$root.i18n('agent') },
            name: { label: this.$root.i18n('game company') },
            kind_code: { label: this.$root.i18n('4 categories') },
            sum_bet: { label: this.$root.i18n('combined valid bet') },
            profit: { label: this.$root.i18n('profits (valid bet-payout)') },
            back_money: { label: this.$root.i18n('amount of return commission rate') },
            cheap_money: { label: this.$root.i18n('promotion') },
            fee_money: { label: this.$root.i18n('processing fees') },
            rake_money: { label: this.$root.i18n('member rebate') },
            Sub_total: { label: this.$root.i18n('return commission tally') }
          },
          10: {
            agent_name: { label: this.$root.i18n('agent') },
            number: { label: this.$root.i18n('valid member') },
            kind_code: { label: this.$root.i18n('4 categories') },
            sum_bet: { label: this.$root.i18n('combined valid bet') },
            profit: { label: this.$root.i18n('profits (valid bet-payout)') },
            back_money: { label: this.$root.i18n('amount of return commission rate') },
            cheap_money: { label: this.$root.i18n('promotion') },
            fee_money: { label: this.$root.i18n('processing fees') },
            rake_money: { label: this.$root.i18n('member rebate') },
            Sub_total: { label: this.$root.i18n('return commission tally') }
          }
        },
        backList: [],
        backFields: {
          0: {
            rate: { label: this.$root.i18n('rate') },
            money: { label: this.$root.i18n('profits') }
          },
          1: {
            name: { label: this.$root.i18n('game company') },
            kind_code: { label: this.$root.i18n('4 categories') },
            rate: { label: this.$root.i18n('rate') },
            money: { label: this.$root.i18n('profits') }
          },
          2: {
            rate: { label: this.$root.i18n('rate') },
            money: { label: this.$root.i18n('profits') }
          },
          3: {
            name: { label: this.$root.i18n('game company') },
            kind_code: { label: this.$root.i18n('4 categories') },
            rate: { label: this.$root.i18n('rate') },
            money: { label: this.$root.i18n('profits') }
          },
          4: {
            rate: { label: this.$root.i18n('rate') },
            money: { label: this.$root.i18n('profits') }
          },
          5: {
            name: { label: this.$root.i18n('game company') },
            kind_code: { label: this.$root.i18n('4 categories') },
            rate: { label: this.$root.i18n('rate') },
            money: { label: this.$root.i18n('profits') }
          },
          10: {
            people_money: { label: this.$root.i18n('valid bet (condition)') },
            people_num: { label: this.$root.i18n('valid member (condition)') },
            rateEG: { label: this.$root.i18n('electronic return commission rate (profits)') },
            rateLI: { label: this.$root.i18n('live return commission rate (profits)') },
            rateLO: { label: this.$root.i18n('lottery comission rate (valid)') },
            rateSP: { label: this.$root.i18n('sports return commission (profits)') }
          }
        },
        kind: 0,
        computeKindList: computeKindList,
        kindCodeList: kindCodeList
      }
    },

    props: {
      formData: {
        default: null,
        type: Object
      }
    },

    watch: {
      formData (val) {
        this.doRequest(val)
      }
    },

    methods: {
      doRequest (formData) {
        this.mainList = []
        this.backList = []
        const body = {}
        body.agent_id = formData.agent_id
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_size = formData.page_size
        ReportService.getBackBetReport({context: this, body: body}).then((res) => {
          this.kind = res.kind
          this.mainList = res.main_list
          this.backList = res.back_set
          if (this.kind === '1' || this.kind === '3' || this.kind === '5' || this.kind === '10') {
            res.child_list.forEach((node) => {
              var targetIndex = 0
              this.mainList.forEach((target, index) => {
                if (target.agent_name === node.agent_name) targetIndex = index
              })
              this.mainList.splice(targetIndex, 0, node)
            })
          }
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      }
    }
  }
</script>

<template lang="pug">
  transition-group(tag="ol", name="toast")
    template(v-for="toast, i in toasts")
      node(
        ":type"="toast.type",
        ":no"="i",
        key="item",
        ":destroy-time"="destroyTime"
        ":on-destroy"="toast.onDestroy"
      ) {{ toast.content }}
</template>

<script>
  import node from './node'

  let timer = () => {}
  const maxLength = 5

  export default {
    name: 'v-toasts',

    data () {
      return {
        toasts: []
      }
    },

    props: {
      destroyTime: {
        type: String,
        default: '3000'
      }
    },

    methods: {
      async add (obj) {
        if (!obj.content) return

        const length = await this.toasts.length
        if (length >= maxLength) {
          await this.toasts.splice(0, length - maxLength + 1)
        }

        const that = await this
        const uid = await this.uid++

        obj.uid = uid
        obj.onDestroy = () => {
          const itemIndex = that.toasts.findIndex(item => item.uid === uid)
          that.toasts.splice(itemIndex, 1)
        }

        this.toasts.push(obj)
      }
    },

    components: {
      node
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

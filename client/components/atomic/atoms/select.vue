<template>
  <section>
    <v-select
      v-bind="bind"
      @change="sendEvent($event, item)"
      @update:list-index="sendEvent($event, item)"
    />
  </section>
</template>
<script>

export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    bindings: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      select: ''
    }
  },
  computed: {
    isBindings () {
      if (Object.entries(this.bindings).length !== 0) {
        return true
      } else {
        return false
      }
    },
    bind () {
      if (this.isBindings) {
        return Object.entries(this.bindings)
          .map((item) => {
            const value = {}
            if (this.item[item[1]]) {
              value[item[0]] = this.item[item[1]]
            } else {
              value[item[0]] = item[1]
            }
            return value
          })
      } else {
        return this.item
      }
    }
  },
  methods: {
    sendEvent (event, item) {
      this.$emit('componentEvent', {
        event,
        item,
        eventName: this.bindings.event
      })
    }
  }
}
</script>

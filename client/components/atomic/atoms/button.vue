<template>
  <section>
    <v-btn
      v-bind="bind"
      @click="sendEvent($event, item)"
      small
      rounded
    >
      <v-icon>{{ getValue('btnIcon') }}</v-icon>
      {{ getValue('label') }}
    </v-btn>
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
    return {}
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
            value[item[0]] = this.item[item[1]]
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
    },
    getValue (value) {
      try {
        if (this.isBindings) {
          return this.bind.find(item => Object.keys(item)[0] === value)[value]
        } else {
          return this.item[value]
        }
      } catch {
        return null
      }
    }
  }
}
</script>

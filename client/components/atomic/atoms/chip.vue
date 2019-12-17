<template>
  <section>
    <v-chip
      v-bind="bind"
      @click="sendEvent($event, item)"
    >
      {{ item[bindings.text] }}
    </v-chip>
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
    bind () {
      return Object.entries(this.bindings).map((item) => {
        const value = {}
        value[item[0]] = this.item[item[1]]
        return value
      })
    }
  },
  methods: {
    sendEvent (event, item) {
      this.$emit('componentEvent', {
        event,
        item
      })
    }
  }
}
</script>

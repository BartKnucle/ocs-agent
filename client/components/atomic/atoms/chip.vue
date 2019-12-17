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
  methods: {
    sendEvent(event, item) {
      this.$emit('componentEvent', {
        event: event,
        item: item
      })
    }
  },
  computed: {
    bind() {
      return Object.entries(this.bindings).map((item) => {
        let value = {}
        value[item[0]] = this.item[item[1]]
        return value
      })
    }
  }
}
</script>

<template>
  <section>
    <v-btn
      v-bind="bind"
      @click="sendEvent($event, item)"
    >
      {{ item[bindings.label] }}
    </v-btn>
  </section>
</template>
<script>

export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    bindings: {
      type: Object,
      default: {}
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

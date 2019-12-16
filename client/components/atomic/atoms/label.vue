<template>
  <section>
    {{ item[bindings.label] }}
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

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
    bind () {
      return Object.entries(this.bindings).map((item) => {
        const value = {}
        value[item[0]] = this.item[item[1]]
        return value
      })
    }
  }
}
</script>

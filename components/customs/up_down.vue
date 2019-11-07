<template>
  <v-chip
    :color="color()"
    label
    small
  >
    {{ text() }}
  </v-chip>
</template>
<script>

export default {
  props: {
    up: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    color () {
      if (this.up) {
        return 'green'
      } else {
        return 'red'
      }
    },
    text () {
      if (this.up) {
        return 'UP'
      } else {
        return 'DOWN'
      }
    }
  }
}
</script>

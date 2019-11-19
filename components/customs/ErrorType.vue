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
  name: 'ErrorType',
  props: {
    level: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {
    color () {
      switch (this.level) {
        case 0:
          return 'yellow'
        case 1:
          return 'orange'
        case 2:
          return 'red'
      }
    },
    text () {
      switch (this.level) {
        case 0:
          return 'Info'
        case 1:
          return 'Warning'
        case 2:
          return 'Error'
      }
    }
  }
}
</script>

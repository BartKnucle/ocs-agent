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
    installed: {
      type: Boolean,
      default: true
    },
    admin: {
      type: Boolean,
      default: true
    },
    update: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    color () {
      if (this.admin) {
        return 'grey'
      } else if (this.update) {
        return 'orange'
      } else if (this.installed) {
        return 'red'
      } else {
        return 'green'
      }
    },
    text () {
      if (this.update) {
        return 'Update'
      } else if (this.installed) {
        return 'Remove'
      } else {
        return 'Install'
      }
    }
  }
}
</script>

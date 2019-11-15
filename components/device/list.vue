<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="device().data"
      item-key="_id"
      hide-default-footer
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      headers: [
        { value: '_id', text: 'Class' },
        { value: 'data', text: 'Value' }
      ],
      hostname: {
        _id: '',
        data: ''
      },
      distro: {
        _id: '',
        data: ''
      }
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('device', { device: 'find', get: 'get' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('device', { find: 'find' })
  }
}
</script>

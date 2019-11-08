<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="interfaces().data"
      item-key="_id"
      hide-default-footer
    >
      <template v-slot:item.data.default="{ item }">
        <v-chip
          v-if="item.data.default"
          color="orange"
          label
          small
        >
          Default
        </v-chip>
      </template>
      <template v-slot:item.data.operstate="{ item }">
        <UpDown
          :up="getStatus(item.data.operstate)"
        />
      </template>
    </v-data-table>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import UpDown from '~/components/customs/up_down.vue'
export default {
  components: {
    UpDown
  },
  data () {
    return {
      headers: [
        { value: 'data.default', text: 'Default' },
        { value: 'data.ifaceName', text: 'Name' },
        { value: 'data.ip4', text: 'IpV4 Address' },
        { value: 'data.ip6', text: 'IpV6 Address' },
        { value: 'data.mac', text: 'Mac Address' },
        { value: 'data.operstate', text: 'Status' }
      ]
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('interfaces', { interfaces: 'find' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('interfaces', { find: 'find' }),
    getStatus (operstate) {
      if (operstate === 'up') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

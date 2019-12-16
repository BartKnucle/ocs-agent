<template>
  <v-data-table
    :headers="headers"
    :items="ifaces"
    item-key="_id"
    hide-default-footer
  >
    <template v-slot:item.default="{ item }">
      <v-chip
        v-if="item.default"
        color="orange"
        label
        small
      >
        Default
      </v-chip>
    </template>
    <template v-slot:item.updated="{ item }">
      {{ new Date(item.updated).toLocaleString() }}
    </template>
    <template v-slot:item.operstate="{ item }">
      <UpDown
        :up="getStatus(item.operstate)"
      />
    </template>
  </v-data-table>
</template>
<script>
import UpDown from '~/components/customs/UpDown.vue'
export default {
  components: {
    UpDown
  },
  props: {
    ifaces: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { value: 'default', text: 'Default' },
        { value: 'ifaceName', text: 'Name' },
        { value: 'ip4', text: 'IpV4 Address' },
        /*  { value: 'ip4_subnet', text: 'IpV4 Subnet' },
        { value: 'ip6', text: 'IpV6 Address' },
        { value: 'ip6_subnet', text: 'IpV6 Subnet' },
        { value: 'mac', text: 'Mac Address' },
        { value: 'operstate', text: 'Status' },
        { value: 'updated', text: 'Updated' } */
        { value: 'operstate', text: 'Status' }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {
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

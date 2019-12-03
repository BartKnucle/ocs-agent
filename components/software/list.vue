<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="_id"
    hide-default-footer
  >
    <template v-slot:item.installed="{ item }">
      <Installed
        :installed="item.installed"
        :admin="item.admin"
        :update="item.update"
        @install="$emit('install', item._id)"
      />
    </template>
  </v-data-table>
</template>
<script>
import Installed from '~/components/customs/Installed.vue'
export default {
  components: {
    Installed
  },
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { value: 'installed', text: 'Installed' },
        { value: 'name', text: 'Name' },
        { value: 'status', text: 'Status' }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

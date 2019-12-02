<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="_id"
    hide-default-footer
  >
    <template v-slot:item.started="{ item }">
      <UpDown
        :up="item.started"
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
    items: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { value: '_id', text: 'Name' },
        { value: 'description', text: 'description' },
        { value: 'started', text: 'Started' }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

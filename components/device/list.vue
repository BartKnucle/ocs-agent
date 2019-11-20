<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="device"
      item-key="_id"
      hide-default-footer
    >
      <template v-slot:item.updated="{ item }">
        {{ new Date(item.updated).toLocaleString() }}
      </template>
    </v-data-table>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    device: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { value: '_id', text: 'Class' },
        { value: 'data', text: 'Value' },
        { value: 'updated', text: 'Updated' }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

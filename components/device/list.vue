<template>
  <section>
    <div
      v-for="device in devices"
      :key="device._id"
    >
      <v-data-table
        :key="device._id"
        :headers="headers"
        :items="getDevice(device)"
        :item-key="getDevice(device)._id"
      >
        <template v-slot:item.updated="{ item }">
          {{ new Date(item.updated).toLocaleString() }}
        </template>
      </v-data-table>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    devices: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { value: '_id', text: 'Class' },
        { value: 'data', text: 'Value' }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {
    getDevice (device) {
      return Object.keys(device)
        .map((key) => {
          return { _id: key, data: device[key] }
        })
    }
  }
}
</script>

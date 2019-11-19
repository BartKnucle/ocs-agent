<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="logger().data"
      item-key="_id"
    >
      <template v-slot:item.data.level="{ item }">
        <ErrorType
          :level="item.data.level"
        />
      </template>
      <template v-slot:item._id="{ item }">
        {{ new Date(item.updated).toLocaleString() }}
      </template>
    </v-data-table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ErrorType from '~/components/customs/ErrorType.vue'
export default {
  components: {
    ErrorType
  },
  data () {
    return {
      headers: [
        { value: 'data.level', text: 'Level' },
        { value: '_id', text: 'Date' },
        { value: 'data.service', text: 'Service' },
        { value: 'data.text', text: 'Error' }
      ]
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('logger', { logger: 'find', get: 'get' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('logger', { find: 'find', remove: 'remove' }),
    clear () {
      this.remove(null, {
        query: {}
      })
    }
  }
}
</script>

<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="logger"
      item-key="_id"
    >
      <template v-slot:item.level="{ item }">
        <ErrorType
          :level="item.level"
        />
      </template>
      <template v-slot:item._id="{ item }">
        {{ new Date(item.updated).toLocaleString() }}
      </template>
    </v-data-table>
  </section>
</template>

<script>
import ErrorType from '~/components/customs/ErrorType.vue'
export default {
  components: {
    ErrorType
  },
  props: {
    logger: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { value: 'level', text: 'Level' },
        { value: '_id', text: 'Date' },
        { value: 'text', text: 'Error' }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {
    clear () {
      this.$emit('clear')
    }
  }
}
</script>

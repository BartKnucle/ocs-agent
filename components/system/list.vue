<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="system().data"
      item-key="_id"
      hide-default-footer
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'System',
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
    ...mapGetters('system', { system: 'find', get: 'get' }),
    sys () {
      return this.system().data.filter(x => x._id.startsWith('sys.') === true)
    },
    os () {
      return this.system().data.filter(x => x._id.startsWith('os.') === true)
    }
  },
  mounted () {
    this.find()
      .then(() => {
        this.hostname = this.get('os.hostname')
        this.distro = this.get('os.distro')
      })
  },
  methods: {
    ...mapActions('system', { find: 'find' })
  }
}
</script>

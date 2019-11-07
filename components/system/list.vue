<template>
  <section>
    <v-list>
      <v-list-item v-for="(item, key) in sys" :key="key">
        <v-list-item-content>
          {{ item._id }}
        </v-list-item-content>
        <v-list-item-content>
          {{ item.data }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'System',
  components: {},
  data () {
    return {
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

<template>
  <section>
    <v-card>
      <v-system-bar>
        Hostname: {{ hostname.data }}
      </v-system-bar>
      <table>
        <tr v-for="(item, key) in sys" :key="key">
          <td>
            {{ item._id }}
          </td>
          <td>
            {{ item.data }}
          </td>
        </tr>
      </table>
      <v-card>
        <v-system-bar>
          OS: {{ distro.data }}
        </v-system-bar>
        <table>
          <tr v-for="(item, key) in os" :key="key">
            <td>
              {{ item._id }}
            </td>
            <td>
              {{ item.data }}
            </td>
          </tr>
        </table>
      </v-card>
    </v-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'System',
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

<style>
.auth-form ul {
  list-style: none;
  padding: 0;
}

.auth-form li + li {
  margin-top: .5em;
}
</style>

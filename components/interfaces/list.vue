<template>
  <section>
    <v-list>
      <v-list-item v-for="(item, _id) in network().data" :key="_id">
        <v-list-item-content>
          {{ item.data.ifaceName }}
        </v-list-item-content>
        <v-list-item-content>
          {{ item.data.ip4 }}
        </v-list-item-content>
        <v-list-item-content>
          {{ item.data.ip6 }}
        </v-list-item-content>
        <v-list-item-content>
          {{ item.data.mac }}
        </v-list-item-content>
        <v-list-item-action>
          <UpDown
            :up="getStatus(item.data.operstate)"
          />
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import UpDown from '~/components/customs/up_down.vue'
export default {
  name: 'Network',
  components: {
    UpDown
  },
  data () {
    return {}
  },
  computed: { // only getters have live queries
    ...mapGetters('network', { network: 'find' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('network', { find: 'find' }),
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

<style>
.auth-form ul {
  list-style: none;
  padding: 0;
}

.auth-form li + li {
  margin-top: .5em;
}
</style>

<template>
  <section>
    <v-list>
      <v-list-item v-for="(item, _id) in interfaces().data" :key="_id">
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
        <v-list-item-icon v-if="item.data.default">
          <v-chip
            color="orange"
            label
            small
          >
            Default
          </v-chip>
        </v-list-item-icon>
        <v-list-item-icon>
          <UpDown
            :up="getStatus(item.data.operstate)"
          />
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import UpDown from '~/components/customs/up_down.vue'
export default {
  components: {
    UpDown
  },
  data () {
    return {}
  },
  computed: { // only getters have live queries
    ...mapGetters('interfaces', { interfaces: 'find' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('interfaces', { find: 'find' }),
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

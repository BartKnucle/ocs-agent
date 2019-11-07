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
        <v-list-item-content>
          {{ item.data.operstate }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Network',
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
    ...mapActions('network', { find: 'find' })
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

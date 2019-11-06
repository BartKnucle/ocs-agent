<template>
  <section>
    <table>
      <thead>
        <tr>
          <th scope="col">
            Name
          </th>
          <th scope="col">
            IpV4
          </th>
          <th scope="col">
            Mac address
          </th>
          <th scope="col">
            State
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, _id) in network().data" :key="_id">
          <td>
            {{ item.data.ifaceName }}
          </td>
          <td>
            {{ item.data.ip4 }}
          </td>
          <td>
            {{ item.data.mac }}
          </td>
          <td>
            {{ item.data.operstate }}
          </td>
        </tr>
      </tbody>
    </table>
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

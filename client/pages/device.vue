<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Device
        </v-toolbar-title>
      </v-toolbar>
      <ListDevice
        :devices="device().data"
      />
    </v-card>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Network interfaces
        </v-toolbar-title>
      </v-toolbar>
      <ListInterfaces
        :ifaces="interfaces().data"
      />
    </v-card>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ListInterfaces from '~/components/interfaces/list.vue'
import ListDevice from '~/components/device/list.vue'
export default {
  components: {
    ListInterfaces,
    ListDevice
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('device', { device: 'find', get: 'get' }),
    ...mapGetters('interfaces', { interfaces: 'find', get: 'get' })
  },
  mounted () {
    this.findDevice()
    this.findInterfaces()
  },
  methods: {
    ...mapActions('device', { findDevice: 'find' }),
    ...mapActions('interfaces', { findInterfaces: 'find' }),
    clearLog () {
      this.removeLogger(null, {
        query: {}
      })
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

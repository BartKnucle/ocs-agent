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
        :device="device().data"
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
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Logs
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click="$refs.ListLogs.clear()"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-toolbar>
      <ListLogs
        ref="ListLogs"
        :logger="logger().data"
        @clear="clearLog()"
      />
    </v-card>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ListInterfaces from '~/components/interfaces/list.vue'
import ListDevice from '~/components/device/list.vue'
import ListLogs from '~/components/logger/list.vue'
export default {
  components: {
    ListInterfaces,
    ListDevice,
    ListLogs
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('device', { device: 'find', get: 'get' }),
    ...mapGetters('interfaces', { interfaces: 'find', get: 'get' }),
    ...mapGetters('logger', { logger: 'find', get: 'get' })
  },
  mounted () {
    this.findDevice()
    this.findInterfaces()
    this.findLogger()
  },
  methods: {
    ...mapActions('device', { findDevice: 'find' }),
    ...mapActions('interfaces', { findInterfaces: 'find' }),
    ...mapActions('logger', { findLogger: 'find', removeLogger: 'remove' }),
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

<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Status
        </v-toolbar-title>
      </v-toolbar>
      <ListStatus
        :items="setup().data"
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
import ListLogs from '~/components/logger/list.vue'
import ListStatus from '~/components/setup/status.vue'
export default {
  components: {
    ListLogs,
    ListStatus
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('logger', { logger: 'find', get: 'get' }),
    ...mapGetters('setup', { setup: 'find', get: 'get' })
  },
  mounted () {
    this.findLogger()
    this.findSetup()
  },
  methods: {
    ...mapActions('logger', { findLogger: 'find', removeLogger: 'remove' }),
    ...mapActions('setup', { findSetup: 'find' }),
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

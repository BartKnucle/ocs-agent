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
      <ListDevice />
    </v-card>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Network interfaces
        </v-toolbar-title>
      </v-toolbar>
      <ListInterfaces />
    </v-card>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Logs
        </v-toolbar-title>
      </v-toolbar>
      <ListLogs />
    </v-card>
  </section>
</template>
<script>
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
  computed: {},
  mounted () {},
  methods: {}
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

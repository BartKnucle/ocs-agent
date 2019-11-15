<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Device
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon>
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>
            mdi-view-module
          </v-icon>
        </v-btn>
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
        <v-spacer />
        <v-btn icon>
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>
            mdi-view-module
          </v-icon>
        </v-btn>
      </v-toolbar>
      <ListInterfaces />
    </v-card>
  </section>
</template>
<script>
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

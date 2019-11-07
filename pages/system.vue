<template>
  <section>
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="white--text">
          System
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
      <ListSystem />
    </v-card>
    <v-card>
      <v-toolbar>
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
import ListSystem from '~/components/system/list.vue'
export default {
  name: 'System',
  components: {
    ListInterfaces,
    ListSystem
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

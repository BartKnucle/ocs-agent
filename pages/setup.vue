<template>
  <section>
    <v-text-field
      v-model="configServer"
      outlined
      label="Configuration server"
    />
    <v-btn
      @click="saveConfigServer()"
    >
      Add
    </v-btn>
    {{ setup().data }}
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Setup',
  data () {
    return {
      configServer: ''
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('setup', { setup: 'find' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('setup', { find: 'find', create: 'create', update: 'update' }),
    saveConfigServer () {
      const data = {
        _id: 'client.server',
        data: this.configServer
      }

      if (this.setup().data.find(x => x._id === 'client.server')) {
        this.update([
          'client.server',
          data
        ])
      } else {
        this.create(data)
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

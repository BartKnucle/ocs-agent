<template>
  <section>
    Software
    <SoftwareList
      :items="software().data"
      @install="install($event)"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SoftwareList from '~/components/software/list.vue'
export default {
  name: 'Software',
  components: {
    SoftwareList
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('software', { software: 'find', get: 'get' })
  },
  mounted () {
    this.findSoftware()
  },
  methods: {
    ...mapActions('software', { findSoftware: 'find', patch: 'patch' }),
    install (id) {
      this.patch([id, { status: 'installing' }])
    }
  }
}
</script>

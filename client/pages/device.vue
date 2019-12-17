<template>
  <section>
    <Datatable
      :items="componentItems"
      :headers="headers"
      :buttons="buttons"
      @componentEvent="onEvent"
    />
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Datatable from '~/components/atomic/organisms/data-table.vue'
export default {
  components: {
    Datatable
  },
  data () {
    return {
      buttons: [],
      headers: [
        {
          value: '_id',
          text: 'Id',
          component: {
            name: 'Label',
            bindings: {
              label: '_id'
            }
          }
        },
        {
          value: 'value',
          text: 'Value',
          component: {
            name: 'Label',
            bindings: {
              label: 'value'
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('device', { device: 'find', get: 'get' }),
    componentItems () {
      return Object.entries(this.device().data[0]).map((item) => {
        return { _id: item[0], value: item[1] }
      })
    }
  },
  mounted () {
    this.findDevice()
  },
  methods: {
    ...mapActions('device', { findDevice: 'find' }),
    onEvent (event) {}
  }
}
</script>
<style>
</style>

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
          value: 'default',
          text: 'Default',
          component: {
            name: 'Chip',
            bindings: {
              text: 'defaultLabel',
              color: 'defaultColor',
              hidden: 'defaultHidden'
            }
          }
        },
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
          value: 'ifaceName',
          text: 'Name',
          component: {
            name: 'Label',
            bindings: {
              label: 'ifaceName'
            }
          }
        },
        {
          value: 'mac',
          text: 'Mac Address',
          component: {
            name: 'Label',
            bindings: {
              label: 'mac'
            }
          }
        },
        {
          value: 'ip4',
          text: 'Ipv4 Address',
          component: {
            name: 'Label',
            bindings: {
              label: 'ip4'
            }
          }
        },
        {
          value: 'operstate',
          text: 'Status',
          component: {
            name: 'Chip',
            bindings: {
              text: 'statusLabel',
              color: 'statusColor'
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('interfaces', { interfaces: 'find', get: 'get' }),
    componentItems () {
      return this.interfaces().data.map((item) => {
        if (item.operstate === 'up') {
          item = { ...item, statusLabel: 'Started' }
          item = { ...item, statusColor: 'green' }
        } else {
          item = { ...item, statusLabel: 'Stopped' }
          item = { ...item, statusColor: 'red' }
        }

        if (item.default) {
          item = { ...item, defaultLabel: 'Default' }
          item = { ...item, defaultColor: 'orange' }
          item = { ...item, defaultHidden: false }
        } else {
          item = { ...item, defaultHidden: true }
        }

        if (item.updated) {
          item.updatedLabel = new Date(item.updated)
        }

        return item
      })
    }
  },
  mounted () {
    this.findInterfaces()
  },
  methods: {
    ...mapActions('interfaces', { findInterfaces: 'find' }),
    onEvent (event) {}
  }
}
</script>
<style>
</style>

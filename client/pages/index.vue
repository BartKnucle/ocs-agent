<template>
  <section>
    <DataTable
      :items="componentItems"
      :headers="headers"
      :buttons="buttons"
      @componentEvent="onEvent"
    />
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import DataTable from '~/components/atomic/organisms/data-table.vue'
export default {
  name: 'Software',
  components: {
    DataTable
  },
  data () {
    return {
      buttons: [
        {
          label: 'add',
          color: 'green'
        },
        {
          label: 'filter',
          color: 'yellow'
        }
      ],
      headers: [
        {
          value: 'name',
          text: 'Name',
          component: {
            name: 'Label',
            bindings: {
              label: 'name'
            }
          }
        },
        {
          value: 'status',
          text: 'Status',
          component: {
            name: 'Label',
            bindings: {
              label: 'status'
            }
          }
        },
        {
          value: 'installed',
          text: 'Installed',
          component: {
            name: 'Button',
            bindings: {
              label: 'btnLabel'
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('applications', { applications: 'find', get: 'get' }),
    componentItems () {
      return this.applications().data.map((item) => {
        switch (item.status) {
          case 'Installed':
            item = { ...item, btnLabel: 'Remove' }
            break
          case 'Not Installed':
            item = { ...item, btnLabel: 'Install' }
            break
          default:
            item = { ...item, btnLabel: 'Install' }
            break
        }
        return item
      })
    }
  },
  mounted () {
    this.findApplications()
  },
  methods: {
    ...mapActions('applications', { findApplications: 'find', patchApplication: 'patch' }),
    onEvent (event) {
      switch (event.item.status) {
        case 'Installed':
          this.patchApplication([event.item._id, { status: 'Removing' }])
          break
        case 'Not installed':
          this.patchApplication([event.item._id, { status: 'Installing' }])
          break
        default:
          this.patchApplication([event.item._id, { status: 'Installing' }])
          break
      }
    }
  }
}
</script>

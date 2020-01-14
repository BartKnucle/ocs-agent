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
        if (item.installed) {
          item = { ...item, btnLabel: 'Remove' }
        } else {
          item = { ...item, btnLabel: 'Install' }
        }
        return item
      })
    }
  },
  mounted () {
    this.findApplications()
  },
  methods: {
    ...mapActions('applications', { findApplications: 'find' }),
    onEvent (event) {
      // console.log(this.items)
    }
  }
}
</script>

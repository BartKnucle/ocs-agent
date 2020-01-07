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
          value: 'started',
          text: 'Started',
          component: {
            name: 'Chip',
            bindings: {
              text: 'startedLabel',
              color: 'startedColor'
            }
          }
        },
        {
          value: '_id',
          text: 'Name',
          component: {
            name: 'Label',
            bindings: {
              label: '_id'
            }
          }
        },
        {
          value: 'description',
          text: 'Description',
          component: {
            name: 'Label',
            bindings: {
              label: 'description'
            }
          }
        },
        {
          value: 'updated',
          text: 'Date',
          component: {
            name: 'Label',
            bindings: {
              label: 'updatedLabel'
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('setup', { setup: 'find', get: 'get' }),
    componentItems () {
      return this.setup().data.map((item) => {
        if (item.started) {
          item = { ...item, startedLabel: 'Started' }
          item = { ...item, startedColor: 'green' }
        } else {
          item = { ...item, startedLabel: 'Stopped' }
          item = { ...item, startedColor: 'red' }
        }

        if (item.updated) {
          item.updatedLabel = new Date(item.updated)
        }

        return item
      })
    }
  },
  mounted () {
    this.findSetup()
  },
  methods: {
    ...mapActions('setup', { findSetup: 'find' }),
    onEvent (event) {}
  }
}
</script>
<style>
</style>

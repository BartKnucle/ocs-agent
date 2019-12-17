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
      buttons: [
        {
          _id: 'clearLogs',
          label: 'Clear'
        }
      ],
      headers: [
        {
          value: 'level',
          text: 'Level',
          component: {
            name: 'Chip',
            bindings: {
              text: 'levelLabel',
              color: 'levelColor'
            }
          }
        },
        {
          value: 'text',
          text: 'Text',
          component: {
            name: 'Label',
            bindings: {
              label: 'text'
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
    ...mapGetters('logger', { logger: 'find', get: 'get' }),
    componentItems () {
      return this.logger().data.map((item) => {
        switch (item.level) {
          case 0:
            item = { ...item, levelLabel: 'Info' }
            item = { ...item, levelColor: 'yellow' }
            break
          case 1:
            item = { ...item, levelLabel: 'Warning' }
            item = { ...item, levelColor: 'orange' }
            break
          case 2:
            item = { ...item, levelLabel: 'Error' }
            item = { ...item, levelColor: 'red' }
            break
        }

        item.updatedLabel = new Date(item.updated)

        return item
      })
    }
  },
  mounted () {
    this.findLogger()
  },
  methods: {
    ...mapActions('logger', { findLogger: 'find', removeLogger: 'remove' }),
    onEvent (event) {
      if (event.item._id === 'clearLogs') {
        this.clearLog()
      }
    },
    clearLog () {
      this.removeLogger(null, {
        query: {}
      })
    }
  }
}
</script>
<style>
</style>

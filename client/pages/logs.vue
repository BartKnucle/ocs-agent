<template>
  <section>
    <List
      :items="componentItems"
      :headers="headers"
      @componentEvent="onEvent"
    >
    </list>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import List from '~/components/atomic/molecules/list.vue'
export default {
  components: {
    List
  },
  data () {
    return {
      headers: [
        {
          value: 'level',
          text: 'Level',
          component: {
            name: 'Chip',
            bindings: {
              text: 'levelLabel',
              color: 'levelColor',
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
      ],
    }
  },
  computed: {
    ...mapGetters('logger', { logger: 'find', get: 'get' }),
    componentItems() {
      return this.logger().data.map((item) => {
        switch (item.level) {
          case 0:
            item.levelLabel = 'Info'
            item.levelColor = 'yellow'
            break
          case 1:
            item.levelLabel = 'Warning'
            item.levelColor = 'orange'
            break
          case 2:
            item.levelLabel = 'Error'
            item.levelColor = 'red'
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
      console.log(event)
    }
  }
}
</script>
<style>
</style>

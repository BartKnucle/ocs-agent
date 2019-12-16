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
import List from '~/components/atomic/molecules/list.vue'
export default {
  name: 'Software',
  components: {
    List
  },
  data () {
    return {
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
      ],
      items: [
        {
          _id: 1,
          name: 'Acrobat reader',
          installed: false,
        },
        {
          _id: 2,
          name: 'Office 2016',
          installed: true
        }
      ]
    }
  },
  computed: {
    componentItems() {
      return this.items.map((item) => {
        if (item.installed) {
          item.btnLabel = 'Remove'
        } else { 
          item.btnLabel = 'Install'
        }
        return item
      })
    }
  },
  mounted () {},
  methods: {
    onEvent (event) {
      console.log(event)
    }
  }
}
</script>

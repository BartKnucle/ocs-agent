<template>
  <section>
    <DataTable
      :items="componentItems"
      :headers="headers"
      :buttons="buttons"
      @componentEvent="onEvent"
    >
    </DataTable>
    {{ items }}
  </section>
</template>
<script>
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
          installed: true,
        }
      ]
    }
  },
  computed: {
    componentItems() {
      return this.items.map((item) => {
        if (item.installed) {
          item = { ...item, btnLabel: 'Remove' }
        } else {
          item = { ...item, btnLabel: 'Install' }
        }
        return item
      })
    }
  },
  mounted () {},
  methods: {
    onEvent (event) {
      console.log(this.items)
    }
  }
}
</script>

<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      show-group-by
      dense
    >
      <template
        v-slot:item="{ item }"
      >
        <tr>
          <td
            v-for="(header) in headers"
            :key="header.value"
          >
            <component
              v-bind:is="header.component.name"
              @componentEvent="$emit('componentEvent', $event)"
              :bindings="header.component.bindings"
              :item="item"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </section>
</template>
<script>
import Label from '~/components/atomic/atoms/label.vue'
import Button from '~/components/atomic/atoms/button.vue'
import Chip from '~/components/atomic/atoms/chip.vue'
import Select from '~/components/atomic/atoms/select.vue'
export default {
  components: {
    Button,
    Label,
    Chip,
    Select
  },
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    },
    headers: {
      type: Array,
      default: () => { return [] }
    },
    search: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
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
</template>
<script>
import Label from '~/components/atomic/atoms/label.vue'
import Button from '~/components/atomic/atoms/button.vue'
import Chip from '~/components/atomic/atoms/chip.vue'
export default {
  components: {
    Button,
    Label,
    Chip
  },
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    },
    headers: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

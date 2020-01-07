<template>
  <Card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Search"
        single-line
        hide-details
      />
      <ActionBar
        :items="buttons"
        @componentEvent="$emit('componentEvent', $event)"
      />
    </v-card-title>
    <List
      :headers="headers"
      :items="items"
      :search="search"
      @componentEvent="$emit('componentEvent', $event)"
    />
  </Card>
</template>
<script>
import Card from '~/components/atomic/atoms/card.vue'
import ActionBar from '~/components/atomic/molecules/action-bar.vue'
import List from '~/components/atomic/molecules/list.vue'
export default {
  components: {
    Card,
    ActionBar,
    List
  },
  props: {
    buttons: {
      type: Array,
      default: () => { return [] }
    },
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
    return {
      search: ''
    }
  },
  methods: {}
}
</script>

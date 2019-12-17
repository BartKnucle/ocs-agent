<template>
  <Toolbar>
    <v-spacer />
    <Button
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      @componentEvent="$emit('componentEvent', $event)"
    />
  </Toolbar>
</template>
<script>
import Toolbar from '~/components/atomic/atoms/toolbar.vue'
import Button from '~/components/atomic/atoms/button.vue'
export default {
  components: {
    Toolbar,
    Button
  },
  props: {
    items: {
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

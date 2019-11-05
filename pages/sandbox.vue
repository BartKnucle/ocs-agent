<template>
  <section>
    Sandbox
  </section>
</template>

<script>
export default {
  name: 'Sandbox',
  data () {
    return {}
  },
  mounted () {
    console.log(Navigator.credentials)
  }
}
</script>

<style>
.auth-form ul {
  list-style: none;
  padding: 0;
}

.auth-form li + li {
  margin-top: .5em;
}
</style>

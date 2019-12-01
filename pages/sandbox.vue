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
    const myNotification = new Notification('Title', {
      body: 'Lorem Ipsum Dolor Sit Amet'
    })

    myNotification.onclick = () => {
      console.log('Notification clicked')
    }
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

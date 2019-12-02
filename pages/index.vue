<template>
  <section>
    Software
    <SoftwareList :items="softs" />
  </section>
</template>

<script>
import SoftwareList from '~/components/software/list.vue'
export default {
  name: 'Software',
  components: {
    SoftwareList
  },
  data () {
    return {
      softs: [
        {
          _id: '1',
          name: 'Vlc media player',
          status: 'Installed',
          update: false,
          installed: true,
          admin: false
        },
        {
          _id: '2',
          name: 'Office 2016',
          status: 'Installed',
          update: false,
          installed: true,
          admin: true
        },
        {
          _id: '3',
          name: 'Adobe Acrobat reader',
          status: 'Installation begin at DATE',
          update: false,
          installed: false,
          admin: false
        },
        {
          _id: '4',
          name: 'Teamviewer',
          status: 'Installation begin at DATE',
          update: true,
          installed: false,
          admin: false
        }
      ]
    }
  }
}
</script>

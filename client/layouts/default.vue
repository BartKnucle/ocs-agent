<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
      <v-spacer />
      <UpDown :up="getStatus" />
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UpDown from '~/components/customs/UpDown.vue'
export default {
  components: {
    UpDown
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-package-variant',
          title: 'Applications',
          to: '/'
        },
        {
          icon: 'mdi-arrow-up-bold-circle',
          title: 'Updates',
          to: '/updates'
        },
        {
          icon: 'mdi-laptop',
          title: 'Device',
          to: '/device'
        },
        {
          icon: 'mdi-server-network',
          title: 'Network',
          to: '/network'
        },
        {
          icon: 'mdi-check-all',
          title: 'Status',
          to: '/status'
        },
        {
          icon: 'mdi-view-headline',
          title: 'Logs',
          to: '/logs'
        },
        {
          icon: 'mdi-play',
          title: 'Sandbox',
          to: '/sandbox'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'OCM Agent'
    }
  },
  computed: {
    ...mapGetters('setup', { setup: 'find', get: 'get' }),
    getStatus () {
      return this.setup().data
        .reduce((status, service) => {
          status = status && service.started
          return status
        }, true)
    }
  },
  mounted () {
    this.findSetup()
  },
  methods: {
    ...mapActions('setup', { findSetup: 'find' })
  }
}
</script>

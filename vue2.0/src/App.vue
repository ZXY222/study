<template>
  <div id="app">
      <component
          :is="component"
          @pushRouter="pushRouter"
      ></component>
  </div>
</template>

<script>
import login from "./components/login";
import chatRoom from "./components/chatRoom";
export default {
  name: 'App',
    data() {
      return {
          component: 'login'
      }
    },
    components: {
        login,
        chatRoom
    },
    methods: {
      pushRouter(route) {
          this.component = route
      }
    }
}
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
}
</style>

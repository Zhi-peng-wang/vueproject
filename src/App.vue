<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import signIn from '@/page/signIn'
import signUp from '@/page/signUp'

export default {
  name: 'App',
  components: {
    signUp,signIn,
  }
}
</script>

<style>
</style>

<template>
  <div>
    <h1>TOP</h1>
    <input v-model='userName'>
    <button v-on:click='clickCreateUser()'>Create User</button>
  </div>
</template>

<script>
import '../../../src/index.js'

export default {
  name: 'createUser',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    clickCreateUser () {
      // ログイン処理を挟む
      console.log(this.userName)
      this.$router.push('user/wallet')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

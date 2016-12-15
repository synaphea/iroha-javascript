<template>
  <div>
    <h1>TOP</h1>
    <input v-model='userName'>
    <button v-on:click='clickCreateUser()'>Create User</button>
  </div>
</template>

<script>
import iroha from '../../../src/iroha.js'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'createUser',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    clickCreateUser () {
      this.registAccount()
    },

    registAccount () {
      // ログイン処理を挟む
      var keys = iroha.createKeyPair()

      /* eslint-disable no-undef */
      const url = `${IROHA_URL}/account/register`
      axios.post(url, {
        publicKey: keys.publicKey,
        alias: this.userName,
        timestamp: moment().unix()
      })
      .then(function (response) {
        console.log(response)

        this.$localStorage.set('publicKey', keys.publicKey)
        this.$localStorage.set('privateKey', keys.privateKey)
        this.$router.push('user/wallet')
      })
      .catch(function (error) {
        console.error(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

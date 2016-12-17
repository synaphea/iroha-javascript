<template>
  <div class='row center'>
    <img class='col s6 offset-s3 responsive-img center' src="../assets/iroha_logo.png" alt="iroha image">
    <input type='text' v-model='userName'>
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
      const url = `${IROHA_URL}/api/v1/account/register`
      axios.post(url, {
        'publicKey': keys.publicKey,
        'alias': this.userName,
        'timestamp': moment().unix()
      })
      .then((response) => {
        console.log(response)

        // save data
        this.$localStorage.set('publicKey', keys.publicKey)
        this.$localStorage.set('privateKey', keys.privateKey)
        this.$localStorage.set('uuid', response.data.uuid)

        this.$router.push('user/wallet')
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

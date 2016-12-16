<template>
  <div>
    <h1>USER</h1>
    <router-link to='/user/wallet'>Wallet</router-link>
    <router-link to='/user/send'>Send</router-link>
    <router-link to='/user/receive'>Receive</router-link>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import Wallet from './Wallet'
import Send from './Send'
import Receive from './Receive'

export default {
  name: 'user',
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.fetchAccount()
  },
  methods: {
    fetchAccount () {
      /* eslint-disable no-undef */
      const url = `${IROHA_URL}/api/v1/account`
      let uuid = this.$localStorage.get('uuid')
      axios.get(url, {
        params: {
          uuid: uuid
        }
      })
      .then(function (response) {
        this.value = response.data.assets[0].value
      })
      .catch(function (error) {
        console.error(error)
      })
    }
  },
  components: {
    Wallet,
    Send,
    Receive
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

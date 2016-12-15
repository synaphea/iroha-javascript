<template>
  <div>
    <h1>TOP</h1>
  </div>
</template>

<script>
import Wallet from './Wallet'
import Send from './Send'
import Receive from './Receive'

export default {
  name: 'createUser',
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

<template>
  <div>
    send
  </div>
</template>

<script>
import iroha from '../../../src/iroha.js'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'send',
  data () {
    return {
      value: '',
      receiver: ''
    }
  },
  created () {
  },
  methods: {
    clickSend () {
    },
    sendValue () {
      /* eslint-disable no-undef */
      const url = `${IROHA_URL}/api/v1/asset/operation`
      const assetUuid = ''
      let publicKey = this.$localStorage.get('publicKey')
      let timestamp = moment().unix()
      let command = 'transfer'
      let message = `${timestamp}${this.value}${publicKey}${this.receiver}${command}${assetUuid}`

      /* eslint-disable indent */
      let sign = iroha.createSignature({
                  publicKey: publicKey,
                  privateKey: this.$localStorage.get('privateKey'),
                  message: message
                 })

      axios.post(url, {
        'asset-uuid': assetUuid,
        'params': {
          'command': command,
          'value': this.value,
          'sender': publicKey,
          'receiver': this.receiver
        },
        'signature': sign,
        'timestamp': timestamp
      })
      .then(function (response) {
        console.log(response)
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

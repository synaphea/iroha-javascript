<template>
  <div>
    wallet
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'wallet',
  data () {
    return {
      transactions: []
    }
  },
  created () {
    this.fetchHistory()
  },
  methods: {
    fetchHistory () {
      /* eslint-disable no-undef */
      const url = `${IROHA_URL}/api/v1/history/transaction`
      let uuid = this.$localStorage.get('uuid')
      axios.get(url, {
        params: {
          uuid: uuid
        }
      })
      .then((response) => {
        this.transactions = response.data.history
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

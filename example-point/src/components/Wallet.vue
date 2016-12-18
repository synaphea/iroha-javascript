<template>
  <div class='wallet-wrapper row'>
    <table class='col s8 offset-s2 centered wallet-table'>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>From</th>
          <th>To</th>
          <th>Ammount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='transaction in transactions'>
          <td>{{ transData(transaction.timestamp )}}</td>
          <td>{{ transaction.param.sender }}</td>
          <td>{{ transaction.param.receiver }}</td>
          <td>{{ transaction.param.value }}</td>
        </tr>
        <tr>
          <td>2016/11/10</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
        </tr>
        <tr>
          <td>2016/11/10</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
        </tr>
        <tr>
          <td>2016/11/10</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
        </tr>
        <tr>
          <td>2016/11/10</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
        </tr>
        <tr>
          <td>2016/11/10</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
        </tr>
        <tr>
          <td>2016/11/10</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
          <td>testtestesteesaaaaaaaaaaa</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

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
        if (response.data.status === 200) {
          this.transactions = response.data.history
        }
      })
      .catch((error) => {
        console.error(error)
      })
    },
    transDate (timestamp) {
      const time = moment.unix(timestamp).format('YYYY/MM/DD HH:mm:ss')
      return time
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wallet-wrapper{
  height: 90%;
  overflow: scroll;
}

.wallet-table{
  border: 2px solid #000;
}

.wallet-table > thead > tr{
  background-color: #DB0722;
  color: #fff;
  border: 1px solid #fff;
}

.wallet-table > thead > tr > th{
  border: 1px solid #fff;;
}

.wallet-table > tbody > tr > td{
  border: 1px solid #000;

}
</style>

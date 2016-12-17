<template>
  <div>
    receive
    <div v-html='image'></div>
    <input type='number' min='0' v-bind:change='createQr()' v-model.number='ammount'>
  </div>
</template>

<script>
import Qr from 'qr-image'

export default {
  name: 'receive',
  data () {
    return {
      image: '',
      ammount: 100
    }
  },
  created () {
  },
  methods: {
    createQr () {
      if (this.ammount < 0 || !this.ammount) return
      console.log(this.ammount)
      const qrData = {
        account: this.$localStorage.get('publicKey'),
        ammount: this.ammount
      }
      const qrString = JSON.stringify(qrData)
      console.log(qrString)
      const img = Qr.imageSync(qrString, {type: 'svg'})
      this.image = img
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
svg{
  width: 200px;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    -moz-appearance:textfield;
}
</style>

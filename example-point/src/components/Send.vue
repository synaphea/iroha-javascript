<template>
  <div>
    send
    <video id="video"/>
  </div>
</template>

<script>
import iroha from '../../../src/iroha.js'
import axios from 'axios'
import moment from 'moment'
import Qrcode from 'qrcode-reader'

export default {
  name: 'send',
  data () {
    return {
      value: '',
      receiver: ''
    }
  },
  created () {
    console.log('created')
    this.prepareVideo()
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
    },
    prepareVideo () {
      /* とりあえずここに書いて後から分離する */
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      var URL = window.URL || window.webkitURL
      /* eslint-disable no-unused-vars */
      var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection
      var RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription
      var RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate
      var mediaC = {
        'mandatory': {
          'OfferToReceiveAudio': true,
          'OfferToReceiveVideo': true
        }
      }
      var iceConfig = {
        'iceServers': []
      }
      var qrcode = new Qrcode()

      function getVideoSources (callback) {
        if (!navigator.mediaDevices) {
          console.log('MediaStreamTrack')
          MediaStreamTrack.getSources(function (cams) {
            cams.forEach(function (c, i, a) {
              if (c.kind !== 'video') return
                callback({
                  name: c.facing,
                  id: c.id
                })
            })
          })
        } else {
          navigator.mediaDevices.enumerateDevices().then(function (cams) {
            cams.forEach(function (c, i, a) {
              console.log('mediaDevices', c)
                if (c.kind !== 'videoinput') return
                  callback({
                    name: c.label,
                    id: c.deviceId
                  })
            })
          })
        }
      }

      getVideoSources(function (cam) {
        main(cam.id)
      })

      function main (camId) {
        navigator.getUserMedia({
          audio: false,
          video: {
            optional: [
            {width: 100},
            {sourceId: camId}
            ]
          }
        }, function (stream) { // success
          console.log('Start Video', stream)
            var localStream = stream
            var video = document.getElementById('video')
            video.src = URL.createObjectURL(stream)
            video.play()
            video.volume = 0
            var stop = startReadQr(video, function (res) {
              stop()
              console.log(res)
            })
        }, function (e) { // error
          console.error('Error on start video: ' + e.code)
        })
      }

      function startReadQr (video, cb) {
        var state = 'run'
        qrcode.callback = function (res) {
          console.log(res)
            /* eslint-disable no-extra-boolean-cast */
            if (!!res) {
              cb(res)
            }
        }

        var videoRead = function () {
          var w = video.videoWidth
          var h = video.videoHeight
          var canvas = document.createElement('canvas')
          console.log(canvas)
          canvas.width = w
          canvas.height = h
          var ctx = canvas.getContext('2d')

          var draw = function () {
            if (state === 'stop') {
              return
            }

            requestAnimationFrame(draw)

            ctx.drawImage(video, 0, 0, w, h)
            var data = canvas.toDataURL('image/png')
            qrcode.decode(data)
          }

          draw()
        }

        if (video.readyState === 0) {
          video.onloadedmetadata = videoRead
        } else {
          videoRead()
        }

        return function () {
          state = 'stop'
        }
      }
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

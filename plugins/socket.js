import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'

export default function ({store}) {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: io(),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
  }))

}


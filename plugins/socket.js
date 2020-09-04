import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function ({store}) {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: 'https://heuristic-cori-1f7746.netlify.app',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
  }))

}


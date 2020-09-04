<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-snackbar
                v-model="snackbar"
                :timeout="6000"
                top>
                {{ message }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="red"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Закрыть
                  </v-btn>
                </template>
              </v-snackbar>

              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>EuChat</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="name"
                    autocomplete="off"
                    :rules="nameRules"
                    :counter="16"
                    label="Ваше имя"
                    prepend-icon="mdi-account"
                  ></v-text-field>

                  <v-text-field
                    v-model="room"
                    :rules="roomRules"
                    autocomplete="off"
                    label="Введите номер комнаты"
                    prepend-icon="mdi-lock"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  layout: 'empty',
  head: {
    title: 'Welcome to EuChat'
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
  },
  data: () => ({
    valid: true,
    snackbar: false,
    message: '',
    name: '',
    nameRules: [
      v => !!v || 'Введите имя',
      v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов'
    ],
    room: '',
    roomRules: [
      v => !!v || 'Введите номер комнаты'
    ],
  }),
  mounted() {
    const {message} = this.$route.query
    if (message === 'noUser') {
      this.message = 'Введите данные'
    } else if (message === 'leftChat') {
      this.message = 'Вы покинули чат'
    }

    this.snackbar = !!this.message
  },
  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        this.$socket.emit('userJoined', user, (data) => {
          if (typeof data === 'string') {
            // console.log(data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    }
  }
}
</script>

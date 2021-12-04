<template>
  <div class="home">
    <md-card class="card" v-if="isSignIn">
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="loginMethod">Войти</md-button>
        <md-button @click="isSignIn = false">Зарегистрироваться</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="card" v-else>
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input v-model="signUp.email"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="signUp.plainPassword"></md-input>
        </md-field>
        <md-field>
          <label>Повторите пароль</label>
          <md-input v-model="signUp.repeatedPlainPassword"></md-input>
        </md-field>
        <md-field>
          <label>Имя</label>
          <md-input v-model="signUp.fullName"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="isSignIn = true">Войти</md-button>
        <md-button @click="signUpMethod">Отправить</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios';

const server = 'http://localhost:1780/api';

export default {
  name: 'Home',
  data() {
    return {
      email: '',
      password: '',
      isSignIn: true,
      signUp: {
        email: '',
        plainPassword: '',
        repeatedPlainPassword: '',
        fullName: '',
      },
    };
  },
  methods: {
    async signUpMethod() {
      try {
        const response = await axios.post(`${server}/registration`, this.signUp);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async loginMethod() {
      try {
        await this.$store.dispatch('getToken', {
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  max-width: 400px;
  margin: 100px auto;
}
</style>

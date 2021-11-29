<template>
  <div class="home">
    <md-card class="card" v-if="isSighnIn">
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
        <md-button @click="isSighnIn = false">Зарегистрироваться</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="card" v-else>
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input v-model="sighnUp.email"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="sighnUp.password"></md-input>
        </md-field>
        <md-field>
          <label>Повторите пароль</label>
          <md-input v-model="sighnUp.passwordRepeat"></md-input>
        </md-field>
        <md-field>
          <label>Имя</label>
          <md-input v-model="sighnUp.name"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="isSighnIn = true">Войти</md-button>
        <md-button @click="sighnUpMethod">Отправить</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import axios from "axios";

const server = "http://localhost:1780/api";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
      isSighnIn: true,
      sighnUp: {
        email: "",
        password: "",
        passwordRepeat: "",
        name: "",
      },
    };
  },
  methods: {
    async sighnUpMethod() {
      try {
        const response = await axios.post(
          `${server}/registraton`,
          this.sighnUp
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async loginMethod() {
      try {
        const response = await axios.post(`${server}/login`, {
          email: this.email,
          password: this.password,
        });
        console.log(response);
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

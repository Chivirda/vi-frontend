<template>
  <div class="home">
    <md-card class="card" :class="messageClass" v-if="isSignIn">
      <span class="md-error form-error">{{ this.formError.message }}</span>
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

    <md-card class="card" :class="messageClass" v-else>
      <span class="md-error form-error">{{ this.formError.message }}</span>
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
      formError: {
        hasError: false,
        message: '',
      },
    };
  },
  methods: {
    async signUpMethod() {
      try {
        const response = await this.$api.post('registration', this.signUp);
        if (response.data.error) {
          this.formError.hasError = response.data.error;
          this.formError.message = response.data.message;
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async loginMethod() {
      try {
        const response = await this.$api.post('login', {
          email: this.email,
          password: this.password,
        });
        this.$api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data;
        this.$store.commit('setToken', response.data.data);
        if (response.data.error) {
          this.formError.hasError = response.data.error;
          this.formError.message = response.data.message;
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    messageClass() {
      return {
        'md-invalid': this.formError.hasError,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  max-width: 400px;
  margin: 100px auto;
}

.form-error {
  background-color: transparent;
  color: red;
}
</style>

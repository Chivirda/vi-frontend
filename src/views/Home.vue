<template>
  <div class="home">
    <md-card class="card">
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
        <md-button>Войти</md-button>
        <md-button>Зарегистрироваться</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.card {
  max-width: 400px;
  margin: 100px auto;
}
</style>

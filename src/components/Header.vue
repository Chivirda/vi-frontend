<template>
  <div class="md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="show()">
        <md-icon>menu</md-icon>
      </md-button>
      <router-link to="/">
        <md-icon class="md-title">move_to_inbox</md-icon>
      </router-link>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Основное меню</span>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span @click="hide()">
            <router-link to="/" class="md-title">Главная</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>send</md-icon>
          <span @click="hide()">
            <router-link to="/tasks" class="md-title">Список заявок</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>analytics</md-icon>
          <span @click="hide()">
            <router-link to="/analytics" class="md-title">Аналитика</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-drawer>
    <breadcrumbs />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumb';
export default {
  name: 'Header',
  components: { Breadcrumbs },
  data: () => ({
    showNavigation: false,
  }),
  methods: {
    show() {
      this.showNavigation = true;
    },
    hide() {
      this.showNavigation = false;
    },
  },
};
</script>

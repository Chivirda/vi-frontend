<template>
  <ul class="breadcrumbs__list">
    <template v-for="(breadcrumb, index) in breadcrumbsList">
      <li class="breadcrumbs__item" :key="index" v-if="breadcrumb.link">
        <router-link :to="breadcrumb.link" class="breadcrumbs__link">{{ breadcrumb.name }}</router-link>
        <span class="breadcrumbs__item breadcrumbs__item--divider" v-if="breadcrumb.link">/</span>
      </li>
      <template v-else>
        <li class="breadcrumbs__item" :key="index">
          {{ breadcrumb.name }}
        </li>
      </template>
    </template>
  </ul>
</template>
<script>
export default {
  name: 'Breadcrumbs',
  data: () => ({
    breadcrumbsList: null,
  }),
  watch: {
    $route() {
      this.breadcrumbsList = this.$route.meta.breadcrumb;
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumbs {
  &__list {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 18px 12px;
  }

  &__item--divider {
    padding: 0 12px;
  }

  &__link {
    text-decoration: underline;

    &--active {
      color: #ddd;
      text-decoration: none;
    }

    &:hover {
      text-decoration: none;
    }
  }
}
</style>

<template>
  <section class="not-found">
    <div class="not-found__row">
      <img
        class="not-found__img"
        src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/062bd150d643584794ae3ebb/xcxcxcxc-min.png"
        alt=""
      />
      <div class="not-found__description">
        <span class="not-found__title"> Страница не найдена</span>
        <span class="not-found__text">404</span>
        <span>
          <a href="/" class="not-found__link">Вернуться на главную</a>
        </span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'NotFound',
};
</script>
<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    line-height: 1.1;
    font-size: 2.75rem;
    font-style: normal;
    font-weight: 700;
    margin: 30px;
  }

  &__img {
    height: 380px;
  }

  &__text {
    line-height: 1.1;
    font-size: 8rem;
    font-style: normal;
    font-weight: 700;
  }

  &__description {
    display: flex;
    flex-direction: column;
    color: #359756;
    flex: 0 0 50%;
    max-width: 50%;
    min-width: 50%;
    padding: 10px;
    background-color: #f2f2f2;
  }

  &__link {
    display: flex;
    justify-content: center;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>

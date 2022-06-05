<template>
  <header class="header">
    <div class="header__column">
      <img
        src="../assets/images/header-image.jpg"
        alt="cleaning up some room"
        decoding="async"
        width="750"
        height="1024"
        class="header__image"
      />
    </div>
    <div class="header__column">
      <div class="header__content">
        <h1 class="header__content__title">
          <span class="header__content__title__line">Уборка</span>
          <span class="header__content__title__line">квартир</span>
          <span class="header__content__title__line">в Киеве</span>
        </h1>
        <p class="header__content__info">
          Мы уберем у вас дома или в офисе. Наведем чистоту после ремонта и
          проведем генеральную уборку.
        </p>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: stretch;

  min-height: 90vh;
  max-height: 98vh;

  &__column {
    flex-grow: 1;
    flex-basis: 50%;

    &:nth-of-type(2) {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      padding-inline: 7.5vw 1rem;
    }
  }

  &__image {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    &__wrapper {
      width: 100%;
      height: 100%;

      overflow: hidden;
    }
  }

  &__content {
    width: min-content;

    &__title {
      font-weight: 400;
      line-height: 1.025;

      white-space: nowrap;

      margin-block: 0 2rem;

      &__line {
        display: block;
      }
    }

    &__info {
      font-size: var(--step--2);
    }
  }
}
</style>

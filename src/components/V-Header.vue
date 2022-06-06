<script setup>
import useGsap from '../hooks/use-gsap';

const { gsap } = useGsap();

onMounted(() => {
  const revealTL = gsap.timeline();

  revealTL.to('.header__content__title__line__content', {
    yPercent: -100,
    stagger: 0.1,
    ease: 'expo.out',
  });
  revealTL.to('.header__content__info', { opacity: 1 }, '<+0.175');
});
</script>

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
          <span class="header__content__title__line">
            <span class="header__content__title__line__content">Уборка</span>
          </span>
          <span class="header__content__title__line">
            <span class="header__content__title__line__content">квартир</span>
          </span>
          <span class="header__content__title__line">
            <span class="header__content__title__line__content">в Киеве</span>
          </span>
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

  height: 100vh;

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

        overflow: hidden;

        &__content {
          display: inline-block;
          transform: translateY(100%);
        }
      }
    }

    &__info {
      font-size: var(--step--2);

      opacity: 0;
    }
  }
}
</style>

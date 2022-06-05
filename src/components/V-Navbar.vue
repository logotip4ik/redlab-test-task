<script setup>
import NavLogo from '../assets/images/nav-logo.svg';
import NavMenu from '../assets/images/nav-menu.svg';

const navLinks = [
  'После ремонта',
  'Генеральная уборка',
  'Регулярная уборка',
  'Мойка окон',
];
</script>

<template>
  <div class="nav">
    <div class="nav__column nav__column--heading">
      <NavLogo class="nav__logo" />
      <Utils-VToggle class="nav__toggle">
        <template #left-text>Дом</template>
        <template #right-text>Офис</template>
      </Utils-VToggle>
    </div>
    <div class="nav__column nav__column--links">
      <ul class="nav__links" :style="{ '--list-length': navLinks.length }">
        <li v-for="(link, key) in navLinks" :key="key" class="nav__links__item">
          <a href="#" @click.prevent.stop class="nav__links__item__link">
            {{ link }}
          </a>
        </li>
      </ul>
    </div>
    <div class="nav__column nav__column--info">
      <div class="nav__contact-info">
        <a href="tel:+380674016977" class="nav__contact-info__phone"
          >+380 67 401 69 77</a
        >
        &nbsp;|&nbsp;
        <p class="nav__contact-info__time">24 / 7</p>
      </div>

      <button class="nav__menu-button">
        <NavMenu class="nav__menu-button__svg" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@mixin link-decoration {
  color: currentColor;
  text-decoration-thickness: 2px;
  text-decoration-color: transparent;

  transition: text-decoration-color 0.2s;

  &:is(:hover, :focus-visible) {
    text-decoration-color: currentColor;
  }
}

.nav {
  display: grid;
  grid-template-columns: 23% auto 23%;
  gap: 0.25rem;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;

  padding: 1.25rem clamp(1rem, 1.25vw, 2rem);

  &__column {
    &--heading {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &--links {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &--info {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  &__contact-info {
    --free-space: clamp(0.25rem, 0.75vw, 1rem);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-size: calc(var(--step--2) - 0.1rem);
    font-weight: 500;

    margin-right: calc(var(--free-space) * 2);

    &__phone {
      @include link-decoration;

      margin-right: var(--free-space);
    }

    &__time {
      margin-left: var(--free-space);
    }
  }

  &__menu-button {
    --btn-size: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 1;

    width: var(--btn-size);
    height: var(--btn-size);

    margin: 0;
    padding: 0;

    border: none;
    border-radius: 0.25rem;
    background-color: transparent;

    transition: color 0.2s, background-color 0.2s;

    &::after {
      content: '';

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      background-color: var(--primary-color);
      filter: blur(10px);

      opacity: 0;

      transition: opacity 0.2s;
    }

    &:is(:hover, :focus-visible) {
      color: white;
      background-color: var(--primary-color);

      &::after {
        opacity: 0.65;
      }
    }
  }

  &__logo {
    margin-right: clamp(1rem, 2vw, 2rem);
  }

  &__links {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(var(--list-length), max-content);
    gap: clamp(1rem, 2.5vw, 2.5rem);

    font-size: calc(var(--step--2) - 0.1rem);

    padding: 0;
    margin: 0;
    list-style-type: none;

    &__item {
      &__link {
        @include link-decoration;

        font-weight: 500;
      }
    }
  }
}
</style>

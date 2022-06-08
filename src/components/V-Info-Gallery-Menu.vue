<script setup>
import useEmitter from '../hooks/use-emitter';
import useCurrentSection from '../hooks/use-current-section';
import useGsap from '../hooks/use-gsap';

const menuSections = ['Кухня', 'Комнаты', 'Ванная', 'Прихожая'];

const { gsap } = useGsap();
const emitter = useEmitter();
const currentSection = useCurrentSection();

const infoGalleryInfoRef = ref(null);
const infoGalleryInfoListItemsRef = ref([]);

function isSmallScreen(breakpoint = 1100) {
  return window.innerWidth < breakpoint;
}

onMounted(() => {
  const showMenu = () => {
    const smallScreen = isSmallScreen();
    const revealTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    revealTl.to(infoGalleryInfoRef.value, {
      [smallScreen ? 'yPercent' : 'xPercent']: smallScreen ? -100 : 100,
      ease: 'expo.out',
      duration: 0.75,
    });

    revealTl.from(
      infoGalleryInfoListItemsRef.value,
      {
        [smallScreen ? 'opacity' : 'xPercent']: smallScreen ? 0 : -100,
        duration: 0.75,
        stagger: 0.05,
        transition: 'none',
        clearProps: 'all',
      },
      0.1
    );
  };

  const hideMenu = () =>
    gsap.to(infoGalleryInfoRef.value, {
      [isSmallScreen() ? 'yPercent' : 'xPercent']: isSmallScreen() ? 100 : 0,
      ease: 'expo.out',
      duration: 0.75,
    });

  emitter.on('gallery:fixed', showMenu);
  emitter.on('gallery:static', hideMenu);

  onBeforeUnmount(() => {
    emitter.off('gallery:fixed', showMenu);
    emitter.off('gallery:static', hideMenu);
  });
});
</script>

<template>
  <div
    ref="infoGalleryInfoRef"
    class="info-gallery-menu"
    :style="{ '--sections-length': menuSections.length }"
  >
    <p class="info-gallery-menu__title">Как мы убираем</p>

    <ul class="info-gallery-menu__list">
      <li
        v-for="(section, key) in menuSections"
        :key="key"
        :ref="(el) => (infoGalleryInfoListItemsRef[key] = el)"
        :class="{
          'info-gallery-menu__list__item': true,
          'info-gallery-menu__list__item--active': key === currentSection,
        }"
        @click="currentSection = key"
      >
        <span>→ </span>{{ section }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.info-gallery-menu {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  width: 25%;

  color: white;
  background-color: var(--primary-color);

  transform: translateX(-100%);

  &__title {
    position: absolute;
    top: 2rem;
    left: 1.5rem;

    font-size: calc(var(--step--1) - 0.1rem);
    font-weight: 500;

    margin: 0;
    opacity: 0.9;

    @media screen and (max-width: 1100px) {
      top: 0.5rem;
      left: 0.5rem;
    }
  }

  &__list {
    display: grid;
    grid-template-rows: repeat(var(--sections-length), 1fr);
    justify-content: start;
    align-content: center;
    gap: 4rem;

    width: calc(100% - 1ch);

    padding: 0;
    margin: 0;

    overflow: hidden;

    &__item {
      position: relative;

      font-size: var(--step-1);
      text-align: left;

      margin-left: 0;

      opacity: 0.7;

      list-style-type: none;

      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s, margin 0.2s;

      // selector for marker
      & > span {
        position: absolute;
        right: 91%;

        opacity: 0;

        transition: right 0.2s, opacity 0.2s;
      }

      &--active {
        opacity: 1;

        margin-left: 1.6ch;

        transform: skewX(-15deg);

        & > span {
          right: calc(100% + 0.4rem);

          opacity: 1;
        }
      }
    }

    @media screen and (max-width: 1100px) {
      justify-items: center;
      grid-template-columns: repeat(calc(var(--sections-length) / 2), 1fr);
      grid-template-rows: repeat(calc(var(--sections-length) / 2), 1fr);
    }
  }

  @media screen and (max-width: 1100px) {
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 25%;

    transform: translateY(100%);
  }
}
</style>

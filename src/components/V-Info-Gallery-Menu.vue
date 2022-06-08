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

onMounted(() => {
  const showMenu = () => {
    const revealTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    revealTl.to(infoGalleryInfoRef.value, {
      xPercent: 100,
      ease: 'expo.out',
      duration: 0.75,
    });

    revealTl.from(
      infoGalleryInfoListItemsRef.value,
      {
        xPercent: -100,
        duration: 0.75,
        stagger: 0.05,
        transition: 'none',
        clearProps: 'transform, transition',
      },
      0.1
    );
  };

  const hideMenu = () =>
    gsap.to(infoGalleryInfoRef.value, {
      xPercent: 0,
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
        {{ section }}
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
    top: 1rem;
    left: 2rem;

    font-size: var(--step--1);
    font-weight: 500;
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
      left: 0;

      font-size: var(--step-2);

      margin-left: -1.25ch;

      opacity: 0.7;

      list-style-position: inside;

      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s, margin 0.2s;

      &::marker {
        content: '→ ';
      }

      &--active {
        opacity: 1;

        margin-left: 0;

        transform: skewX(-15deg);
      }
    }
  }
}
</style>

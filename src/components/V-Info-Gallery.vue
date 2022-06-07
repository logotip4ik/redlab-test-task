<script setup>
import InfoImage1 from '../assets/images/info-gallery-image-1.png';
import InfoImage2 from '../assets/images/info-gallery-image-2.png';
import useGsap from '../hooks/use-gsap';

const { gsap, Flip, ScrollTrigger } = useGsap();

const infoGallerySlidesRef = ref(null);
const infoGallerySlidesImagesRef = ref([]);

const currentSlide = ref(0);
const slides = [
  { label: 'Кухня', image: InfoImage1 },
  { label: 'Комнаты', image: InfoImage2 },
  { label: 'Ванная', image: InfoImage1 },
  { label: 'Прихожая', image: InfoImage2 },
];

watch(
  currentSlide,
  (val) => {
    console.log(val);
  },
  { immediate: true }
);

function pinVideo(func) {
  const state = Flip.getState(infoGallerySlidesRef.value);

  infoGallerySlidesRef.value.classList[func]('info-gallery__slides--fixed');

  Flip.from(state, { ease: 'expo.out', duration: 0.75 });
}

onMounted(() => {
  const toBeHidden = infoGallerySlidesImagesRef.value.filter(
    (_, idx) => idx !== currentSlide.value
  );

  // hiding all not needed images
  gsap.set(toBeHidden, { clipPath: 'inset(0 0 0 100%)' });

  ScrollTrigger.create({
    trigger: infoGallerySlidesRef.value,
    start: '17% 25%',
    onEnter: () => pinVideo('add'),
    onLeaveBack: () => pinVideo('remove'),
  });
});
</script>

<template>
  <section class="info-gallery">
    <div class="info-gallery__heading">
      <h2 class="info-gallery__heading__title">Как мы убираем</h2>
      <p class="info-gallery__heading__info">
        Клинер приезжает в назначенное время со всем необходимым и сразу
        приступает к делу. Вам остаётся только оценить результат.
      </p>
    </div>

    <div ref="infoGallerySlidesRef" class="info-gallery__slides">
      <img
        v-for="(slide, key) in slides"
        :key="key"
        :ref="(el) => (infoGallerySlidesImagesRef[key] = el)"
        :src="slide.image"
        alt="gallery image"
        :class="{
          'info-gallery__slides__image': true,
          'info-gallery__slides__image--absolute': key !== 0,
        }"
      />
    </div>
    <div class="info-gallery__spacer"></div>
  </section>
</template>

<style lang="scss">
.info-gallery {
  max-width: 1400px;
  width: 95%;

  margin: 7rem auto 0;

  &__heading {
    display: grid;
    grid-template-columns: auto 31.5%;
    align-content: start;
    gap: 1rem;

    margin-bottom: 6rem;

    &__title {
      font-size: var(--step-2);
      font-weight: 400;

      margin: 0;
    }

    &__info {
      font-size: var(--step--2);

      margin: 0;
    }
  }

  &__slides {
    position: relative;

    width: 100%;
    height: 100%;

    max-height: 85vh;

    &__image {
      display: block;

      width: 100%;
      height: 100%;

      object-fit: cover;

      &--absolute {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    &--fixed {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;

      width: 75%;
      max-height: unset;
    }
  }

  &__spacer {
    min-height: 100vh;
  }
}
</style>

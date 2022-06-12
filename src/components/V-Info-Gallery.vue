<script setup>
import InfoImage1 from '../assets/images/info-gallery-image-1.png';
import InfoImage2 from '../assets/images/info-gallery-image-2.png';

const emitter = useEmitter();
const { gsap, Flip, ScrollTrigger } = useGsap();
const currentSection = useCurrentSection();

const infoGalleryHeaderRef = ref(null);
const infoGallerySlidesRef = ref(null);

const slides = [
  {
    label: 'Кухня',
    image: InfoImage1,
    tooltips: [
      { text: 'Чистим фасад витяжки', x: 31, y: 38, class: 'right' },
      { text: 'Чистим', x: 31, y: 59, class: 'right' },
    ],
  },
  {
    label: 'Комнаты',
    image: InfoImage1,
    tooltips: [
      { text: 'Чистим', x: 64, y: 50 },
      { text: 'Чистим', x: 50, y: 74 },
    ],
  },
  {
    label: 'Ванная',
    image: InfoImage2,
    tooltips: [
      { text: 'Чистим', x: 32, y: 39, class: 'right' },
      { text: 'Чистим', x: 62, y: 92 },
    ],
  },
  {
    label: 'Прихожая',
    image: InfoImage2,
    tooltips: [
      { text: 'Чистим', x: 67, y: 52, class: 'left' },
      { text: 'Чистим', x: 45, y: 75 },
    ],
  },
];

function slideEnterAnim(imgEl, done) {
  const appearTl = gsap.timeline({
    onComplete: done,
  });

  appearTl.fromTo(
    imgEl,
    { clipPath: 'inset(0 0 0 100%)', scale: 1.25, zIndex: 1 },
    {
      clipPath: 'inset(0 0 0 0%)',
      scale: 1,
      ease: 'expo.out',
      duration: 0.85,
    }
  );
  appearTl.to('.tooltip', {
    autoAlpha: 1,
    duration: 0.25,
    stagger: 0.065,
  });
}

function slideLeaveAnim(imgEl, done) {
  gsap.set(imgEl, {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  });
  gsap.to('.tooltip', { autoAlpha: 0, duration: 0.05 });

  setTimeout(done, 750);
}

function pinVideo(func) {
  const state = Flip.getState(infoGallerySlidesRef.value);

  infoGallerySlidesRef.value.classList[func]('info-gallery__slides--fixed');

  Flip.from(state, { ease: 'expo.out', duration: 0.75 }).then(() => {
    if (func === 'add')
      gsap.to('.tooltip', { autoAlpha: 1, duration: 0.25, stagger: 0.065 });
  });
}

onMounted(() => {
  const trigger = ScrollTrigger.create({
    trigger: infoGalleryHeaderRef.value,
    start: 'bottom 17%',
    end: `+=100%`,
    onEnter() {
      emitter.emit('gallery:fixed');
      pinVideo('add');
    },
    onLeaveBack() {
      gsap.to('.tooltip', { autoAlpha: 0 });

      emitter.emit('gallery:static');
      pinVideo('remove');
    },
  });

  onBeforeUnmount(() => trigger.kill());
});
</script>

<template>
  <section class="info-gallery">
    <div ref="infoGalleryHeaderRef" class="info-gallery__heading">
      <h2 class="info-gallery__heading__title">Как мы убираем</h2>
      <p class="info-gallery__heading__info">
        Клинер приезжает в назначенное время со всем необходимым и сразу
        приступает к делу. Вам остаётся только оценить результат.
      </p>
    </div>

    <div ref="infoGallerySlidesRef" class="info-gallery__slides">
      <TransitionGroup
        :css="false"
        @enter="slideEnterAnim"
        @leave="slideLeaveAnim"
      >
        <div
          v-for="(slide, key) in slides"
          v-show="currentSection === key"
          :key="slide.label + slide.image"
          class="info-gallery__slides__slide"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <Utils-VTooltip
            v-for="(tooltip, key) in slide.tooltips"
            :key="key + '-' + slide.label"
            v-bind="tooltip"
          />
        </div>
      </TransitionGroup>
    </div>

    <div class="info-gallery__spacer"></div>

    <VInfoGalleryMenu />
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
    @media screen and (max-width: 1100px) {
      grid-template-columns: 1fr;
      grid-template-rows: fit-content fit-content;
    }
  }

  &__slides {
    position: relative;
    z-index: 1;

    width: 100%;
    height: 90vh;

    max-height: 100vh;

    overflow: hidden;

    &__slide {
      width: 100%;
      height: 100%;

      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }

    &--fixed {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;

      width: 75%;
      height: unset;
      max-height: 100%;

      @media screen and (max-width: 1100px) {
        top: unset;
        left: 0;
        right: 0;
        bottom: 25%;

        width: 100vw;
        height: 52vh;

        max-height: 80%;
        min-height: 500px;
      }
    }

    @media screen and (max-width: 1100px) {
      height: 50vh;
    }
  }

  &__spacer {
    min-height: 100vh;

    @media screen and (max-width: 1100px) {
      min-height: 85vh;
    }
  }
}
</style>

<script setup>
import InfoImage1 from '../assets/images/info-gallery-image-1.png';
import InfoImage2 from '../assets/images/info-gallery-image-2.png';

const emitter = useEmitter();
const { gsap, Flip, ScrollTrigger } = useGsap();
const currentSection = useCurrentSection();

const infoGalleryHeaderRef = ref(null);
const infoGallerySlidesRef = ref(null);

const infoGallerySlidesSize = useElementSize(infoGallerySlidesRef);
const slides = [
  { label: 'Кухня', image: InfoImage1 },
  { label: 'Комнаты', image: InfoImage2 },
  { label: 'Ванная', image: InfoImage1 },
  { label: 'Прихожая', image: InfoImage2 },
];

function imageEnterAnim(imgEl, done) {
  gsap
    .fromTo(
      imgEl,
      { clipPath: 'inset(0 0 0 100%)', scale: 1.25 },
      {
        clipPath: 'inset(0 0 0 0%)',
        scale: 1,
        ease: 'expo.out',
        duration: 0.85,
        onComplete: done,
      }
    )
    .then(() =>
      gsap.to('.tooltip', { autoAlpha: 1, duration: 0.25, stagger: 0.065 })
    );
}

function imageLeaveAnim(imgEl, done) {
  gsap.to('.tooltip', { autoAlpha: 0, duration: 0.1 });
  gsap.set(imgEl, {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  setTimeout(done, 900);
}

function pinVideo(func) {
  const state = Flip.getState(infoGallerySlidesRef.value);

  infoGallerySlidesRef.value.classList[func]('info-gallery__slides--fixed');

  Flip.from(state, { ease: 'expo.out', duration: 0.75 });
}

onMounted(() => {
  gsap.set('.tooltip', { autoAlpha: 0 });

  const trigger = ScrollTrigger.create({
    trigger: infoGalleryHeaderRef.value,
    start: 'bottom 17%',
    end: `+=100%`,
    onEnter() {
      emitter.emit('gallery:fixed');
      pinVideo('add');

      gsap.to('.tooltip', { autoAlpha: 1, stagger: 0.065 });
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
      <Transition :css="false" @enter="imageEnterAnim" @leave="imageLeaveAnim">
        <img
          :src="slides[currentSection].image"
          :alt="slides[currentSection].image"
          :key="currentSection"
          class="info-gallery__slides__image"
          decode="async"
          loading="lazy"
        />
      </Transition>

      <Utils-VTooltip
        text="Чистим фасад витяжки"
        :x="35"
        :y="39"
        :container-width="infoGallerySlidesSize.width"
        :container-height="infoGallerySlidesSize.height"
      />
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
  }

  &__slides {
    position: relative;
    z-index: 1;

    width: 100%;
    height: 100%;

    max-height: 100vh;

    overflow: hidden;

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
      max-height: 100%;

      @media screen and (max-width: 1100px) {
        top: unset;
        left: 0;
        right: 0;
        bottom: 25%;

        width: 100vw;
        height: 52vh;

        max-height: 75%;
      }
    }
  }

  &__spacer {
    min-height: 100vh;

    @media screen and (max-width: 1100px) {
      min-height: 75vh;
    }
  }
}
</style>

<script setup>
import useGsap from '../../hooks/use-gsap';

const fabRef = ref(null);
const isAtHeader = ref(true);
const isActive = ref(true);

const { gsap, ScrollTrigger } = useGsap();

function toggleIsActive() {
  if (isAtHeader.value) return (isActive.value = true);

  isActive.value = !isActive.value;
}

function magnetFab({ clientX, clientY }) {
  const pos = fabRef.value.getBoundingClientRect();
  const magnetX = clientX - pos.left - pos.width / 2;
  const magnetY = clientY - pos.top - pos.height / 2;
  const coefficient = 0.3;

  gsap.to(fabRef.value, {
    x: magnetX * coefficient,
    y: magnetY * coefficient,
    ease: 'back.out',
    '--outline-scale': 1.25,
    '--br-color': '#ccc',
    '--outline-offset-x': `${magnetX * (coefficient - 0.4)}px`,
    '--outline-offset-y': `${magnetY * (coefficient - 0.4)}px`,
  });

  gsap.to(fabRef.value.children, {
    x: magnetX * (coefficient - 0.1),
    y: magnetY * (coefficient - 0.1),
  });
}

function resetFab() {
  gsap.to(fabRef.value, {
    x: 0,
    y: 0,
    '--outline-offset-x': '0px',
    '--outline-offset-y': '0px',
    '--outline-scale': 0.95,
    '--br-color': 'transparent',
    ease: 'expo.out',
  });
  gsap.to(fabRef.value.children, { x: 0, y: 0 });
}

watch(isActive, (val) => {
  if (!val)
    gsap.to(fabRef.value, {
      yPercent: 45,
      rotate: 15,
      ease: 'back.out',
      scale: 0.75,
    });
  if (val)
    gsap.to(fabRef.value, {
      yPercent: 0,
      rotate: -15,
      ease: 'back.out',
      scale: 1,
    });
});

onMounted(() => {
  gsap.fromTo(
    fabRef.value,
    { xPercent: -50, yPercent: 100, rotate: 0, '--outline-scale': 0.95 },
    { yPercent: 0, rotate: -15, ease: 'back.out' }
  );

  const triggers = [];

  triggers.push(
    ScrollTrigger.create({
      trigger: '.header',
      start: 'bottom 95%',
      end: 'bottom 95%',
      onEnter: () => {
        isAtHeader.value = !isAtHeader.value;
        toggleIsActive();
      },
      onLeaveBack: () => {
        isAtHeader.value = !isAtHeader.value;
        toggleIsActive();
      },
    })
  );

  triggers.push(
    ScrollTrigger.create({
      trigger: '.info-gallery',
      start: 'top bottom',
      onEnter: () =>
        gsap.to(fabRef.value, {
          scale: 0,
          yPercent: 75,
          rotate: 90,
          duration: 0.2,
          overwrite: true,
        }),
      onLeaveBack: () =>
        gsap.to(fabRef.value, {
          scale: 0.75,
          yPercent: 45,
          rotate: 15,
          ease: 'back.out',
        }),
    })
  );

  onBeforeUnmount(() => {
    triggers.forEach((trigger) => trigger.kill());
  });
});
</script>

<template>
  <button
    ref="fabRef"
    class="fab"
    @pointerenter="() => toggleIsActive()"
    @pointerleave="
      () => {
        toggleIsActive();
        resetFab();
      }
    "
    @pointermove="(ev) => magnetFab(ev)"
    @focus="() => toggleIsActive()"
    @blur="() => toggleIsActive()"
  >
    <p class="fab__text">
      <slot />
    </p>
  </button>
</template>

<style lang="scss" scoped>
.fab {
  --ease-back-out: cubic-bezier(0.34, 1.56, 0.64, 1);
  --fab-size: calc(var(--step-5) * 2.25);

  position: fixed;
  left: 50%;
  bottom: 2%;
  z-index: 4;

  font-size: var(--step--1);
  color: white;

  width: var(--fab-size);
  height: var(--fab-size);

  min-width: 6rem;
  min-height: 6rem;

  border: none;
  border-radius: 9999px;
  background-color: var(--primary-color);

  cursor: pointer;

  &__text {
    display: inline-block;
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;

    border: 1px solid var(--br-color, transparent);
    border-radius: inherit;

    transform: scale(var(--outline-scale, 1))
      translate(var(--outline-offset-x, 0px), var(--outline-offset-y, 0px));
  }

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;

    border-radius: inherit;
    background-color: inherit;

    filter: blur(10px);

    opacity: 0.1;

    transition: opacity 0.3s;
  }

  &:is(:hover, :focus) {
    &::before {
      opacity: 0.5;
    }
  }
}
</style>

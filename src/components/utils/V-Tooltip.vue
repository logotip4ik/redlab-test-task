<script setup>
// X and Y should be relative to maximum size(width and height and in percent) of the image
const props = defineProps({
  text: { type: String, required: true, default: '' },
  x: { type: Number, required: true, default: 0 },
  y: { type: Number, required: true, default: 0 },
  containerWidth: { type: Number, required: true, default: 0 },
  containerHeight: { type: Number, required: true, default: 0 },
  _maxImageWidth: { type: Number, required: false, default: 1400 },
  _maxImageHeight: { type: Number, required: false, default: 1050 },
});

const BREAKPOINT = 1100;

const relativeX = computed(() => {
  if (typeof window === 'undefined') return 0;

  if (window.innerWidth < BREAKPOINT) return props.x - 8;

  return props.x * (props.containerWidth / props._maxImageWidth);
});

const relativeY = computed(() => {
  if (typeof window === 'undefined') return 0;

  if (window.innerWidth < BREAKPOINT) return props.y - 8;

  return props.y * (props.containerHeight / props._maxImageHeight);
});
</script>

<template>
  <div class="tooltip" :style="{ left: `${relativeX}%`, top: `${relativeY}%` }">
    <span class="tooltip__indicator">&plus;</span>

    <div class="tooltip__text">
      {{ text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  --size: 2.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 0;
  top: 0;

  color: white;

  width: var(--size);
  height: var(--size);

  border-radius: 99999px;
  background-color: var(--primary-color);

  transform: translate(-50%, -50%);

  &__indicator {
    cursor: default;

    transition: transform 0.3s;
  }

  &__text {
    display: inline-block;

    position: absolute;
    bottom: calc(100% + var(--step--5) + 0.05rem);

    font-size: var(--step--1);
    color: #636c81;

    width: max-content;
    max-width: 400px;

    padding: 0.4rem 0.5rem;

    background-color: white;
    border-radius: 0.175rem;

    opacity: 0;
    pointer-events: none;
    transform: translateY(5%);

    transition: opacity 0.2s, transform 0.2s;

    &::before {
      --triangle-size: var(--step--5);

      content: '';

      position: absolute;
      top: 100%;
      left: 50%;

      width: 0;
      height: 0;
      border-left: var(--triangle-size) solid transparent;
      border-right: var(--triangle-size) solid transparent;

      border-top: var(--triangle-size) solid white;

      transform: translateX(-50%);
    }
  }

  &:is(:hover, :focus) {
    .tooltip__indicator {
      transform: rotate(45deg) translate(3%, -1%);
    }

    .tooltip__text {
      opacity: 1;
      pointer-events: all;

      transform: translateY(0);
    }
  }
}
</style>

<script setup>
const toggleRef = ref(null);
const toggleTextRefs = ref([]);
const active = ref(0);

const { gsap } = useGsap();

const slotNames = ['right-text', 'left-text'];

function setSliderWidth(fast = false) {
  gsap.to(toggleRef.value, {
    '--slider-width': `${toggleTextRefs.value[active.value].clientWidth}px`,
    duration: fast ? 0 : 0.2,
  });
}

function toggleActive() {
  active.value = (active.value + 1) % 2;

  setSliderWidth();
}

onMounted(() => {
  setSliderWidth(true);
});
</script>

<template>
  <div ref="toggleRef" class="toggle">
    <div
      v-for="(slotName, key) in slotNames"
      :key="key"
      :ref="(el) => (toggleTextRefs[key] = el)"
      :class="{ toggle__text: true, 'toggle__text--active': active == key }"
      @click="toggleActive"
    >
      <slot :name="slotName" />
    </div>

    <div
      tabindex="0"
      :class="{ toggle__slider: true, 'toggle__slider--toggled': active == 1 }"
      @click="toggleActive"
      @keypress.enter.space="toggleActive"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.toggle {
  --slider-width: 45%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  z-index: 2;

  width: min-content;

  padding: 0.4rem 0.175rem;

  border-radius: 9999px;
  // outline-style: auto;
  background-color: #ffffff;

  &__text {
    position: relative;
    z-index: 4;

    font-size: var(--step--2);
    font-weight: 500;
    color: #636c81;
    white-space: nowrap;

    width: min-content;

    padding: 0.1rem 0.5rem;
    cursor: pointer;

    transition: color 0.1s;

    &--active {
      color: white;
    }
  }

  &__slider {
    position: absolute;
    left: 0.3rem;
    z-index: 1;

    margin-left: 0;

    width: calc(var(--slider-width) - 0.1rem);
    height: calc(100% - 0.4rem);

    transition: left 0.2s;

    background-color: var(--primary-color);
    border-radius: 9999px;

    box-shadow: 0 0 5px rgba($color: #5a30f0, $alpha: 0.25);

    cursor: pointer;

    &--toggled {
      left: calc(100% - var(--slider-width) - 0.15rem);
      transition-duration: 0.085s;
    }
  }
}
</style>

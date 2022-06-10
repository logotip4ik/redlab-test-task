import { reactive, onMounted, onBeforeUnmount } from 'vue';

/** @param {import('vue').Ref<HTMLElement>} el */
export default (el) => {
  const size = reactive({ width: 0, height: 0 });

  function setDimensions() {
    size.width = el.value.clientWidth;
    size.height = el.value.clientHeight;
  }

  onMounted(() => {
    setDimensions();

    const observer = new ResizeObserver(setDimensions);
    observer.observe(el.value);

    onBeforeUnmount(() => observer.disconnect());
  });

  return size;
};

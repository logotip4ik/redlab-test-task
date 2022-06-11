<script setup>
// X and Y should be relative to maximum size(width and height and in percent) of the image
const props = defineProps({
  text: { type: String, required: true, default: '' },
  x: { type: Number, required: true, default: 0 },
  y: { type: Number, required: true, default: 0 },
});

const tooltipRef = ref(null);
const tooltipTextRef = ref(null);

const position = reactive({ x: 0, y: 0 });

// taken from: https://stackoverflow.com/questions/38763365/how-do-i-keep-the-position-of-my-image-fixed-with-respect-to-the-background-imag
function getBackgroundImageBox(elem) {
  const computedStyle = getComputedStyle(elem);
  const resolvedSize = computedStyle.backgroundSize.split(', ')[0];
  const resolvedPos = computedStyle.backgroundPosition.split(', ')[0];

  // get resolved elem width and height
  const resolvedWidth = computedStyle.width.split(', ')[0];
  const resolvedHeight = computedStyle.height.split(', ')[0];
  const elemWidth = parseInt(resolvedWidth.replace('px', ''), 10);
  const elemHeight = parseInt(resolvedHeight.replace('px', ''), 10);

  // border-box
  const byOriginLeft = 0;
  const byOriginTop = 0;
  const byOriginRight = elemWidth;
  const byOriginBottom = elemHeight;

  const byOriginWidth = byOriginRight - byOriginLeft;
  const byOriginHeight = byOriginBottom - byOriginTop;

  // create image object to get original image's size
  const image = new Image();
  image.src = computedStyle.backgroundImage
    .split(', ')[0]
    .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
    .replace(/\\(.)/, '$1'); // note: don't have to decode URI to assign, but must manually strip backslash escape codes
  const imageWidth = image.width;
  const imageHeight = image.height;

  // get original image y/x ratio, and elem y/x ratio
  let imageRatio = imageHeight / imageWidth;
  let elemRatio = elemHeight / elemWidth;

  let res;

  // compute initial idea of the result based on origin and size; will apply position afterward
  // cover
  if (elemRatio > imageRatio) {
    // more height in elem than image => flush height, surplus width
    res = {
      left: byOriginLeft,
      top: byOriginTop,
      right: byOriginLeft + byOriginHeight / imageRatio,
      bottom: byOriginBottom,
    };
  } else {
    // more width in elem than image => flush width, surplus height
    res = {
      left: byOriginLeft,
      top: byOriginTop,
      right: byOriginRight,
      bottom: byOriginTop + byOriginWidth * imageRatio,
    };
  }

  // get absolute pos value in pixels
  const resolvedPosSplit = resolvedPos.split(' ');
  const resolvedPosLeft = resolvedPosSplit[0];
  const resolvedPosTop =
    resolvedPosSplit.length >= 2 ? resolvedPosSplit[1] : '50%'; // resolved always has both in FF, but not IE

  let posLeft;
  let isPosLeftPct;

  if (resolvedPosLeft.indexOf('%') > -1) {
    isPosLeftPct = true;
    let posLeftPct = parseInt(resolvedPosLeft.replace('%', ''));
    posLeft = (posLeftPct * (byOriginWidth - (res.right - res.left))) / 100;
  } else {
    isPosLeftPct = false;
    posLeft = parseInt(resolvedPosLeft.replace('px', ''));
  }

  let posTop;
  let isPosTopPct;

  if (resolvedPosTop.indexOf('%') > -1) {
    isPosTopPct = true;
    let posTopPct = parseInt(resolvedPosTop.replace('%', ''));
    posTop = (posTopPct * (byOriginHeight - (res.bottom - res.top))) / 100;
  } else {
    isPosTopPct = false;
    posTop = parseInt(resolvedPosTop.replace('px', ''));
  }

  // apply pos
  // tricky: must *not* apply pct pos adjustment to flush dimension for cover and contain
  if (
    !(
      isPosLeftPct &&
      ((resolvedSize === 'cover' && elemRatio < imageRatio) ||
        (resolvedSize === 'contain' && elemRatio > imageRatio))
    )
  ) {
    res.left += posLeft;
    res.right += posLeft;
  } // end if
  if (
    !(
      isPosTopPct &&
      ((resolvedSize === 'cover' && elemRatio > imageRatio) ||
        (resolvedSize === 'contain' && elemRatio < imageRatio))
    )
  ) {
    res.top += posTop;
    res.bottom += posTop;
  } // end if

  return res;
}

/**
 * @param {HTMLElement | string} selector
 * @param {number} x
 * @param {number} y
 */
function positionElement(selector, x, y) {
  const element =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  const containingElem = element.parentElement;

  let bgBox = getBackgroundImageBox(containingElem);
  let computedStyle = getComputedStyle(element);

  // move the smaller image to the required position
  // note: subtracting half the width and height for centering, but could do it differently
  // must use computedStyle for the subtraction in case the inline style attribute has not been set yet
  position.x =
    bgBox.left +
    ((bgBox.right - bgBox.left) * x) / 100 -
    computedStyle.width.replace('px', '') / 2;
  position.y =
    bgBox.top +
    ((bgBox.bottom - bgBox.top) * y) / 100 -
    computedStyle.height.replace('px', '') / 2;
}

const debounce = (func, time = 200) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => func.apply(this, args), time);
  };
};

onMounted(() => {
  const debouncedFunc = debounce(
    () => positionElement(tooltipRef.value, props.x, props.y),
    20
  );

  const observer = new ResizeObserver(debouncedFunc);

  observer.observe(tooltipRef.value.parentElement);

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <div
    ref="tooltipRef"
    class="tooltip"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
  >
    <span class="tooltip__indicator">&plus;</span>

    <div ref="tooltipTextRef" class="tooltip__text">
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

  opacity: 0;
  visibility: hidden;

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
      top: 99%;
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

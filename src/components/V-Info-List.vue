<script setup>
import InfoCard1 from '../assets/images/info-card-1.png';
import InfoCard2 from '../assets/images/info-card-2.png';
import InfoCard3 from '../assets/images/info-card-3.png';
import InfoCard4 from '../assets/images/info-card-4.png';

import useGsap from '../hooks/use-gsap';

const { gsap } = useGsap();

const cardsRef = ref([]);

const cards = [
  {
    title: 'Тщательно отобранный персонал',
    image: InfoCard1,
    info: 'Не нужно тратить время, силы и ресурсы на разме- щение вакансий, проведе- ние собеседований, про- верку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
  },
  {
    title: 'Качественная эко-химия',
    image: InfoCard2,
    info: 'Не нужно тратить время, силы и ресурсы на разме- щение вакансий, проведе- ние собеседований, про- верку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
  },
  {
    title: 'Контролируем качество',
    image: InfoCard3,
    info: 'Не нужно тратить время, силы и ресурсы на разме- щение вакансий, проведе- ние собеседований, про- верку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
  },
  {
    title: 'Работаем круглосуточно',
    image: InfoCard4,
    info: 'Не нужно тратить время, силы и ресурсы на разме- щение вакансий, проведе- ние собеседований, про- верку кандидатов на должность уборщицы. За счет больших объемов мы можем сделать это эффективнее.',
  },
];

onMounted(() => {
  const breakpoint = 1000;

  cardsRef.value.forEach((card, key) => {
    gsap.fromTo(
      card,
      { yPercent: 25, filter: 'blur(5px)', opacity: 0 },
      {
        yPercent: 0,
        filter: 'none',
        opacity: 1,
        ease: 'power3.inOut',
        delay: window.innerWidth < breakpoint ? 0 : 0.05 * key,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      }
    );
  });
});
</script>

<template>
  <section class="info-list__section">
    <ul class="info-list">
      <li
        v-for="(card, key) in cards"
        :ref="(el) => (cardsRef[key] = el)"
        :key="key"
        class="info-list__card"
      >
        <h2 class="info-list__card__title">{{ card.title }}</h2>
        <img
          :src="card.image"
          :alt="card.title"
          class="info-list__card__image"
        />
        <div class="info-list__card__info">
          {{ card.info }}
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.info-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  justify-items: center;
  gap: 1.25rem 0.75rem;

  max-width: 1600px;

  padding: 0;
  margin: 0 auto;
  list-style-type: none;

  &__card {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    position: relative;

    width: 100%;
    max-width: 330px;

    border-radius: 0.5rem;
    background-color: #f3f6fb;
    box-shadow: 0 0 0.25rem 0 rgba($color: #f3f6fb, $alpha: 0.125);

    &__title {
      font-size: var(--step--1);
      font-weight: 500;
      text-align: center;

      width: min-content;

      margin-block: 2rem 3rem;
    }

    &__image {
      display: block;

      width: 65%;
      height: auto;

      max-height: 60%;

      object-fit: contain;

      margin-top: auto;
    }

    &__info {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      font-size: calc(var(--step--2) - 0.125rem);
      text-align: left;
      color: white;

      padding: 1.8rem;
      padding-right: 2rem;

      opacity: 0;
      pointer-events: none;
      border-radius: inherit;
      background-color: var(--primary-color);
      cursor: default;

      transition: opacity 0.3s;
    }

    &:focus {
      .info-list__card__info {
        opacity: 1;
        pointer-events: all;
      }
    }

    @media (hover: hover) {
      &:hover {
        .info-list__card__info {
          opacity: 1;
          pointer-events: all;
        }
      }
    }

    @media screen and (max-width: 1120px) {
      max-width: 360px;
    }
  }

  &__section {
    padding: 7rem clamp(1rem, 3vw, 3rem);
  }

  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    grid-template-rows: repeat(2, 1fr);
  }

  @media screen and (max-width: 565px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
    grid-template-rows: repeat(4, 1fr);
  }
}
</style>

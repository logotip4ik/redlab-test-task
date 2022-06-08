<script setup>
import useEmitter from '../hooks/use-emitter';

const menuSections = ['Кухня', 'Комнаты', 'Ванная', 'Прихожая'];

const emitter = useEmitter();

console.log(emitter);
</script>

<template>
  <div class="info-gallery-menu"></div>
</template>

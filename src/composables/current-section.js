import { ref } from 'vue';

const currentSection = ref(0);

export function useCurrentSection() {
  return currentSection;
}

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

export function useGsap() {
  return { gsap, ScrollTrigger, Flip };
}

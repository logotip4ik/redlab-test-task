import 'normalize.css';
import './assets/fonts/fonts.css';
import './assets/styles/global.css';

import { createApp } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import App from './App.vue';

gsap.registerPlugin(ScrollTrigger, Flip);

createApp(App).mount('#app');

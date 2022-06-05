import 'normalize.css';
import './assets/fonts/fonts.css';
import './assets/styles/global.css';

import { createApp } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.vue';

gsap.registerPlugin(ScrollTrigger);

createApp(App).mount('#app');

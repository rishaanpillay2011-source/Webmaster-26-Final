
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ==================== MARQUEE TEXT HORIZONTAL SCROLL ====================

gsap.utils.toArray('.marquee').forEach((el, index) => {
  const w = el.querySelector('.track');
  if (!w) return;

  const [x, xEnd] = (index % 2 == 0) ? [-300, -2000] : [-1700, 0];

  gsap.fromTo(w, { x }, {
    x: xEnd,
    scrollTrigger: {
      trigger: '#fold-effect',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    }
  });
});



gsap.fromTo('.fold-top',
  { rotateX: -120 },
  {
    rotateX: 0,
    scrollTrigger: {
      trigger: '#fold-effect',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.5
    }
  }
);

gsap.fromTo('.fold-bottom',
  { rotateX: 120 },
  {
    rotateX: 0,
    scrollTrigger: {
      trigger: '#fold-effect',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.5
    }
  }
);


const centerContent = document.getElementById('center-content');
const centerFold = document.getElementById('center-fold');
const foldsContent = Array.from(document.querySelectorAll('.fold-content'));

let targetScroll = 0;
let currentScroll = 0;

const tick = () => {
  // Get scroll position relative to fold section
  const foldEffect = document.getElementById('fold-effect');
  const scrollTop = window.scrollY || window.pageYOffset;
  const foldRect = foldEffect.getBoundingClientRect();
  const foldScrollTop = scrollTop + foldRect.top;

  // Calculate target scroll based on fold visibility
  const startTrigger = foldScrollTop - window.innerHeight * 0.8;
  const endTrigger = foldScrollTop + foldRect.height - window.innerHeight * 0.2;
  const range = endTrigger - startTrigger;
  const progress = (scrollTop - startTrigger) / range;

  targetScroll = Math.max(0, Math.min(1, progress)) * (centerContent.clientHeight - centerFold.clientHeight);
  currentScroll += (targetScroll - currentScroll) * 0.1;

  foldsContent.forEach(content => {
    content.style.transform = `translateY(${currentScroll}px)`;
  });

  requestAnimationFrame(tick);
};

tick();

// ==================== ALL IN ONE PLACE STAGGER ====================
window.addEventListener('load', () => {
  if (typeof SplitText === 'undefined') {
    console.error('❌ SplitText not loaded');
    return;
  }

  gsap.registerPlugin(SplitText);

  const textEl = document.querySelector('.allinone-text');
  if (!textEl) {
    console.warn('⚠️ .allinone-text not found');
    return;
  }

  const split = SplitText.create(textEl, {
    type: "chars, words",
  });

  gsap.from(split.chars, {
    y: 100,
    autoAlpha: 0,
    stagger: {
      amount: 0.5,
      from: "random"
    },
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".allinone-section",
      start: "top 75%",
      toggleActions: "play none none reset",
    }
  });
});

// ==================== PARALLAX EXPLORE ====================
const parallaxSection = document.querySelector('#parallax-section');
if (parallaxSection) {
  gsap.registerPlugin(ScrollTrigger);

  const peffectLayer = document.querySelector('.parallax-peffect');
  const waterLayer = document.querySelector('.parallax-water');
  const parallaxLabel = document.querySelector('.parallax-label');
  const parallaxDetail = document.querySelector('.parallax-label--further');
  const arrowBtn = document.querySelector('.parallax-arrow');

  const parallaxTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: parallaxSection,
      start: 'top top',
      end: '+=110%',
      scrub: 0.8,
      pin: true,
      pinSpacing: true,
      markers: false,
    }
  });

  const parallaxTrigger = parallaxTimeline.scrollTrigger;

  parallaxTimeline.to(peffectLayer, {
    opacity: 0.35,
    scale: 1.02,
    y: '-8%',
    duration: 0.8,
    ease: 'power1.out',
  }, 0.35);

  parallaxTimeline.to(waterLayer, {
    opacity: 1,
    scale: 1.01,
    duration: 0.8,
    ease: 'power1.out',
  }, 0.35);

  parallaxTimeline.to(parallaxLabel, {
    opacity: 0,
    y: '-10%',
    duration: 0.45,
    ease: 'power2.out',
  }, 0.42);

  parallaxTimeline.to(parallaxDetail, {
    opacity: 1,
    y: '0%',
    duration: 0.45,
    ease: 'power2.out',
  }, 0.42);

  parallaxTimeline.to('.parallax-arrow', {
    opacity: 0,
    y: '14px',
    duration: 0.4,
    ease: 'power2.out',
  }, 0.47);

  parallaxTimeline.to('.parallax-terrain', {
    background: 'linear-gradient(180deg, #4480b6 0%, #2d628f 38%, #112d53 77%, #06121f 100%)',
    duration: 0.8,
    ease: 'none',
  }, 0.35);

  if (arrowBtn && parallaxTrigger) {
    arrowBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      gsap.to(window, {
        scrollTo: {
          y: parallaxTrigger.end,
          autoKill: false,
        },
        duration: 0.9,
        ease: 'power2.inOut',
      });
    });
  }
}
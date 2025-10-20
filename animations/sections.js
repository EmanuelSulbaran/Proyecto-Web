


// Animación del Hero h1
gsap.registerPlugin(ScrollTrigger);

// Asegurarnos que ScrollTrigger calcule bien tras cargar assets/imagenes
window.addEventListener('load', () => {
  // Forzamos un refresh para evitar recálculos inesperados al pin
  ScrollTrigger.refresh();
});

// Timeline HERO
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",    // mantener simple y sincronizado
    scrub: true,
    pin: true,
    anticipatePin: 1
  }
});

// Aparición inicial
tl.fromTo("#codeplay",
  { opacity: 0, scale: 1 },
  { opacity: 1, duration: 3, ease: "power2.out" }
);

tl.to("#codeplay", {
  scale: 20, 
  ease: "power2.inOut",
  duration: 2
}, "<");


tl.to("#codeplay", {
  opacity: 0,
  duration: 1,
  ease: "power2.inOut"
}, "-=0.4");



// Mostrar y escalar la sección nosotros
tl.to(".nosotros-section", {
  opacity: 1,
  scale: 1,
  duration: 1,
  ease: "power3.out"
}, "<");


// -----------------------------------------------------------------------

// Animación fija de Nosotros Section

gsap.timeline({
  scrollTrigger: {
    trigger: ".nosotros-section",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: true,
    anticipatePin: 1
  }
})
.to(".nosotros-section", { scale: 1, duration: 1, ease: "power2.out" })
.to(".nosotros-section", { scale: 1, duration: 1, ease: "power2.inOut" });


// -----------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

// ✨ Animar título de Cursos
gsap.from(".courses-title", {
  scrollTrigger: {
    trigger: ".courses-section",
    start: "top 80%", // cuando entra el 80% del viewport
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  y: 80,
  duration: 1,
  ease: "power3.out"
});

// ✨ Animar cada card de Cursos
gsap.from(".course-card", {
  scrollTrigger: {
    trigger: ".courses-section",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  y: 200,
  duration: 2,
  ease: "power3.out",
  stagger: 0 // retrasa un poco cada card para efecto en cascada
});

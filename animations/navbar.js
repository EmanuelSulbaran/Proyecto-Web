// ==================== ANIMACIÓN NAVBAR ====================

const nav = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

let lastScrollTop = 0;
let isNavHidden = false;
let scrollTimeout;

// Throttle para mejor rendimiento (evita ejecutarse en cada pixel scrolleado)
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Event listener del scroll con throttle
window.addEventListener("scroll", throttle(() => {
  const scrollTop = window.scrollY;

  // Agregar clase "scrolled" después de 50px
  if (scrollTop > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Lógica hide/show navbar
  const isScrollingDown = scrollTop > lastScrollTop;
  
  if (isScrollingDown && scrollTop > 200) {
    // Ocultar navbar cuando baja más de 200px
    if (!isNavHidden) {
      nav.style.transform = "translateY(-100%)";
      isNavHidden = true;
      // Cerrar menú móvil si está abierto
      if (navLinks.classList.contains("open")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");
      }
    }
  } else {
    // Mostrar navbar cuando sube
    if (isNavHidden) {
      nav.style.transform = "translateY(0)";
      isNavHidden = false;
    }
  }

  lastScrollTop = Math.max(scrollTop, 0);
}, 50)); // Ejecutarse máximo cada 50ms

// ==================== MENÚ HAMBURGUESA ====================

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.contains("open");
  
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
  
  // Prevenir scroll cuando el menú está abierto
  document.body.style.overflow = isOpen ? "auto" : "hidden";
});

// Cerrar menú al hacer click en un link
navItems.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.style.overflow = "auto";
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener("click", (e) => {
  const isClickInsideNav = nav.contains(e.target);
  
  if (!isClickInsideNav && navLinks.classList.contains("open")) {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.style.overflow = "auto";
  }
});

// Cerrar menú al presionar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.style.overflow = "auto";
  }
});
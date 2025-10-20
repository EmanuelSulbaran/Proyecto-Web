const text = "Pensado Para Desarrolladores";
const el = document.querySelector(".typewriter");

function typeAnimation() {
  anime({
    targets: el,
    textContent: ["", text],
    duration: 3000,
    easing: "linear",
    round: 1,
    update: anim => {
      const progress = anim.progress / 100;
      const length = Math.floor(text.length * progress);
      el.textContent = text.substring(0, length);
    },
    complete: () => {
      setTimeout(() => {
        anime({
          targets: el,
          duration: 3000,
          easing: "linear",
          update: anim => {
            const progress = anim.progress / 100;
            const length = Math.floor(text.length * (1 - progress));
            el.textContent = text.substring(0, length);
          },
          complete: () => {
            setTimeout(typeAnimation, 500);
          }
        });
      }, 800);
    }
  });
}

typeAnimation();
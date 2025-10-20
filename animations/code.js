const codeBox = document.querySelector('.code');

function typeCode() {
  const speed = isDeleting ? 30 : 80;
  const pause = isDeleting ? 1000 : 2000;

  if (!isDeleting) {
    codeEl.textContent = codeText.slice(0, index++);
    codeEl.innerHTML = Prism.highlight(codeEl.textContent, Prism.languages.javascript, 'javascript');


    codeBox.scrollTop = codeBox.scrollHeight;

    if (index === codeText.length) {
      isDeleting = true;
      setTimeout(typeCode, pause);
      return;
    }
  } else {
    codeEl.textContent = codeText.slice(0, index--);
    codeEl.innerHTML = Prism.highlight(codeEl.textContent, Prism.languages.javascript, 'javascript');
    if (index === 0) {
      isDeleting = false;
      setTimeout(typeCode, pause);
      return;
    }
  }

  setTimeout(typeCode, speed + Math.random() * 40);
}

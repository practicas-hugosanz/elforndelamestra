function validateName() {
  const input = document.getElementById('fname');
  const error = document.getElementById('fnameError');
  let val = input.value;
  val = val.charAt(0).toUpperCase() + val.slice(1);
  input.value = val;

  if (!val) {
    error.textContent = 'El nombre es obligatorio.';
    input.classList.add('input-error');
    return false;
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(val)) {
    error.textContent = 'Solo se permiten letras.';
    input.classList.add('input-error');
    return false;
  }
  error.textContent = '';
  input.classList.remove('input-error');
  return true;
}

function validateEmail() {
  const input = document.getElementById('femail');
  const error = document.getElementById('femailError');
  const val = input.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!val) {
    error.textContent = 'El correo es obligatorio.';
    input.classList.add('input-error');
    return false;
  }
  if (!regex.test(val)) {
    error.textContent = 'Introduce un correo válido (ej: correo@ejemplo.com).';
    input.classList.add('input-error');
    return false;
  }
  error.textContent = '';
  input.classList.remove('input-error');
  return true;
}

function validateMsg() {
  const input = document.getElementById('fmsg');
  const error = document.getElementById('fmsgError');
  const val = input.value.trim();

  if (!val) {
    error.textContent = 'El mensaje es obligatorio.';
    input.classList.add('input-error');
    return false;
  }
  error.textContent = '';
  input.classList.remove('input-error');
  return true;
}

function submitForm() {
  const nameOk = validateName();
  const emailOk = validateEmail();
  const msgOk = validateMsg();
  if (!nameOk || !emailOk || !msgOk) return;
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('fname').value = '';
  document.getElementById('femail').value = '';
  document.getElementById('fmsg').value = '';
  document.getElementById('fnameError').textContent = '';
  document.getElementById('femailError').textContent = '';
  document.getElementById('fmsgError').textContent = '';
  document.getElementById('fname').classList.remove('input-error');
  document.getElementById('femail').classList.remove('input-error');
  document.getElementById('fmsg').classList.remove('input-error');
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--gold)' : '';
  });
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('active');
}

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    hamburger.classList.add('active');
    navMenu.classList.add('open');
    navOverlay.classList.add('active');
  }
});

navOverlay.addEventListener('click', closeMenu);

navLinks.forEach(a => {
  a.addEventListener('click', closeMenu);
});

const callBtn = document.querySelector('.call-btn');
const footer = document.querySelector('footer');

function checkFooterVisible() {
  if (!footer || !callBtn) return;
  const footerRect = footer.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  if (footerRect.top < windowHeight) {
    callBtn.classList.add('hidden');
  } else {
    callBtn.classList.remove('hidden');
  }
}

window.addEventListener('scroll', checkFooterVisible);
checkFooterVisible();

(function() {
  var grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  function setupCarousel() {
    if (grid.classList.contains('carousel')) return;
    if (window.innerWidth > 480) return;

    var items = Array.from(grid.children);
    var track = document.createElement('div');
    track.className = 'gallery-track';

    items.forEach(function(item) {
      track.appendChild(item);
    });

    items.forEach(function(item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    grid.innerHTML = '';
    grid.appendChild(track);
    grid.classList.add('carousel');

    var offset = 0;
    var startX = 0;
    var startOffset = 0;
    var velocity = 0;
    var lastX = 0;
    var lastTime = 0;
    var dragging = false;
    var halfWidth = track.scrollWidth / 2;

    function normalizeOffset() {
      halfWidth = track.scrollWidth / 2;
      if (offset <= -halfWidth) offset += halfWidth;
      if (offset > 0) offset -= halfWidth;
    }

    function setPosition() {
      track.style.transform = 'translateX(' + offset + 'px)';
    }

    track.style.animation = 'none';

    function onStart(x) {
      dragging = true;
      startX = x;
      startOffset = offset;
      lastX = x;
      lastTime = Date.now();
      velocity = 0;
    }

    function onMove(x) {
      if (!dragging) return;
      var now = Date.now();
      var dt = now - lastTime;
      if (dt > 0) {
        velocity = (lastX - x) / dt;
      }
      lastX = x;
      lastTime = now;
      offset = startOffset + (x - startX);
      normalizeOffset();
      setPosition();
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      velocity = 0;
    }

    grid.addEventListener('touchstart', function(e) {
      onStart(e.touches[0].clientX);
    });
    grid.addEventListener('touchmove', function(e) {
      onMove(e.touches[0].clientX);
    });
    grid.addEventListener('touchend', onEnd);

    grid.addEventListener('mousedown', function(e) {
      e.preventDefault();
      onStart(e.clientX);
    });
    grid.addEventListener('mousemove', function(e) {
      onMove(e.clientX);
    });
    grid.addEventListener('mouseup', onEnd);
    grid.addEventListener('mouseleave', onEnd);

    window.addEventListener('resize', function() {
      halfWidth = track.scrollWidth / 2;
      normalizeOffset();
      setPosition();
    });
  }

  function destroyCarousel() {
    if (!grid.classList.contains('carousel')) return;
    var track = grid.querySelector('.gallery-track');
    if (!track) return;
    var clones = grid.querySelectorAll('[aria-hidden="true"]');
    clones.forEach(function(c) { c.remove(); });
    var items = Array.from(track.children);
    items.forEach(function(item) {
      grid.appendChild(item);
    });
    track.remove();
    grid.classList.remove('carousel');
  }

  function checkCarousel() {
    if (window.innerWidth <= 480) {
      setupCarousel();
    } else {
      destroyCarousel();
    }
  }

  checkCarousel();
  window.addEventListener('resize', checkCarousel);
})();

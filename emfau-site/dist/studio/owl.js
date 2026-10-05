(() => {
  'use strict';

  const toggle = document.getElementById('owl-toggle');
  const copy = document.querySelector('.contact-copy');
  if (!toggle || !copy) return;
  const figure = document.createElement('figure');
  figure.id = 'owl-figure';
  figure.className = 'owl-figure';
  figure.hidden = true;
  figure.innerHTML = '<canvas class="owl-canvas" width="320" height="340" aria-hidden="true"></canvas><figcaption><select class="owl-style" aria-label="Eulenstil"><option value="comic">Comic</option><option value="natural">Bisherige Eule</option></select><button class="owl-dismiss" type="button">Eule ausblenden</button></figcaption><p class="owl-error" role="status" hidden>Die Eule konnte nicht geladen werden. Bitte versuchen Sie es erneut.</p>';
  copy.appendChild(figure);
  const canvas = figure.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let image;
  let eyeImage;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  // Each original PNG is preserved. These bounds select its generated cutouts.
  const styles = {
    natural: {
      file: 'emfau-owl-atlas-v1.png',
      frames: {
        head: [0, 63, 520, 486], body: [522, 32, 444, 598],
        branch: [966, 185, 570, 405], pupil: [181, 736, 150, 155],
        lidLeft: [547, 682, 390, 296], lidRight: [1090, 681, 383, 300]
      },
      body: [97, 102, 126, 170], branch: [17, 125, 286, 203.2],
      headHeight: 134.6, eyeX: 27.5, eyeY: -52, eyeRadius: 12.5,
      pupilSize: 20, lidWidth: 36, lidHeight: 32
    },
    comic: {
      file: 'emfau-owl-comic-atlas-v1.png',
      frames: {
        head: [25, 116, 455, 398], body: [512, 130, 482, 414],
        branch: [1003, 218, 515, 254], pupil: [171, 710, 128, 124],
        lidLeft: [499, 665, 222, 214], lidRight: [804, 665, 221, 214],
        tail: [1108, 593, 341, 304]
      },
      body: [93, 110, 134, 118], branch: [17, 154, 286, 141],
      headHeight: 126, eyeX: 27.8, eyeY: -52, eyeRadius: 15.1,
      pupilSize: 25.5, lidWidth: 40, lidHeight: 39,
      eyes: [
        {x: -26.11, y: -52.20, rx: 15.67, ry: 16.62},
        {x: 30.07, y: -51.88, rx: 15.98, ry: 16.94}
      ]
    }
  };
  const assets = new Map();
  const styleSelect = figure.querySelector('.owl-style');
  let style = new URLSearchParams(location.search).get('owl-style') === 'natural' ? 'natural' : 'comic';
  styleSelect.value = style;
  let frames = styles[style].frames;
  let enabled = false;
  let loaded = false;
  let intersecting = false;
  let raf = 0;
  let lastFrame = 0;
  let time = 0;
  let previousTime = 0;
  let nextBlink = 2 + Math.random() * 3;
  let blinkStart = -10;
  let nextTailShake = 5 + Math.random() * 5;
  let tailStart = -10;
  let targetX = 0;
  let targetY = 0;
  let lookX = 0;
  let lookY = 0;
  let bounds = null;
  let updateBounds = true;
  let pointer = null;
  let gaze = null;
  const eyeFrames = {
    iris: [130, 58, 610, 607], pupil: [916, 100, 524, 524],
    glint: [1760, 265, 190, 176]
  };

  function eyeSprite(name, x, y, width, height) {
    ctx.drawImage(eyeImage, ...eyeFrames[name], x, y, width, height);
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(320 * ratio);
    canvas.height = Math.round(340 * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    updateBounds = true;
    if (loaded) draw(0);
  }

  function sprite(name, x, y, width, height) {
    ctx.drawImage(image, ...frames[name], x, y, width, height);
  }

  // Warp horizontal texture strips, so the face and chest can lean while their
  // feather silhouettes remain attached to the neck and feet.
  function warpedSprite(name, x, y, width, height, amount, tailShake = 0) {
    const [sx, sy, sw, sh] = frames[name];
    const strips = 36;
    for (let i = 0; i < strips; i++) {
      const v = i / strips;
      const tailWeight = clamp((v - .68) / .32, 0, 1);
      const bend = Math.sin(Math.PI * (v + .5 / strips)) * amount + tailWeight * tailWeight * tailShake;
      ctx.drawImage(image, sx, sy + v * sh, sw, sh / strips,
        x + bend, y + v * height, width, height / strips + .18);
    }
  }

  function eye(x, y, blink, lid, socket) {
    const rig = styles[style];
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, socket ? socket.rx : rig.eyeRadius,
      socket ? socket.ry : rig.eyeRadius * .96, 0, 0, Math.PI * 2);
    ctx.clip();
    const pupil = rig.pupilSize;
    if (socket) {
      // Cover the pale ring in the original head all the way to its brown rim.
      eyeSprite('iris', x - socket.rx - .35, y - socket.ry - .35,
        socket.rx * 2 + .7, socket.ry * 2 + .7);
      let dx = 0;
      let dy = 0;
      if (gaze && !reducedMotion.matches) {
        const rect = canvas.getBoundingClientRect();
        const point = new DOMPoint((gaze.x - rect.left) * canvas.width / rect.width,
          (gaze.y - rect.top) * canvas.height / rect.height);
        // Each eye aims at the same screen point, in its own moving head space.
        const local = point.matrixTransform(ctx.getTransform().inverse());
        dx = local.x - x;
        dy = local.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy + 150 * 150);
        dx /= distance;
        dy /= distance;
      }
      eyeSprite('pupil', x - pupil / 2 + dx * 5.2,
        y - pupil / 2 + dy * 4.6, pupil, pupil);
      // Corneal reflections belong to the eye surface, independently of the pupil.
      eyeSprite('glint', x - 6 + dx * .7, y - 8 + dy * .55, 4.5, 4.2);
      ctx.save();
      ctx.globalAlpha = .3;
      eyeSprite('glint', x + 3.8, y + 4.5, 1.6, 1.4);
      ctx.restore();
    } else {
      sprite('pupil', x - pupil / 2 + lookX * 4.1, y - pupil / 2 + lookY * 3.6, pupil, pupil);
    }
    ctx.restore();
    if (blink > 0) {
      // The generated feather eyelid slides over the iris, rather than shrinking
      // the entire eye or replacing the face with a different drawing.
      ctx.save();
      ctx.beginPath();
      const width = rig.lidWidth;
      const height = rig.lidHeight;
      ctx.rect(x - width / 2, y - height / 2, width, height * blink);
      ctx.clip();
      sprite(lid, x - width / 2, y - height / 2, width, height);
      ctx.restore();
    }
  }

  function draw(blink) {
    const rig = styles[style];
    ctx.clearRect(0, 0, 320, 340);
    const idle = reducedMotion.matches ? 0 : Math.sin(time * 1.7);
    const wind = reducedMotion.matches ? 0 : Math.sin(time * .78 + .9);
    const tailPhase = (time - tailStart) / .62;
    const tailShake = !reducedMotion.matches && tailPhase >= 0 && tailPhase <= 1
      ? Math.sin(tailPhase * Math.PI * 7) * Math.sin(Math.PI * tailPhase) : 0;

    // All parts share the branch pivot; their independent motion adds volume.
    ctx.save();
    ctx.translate(160, 225 + lookY * 2);
    ctx.rotate(lookX * .021 + wind * .006);
    ctx.translate(-160, -225);

    ctx.save();
    ctx.translate(160, 225);
    ctx.rotate(lookX * .038 + idle * .004);
    ctx.scale(1 + idle * .004, 1 + idle * .006);
    ctx.translate(-160, -225);
    if (frames.tail) {
      ctx.save();
      ctx.translate(160, 225);
      ctx.rotate(tailShake * .13 + wind * .014);
      sprite('tail', -30, -4, 60, 54);
      ctx.restore();
    }
    warpedSprite('body', ...rig.body, lookX * 3, frames.tail ? 0 : tailShake * 5);

    ctx.save();
    ctx.translate(160 + lookX * 3, 151 + lookY * 4 + idle * .6);
    ctx.rotate(lookX * .067 + wind * .008);
    ctx.scale(1 - Math.abs(lookX) * .055, 1 - Math.abs(lookY) * .025);
    warpedSprite('head', -72, -119, 144, rig.headHeight, lookX * 6);
    if (rig.eyes) {
      rig.eyes.forEach((socket, i) => {
        const shift = Math.sin(Math.PI * ((socket.y + 119) / rig.headHeight)) * lookX * 6;
        eye(socket.x + shift, socket.y, blink, i ? 'lidRight' : 'lidLeft', socket);
      });
    } else {
      const faceShift = Math.sin(Math.PI * ((rig.eyeY + 119) / rig.headHeight)) * lookX * 6;
      eye(-rig.eyeX + faceShift, rig.eyeY, blink, 'lidLeft');
      eye(rig.eyeX + faceShift, rig.eyeY, blink, 'lidRight');
    }
    ctx.restore();
    ctx.restore();

    sprite('branch', ...rig.branch);
    ctx.restore();
  }

  function tick(now) {
    raf = 0;
    if (!enabled || !loaded || !intersecting || document.hidden || reducedMotion.matches) return;
    raf = requestAnimationFrame(tick);
    if (now - lastFrame < 1000 / 30) return;
    const elapsed = previousTime ? Math.min((now - previousTime) / 1000, .1) : 1 / 30;
    previousTime = now;
    lastFrame = now;
    time += elapsed;
    // A brief easing prevents jumps on touch and after scrolling.
    const follow = 1 - Math.exp(-elapsed * 18);
    lookX += (targetX - lookX) * follow;
    lookY += (targetY - lookY) * follow;
    if (pointer) {
      if (!gaze) gaze = {...pointer};
      gaze.x += (pointer.x - gaze.x) * follow;
      gaze.y += (pointer.y - gaze.y) * follow;
    }
    if (time >= nextBlink) {
      blinkStart = time;
      nextBlink = time + 3.5 + Math.random() * 5;
    }
    if (time >= nextTailShake) {
      tailStart = time;
      nextTailShake = time + 7 + Math.random() * 8;
    }
    const phase = (time - blinkStart) / .23;
    const blink = phase >= 0 && phase <= 1 ? Math.sin(Math.PI * phase) : 0;
    draw(blink);
  }

  function refresh() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    previousTime = 0;
    if (!enabled || !loaded) return;
    if (reducedMotion.matches) {
      targetX = targetY = lookX = lookY = 0;
      pointer = gaze = null;
      draw(0);
    } else if (intersecting && !document.hidden) {
      raf = requestAnimationFrame(tick);
    }
  }

  async function load() {
    const requestedStyle = style;
    if (!assets.has(requestedStyle)) {
      const artwork = new Image();
      const promise = new Promise((resolve, reject) => {
        artwork.onload = resolve;
        artwork.onerror = () => { assets.delete(requestedStyle); reject(new Error('Owl artwork unavailable')); };
      });
      assets.set(requestedStyle, {image: artwork, promise});
      artwork.src = new URL('../assets/' + styles[requestedStyle].file, document.baseURI).href;
    }
    const asset = assets.get(requestedStyle);
    await asset.promise;
    if (requestedStyle === 'comic') {
      if (!assets.has('eyes')) {
        const artwork = new Image();
        const promise = new Promise((resolve, reject) => {
          artwork.onload = resolve;
          artwork.onerror = () => { assets.delete('eyes'); reject(new Error('Owl eyes unavailable')); };
        });
        assets.set('eyes', {image: artwork, promise});
        artwork.src = new URL('../assets/emfau-owl-eyes-v2.png', document.baseURI).href;
      }
      await assets.get('eyes').promise;
      eyeImage = assets.get('eyes').image;
    }
    if (style !== requestedStyle) return;
    image = asset.image;
    frames = styles[requestedStyle].frames;
    loaded = true;
    resize();
  }

  async function setEnabled(value, scroll = false) {
    enabled = value;
    toggle.setAttribute('aria-pressed', String(value));
    toggle.textContent = value ? 'Eule ausblenden' : 'Eule testen';
    figure.hidden = !value;
    copy.classList.toggle('owl-enabled', value);
    const url = new URL(location.href);
    if (value) url.searchParams.set('owl', 'on'); else url.searchParams.delete('owl');
    if (style === 'natural') url.searchParams.set('owl-style', 'natural'); else url.searchParams.delete('owl-style');
    history.replaceState(null, '', url);
    updateBounds = true;
    refresh();
    if (!value) return;
    if (scroll) figure.scrollIntoView({block: 'center', behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    const error = figure.querySelector('.owl-error');
    error.hidden = true;
    try { await load(); refresh(); }
    catch { error.hidden = !enabled; }
  }

  document.addEventListener('pointermove', event => {
    if (!enabled || !intersecting || reducedMotion.matches) return;
    if (event.pointerType === 'touch' && !figure.contains(event.target)) return;
    if (updateBounds || !bounds) {
      bounds = canvas.getBoundingClientRect();
      updateBounds = false;
    }
    const cx = clamp(bounds.left + bounds.width / 2, 1, innerWidth - 1);
    const cy = clamp(bounds.top + bounds.height * .3, 1, innerHeight - 1);
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    targetX = clamp(dx / (dx < 0 ? cx : innerWidth - cx), -1, 1);
    targetY = clamp(dy / (dy < 0 ? cy : innerHeight - cy), -1, 1);
    pointer = {x: event.clientX, y: event.clientY};
  }, {passive: true});
  canvas.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') {
      canvas.dispatchEvent(new PointerEvent('pointermove', {
        bubbles: true, pointerType: 'touch', clientX: event.clientX, clientY: event.clientY
      }));
    }
  }, {passive: true});
  window.addEventListener('scroll', () => { updateBounds = true; }, {passive: true});
  window.addEventListener('resize', resize, {passive: true});
  document.addEventListener('visibilitychange', refresh);
  reducedMotion.addEventListener('change', refresh);
  const observer = new IntersectionObserver(entries => {
    intersecting = entries[0].isIntersecting;
    updateBounds = true;
    refresh();
  }, {threshold: 0});
  observer.observe(canvas);
  toggle.addEventListener('click', () => { void setEnabled(!enabled, !enabled); });
  styleSelect.addEventListener('change', () => {
    style = styleSelect.value === 'natural' ? 'natural' : 'comic';
    loaded = false;
    ctx.clearRect(0, 0, 320, 340);
    void setEnabled(true);
  });
  figure.querySelector('.owl-dismiss').addEventListener('click', () => {
    toggle.focus({preventScroll: true});
    void setEnabled(false);
  });
  toggle.hidden = false;
  resize();
  if (new URLSearchParams(location.search).get('owl') === 'on') void setEnabled(true);
})();

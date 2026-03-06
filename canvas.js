// === Configuration ===
const GROUP_LABEL_HEIGHT = 32;
const DEFAULT_CANVAS = 'milestone 1';
const VAULT_PREFIX = 'z Hidden/z hidden images/';

/**
 * Transforms raw Obsidian .canvas JSON into the node format the renderer expects.
 */
function transformCanvasData(raw) {
  return raw.nodes.map(node => {
    const base = {
      id: node.id,
      type: node.type,
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
    };

    if (node.type === 'group') {
      base.y = node.y - GROUP_LABEL_HEIGHT;
      base.height = node.height + GROUP_LABEL_HEIGHT;
      base.label = node.label;
    } else if (node.type === 'file') {
      let filePath = node.file;
      if (filePath.startsWith(VAULT_PREFIX)) {
        filePath = filePath.slice(VAULT_PREFIX.length);
      }
      base.file = filePath;
    } else if (node.type === 'text') {
      base.text = node.text;
      base.styleAttributes = node.styleAttributes || {};
    }

    return base;
  });
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const canvasName = params.get('canvas') || DEFAULT_CANVAS;
  const canvasUrl = encodeURI('canvas/' + canvasName + '.canvas');
  const mediaDir = 'media/' + slugify(canvasName) + '/';

  // Fetch and parse the canvas file
  let nodes;
  let edges = [];
  try {
    const response = await fetch(canvasUrl);
    if (!response.ok) {
      throw new Error('Failed to load ' + canvasName + '.canvas (HTTP ' + response.status + ')');
    }
    const raw = await response.json();
    nodes = transformCanvasData(raw);
    edges = raw.edges || [];
  } catch (err) {
    document.getElementById('canvas-world').innerHTML =
      '<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;' +
      'font-family:sans-serif;color:#5C4F3D;text-align:center;padding:2rem;">' +
      '<div><h2 style="margin-bottom:0.5rem;">Could not load canvas</h2>' +
      '<p style="color:#8C7D6A;">' + err.message + '</p></div></div>';
    console.error('Canvas load error:', err);
    return;
  }

  // Set page title from first heading text node (if any)
  document.title = canvasName;

  // === Determine parent groups ===
  const groups = nodes.filter(n => n.type === 'group');
  const parentGroupIds = new Set();
  for (const g of groups) {
    for (const other of groups) {
      if (g.id !== other.id &&
          other.x >= g.x && other.y >= g.y &&
          other.x + other.width <= g.x + g.width &&
          other.y + other.height <= g.y + g.height) {
        parentGroupIds.add(g.id);
      }
    }
  }

  // === Build DOM ===
  const world = document.getElementById('canvas-world');
  const imageTracker = [];

  const sorted = [
    ...nodes.filter(n => n.type === 'group' && parentGroupIds.has(n.id)),
    ...nodes.filter(n => n.type === 'group' && !parentGroupIds.has(n.id)),
    ...nodes.filter(n => n.type === 'file'),
    ...nodes.filter(n => n.type === 'text'),
  ];

  sorted.forEach((node, i) => {
    const el = document.createElement('div');

    if (node.type === 'group') {
      el.className = 'canvas-group' + (parentGroupIds.has(node.id) ? ' parent-group' : '');
      const label = document.createElement('div');
      label.className = 'group-label';
      label.textContent = node.label;
      el.appendChild(label);
    } else if (node.type === 'file') {
      el.className = 'canvas-image';
      const img = document.createElement('img');
      img.dataset.src = mediaDir + node.file;
      img.alt = node.file;
      img.draggable = false;
      img.decoding = 'async';
      img.onload = function() { this.classList.add('loaded'); };
      el.appendChild(img);
      imageTracker.push({ el, imgEl: img, x: node.x, y: node.y, w: node.width, h: node.height, loaded: false });
    } else if (node.type === 'text') {
      el.className = 'canvas-text';
      if (node.styleAttributes.border !== 'invisible') {
        el.classList.add('canvas-text-bordered');
      }
      const headingMatch = !node.text.includes('\n') && node.text.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        const h = document.createElement('h' + headingMatch[1].length);
        h.textContent = headingMatch[2];
        el.appendChild(h);
      } else if (/^\s*<iframe\b/i.test(node.text)) {
        el.classList.add('canvas-youtube');
        const srcMatch = node.text.match(/src=["']([^"']+)["']/i);
        if (srcMatch) {
          const ytMatch = srcMatch[1].match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
          const videoId = ytMatch ? ytMatch[1] : null;
          const watchUrl = videoId
            ? 'https://www.youtube.com/watch?v=' + videoId
            : srcMatch[1];
          const thumb = document.createElement('img');
          thumb.src = videoId
            ? 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg'
            : '';
          thumb.alt = 'YouTube video';
          thumb.draggable = false;
          const btn = document.createElement('div');
          btn.className = 'yt-play-btn';
          btn.innerHTML = '<svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.5 7.7A8.5 8.5 0 0 0 60.7 2C55.4.5 34 .5 34 .5S12.6.5 7.3 2A8.5 8.5 0 0 0 1.5 7.7C0 13 0 24 0 24s0 11 1.5 16.3A8.5 8.5 0 0 0 7.3 46C12.6 47.5 34 47.5 34 47.5s21.4 0 26.7-1.5a8.5 8.5 0 0 0 5.8-5.7C68 35 68 24 68 24s0-11-1.5-16.3z" fill="#ff0000"/><path d="M27 34l18-10-18-10v20z" fill="#fff"/></svg>';
          el.appendChild(thumb);
          el.appendChild(btn);
          el.addEventListener('click', function() {
            window.open(watchUrl, '_blank', 'noopener');
          });
        }
      } else {
        const content = document.createElement('div');
        content.className = 'md-content';

        function renderInline(str, el) {
          const tokenRegex = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
          let last = 0, m;
          while ((m = tokenRegex.exec(str)) !== null) {
            if (m.index > last) el.appendChild(document.createTextNode(str.slice(last, m.index)));
            if (m[1] !== undefined) {
              const s = document.createElement('strong'); s.textContent = m[1]; el.appendChild(s);
            } else if (m[2] !== undefined) {
              const e = document.createElement('em'); e.textContent = m[2]; el.appendChild(e);
            } else {
              const a = document.createElement('a');
              a.href = m[4]; a.textContent = m[3]; a.target = '_blank'; a.rel = 'noopener';
              el.appendChild(a);
            }
            last = tokenRegex.lastIndex;
          }
          if (last < str.length) el.appendChild(document.createTextNode(str.slice(last)));
        }

        let currentList = null;
        let currentP = null;
        function flushBlock() {
          if (currentP)    { content.appendChild(currentP); currentP = null; }
          if (currentList) { content.appendChild(currentList); currentList = null; }
        }

        for (const line of node.text.split('\n')) {
          const hMatch   = line.match(/^(#{1,6})\s+(.*)/);
          const liMatch  = line.match(/^[-*]\s+(.*)/);
          if (hMatch) {
            flushBlock();
            const h = document.createElement('h' + hMatch[1].length);
            renderInline(hMatch[2], h);
            content.appendChild(h);
          } else if (liMatch) {
            if (currentP) { content.appendChild(currentP); currentP = null; }
            if (!currentList) currentList = document.createElement('ul');
            const li = document.createElement('li');
            renderInline(liMatch[1], li);
            currentList.appendChild(li);
          } else if (line.trim() === '') {
            flushBlock();
          } else {
            if (currentList) { content.appendChild(currentList); currentList = null; }
            if (!currentP) currentP = document.createElement('p');
            else currentP.appendChild(document.createTextNode('\n'));
            renderInline(line, currentP);
          }
        }
        flushBlock();
        el.appendChild(content);
        el.addEventListener('click', function(e) {
          if (!el.classList.contains('scroll-active')) {
            el.classList.add('scroll-active');
          }
          e.stopPropagation();
        });
        el.addEventListener('mousedown', function(e) {
          if (el.classList.contains('scroll-active')) e.stopPropagation();
        });
        el.addEventListener('wheel', function(e) {
          if (el.classList.contains('scroll-active')) e.stopPropagation();
        }, { passive: true });
      }
    }

    el.style.left = node.x + 'px';
    el.style.top = node.y + 'px';
    el.style.width = node.width + 'px';
    el.style.height = node.height + 'px';
    el.style.zIndex = i;

    world.appendChild(el);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.canvas-text')) {
      document.querySelectorAll('.canvas-text.scroll-active').forEach(function(el) {
        el.classList.remove('scroll-active');
      });
    }
  });

  // === Edge / arrow rendering ===
  if (edges.length > 0) {
    const nodeMap = {};
    for (const n of nodes) nodeMap[n.id] = n;

    const pad = 200;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of nodes) {
      if (n.x < minX) minX = n.x;
      if (n.y < minY) minY = n.y;
      if ((n.x + n.width) > maxX) maxX = n.x + n.width;
      if ((n.y + n.height) > maxY) maxY = n.y + n.height;
    }

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const svgW = maxX - minX + pad * 2;
    const svgH = maxY - minY + pad * 2;
    svg.setAttribute('viewBox', `${minX - pad} ${minY - pad} ${svgW} ${svgH}`);
    svg.style.cssText = `position:absolute;left:${minX - pad}px;top:${minY - pad}px;width:${svgW}px;height:${svgH}px;pointer-events:none;z-index:0;overflow:visible;`;

    const defs = document.createElementNS(svgNS, 'defs');
    const marker = document.createElementNS(svgNS, 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('markerWidth', '8');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('refX', '7');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const arrowPoly = document.createElementNS(svgNS, 'polygon');
    arrowPoly.setAttribute('points', '0 0, 8 3, 0 6');
    arrowPoly.setAttribute('fill', '#C4B9A8');
    marker.appendChild(arrowPoly);
    defs.appendChild(marker);
    svg.appendChild(defs);

    function connPt(n, side) {
      if (side === 'top')    return { x: n.x + n.width / 2, y: n.y };
      if (side === 'bottom') return { x: n.x + n.width / 2, y: n.y + n.height };
      if (side === 'left')   return { x: n.x,               y: n.y + n.height / 2 };
      if (side === 'right')  return { x: n.x + n.width,     y: n.y + n.height / 2 };
      return { x: n.x + n.width / 2, y: n.y + n.height / 2 };
    }

    function ctrlOffset(side, s) {
      if (side === 'top')    return { x: 0,  y: -s };
      if (side === 'bottom') return { x: 0,  y:  s };
      if (side === 'left')   return { x: -s, y: 0 };
      if (side === 'right')  return { x:  s, y: 0 };
      return { x: 0, y: 0 };
    }

    for (const edge of edges) {
      const fn = nodeMap[edge.fromNode];
      const tn = nodeMap[edge.toNode];
      if (!fn || !tn) continue;

      const from = connPt(fn, edge.fromSide);
      const to   = connPt(tn, edge.toSide);
      const s    = Math.max(60, Math.hypot(to.x - from.x, to.y - from.y) * 0.4);
      const fc   = ctrlOffset(edge.fromSide, s);
      const tc   = ctrlOffset(edge.toSide, s);

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', `M ${from.x} ${from.y} C ${from.x + fc.x} ${from.y + fc.y}, ${to.x + tc.x} ${to.y + tc.y}, ${to.x} ${to.y}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#C4B9A8');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('marker-end', 'url(#arrow)');
      svg.appendChild(path);
    }

    world.insertBefore(svg, world.firstChild);
  }

  // === Progressive image loading ===
  let loadQueue = [];
  let isLoadingBatch = false;
  const BATCH_SIZE = 4;
  const BATCH_DELAY = 80;

  function processLoadQueue() {
    if (isLoadingBatch || loadQueue.length === 0) return;
    isLoadingBatch = true;
    const batch = loadQueue.splice(0, BATCH_SIZE);
    batch.forEach(item => {
      item.imgEl.src = item.imgEl.dataset.src;
      item.loaded = true;
    });
    if (loadQueue.length > 0) {
      setTimeout(() => { isLoadingBatch = false; processLoadQueue(); }, BATCH_DELAY);
    } else {
      isLoadingBatch = false;
    }
  }

  let visCheckScheduled = false;
  function scheduleVisibilityCheck() {
    if (visCheckScheduled) return;
    visCheckScheduled = true;
    requestAnimationFrame(() => {
      visCheckScheduled = false;
      updateVisibleImages();
    });
  }

  function updateVisibleImages() {
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const margin = 100;

    for (const item of imageTracker) {
      if (item.loaded) continue;

      const sx = item.x * scale + panX;
      const sy = item.y * scale + panY;
      const sw = item.w * scale;
      const sh = item.h * scale;

      if (sx + sw < -margin || sx > vw + margin || sy + sh < -margin || sy > vh + margin) continue;

      if (!loadQueue.includes(item)) loadQueue.push(item);
    }
    processLoadQueue();
  }

  // === Pan & Zoom ===
  const viewport = document.getElementById('viewport');
  let scale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let dragStartX, dragStartY, panStartX, panStartY;
  let velocityX = 0, velocityY = 0;
  let lastMoveX = 0, lastMoveY = 0, lastMoveTime = 0;
  let isMomentumActive = false;
  const FRICTION = 0.92;
  const MIN_VELOCITY = 0.5;
  const DOT_BASE_SPACING = 24;
  let targetScale = 1;
  let targetPanX = 0;
  let targetPanY = 0;

  function applyTransform() {
    world.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;

    const spacing = DOT_BASE_SPACING * scale;
    if (spacing > 6) {
      viewport.style.backgroundImage = `radial-gradient(circle, #D4C9B8 1px, transparent 1px)`;
      viewport.style.backgroundSize = `${spacing}px ${spacing}px`;
      viewport.style.backgroundPosition = `${panX % spacing}px ${panY % spacing}px`;
    } else {
      viewport.style.backgroundImage = 'none';
    }

    scheduleVisibilityCheck();
  }

  function fitToScreen() {
    const pad = 60;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of nodes) {
      if (n.x < minX) minX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.x + n.width > maxX) maxX = n.x + n.width;
      if (n.y + n.height > maxY) maxY = n.y + n.height;
    }
    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const vw = viewport.clientWidth - pad * 2;
    const vh = viewport.clientHeight - pad * 2;

    scale = Math.min(vw / contentW, vh / contentH);
    panX = (viewport.clientWidth - contentW * scale) / 2 - minX * scale;
    panY = (viewport.clientHeight - contentH * scale) / 2 - minY * scale;
    targetScale = scale;
    targetPanX = panX;
    targetPanY = panY;
    applyTransform();
  }

  fitToScreen();
  window.addEventListener('resize', fitToScreen);

  // Mouse pan
  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('a')) return;
    if (e.button !== 0) return;
    isMomentumActive = false;
    isAnimating = false;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    panStartX = panX;
    panStartY = panY;
    lastMoveTime = performance.now();
    velocityX = 0;
    velocityY = 0;
    viewport.classList.add('dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = now - lastMoveTime || 16;
    const newPanX = panStartX + (e.clientX - dragStartX);
    const newPanY = panStartY + (e.clientY - dragStartY);
    velocityX = (newPanX - panX) / dt * 16;
    velocityY = (newPanY - panY) / dt * 16;
    lastMoveTime = now;
    panX = newPanX;
    panY = newPanY;
    targetPanX = panX;
    targetPanY = panY;
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) startMomentum();
    isDragging = false;
    viewport.classList.remove('dragging');
  });

  viewport.addEventListener('mouseleave', () => {
    if (isDragging) startMomentum();
    isDragging = false;
    viewport.classList.remove('dragging');
  });

  function startMomentum() {
    if (Math.abs(velocityX) < MIN_VELOCITY && Math.abs(velocityY) < MIN_VELOCITY) return;
    isMomentumActive = true;
    requestAnimationFrame(animateMomentum);
  }

  function animateMomentum() {
    if (!isMomentumActive) return;
    velocityX *= FRICTION;
    velocityY *= FRICTION;
    if (Math.abs(velocityX) < MIN_VELOCITY && Math.abs(velocityY) < MIN_VELOCITY) {
      isMomentumActive = false;
      return;
    }
    panX += velocityX;
    panY += velocityY;
    targetPanX = panX;
    targetPanY = panY;
    applyTransform();
    requestAnimationFrame(animateMomentum);
  }

  // Smooth scroll zoom (toward cursor)
  let isAnimating = false;
  const ZOOM_LERP = 0.15;
  const ZOOM_EPSILON = 0.001;
  let zoomAnchorX = null;
  let zoomAnchorY = null;
  let zoomAnchorTimeout = null;

  function animateZoom() {
    if (!isAnimating) return;

    const ds = targetScale - scale;
    const dx = targetPanX - panX;
    const dy = targetPanY - panY;

    if (Math.abs(ds) < ZOOM_EPSILON && Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      scale = targetScale;
      panX = targetPanX;
      panY = targetPanY;
      applyTransform();
      isAnimating = false;
      return;
    }

    scale += ds * ZOOM_LERP;
    panX += dx * ZOOM_LERP;
    panY += dy * ZOOM_LERP;
    applyTransform();
    requestAnimationFrame(animateZoom);
  }

  viewport.addEventListener('wheel', (e) => {
    if (isDragging) return;

    e.preventDefault();
    isMomentumActive = false;
    const zoomFactor = 1.08;
    const direction = e.deltaY < 0 ? 1 : -1;
    const newScale = Math.max(0.05, Math.min(5, targetScale * Math.pow(zoomFactor, direction)));

    if (zoomAnchorX === null || zoomAnchorY === null) {
      const rect = viewport.getBoundingClientRect();
      zoomAnchorX = e.clientX - rect.left;
      zoomAnchorY = e.clientY - rect.top;
    }
    clearTimeout(zoomAnchorTimeout);
    zoomAnchorTimeout = setTimeout(() => { zoomAnchorX = null; zoomAnchorY = null; }, 200);

    const ratio = newScale / targetScale;
    targetPanX = zoomAnchorX - ratio * (zoomAnchorX - targetPanX);
    targetPanY = zoomAnchorY - ratio * (zoomAnchorY - targetPanY);
    targetScale = newScale;

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(animateZoom);
    }
  }, { passive: false });

  // Touch pan & pinch zoom
  let lastTouches = null;
  viewport.addEventListener('touchstart', (e) => {
    isMomentumActive = false;
    if (e.touches.length === 1) {
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      panStartX = panX;
      panStartY = panY;
      lastMoveTime = performance.now();
      velocityX = 0;
      velocityY = 0;
    }
    lastTouches = [...e.touches];
  }, { passive: false });

  viewport.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging) {
      const now = performance.now();
      const dt = now - lastMoveTime || 16;
      const newPanX = panStartX + (e.touches[0].clientX - dragStartX);
      const newPanY = panStartY + (e.touches[0].clientY - dragStartY);
      velocityX = (newPanX - panX) / dt * 16;
      velocityY = (newPanY - panY) / dt * 16;
      lastMoveTime = now;
      panX = newPanX;
      panY = newPanY;
      targetPanX = panX;
      targetPanY = panY;
      applyTransform();
    } else if (e.touches.length === 2 && lastTouches && lastTouches.length === 2) {
      const prevDist = Math.hypot(
        lastTouches[0].clientX - lastTouches[1].clientX,
        lastTouches[0].clientY - lastTouches[1].clientY
      );
      const curDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = curDist / prevDist;
      const newScale = Math.max(0.05, Math.min(5, scale * ratio));

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const rect = viewport.getBoundingClientRect();
      const mx = midX - rect.left;
      const my = midY - rect.top;

      const r = newScale / scale;
      panX = mx - r * (mx - panX);
      panY = my - r * (my - panY);
      scale = newScale;
      targetScale = scale;
      targetPanX = panX;
      targetPanY = panY;
      applyTransform();
    }
    lastTouches = [...e.touches];
  }, { passive: false });

  viewport.addEventListener('touchend', () => {
    if (isDragging) startMomentum();
    isDragging = false;
    lastTouches = null;
  });

  // === Navigation buttons ===
  const navBtns = document.createElement('div');
  navBtns.id = 'nav-buttons';

  const backBtn = document.createElement('button');
  backBtn.id = 'back-btn';
  backBtn.title = 'Back to home';
  backBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
  backBtn.addEventListener('click', () => { window.location.href = 'index.html'; });

  const fitBtn = document.createElement('button');
  fitBtn.id = 'fit-all-btn';
  fitBtn.title = 'Fit all to view';
  fitBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  fitBtn.addEventListener('click', () => {
    const pad = 60;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of nodes) {
      if (n.x < minX) minX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.x + n.width > maxX) maxX = n.x + n.width;
      if (n.y + n.height > maxY) maxY = n.y + n.height;
    }
    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const vw = viewport.clientWidth - pad * 2;
    const vh = viewport.clientHeight - pad * 2;

    targetScale = Math.min(vw / contentW, vh / contentH);
    targetPanX = (viewport.clientWidth - contentW * targetScale) / 2 - minX * targetScale;
    targetPanY = (viewport.clientHeight - contentH * targetScale) / 2 - minY * targetScale;

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(animateZoom);
    }
  });

  navBtns.appendChild(backBtn);
  navBtns.appendChild(fitBtn);
  document.body.appendChild(navBtns);
}

init();

// === Canvas data from milestone 1.canvas ===
const GROUP_LABEL_HEIGHT = 32;

const nodes = [
  // Groups — y shifted up and height expanded to make room for label
  {id:"13b1da1e97bac478",type:"group",x:360,y:-2000-GROUP_LABEL_HEIGHT,width:785,height:885+GROUP_LABEL_HEIGHT,label:"Rigging Update"},
  {id:"f1b70707af8a7f8b",type:"group",x:-300,y:-2000-GROUP_LABEL_HEIGHT,width:629,height:958+GROUP_LABEL_HEIGHT,label:"modeling update"},
  {id:"b7a419eedb1b333c",type:"group",x:1180,y:-2000-GROUP_LABEL_HEIGHT,width:513,height:748+GROUP_LABEL_HEIGHT,label:"VFX Update"},
  {id:"8e500ec4b1f64324",type:"group",x:369,y:-1395-GROUP_LABEL_HEIGHT,width:751,height:240+GROUP_LABEL_HEIGHT,label:"control panel rig"},
  {id:"33de00ef73285fca",type:"group",x:1728,y:-2000-GROUP_LABEL_HEIGHT,width:301,height:495+GROUP_LABEL_HEIGHT,label:"lighting tests"},
  {id:"a6c304f3761f82f9",type:"group",x:369,y:-1681-GROUP_LABEL_HEIGHT,width:613,height:233+GROUP_LABEL_HEIGHT,label:"Sora rig"},
  {id:"0edabf5e2f7a7def",type:"group",x:367,y:-1941-GROUP_LABEL_HEIGHT,width:570,height:213+GROUP_LABEL_HEIGHT,label:"Itsuka rig"},
  {id:"6d928c004d40e3f7",type:"group",x:-280,y:-1717-GROUP_LABEL_HEIGHT,width:589,height:203+GROUP_LABEL_HEIGHT,label:"Sora modeling"},
  {id:"7aaa25be76bbaba3",type:"group",x:-280,y:-1962-GROUP_LABEL_HEIGHT,width:521,height:211+GROUP_LABEL_HEIGHT,label:"Itsuka modeling"},
  {id:"137e456554deac9e",type:"group",x:-280,y:-1277-GROUP_LABEL_HEIGHT,width:532,height:200+GROUP_LABEL_HEIGHT,label:"closet modeling"},
  {id:"c8879d65eb0934ff",type:"group",x:1190,y:-1514-GROUP_LABEL_HEIGHT,width:360,height:239+GROUP_LABEL_HEIGHT,label:"astroid VFX"},
  {id:"5d2429aac67a615c",type:"group",x:1190,y:-1949-GROUP_LABEL_HEIGHT,width:480,height:178+GROUP_LABEL_HEIGHT,label:"title VFX"},
  {id:"c4e4b7d15565358e",type:"group",x:-280,y:-1485-GROUP_LABEL_HEIGHT,width:487,height:173+GROUP_LABEL_HEIGHT,label:"helmat modeling"},
  {id:"7a158b759cbdd4c7",type:"group",x:1190,y:-1734-GROUP_LABEL_HEIGHT,width:258,height:173+GROUP_LABEL_HEIGHT,label:"spaceship fire VFX"},
  // Text
  {id:"b046b20ab1a5fd99",type:"text",text:"Vacancy: Milestone One",x:-291,y:-2100,width:433,height:80},
  // Images
  {id:"ddbe32d53f44922b",type:"file",file:"image 8.webp",x:-36,y:-1695,width:84,height:163},
  {id:"86c352983c241dd9",type:"file",file:"image 9.webp",x:59,y:-1695,width:125,height:163},
  {id:"004ee3616e79073a",type:"file",file:"image 5.webp",x:73,y:-1459,width:126,height:125},
  {id:"ad9bcaf699bf386a",type:"file",file:"image 10.webp",x:192,y:-1695,width:105,height:163},
  {id:"d313e0cc5a5a5b65",type:"file",file:"image 6.webp",x:-272,y:-1459,width:163,height:125},
  {id:"9c93fb775a907658",type:"file",file:"image 4.webp",x:-101,y:-1459,width:160,height:125},
  {id:"4004e0a6d6058028",type:"file",file:"image.webp",x:29,y:-1252,width:88,height:163},
  {id:"82059fff21a504e2",type:"file",file:"image 1.webp",x:127,y:-1252,width:118,height:163},
  {id:"66750cdfb6bdc8d3",type:"file",file:"image 2.webp",x:-272,y:-1252,width:139,height:163},
  {id:"a0eb48c4f54497e8",type:"file",file:"image 3.webp",x:-125,y:-1252,width:140,height:163},
  {id:"9479950b6f3b6f64",type:"file",file:"image 7.webp",x:-272,y:-1695,width:108,height:163},
  {id:"05bf0a8dd1696a54",type:"file",file:"image 11.webp",x:-155,y:-1695,width:108,height:163},
  {id:"b837565e90438d04",type:"file",file:"Pasted image 20260213023127.png",x:-272,y:-1943,width:120,height:171},
  {id:"f8b77fb031de6153",type:"file",file:"Pasted image 20260213023135.png",x:-137,y:-1943,width:106,height:171},
  {id:"ae401a0f109f9835",type:"file",file:"Pasted image 20260213023142.png",x:-23,y:-1943,width:126,height:171},
  {id:"5766110110569930",type:"file",file:"Pasted image 20260213023152.png",x:114,y:-1943,width:115,height:171},
  {id:"bb6aa1e436aae8b3",type:"file",file:"Pasted image 20260213023510.png",x:384,y:-1921,width:110,height:182},
  {id:"b6eb196d6d63378e",type:"file",file:"Pasted image 20260213023624.png",x:506,y:-1921,width:158,height:182},
  {id:"d93b2b5627518b92",type:"file",file:"Pasted image 20260213023808.png",x:386,y:-1653,width:141,height:182},
  {id:"a03b558058eb32b0",type:"file",file:"Pasted image 20260213024015.png",x:542,y:-1653,width:139,height:182},
  {id:"f39750d279683f3a",type:"file",file:"Pasted image 20260213025549.png",x:685,y:-1921,width:221,height:182},
  {id:"cb6ca1fe4885aae2",type:"file",file:"Pasted image 20260213025355.png",x:705,y:-1653,width:232,height:182},
  {id:"0dd97999b2870f64",type:"file",file:"Pasted image 20260213025941.png",x:389,y:-1359,width:241,height:182},
  {id:"8209f90bf21f7e35",type:"file",file:"Pasted image 20260213025958.png",x:654,y:-1359,width:204,height:182},
  {id:"d2485ba9a97f3644",type:"file",file:"Pasted image 20260213030006.png",x:879,y:-1359,width:206,height:182},
  {id:"5c7bfa1e513c0d07",type:"file",file:"Pasted image 20260213021920.png",x:1201,y:-1918,width:223,height:121},
  {id:"18ea0da50d5be165",type:"file",file:"spaceship_with_fire.webp",x:1201,y:-1707,width:223,height:125},
  {id:"6db65888f48fc4a0",type:"file",file:"Pasted image 20260213021901.png",x:1438,y:-1918,width:223,height:121},
  {id:"f0f30bdd3ef4c482",type:"file",file:"spec_castshadows_off.webp",x:1768,y:-1953,width:223,height:125},
  {id:"15e964939470afb7",type:"file",file:"spec_castshadows_on.webp",x:1768,y:-1803,width:223,height:125},
  {id:"30f43a4b982ca8ab",type:"file",file:"spec_castshadows_off1.webp",x:1768,y:-1653,width:223,height:125},
  {id:"d93c574b29090f1a",type:"file",file:"VFXA_assignment_1__astroid_ryan_wange_v003.0000.jpeg",x:1201,y:-1471,width:329,height:185}
];

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

// Sort: parent groups first, child groups, images, text
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
    img.dataset.src = 'media/' + node.file;
    img.alt = node.file;
    img.draggable = false;
    img.decoding = 'async';
    img.onload = function() { this.classList.add('loaded'); };
    el.appendChild(img);
    imageTracker.push({ el, imgEl: img, x: node.x, y: node.y, w: node.width, h: node.height, loaded: false });
  } else if (node.type === 'text') {
    el.className = 'canvas-text';
    const h1 = document.createElement('h1');
    h1.textContent = node.text;
    el.appendChild(h1);
  }

  el.style.left = node.x + 'px';
  el.style.top = node.y + 'px';
  el.style.width = node.width + 'px';
  el.style.height = node.height + 'px';
  el.style.zIndex = i;

  world.appendChild(el);
});

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

  // Update dot grid: dots stay same size, spacing scales with zoom
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

// Fit all content on load
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
  if (e.button !== 0) return;
  isMomentumActive = false;
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
  e.preventDefault();
  const zoomFactor = 1.08;
  const direction = e.deltaY < 0 ? 1 : -1;
  const newScale = Math.max(0.05, Math.min(5, targetScale * Math.pow(zoomFactor, direction)));

  // Lock the zoom anchor to where the cursor was when zooming started
  if (zoomAnchorX === null || zoomAnchorY === null) {
    const rect = viewport.getBoundingClientRect();
    zoomAnchorX = e.clientX - rect.left;
    zoomAnchorY = e.clientY - rect.top;
  }
  clearTimeout(zoomAnchorTimeout);
  zoomAnchorTimeout = setTimeout(() => { zoomAnchorX = null; zoomAnchorY = null; }, 200);

  // Compute where pan needs to end up so the anchor point stays fixed
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

// === Fit-all button ===
const fitBtn = document.createElement('button');
fitBtn.id = 'fit-all-btn';
fitBtn.title = 'Fit all to view';
fitBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
document.body.appendChild(fitBtn);

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

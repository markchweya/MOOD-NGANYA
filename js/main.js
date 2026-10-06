/* =========================================================
   MOOD — site content & behaviour
   ✏️  Edit the content below. No build step: save and refresh.
   ========================================================= */

const CONFIG = {
  photoCredit: { name: "Mziziani Photography", url: "" }, // TODO add their Instagram link
};

const PHOTOS = {
  front: { src: "assets/gallery/mood-front.webp", w: 1206, h: 1367,
           alt: "Front of the MOOD matatu: purple body kit, roof lights and windshield art" },
  back:  { src: "assets/gallery/mood-rear.webp",  w: 1206, h: 1437,
           alt: "Back of the MOOD matatu: airbrushed portraits, red LED tail lights and ATMOSPHERE lettering" },
};

// "Spot the details" hotspots. x / y are percentages of the photo's width / height.
const DETAILS = {
  front: [
    { x: 41, y: 20, title: "The crown",          text: "A roof lined with red beacon lamps and a full-width amber light bar on top. You see Mood long before you hear it." },
    { x: 55, y: 37, title: "No risk, no story",  text: "The windshield banner: MOOD in white graffiti letters over a lilac wash, melting smileys and the motto that sums it all up. Signed off in red: “School kills Artists”." },
    { x: 58, y: 52, title: "TRY ME",             text: "The dashboard plate in gold and orange with a maroon outline. A friendly dare to every other nganya on the road." },
    { x: 43, y: 73, title: "LED headlights",     text: "Ice-blue LED headlights with a light bar under the windscreen." },
    { x: 62, y: 67, title: "Custom grille",      text: "A slatted purple grille with red accent lights, all part of the custom body kit." },
    { x: 80, y: 63, title: "First Class",        text: "A yellow diamond sign that says it all." },
    { x: 65, y: 85, title: "The plate",          text: "Personalised MOOD plates: white on the front, yellow on the back." },
    { x: 5,  y: 64, title: "Lady Liberty",       text: "A screaming teal Lady Liberty on the side panel. The art keeps going all the way down the body." },
    { x: 16, y: 88, title: "The rims",           text: "Black multi-spoke alloys to finish the look." },
  ],
  back: [
    { x: 37, y: 7,  title: "Roof rack",          text: "A purple roof rack lined with beacon lights, crowning the tailgate." },
    { x: 31, y: 30, title: "The faces",          text: "Airbrushed, wide-eyed portraits in warm gold tones. Impossible to ignore at a traffic light." },
    { x: 75, y: 32, title: "The attitude",       text: "Tongue out, eyebrow up. Mood's art talks back." },
    { x: 61, y: 47, title: "Hazard zone",        text: "A yellow hazard sign, a red warning triangle, chain-link fence and the drippy smiley hidden in the mix." },
    { x: 36, y: 54, title: "Tail lights",        text: "Sculpted red LED tail lights wrap around the art like a frame." },
    { x: 22, y: 70, title: "ATMOSPHERE",         text: "White cracked lettering across the tailgate. One word for what Mood brings." },
    { x: 52, y: 70, title: "The plate",          text: "The yellow rear MOOD plate, in case you missed the front." },
    { x: 50, y: 86, title: "Rear diffuser",      text: "A race-style purple diffuser. Pure nganya engineering." },
  ],
};

// The palette. `hex` is the brand colour; `sample` is the raw value measured in
// the photo (overcast light dulls some colours, so those were lifted back to
// their true sticker/paint brightness). `chip` is a crop showing where it lives.
const PALETTE = [
  { group: "Paint", colours: [
    { name: "Mood Purple",   hex: "#7817A3", sample: "#7817A3", chip: "purple", where: "The main body paint: grille, bumpers, body kit" },
    { name: "Purple Glow",   hex: "#9B3FD0", sample: "#8F34B1", chip: "glow",   where: "Sunlit panels and curves" },
    { name: "Purple Night",  hex: "#2E0A3D", sample: "#310A3F", chip: "night",  where: "Shadows, arches and the underside" },
    { name: "Cloud Violet",  hex: "#4C44AC", sample: "#4C44AC", chip: "violet", where: "The cloud art on the side panels" },
    { name: "Drip Lilac",    hex: "#C4C2E6", sample: "#C2C3E3", chip: "lilac",  where: "The windshield banner wash" },
  ]},
  { group: "Stickers", colours: [
    { name: "Smiley Yellow", hex: "#F9D133", sample: "#C5A335", chip: "smiley", where: "Drippy smileys, FIRST CLASS sign, hazard sign" },
    { name: "Try-Me Gold",   hex: "#F2AE3A", sample: "#E1A637", chip: "gold",   where: "TRY ME lettering" },
    { name: "Try-Me Orange", hex: "#DD983C", sample: "#DD983C", chip: "gold",   where: "TRY ME badge body" },
    { name: "Try-Me Maroon", hex: "#8C221F", sample: "#8C221F", chip: "maroon", where: "TRY ME outlines" },
    { name: "Plate Yellow",  hex: "#E9A23B", sample: "#C07D2C", chip: "plate",  where: "The rear MOOD number plate" },
  ]},
  { group: "Lights", colours: [
    { name: "Tail-Light Red", hex: "#E2332E", sample: "#E2332E", chip: "tail",   where: "LED tail lights and the red warning sign" },
    { name: "Beacon Red",     hex: "#B32827", sample: "#B32827", chip: "beacon", where: "Roof beacon lamps" },
    { name: "LED Ice",        hex: "#73B5DB", sample: "#73B5DB", chip: "ice",    where: "Headlight LEDs" },
  ]},
  { group: "Art", colours: [
    { name: "Liberty Teal",     hex: "#489E97", sample: "#489E97", chip: "teal",  where: "Lady Liberty on the side panel" },
    { name: "Atmosphere White", hex: "#F4F1F8", sample: "#F4F1F8", chip: "white", where: "ATMOSPHERE letters, MOOD logo, front plate" },
    { name: "Ink",              hex: "#121016", sample: "#121016", chip: "ink",   where: "Outlines, trims and the light bar" },
  ]},
];

// Sticker wall. w = width in px at full size; x / y / r = start position (%) and rotation.
const STICKERS = [
  { id: "s-mood",        vb: [380, 140], w: 320, x: 6,  y: 8,  r: -4,  label: "MOOD windshield logo" },
  { id: "s-norisk",      vb: [320, 64],  w: 300, x: 50, y: 6,  r: 3,   label: "No risk, no story" },
  { id: "s-tryme",       vb: [300, 140], w: 260, x: 8,  y: 46, r: -8,  label: "TRY ME" },
  { id: "s-firstclass",  vb: [150, 150], w: 150, x: 74, y: 30, r: 0,   label: "FIRST CLASS" },
  { id: "s-atmosphere",  vb: [440, 90],  w: 380, x: 38, y: 72, r: -2,  label: "ATMOSPHERE" },
  { id: "s-school",      vb: [180, 120], w: 170, x: 46, y: 34, r: -10, label: "School kills Artists" },
  { id: "s-plate-front", vb: [280, 80],  w: 190, x: 4,  y: 80, r: 4,   label: "Front MOOD plate" },
  { id: "s-plate-rear",  vb: [280, 80],  w: 190, x: 70, y: 56, r: -5,  label: "Rear MOOD plate" },
  { id: "s-hazard",      vb: [120, 108], w: 110, x: 38, y: 50, r: 8,   label: "Hazard sign" },
  { id: "s-warning",     vb: [120, 108], w: 110, x: 60, y: 46, r: -12, label: "Warning sign" },
  { id: "s-smiley",      vb: [64, 72],   w: 90,  x: 86, y: 6,  r: 10,  label: "Drippy smiley" },
  { id: "s-smiley",      vb: [64, 72],   w: 70,  x: 30, y: 30, r: -14, label: "Drippy smiley" },
  { id: "s-smiley",      vb: [64, 72],   w: 60,  x: 88, y: 76, r: 6,   label: "Drippy smiley" },
];

/* =========================================================
   Behaviour (no need to edit below this line)
   ========================================================= */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const escapeHTML = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const toggle = $(".menu-toggle");
  const nav = $("#nav");
  const close = () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", String(nav.classList.toggle("open"))));
  $$("a", nav).forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
}

/* ---------- Hoot! (Web Audio matatu horn, no audio files) ---------- */
let audioCtx;
function hoot() {
  audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioCtx.currentTime;
  const blast = (start, dur) => {
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
    gain.gain.setValueAtTime(0.18, start + dur - 0.05);
    gain.gain.linearRampToValueAtTime(0, start + dur);
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2200;
    filter.connect(gain).connect(audioCtx.destination);
    [415, 523].forEach((f) => { // two detuned tones = classic dual horn
      const osc = audioCtx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = f;
      osc.connect(filter);
      osc.start(start);
      osc.stop(start + dur);
    });
  };
  blast(now, 0.18);
  blast(now + 0.26, 0.42);
  const art = $(".hero-art");
  art.classList.remove("honk");
  void art.offsetWidth;
  art.classList.add("honk");
}

/* ---------- Spot the details ---------- */
function initExplorer() {
  const img = $("#explorer-img");
  const spots = $("#hotspots");
  const list = $("#detail-list");
  const card = $("#detail-card");
  const tabs = $$('[role="tab"]');
  let view = "front";

  const select = (i) => {
    const d = DETAILS[view][i];
    $$("button", spots).forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
    $$("button", list).forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
    card.innerHTML = `<span class="detail-num">${i + 1}</span>
                      <div><h3>${escapeHTML(d.title)}</h3><p>${escapeHTML(d.text)}</p></div>`;
  };

  const show = (v) => {
    view = v;
    Object.assign(img, { src: PHOTOS[v].src, width: PHOTOS[v].w, height: PHOTOS[v].h, alt: PHOTOS[v].alt });
    tabs.forEach((t) => {
      const on = t.dataset.view === v;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on) $("#explorer").setAttribute("aria-labelledby", t.id);
    });
    spots.innerHTML = DETAILS[v].map((d, i) =>
      `<button type="button" class="hotspot" style="left:${d.x}%;top:${d.y}%"
               aria-label="${i + 1}: ${escapeHTML(d.title)}" data-i="${i}">${i + 1}</button>`).join("");
    list.innerHTML = DETAILS[v].map((d, i) =>
      `<li><button type="button" data-i="${i}"><span>${i + 1}</span>${escapeHTML(d.title)}</button></li>`).join("");
    select(0);
  };

  [spots, list].forEach((root) => root.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-i]");
    if (b) select(Number(b.dataset.i));
  }));
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(t.dataset.view));
    t.addEventListener("keydown", (e) => {
      const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!dir) return;
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      next.focus();
      show(next.dataset.view);
    });
  });
  show("front");
}

/* ---------- Palette ---------- */
function renderPalette() {
  $("#palette").innerHTML = PALETTE.map((g) => `
    <div class="palette-group">
      <h3>${escapeHTML(g.group)}</h3>
      <div class="swatches">
        ${g.colours.map((c) => `
          <button type="button" class="swatch" style="--sw:${c.hex}" data-hex="${c.hex}"
                  aria-label="${escapeHTML(c.name)} ${c.hex}. Copy hex">
            <span class="swatch-color">
              <img class="swatch-chip" src="assets/chips/${c.chip}.webp" alt="" loading="lazy" width="64" height="64" />
            </span>
            <span class="swatch-body">
              <span class="swatch-name">${escapeHTML(c.name)}</span>
              <span class="swatch-hex">${c.hex}</span>
              <span class="swatch-where">${escapeHTML(c.where)}</span>
              ${c.sample !== c.hex ? `<span class="swatch-sample">In-photo: ${c.sample} (lifted for daylight)</span>` : ""}
            </span>
          </button>`).join("")}
      </div>
    </div>`).join("");

  $("#palette").addEventListener("click", async (e) => {
    const sw = e.target.closest(".swatch");
    if (!sw) return;
    try {
      await navigator.clipboard.writeText(sw.dataset.hex);
      toast(`Copied ${sw.dataset.hex}`);
    } catch {
      toast(sw.dataset.hex);
    }
  });
}

/* ---------- Sticker wall (drag & drop) ---------- */
function initStickerWall() {
  const wall = $("#wall");
  const els = STICKERS.map((s) => {
    const el = document.createElement("div");
    el.className = "sticker";
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", s.label);
    el.innerHTML = `<svg viewBox="0 0 ${s.vb[0]} ${s.vb[1]}"><use href="#${s.id}" /></svg>`;
    wall.appendChild(el);
    return { ...s, el };
  });

  let z = 1;
  const place = (s) => {
    const scale = Math.min(1, wall.clientWidth / 980);
    const w = s.w * Math.max(scale, 0.45);
    s.el.style.width = `${w}px`;
    s.el.style.height = `${(w * s.vb[1]) / s.vb[0]}px`;
    s.el.style.left = `${s.x}%`;
    s.el.style.top = `${s.y}%`;
    s.el.style.transform = `rotate(${s.r}deg)`;
  };
  const clamp = (s) => {
    // keep each sticker fully inside the wall
    const maxX = 100 - (s.el.offsetWidth / wall.clientWidth) * 100;
    const maxY = 100 - (s.el.offsetHeight / wall.clientHeight) * 100;
    s.x = Math.min(Math.max(s.x, 0), Math.max(maxX, 0));
    s.y = Math.min(Math.max(s.y, 0), Math.max(maxY, 0));
  };
  const layout = () => els.forEach((s) => { place(s); clamp(s); place(s); });
  layout();
  window.addEventListener("resize", layout);
  document.fonts?.ready.then(layout);

  els.forEach((s) => {
    s.el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      s.el.setPointerCapture(e.pointerId);
      s.el.classList.add("dragging");
      s.el.style.zIndex = ++z;
      const rect = wall.getBoundingClientRect();
      const startX = e.clientX, startY = e.clientY, ox = s.x, oy = s.y;
      const move = (ev) => {
        s.x = ox + ((ev.clientX - startX) / rect.width) * 100;
        s.y = oy + ((ev.clientY - startY) / rect.height) * 100;
        clamp(s);
        place(s);
      };
      const up = () => {
        s.el.classList.remove("dragging");
        s.el.removeEventListener("pointermove", move);
        s.el.removeEventListener("pointerup", up);
        s.el.removeEventListener("pointercancel", up);
      };
      s.el.addEventListener("pointermove", move);
      s.el.addEventListener("pointerup", up);
      s.el.addEventListener("pointercancel", up);
    });
  });

  $("#shuffle").addEventListener("click", () => {
    els.forEach((s) => {
      s.x = Math.random() * 85;
      s.y = Math.random() * 85;
      s.r = Math.round(Math.random() * 30 - 15);
      s.el.style.zIndex = ++z;
    });
    layout();
  });
}

/* ---------- Gallery + lightbox ---------- */
function renderGallery() {
  const credit = escapeHTML(CONFIG.photoCredit.name);
  const items = [
    { ...PHOTOS.front, caption: "Front · TRY ME" },
    { ...PHOTOS.back,  caption: "Back · ATMOSPHERE" },
  ];
  $("#gallery-grid").innerHTML = items.map((p) => `
    <figure class="tile">
      <button type="button" class="tile-open" data-src="${p.src}" data-caption="${escapeHTML(p.caption)} · 📸 ${credit}" aria-label="View larger: ${escapeHTML(p.alt)}">
        <img src="${p.src}" alt="${escapeHTML(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async" />
      </button>
      <figcaption>${escapeHTML(p.caption)} · 📸 ${credit}</figcaption>
    </figure>`).join("");

  const dlg = $("#lightbox");
  if (!dlg.showModal) return;
  $("#gallery-grid").addEventListener("click", (e) => {
    const b = e.target.closest(".tile-open");
    if (!b) return;
    $("#lightbox-img").src = b.dataset.src;
    $("#lightbox-img").alt = $("img", b).alt;
    $("#lightbox-caption").textContent = b.dataset.caption;
    dlg.showModal();
  });
  dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
}

function renderCredit() {
  const { name, url } = CONFIG.photoCredit;
  $("#photo-credit").innerHTML = url
    ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener">${escapeHTML(name)}</a>`
    : escapeHTML(name);
}

/* ---------- Boot ---------- */
initMenu();
initExplorer();
renderPalette();
initStickerWall();
renderGallery();
renderCredit();
$("#hoot").addEventListener("click", hoot);
$("#year").textContent = new Date().getFullYear();

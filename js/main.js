/* =========================================================
   MOOD — site content & behaviour
   ✏️  Edit the content below. No build step: save and refresh.
   ========================================================= */

const CONFIG = {
  // Mood's socials. Leave url empty to hide a link.
  socials: [
    { label: "Instagram · @mood_family33", url: "https://www.instagram.com/mood_family33/" },
    { label: "TikTok", url: "" }, // TODO confirm the exact TikTok handle (bio shows tiktok.com/@mood_fami…)
  ],
};

// credit: photographer for each shot. TODO confirm who shot the head-on photo.
const PHOTOS = {
  headon: { src: "assets/gallery/mood-headon.webp", w: 1206, h: 1438, credit: "",
            alt: "MOOD head-on in the sun: purple body kit, purple and red roof beacons, windshield art, the TRY ME sticker and FIRST CLASS sign" },
  front:  { src: "assets/gallery/mood-front.webp",  w: 1206, h: 1367, credit: "Mziziani Photography",
            alt: "MOOD from the three-quarter front: roof lights, Lady Liberty side art and the TRY ME sticker" },
  back:   { src: "assets/gallery/mood-rear.webp",   w: 1206, h: 1437, credit: "Mziziani Photography",
            alt: "Back of the MOOD matatu: airbrushed portraits, red LED tail lights and ATMOSPHERE lettering" },
};

// "Spot the details" hotspots. x / y are percentages of the photo's width / height.
const DETAILS = {
  headon: [
    { x: 48, y: 23, title: "The crown",            text: "A full-width light bar over a row of beacon domes that alternate purple and red." },
    { x: 46, y: 31, title: "The MOOD banner",      text: "MOOD in white graffiti letters with two faces set into the O's, over a lilac wash full of melting mustard smileys." },
    { x: 57, y: 37, title: "No risk, no story",    text: "The motto across the bottom of the banner. It's the first line of the Instagram bio too." },
    { x: 71, y: 33, title: "School kills Artists", text: "Signed off in hand lettering on the passenger side of the windshield." },
    { x: 25, y: 40, title: "Sun-strip",            text: "A deep blue band across the windshield that separates the banner from the TRY ME sticker." },
    { x: 46, y: 47, title: "Thou Shall Not TRY ME", text: "Gold and magenta, with a white die-cut edge. A key on the left, flowers on the right, and the script that turns TRY ME into a commandment." },
    { x: 6,  y: 43, title: "Smiley mirrors",       text: "Both mirror housings are wrapped in purple with mustard drippy smileys." },
    { x: 46, y: 54, title: "LED bar",              text: "Six square LED pods under the windscreen." },
    { x: 68, y: 61, title: "First Class",          text: "An amber sign hung off the grille." },
    { x: 45, y: 63, title: "Custom grille",        text: "Five purple slats with small red accent lights." },
    { x: 24, y: 70, title: "Headlights",           text: "Angular LED headlights with ice-blue accents." },
    { x: 52, y: 86, title: "Plate & fog lights",   text: "The white MOOD plate over a row of four square fog lights." },
  ],
  front: [
    { x: 41, y: 20, title: "The crown",          text: "Seen from the side, the roof is lined end to end with beacon lamps." },
    { x: 58, y: 52, title: "TRY ME",             text: "The dashboard sticker, from the side." },
    { x: 80, y: 63, title: "First Class",        text: "The amber FIRST CLASS sign." },
    { x: 5,  y: 64, title: "Lady Liberty",       text: "A screaming teal Lady Liberty on the side panel. The art keeps going all the way down the body." },
    { x: 26, y: 70, title: "Side clouds",        text: "Violet clouds painted over the purple body." },
    { x: 16, y: 88, title: "The rims",           text: "Black multi-spoke alloys to finish the look." },
  ],
  back: [
    { x: 37, y: 7,  title: "Roof rack",          text: "A purple roof rack lined with beacon lights, crowning the tailgate." },
    { x: 31, y: 30, title: "The faces",          text: "Airbrushed, wide-eyed portraits in warm gold tones. Impossible to ignore at a traffic light." },
    { x: 75, y: 32, title: "The attitude",       text: "Tongue out, eyebrow up. Mood's art talks back." },
    { x: 61, y: 47, title: "Hazard zone",        text: "A yellow hazard sign, a red warning triangle, chain-link fence and the drippy smiley hidden in the mix." },
    { x: 36, y: 54, title: "Tail lights",        text: "Sculpted red LED tail lights wrap around the art like a frame." },
    { x: 22, y: 70, title: "ATMOSPHERE",         text: "White cracked lettering across the tailgate. One word for what Mood brings." },
    { x: 52, y: 70, title: "The plate",          text: "The yellow rear MOOD plate." },
    { x: 50, y: 86, title: "Rear diffuser",      text: "A race-style purple diffuser. Pure nganya engineering." },
  ],
};

// The palette. Every hex is measured from the photos; `from` says which shot.
// `chip` is a crop from that photo showing where the colour lives.
const PALETTE = [
  { group: "Paint", colours: [
    { name: "Mood Purple",   hex: "#8B1BAB", from: "Head-on, full sun", chip: "purple",   where: "The main body paint: grille, bumpers, body kit" },
    { name: "Purple Glow",   hex: "#AE2EC9", from: "Head-on, full sun", chip: "glow",     where: "Sunlit curves of the body kit" },
    { name: "Purple Night",  hex: "#280633", from: "Head-on, full sun", chip: "night",    where: "Shadows and the underside" },
    { name: "Cloud Violet",  hex: "#4C44AC", from: "Three-quarter",     chip: "violet",   where: "The cloud art on the side panels" },
    { name: "Drip Lilac",    hex: "#A07EB4", from: "Head-on, full sun", chip: "lilac",    where: "The windshield banner wash" },
    { name: "Sun-strip Blue", hex: "#0B0491", from: "Head-on, full sun", chip: "sunstrip", where: "The blue band across the windshield" },
  ]},
  { group: "Stickers", colours: [
    { name: "Smiley Mustard", hex: "#D1AF4A", from: "Head-on, full sun", chip: "smiley",     where: "Drippy smileys on the windshield and mirrors" },
    { name: "Try-Me Gold",    hex: "#E4A83C", from: "Head-on, full sun", chip: "gold",       where: "TRY ME lettering and badge" },
    { name: "Try-Me Magenta", hex: "#AC24A1", from: "Head-on, full sun", chip: "magenta",    where: "TRY ME outlines, line art and flowers" },
    { name: "First-Class Amber", hex: "#CC8F33", from: "Head-on, full sun", chip: "firstclass", where: "The FIRST CLASS sign" },
    { name: "Plate Yellow",   hex: "#C07D2C", from: "Back",              chip: "plate",      where: "The rear MOOD number plate" },
  ]},
  { group: "Lights", colours: [
    { name: "Tail-Light Red", hex: "#E2332E", from: "Back",              chip: "tail",         where: "LED tail lights and the red warning sign" },
    { name: "Beacon Red",     hex: "#B32827", from: "Three-quarter",     chip: "beacon",       where: "Red roof beacon domes" },
    { name: "Beacon Purple",  hex: "#6C1F67", from: "Head-on, full sun", chip: "beaconpurple", where: "Purple roof beacon domes" },
    { name: "LED Ice",        hex: "#73B5DB", from: "Three-quarter",     chip: "ice",          where: "Headlight LEDs" },
  ]},
  { group: "Art", colours: [
    { name: "Liberty Teal",     hex: "#489E97", from: "Three-quarter",     chip: "teal",  where: "Lady Liberty on the side panel" },
    { name: "Atmosphere White", hex: "#F4F1F8", from: "Back",              chip: "white", where: "ATMOSPHERE letters, MOOD logo, die-cut edges" },
    { name: "Ink",              hex: "#262322", from: "Head-on, full sun", chip: "ink",   where: "Outlines, trims and the LED bar housing" },
  ]},
];

// Sticker wall. w = width in px at full size; x / y / r = start position (%) and rotation.
const STICKERS = [
  { id: "s-mood",        vb: [380, 140], w: 320, x: 6,  y: 8,  r: -4,  label: "MOOD windshield logo" },
  { id: "s-norisk",      vb: [320, 64],  w: 300, x: 50, y: 6,  r: 3,   label: "No risk, no story" },
  { id: "s-tryme",       vb: [320, 160], w: 270, x: 6,  y: 44, r: -6,  label: "Thou Shall Not TRY ME" },
  { id: "s-firstclass",  vb: [150, 150], w: 150, x: 74, y: 30, r: 0,   label: "FIRST CLASS" },
  { id: "s-atmosphere",  vb: [440, 90],  w: 380, x: 38, y: 74, r: -2,  label: "ATMOSPHERE" },
  { id: "s-school",      vb: [180, 120], w: 170, x: 46, y: 34, r: -10, label: "School kills Artists" },
  { id: "s-plate-front", vb: [280, 80],  w: 190, x: 4,  y: 82, r: 4,   label: "Front MOOD plate" },
  { id: "s-plate-rear",  vb: [280, 80],  w: 190, x: 70, y: 58, r: -5,  label: "Rear MOOD plate" },
  { id: "s-hazard",      vb: [120, 108], w: 110, x: 38, y: 52, r: 8,   label: "Hazard sign" },
  { id: "s-warning",     vb: [120, 108], w: 110, x: 58, y: 46, r: -12, label: "Warning sign" },
  { id: "s-devil",       vb: [64, 64],   w: 100, x: 84, y: 16,  r: 10,  label: "Purple devil" },
  { id: "s-devil",       vb: [64, 64],   w: 70,  x: 30, y: 30, r: -12, label: "Purple devil" },
  { id: "s-smiley",      vb: [64, 72],   w: 80,  x: 62, y: 24, r: -10, label: "Drippy smiley" },
  { id: "s-smiley",      vb: [64, 72],   w: 60,  x: 88, y: 78, r: 6,   label: "Drippy smiley" },
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
  let view = "headon";

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
  show("headon");
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
              <span class="swatch-sample">Measured: ${escapeHTML(c.from)}</span>
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
  const items = [
    { ...PHOTOS.headon, caption: "Head-on" },
    { ...PHOTOS.front,  caption: "Front · TRY ME" },
    { ...PHOTOS.back,   caption: "Back · ATMOSPHERE" },
  ];
  const cap = (p) => escapeHTML(p.caption) + (p.credit ? ` · 📸 ${escapeHTML(p.credit)}` : "");
  $("#gallery-grid").innerHTML = items.map((p) => `
    <figure class="tile">
      <button type="button" class="tile-open" data-src="${p.src}" data-caption="${cap(p)}" aria-label="View larger: ${escapeHTML(p.alt)}">
        <img src="${p.src}" alt="${escapeHTML(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async" />
      </button>
      <figcaption>${cap(p)}</figcaption>
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

function renderLinks() {
  const credits = [...new Set(Object.values(PHOTOS).map((p) => p.credit).filter(Boolean))];
  $("#photo-credit").textContent = credits.join(", ");
  $("#family-links").innerHTML = CONFIG.socials.filter((l) => l.url).map((l, i) =>
    `<a class="btn ${i ? "btn-ghost" : "btn-primary"}" href="${escapeHTML(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a>`).join("");
}

/* ---------- Boot ---------- */
initMenu();
initExplorer();
renderPalette();
initStickerWall();
renderGallery();
renderLinks();
$("#hoot").addEventListener("click", hoot);
$("#year").textContent = new Date().getFullYear();

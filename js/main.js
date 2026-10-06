/* =========================================================
   MOOD — site content & behaviour
   ---------------------------------------------------------
   ✏️  EDIT THE CONTENT BELOW. Everything marked TODO needs
       Mood's real details. No build step: save and refresh.
   ========================================================= */

const CONFIG = {
  // WhatsApp number for bookings, international format, digits only.
  // e.g. "254712345678". If left empty, WhatsApp asks the user to pick a contact.
  whatsapp: "", // TODO

  // Leave url empty to hide a link.
  socials: [
    { label: "Instagram", url: "" }, // TODO e.g. https://instagram.com/<handle>
    { label: "TikTok",    url: "" }, // TODO e.g. https://tiktok.com/@<handle>
    { label: "X",         url: "" }, // TODO
    { label: "YouTube",   url: "" }, // TODO
  ],

  // Photographer credit shown in the footer and on photos.
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
    { x: 41, y: 20, title: "The crown",          text: "A roof lined with beacon lamps and a full-width light bar on top. You see Mood long before you hear it." },
    { x: 55, y: 37, title: "No risk, no story",  text: "The windshield banner: MOOD in bold graffiti, melting smileys and the motto that sums it all up. Signed off with “School kills artists”." },
    { x: 58, y: 52, title: "TRY ME",             text: "The dashboard plate. A friendly dare to every other nganya on the road." },
    { x: 43, y: 73, title: "LED headlights",     text: "Sharp blue-white LED headlights with a light bar under the windscreen." },
    { x: 62, y: 67, title: "Custom grille",      text: "A slatted purple grille with red accent lights, all part of the custom body kit." },
    { x: 80, y: 63, title: "First Class",        text: "It says so right there. No further questions." },
    { x: 65, y: 85, title: "The plate",          text: "Personalised MOOD plates, front and back." },
    { x: 5,  y: 64, title: "Lady Liberty",       text: "A screaming teal Lady Liberty on the side panel. The art keeps going all the way down the body." },
    { x: 16, y: 88, title: "The rims",           text: "Black multi-spoke alloys to finish the look." },
  ],
  back: [
    { x: 37, y: 7,  title: "Roof rack",          text: "A purple roof rack lined with beacon lights, crowning the tailgate." },
    { x: 31, y: 30, title: "The faces",          text: "Airbrushed, wide-eyed portraits. Hyper-detailed and impossible to ignore at a traffic light." },
    { x: 75, y: 32, title: "The attitude",       text: "Tongue out, eyebrow up. Mood's art talks back." },
    { x: 61, y: 47, title: "Hazard zone",        text: "Warning signs, chain-link fence and the drippy smiley, Mood's signature, hidden in the mix." },
    { x: 36, y: 54, title: "Tail lights",        text: "Sculpted red LED tail lights wrap around the art like a frame." },
    { x: 22, y: 70, title: "ATMOSPHERE",         text: "The back has one word for what Mood brings: ATMOSPHERE." },
    { x: 52, y: 70, title: "The plate",          text: "MOOD on the back too, in case you missed the front." },
    { x: 50, y: 86, title: "Rear diffuser",      text: "A race-style purple diffuser. Pure nganya engineering." },
  ],
};

// Gallery: photos live in assets/gallery/. Tiles without src show a placeholder.
// size: "" | "wide" | "tall" | "wide tall"
const GALLERY = [
  { src: PHOTOS.front.src, alt: PHOTOS.front.alt, caption: "Front · TRY ME",     size: "tall", credit: true },
  { src: PHOTOS.back.src,  alt: PHOTOS.back.alt,  caption: "Back · ATMOSPHERE",  size: "tall", credit: true },
  { src: "", alt: "Mood at night",              caption: "Night mode",       size: "" },
  { src: "", alt: "Mood's side panel art",      caption: "The side",         size: "" },
  { src: "", alt: "Mood at the stage",          caption: "Stage takeover",   size: "wide" },
];

// Route: TODO replace with Mood's real route and stages.
const ROUTE = {
  name: "Route TBA",
  stops: [
    { name: "CBD",       note: "Start" },
    { name: "Stage 2",   note: "" },
    { name: "Stage 3",   note: "" },
    { name: "Stage 4",   note: "" },
    { name: "Terminus",  note: "End" },
  ],
};

// Crew: TODO real names, roles, optional photo in assets/crew/.
const CREW = [
  { name: "The Dere",    role: "Driver",            bio: "Smooth on the road, steady on the wheel.", photo: "" },
  { name: "The Makanga", role: "Conductor",         bio: "Runs the door, runs the hype.",            photo: "" },
  { name: "The Artist",  role: "Graffiti & Design", bio: "The hand behind every panel.",             photo: "" },
  { name: "The DJ",      role: "Sound & Playlist",  bio: "Keeps the speakers fed.",                   photo: "" },
];

/* =========================================================
   Behaviour (no need to edit below this line)
   ========================================================= */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch { /* private mode etc. */ } },
};

const escapeHTML = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Mood switcher ---------- */
const MOOD_COLORS = { mood: "#7b2cff", hype: "#ff2bd6", bendera: "#e3262f", sunset: "#ff7a18" };

function setMood(mood) {
  if (!MOOD_COLORS[mood]) mood = "mood";
  document.documentElement.dataset.mood = mood;
  $$("[data-set-mood]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.setMood === mood)));
  $('meta[name="theme-color"]')?.setAttribute("content", MOOD_COLORS[mood]);
  storage.set("mood", mood);
}

function initMoodSwitch() {
  const buttons = $$("[data-set-mood]");
  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => setMood(btn.dataset.setMood));
    btn.addEventListener("keydown", (e) => {
      const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      const next = buttons[(i + dir + buttons.length) % buttons.length];
      next.focus();
      setMood(next.dataset.setMood);
    });
  });
  setMood(storage.get("mood") || "mood");
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const toggle = $(".menu-toggle");
  const nav = $("#nav");
  const close = () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
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
    // Two detuned tones give the classic "dual horn" sound
    [415, 523].forEach((f) => {
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
  void art.offsetWidth; // restart animation
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
    const photo = PHOTOS[v];
    img.src = photo.src;
    img.width = photo.w;
    img.height = photo.h;
    img.alt = photo.alt;
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

  [spots, list].forEach((root) =>
    root.addEventListener("click", (e) => {
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

/* ---------- Render content ---------- */
function creditHTML() {
  const { name, url } = CONFIG.photoCredit;
  return url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener">${escapeHTML(name)}</a>` : escapeHTML(name);
}

function renderGallery() {
  $("#gallery-grid").innerHTML = GALLERY.map((item, i) => {
    const media = item.src
      ? `<button type="button" class="tile-open" data-src="${escapeHTML(item.src)}" data-caption="${escapeHTML(item.caption)}" aria-label="View larger: ${escapeHTML(item.alt)}">
           <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}" loading="lazy" decoding="async" />
         </button>`
      : `<div class="placeholder" style="background:${placeholderBg(i)}">
           <svg class="ph-smiley" aria-hidden="true"><use href="#smiley" /></svg>
           <span>Your shot here</span>
         </div>`;
    return `<figure class="tile reveal ${escapeHTML(item.size)}">${media}
              <figcaption>${escapeHTML(item.caption)}${item.credit ? ` · 📸 ${escapeHTML(CONFIG.photoCredit.name)}` : ""}</figcaption></figure>`;
  }).join("");
}

function placeholderBg(i) {
  const angles = [135, 45, 200, 300, 90];
  const a = angles[i % angles.length];
  return `linear-gradient(${a}deg,
            color-mix(in srgb, var(--a1) 55%, #000),
            color-mix(in srgb, var(--a1) 25%, #000) 60%,
            color-mix(in srgb, var(--a2) 30%, #000))`;
}

function initLightbox() {
  const dlg = $("#lightbox");
  if (!dlg.showModal) return; // very old browsers: images just stay in the grid
  $("#gallery-grid").addEventListener("click", (e) => {
    const b = e.target.closest(".tile-open");
    if (!b) return;
    $("#lightbox-img").src = b.dataset.src;
    $("#lightbox-img").alt = $("img", b).alt;
    $("#lightbox-caption").textContent = b.dataset.caption;
    dlg.showModal();
  });
  // Click on the backdrop closes
  dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
}

function renderRoute() {
  $("#route-lede").textContent =
    ROUTE.name === "Route TBA" ? "Route details dropping soon. Follow our socials for live updates." : `Catch the Mood on ${ROUTE.name}.`;
  $("#route-line").innerHTML =
    `<span class="bus-dot" aria-hidden="true">🚌</span>` +
    ROUTE.stops.map((s) => `<li>${escapeHTML(s.name)}${s.note ? `<small>${escapeHTML(s.note)}</small>` : ""}</li>`).join("");
}

function renderCrew() {
  $("#crew-grid").innerHTML = CREW.map((m) => {
    const initial = escapeHTML(m.name.replace(/^The\s+/i, "").charAt(0));
    const avatar = m.photo ? `<img src="${escapeHTML(m.photo)}" alt="" loading="lazy" />` : initial;
    return `<article class="member reveal">
              <div class="avatar" aria-hidden="true">${avatar}</div>
              <h3>${escapeHTML(m.name)}</h3>
              <p class="role">${escapeHTML(m.role)}</p>
              <p>${escapeHTML(m.bio)}</p>
            </article>`;
  }).join("");
}

function renderSocials() {
  const links = CONFIG.socials.filter((s) => s.url);
  $("#socials").innerHTML = links.length
    ? links.map((s) => `<li><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener">${escapeHTML(s.label)}</a></li>`).join("")
    : `<li class="muted small">Socials coming soon</li>`;
  $("#photo-credit").innerHTML = creditHTML();
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

/* ---------- Hire form -> WhatsApp ---------- */
function initHireForm() {
  const form = $("#hire-form");
  const note = $("#form-note");
  $("#f-date").min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstInvalid = null;
    $$("[required]", form).forEach((el) => {
      const ok = el.value.trim() !== "" && el.checkValidity();
      el.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      note.textContent = "Please fill in the highlighted fields.";
      note.classList.add("error");
      firstInvalid.focus();
      return;
    }
    note.classList.remove("error");

    const d = Object.fromEntries(new FormData(form));
    const prettyDate = new Date(d.date + "T00:00").toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    const lines = [
      "Niaje Mood crew! 🚌💜 I'd like to hire the Mood.",
      "",
      `Name: ${d.name}`,
      `Date: ${prettyDate}`,
      `Event: ${d.type}`,
      `Pickup: ${d.where}`,
    ];
    if (d.msg.trim()) lines.push(`Details: ${d.msg.trim()}`);

    const num = CONFIG.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    note.textContent = "Opening WhatsApp… If nothing happened, check your pop-up blocker.";
  });

  form.addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) {
      e.target.setAttribute("aria-invalid", "false");
    }
  });
}

/* ---------- Boot ---------- */
initMoodSwitch();
initMenu();
initExplorer();
renderGallery();
initLightbox();
renderRoute();
renderCrew();
renderSocials();
initReveal();
initHireForm();
$("#hoot").addEventListener("click", hoot);
$("#year").textContent = new Date().getFullYear();

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
};

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

// Gallery: drop photos in assets/gallery/ and set `src`.
// size: "" | "wide" | "tall". Tiles without src show a styled placeholder.
const GALLERY = [
  { src: "", alt: "Mood exterior, full side view",  caption: "The full side",     size: "wide tall" },
  { src: "", alt: "Close-up of graffiti artwork",   caption: "Panel art",         size: "" },
  { src: "", alt: "Interior lights at night",       caption: "Night mode",        size: "tall" },
  { src: "", alt: "Custom rims",                    caption: "Rims",              size: "" },
  { src: "", alt: "Mood at the stage with a crowd", caption: "Stage takeover",    size: "wide" },
  { src: "", alt: "Neon underglow at night",        caption: "Underglow",         size: "" },
  { src: "", alt: "Fans posing with Mood",          caption: "The fans",          size: "" },
];

// Crew: TODO real names, roles, optional photo in assets/crew/.
const CREW = [
  { name: "The Dere",    role: "Driver",          bio: "Smooth on the road, steady on the wheel.", photo: "" },
  { name: "The Makanga", role: "Conductor",       bio: "Runs the door, runs the hype.",            photo: "" },
  { name: "The Artist",  role: "Graffiti & Design", bio: "The hand behind every panel.",           photo: "" },
  { name: "The DJ",      role: "Sound & Playlist", bio: "Keeps the speakers fed.",                  photo: "" },
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
const MOOD_COLORS = { hype: "#ff2bd6", chill: "#7c5cff", bendera: "#e3262f", sunset: "#ff7a18" };

function setMood(mood) {
  if (!MOOD_COLORS[mood]) return;
  document.documentElement.dataset.mood = mood;
  $$("[data-set-mood]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.setMood === mood)));
  $('meta[name="theme-color"]')?.setAttribute("content", MOOD_COLORS[mood]);
  storage.set("mood", mood);
}

function initMoodSwitch() {
  const buttons = $$("[data-set-mood]");
  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => setMood(btn.dataset.setMood));
    // Arrow-key navigation, as expected for a radiogroup
    btn.addEventListener("keydown", (e) => {
      const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      const next = buttons[(i + dir + buttons.length) % buttons.length];
      next.focus();
      setMood(next.dataset.setMood);
    });
  });
  setMood(storage.get("mood") || "hype");
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

/* ---------- Render content ---------- */
function renderGallery() {
  const grid = $("#gallery-grid");
  grid.innerHTML = GALLERY.map((item, i) => {
    const media = item.src
      ? `<img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}" loading="lazy" decoding="async" />`
      : `<div class="placeholder" role="img" aria-label="${escapeHTML(item.alt)} (photo coming soon)"
              style="background:${placeholderBg(i)}">📸<br/>Photo coming soon</div>`;
    return `<figure class="tile reveal ${escapeHTML(item.size)}">${media}
              <figcaption>${escapeHTML(item.caption)}</figcaption></figure>`;
  }).join("");
}

function placeholderBg(i) {
  const angles = [135, 45, 200, 300, 90];
  const a = angles[i % angles.length];
  return `linear-gradient(${a}deg,
            color-mix(in srgb, var(--a1) 55%, #000),
            color-mix(in srgb, var(--a2) 45%, #000) 60%,
            color-mix(in srgb, var(--a3) 35%, #000))`;
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
}

/* ---------- Scroll reveal & counters ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    $$(".count").forEach((c) => (c.textContent = c.dataset.to));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      $$(".count", entry.target).forEach(countUp);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

function countUp(el) {
  const to = Number(el.dataset.to) || 0;
  const start = performance.now();
  const dur = 1200;
  const tick = (t) => {
    const p = Math.min((t - start) / dur, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Hire form -> WhatsApp ---------- */
function initHireForm() {
  const form = $("#hire-form");
  const note = $("#form-note");
  const dateInput = $("#f-date");
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = $$("[required]", form);
    let firstInvalid = null;
    required.forEach((el) => {
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
    const text = [
      "Niaje Mood crew! 🚌🔥 I'd like to hire the Mood.",
      "",
      `Name: ${d.name}`,
      `Date: ${prettyDate}`,
      `Event: ${d.type}`,
      `Pickup: ${d.where}`,
      d.msg ? `Details: ${d.msg}` : "",
    ].filter((line, i, arr) => line !== "" || arr[i + 1] !== "").join("\n").trim();

    const num = CONFIG.whatsapp.replace(/\D/g, "");
    const url = `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
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
renderGallery();
renderRoute();
renderCrew();
renderSocials();
initReveal();
initHireForm();
$("#hoot").addEventListener("click", hoot);
$("#year").textContent = new Date().getFullYear();

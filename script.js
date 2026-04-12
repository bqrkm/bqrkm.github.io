/* ══════════════════════════════════
   MOBİL VIEWPORT FİX
══════════════════════════════════ */
function fixMobileVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
fixMobileVH();
window.addEventListener("resize", fixMobileVH);

/* ══════════════════════════════════
   DEĞİŞKENLER
══════════════════════════════════ */
const TOTAL_IMAGES  = 140;
const GROUP_SIZE    = 10;
const TOTAL_SCENES  = Math.ceil(TOTAL_IMAGES / GROUP_SIZE);
let slideTimers     = [];
let currentVisible  = -1;

/* ══════════════════════════════════
   BAŞLA BUTONU
══════════════════════════════════ */
function startSite() {
  const intro   = document.getElementById("intro");
  const content = document.getElementById("content");

  /* intro'yu fade out ile kapat */
  intro.style.transition = "opacity 0.8s ease";
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    content.style.display = "block";
    /* content fade in */
    content.style.opacity = "0";
    content.style.transition = "opacity 0.6s ease";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { content.style.opacity = "1"; });
    });
  }, 800);

  /* müzik */
  const music = document.getElementById("music");
  if (music) {
    music.volume = 0;
    music.play().catch(() => {});
    /* yumuşak fade-in ses */
    let vol = 0;
    const fadeAudio = setInterval(() => {
      vol = Math.min(vol + 0.05, 1);
      music.volume = vol;
      if (vol >= 1) clearInterval(fadeAudio);
    }, 100);
  }

  createScenes();
  hearts();
  window.addEventListener("scroll", checkVisibleScenes, { passive: true });
  setTimeout(checkVisibleScenes, 100);
}

/* ══════════════════════════════════
   SAHNELERİ OLUŞTUR
══════════════════════════════════ */
function createScenes() {
  const container = document.getElementById("scene-container");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < TOTAL_SCENES; i++) {
    const start = i * GROUP_SIZE + 1;

    const div = document.createElement("div");
    div.className = "scene";

    /* sahne numarası rozeti */
    const numBadge = document.createElement("span");
    numBadge.className = "scene-num";
    numBadge.textContent = `${String(i + 1).padStart(2, "0")} / ${String(TOTAL_SCENES).padStart(2, "0")}`;

    const img = document.createElement("img");
    img.src = `foto${start}.jpeg`;
    img.id  = `img${i}`;
    img.alt = "";
    img.loading = "lazy";

    const caption = document.createElement("p");
    caption.textContent = getCaptions(i);

    div.appendChild(numBadge);
    div.appendChild(img);
    div.appendChild(caption);
    container.appendChild(div);
  }
}

/* ── Yazılar — istersen buradan değiştir ── */
function getCaptions(i) {
  const captions = [
    "Seninle her an özel… 💫",
    "Bu gülüşünü hiç unutamam 🌸",
    "En güzel anım, seninle olan 🤍",
    "Seni görmek her şeyi güzelleştiriyor ✨",
    "Seninle geçen her saniye değerli 💕",
    "Bu bakışlar… kalbimi çalıyor 🥀",
    "Seninle olmak ev gibi hissettiriyor 🏡",
    "Her fotoğrafta daha çok seviyorum seni 💞",
    "Anılarımızın en güzelleri bunlar 🌙",
    "Seni sevmek en güzel şeyim 💗",
    "Seninle geçen güzel anlardan biri 💫",
    "Her gülüşün bir hediye 🎁",
    "Kalbimde bir yerin var, hep 🌹",
    "Seni seviyorum — dünden fazla 💝",
  ];
  return captions[i % captions.length];
}

/* ══════════════════════════════════
   SCROLL GÖRÜNÜRLÜK
══════════════════════════════════ */
function checkVisibleScenes() {
  const scenes = document.querySelectorAll(".scene");
  scenes.forEach((scene, i) => {
    const rect    = scene.getBoundingClientRect();
    const visible =
      rect.top    < window.innerHeight * 0.65 &&
      rect.bottom > window.innerHeight * 0.35;

    scene.classList.toggle("active", visible);
    if (visible && currentVisible !== i) activateScene(i);
  });
}

/* ══════════════════════════════════
   SAHNE SLAYTı
══════════════════════════════════ */
function activateScene(index) {
  clearAllTimers();
  currentVisible = index;

  const img = document.getElementById(`img${index}`);
  if (!img) return;

  const start = index * GROUP_SIZE + 1;
  const end   = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);
  let cur     = start;

  const fadeNext = () => {
    const nextSrc = `foto${cur}.jpeg`;
    const nextImg = new Image();
    nextImg.src = nextSrc;
    nextImg.onload = () => {
      img.style.transition = "opacity 0.8s ease";
      img.style.opacity    = "0";
      setTimeout(() => {
        img.src          = nextSrc;
        img.style.opacity = "1";
      }, 400);
    };
    cur++;
    if (cur > end) cur = start;
  };

  fadeNext();
  slideTimers[index] = setInterval(fadeNext, 2200); /* biraz daha yavaş */
}

/* ══════════════════════════════════
   ZAMANLAYICI
══════════════════════════════════ */
function clearAllTimers() {
  slideTimers.forEach(t => clearInterval(t));
  slideTimers = [];
}

/* ══════════════════════════════════
   KALPLER ❤️
══════════════════════════════════ */
function hearts() {
  const emojis = ["❤️", "🤍", "💕", "🌸", "✨", "💗", "🌹", "💞"];

  setInterval(() => {
    const heart       = document.createElement("div");
    heart.className   = "heart";
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const randomX = Math.random() * 96;
    heart.style.setProperty("--x", randomX + "vw");
    heart.style.left = randomX + "vw";

    const size = Math.random() * 18 + 14;
    heart.style.fontSize = size + "px";

    /* her kalp biraz farklı hızda uçsun */
    const duration = (Math.random() * 2 + 4).toFixed(1);
    heart.style.animationDuration = duration + "s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), parseFloat(duration) * 1000 + 200);
  }, 350);
}

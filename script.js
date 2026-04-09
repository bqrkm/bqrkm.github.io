/* ==== viewport için mobil fix ==== */
function fixMobileVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
fixMobileVH();
window.addEventListener("resize", fixMobileVH);

/* ==== değişkenler ==== */
const TOTAL_IMAGES = 140;
const GROUP_SIZE = 10;
const TOTAL_SCENES = Math.ceil(TOTAL_IMAGES / GROUP_SIZE);

let slideTimers = [];
let currentVisible = -1;

/* ==== BAŞLA ==== */
function startSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("content").style.display = "block";

  const music = document.getElementById("music");
  music.volume = 1.0;
  music.play().catch(() => {});

  createScenes();
  hearts();            // ❤️ kalpler fonksiyonu artık aktif
  window.addEventListener("scroll", checkVisibleScenes);
  checkVisibleScenes();
}

/* ==== sahneleri oluştur ==== */
function createScenes() {
  const container = document.getElementById("scene-container");
  if (!container) return;

  container.innerHTML = "";
  for (let i = 0; i < TOTAL_SCENES; i++) {
    const start = i * GROUP_SIZE + 1;
    const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);

    const div = document.createElement("div");
    div.className = "scene";
    div.innerHTML = `
      <img src="foto${start}.jpeg" id="img${i}" alt="">
      <p>Seninle geçen güzel anlardan biri 💫 (${i + 1})</p>
    `;
    container.appendChild(div);
  }
}

/* ==== scroll görünürlük === */
function checkVisibleScenes() {
  const scenes = document.querySelectorAll(".scene");
  scenes.forEach((scene, i) => {
    const rect = scene.getBoundingClientRect();
    const visible =
      rect.top < window.innerHeight * 0.6 &&
      rect.bottom > window.innerHeight * 0.3;

    scene.classList.toggle("active", visible);
    if (visible && currentVisible !== i) activateScene(i);
  });
}

/* ==== sahne slayt ve fade === */
function activateScene(index) {
  clearAllTimers();
  currentVisible = index;

  const img = document.getElementById(`img${index}`);
  if (!img) return;

  const start = index * GROUP_SIZE + 1;
  const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);
  let cur = start;

  const fadeNext = () => {
    const nextSrc = `foto${cur}.jpeg`;
    const nextImg = new Image();
    nextImg.src = nextSrc;
    nextImg.onload = () => {
      img.style.transition = "opacity 1s ease";
      img.style.opacity = 0.7;
      setTimeout(() => {
        img.src = nextSrc;
        img.style.opacity = 1;
      }, 500);
    };
    cur++;
    if (cur > end) cur = start;
  };

  fadeNext();
  slideTimers[index] = setInterval(fadeNext, 4000);
}

/* ==== zamanlayıcı kontrol ==== */
function clearAllTimers() {
  slideTimers.forEach((t) => clearInterval(t));
  slideTimers = [];
}

/* ==== kalpler ==== */
function hearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.top = "100vh"; // 👈 alta başlat
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

// === Scroll ile slayt tetikleme ===

// toplam fotoğraf sayısı
const TOTAL_IMAGES = 140;
const GROUP_SIZE = 10; // her slaytta 10 fotoğraf
const scenes = [];
const totalGroups = Math.ceil(TOTAL_IMAGES / GROUP_SIZE);

// sahneleri oluştur
for (let i = 0; i < totalGroups; i++) {
  const start = i * GROUP_SIZE + 1;
  const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);
  scenes.push({
    start,
    end,
    text: `Seninle geçen o güzel anlardan biri 💫 (${i + 1})`
  });
}

let currentScene = -1;
let slideTimer;

// başlat
function startSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("content").style.display = "block";

  const music = document.getElementById("music");
  setTimeout(() => {
    music.volume = 1.0;
    music.play().catch(() => {});
  }, 200);

  hearts();
  updateScene(0); // ilk sahneyi başlat
}

// SAHNEYİ GÜNCELLE (her bölgeye girince bir defa çalışır)
function updateScene(index) {
  if (index === currentScene) return;
  currentScene = index;

  const scene = scenes[index];
  const photo = document.getElementById("photo");
  const text = document.getElementById("text");

  text.innerText = scene.text;
  clearInterval(slideTimer);

  let slide = scene.start;
  photo.src = `foto${slide}.jpeg`;

  // o sahnedeki 10 fotoğrafı sırayla göster
  slideTimer = setInterval(() => {
    slide++;
    if (slide > scene.end) {
      slide = scene.start; // döngü yap (istersen kapatabilirim)
    }
    photo.src = `foto${slide}.jpeg`;
  }, 700); // geçiş süresi (ms)
}

// SCROLL alımını “kademeli sahneye” dönüştür
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const sectionHeight = maxScroll / scenes.length;
  let index = Math.floor(scrollTop / sectionHeight);

  if (index < 0) index = 0;
  if (index >= scenes.length) index = scenes.length - 1;

  updateScene(index);
});

// KALPLER
function hearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

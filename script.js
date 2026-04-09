// toplam fotoğraf sayısı
const TOTAL_IMAGES = 140;
const GROUP_SIZE = 10; // her sahnede 10 fotoğraf

const totalGroups = Math.ceil(TOTAL_IMAGES / GROUP_SIZE);

// sahne dizisi: her 10 foto + 1 söz
const scenes = [];

for (let i = 0; i < totalGroups; i++) {
  const start = i * GROUP_SIZE + 1;
  const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);
  scenes.push({
    start,
    end,
    text: `Bu an, seninle geçen güzel anlardan biri (#${i + 1})`
  });
}

let currentScene = 0;
let slideInterval;
let slideIndex = 0;

// BAŞLAT
function startSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("content").style.display = "block";

  const music = document.getElementById("music");
  setTimeout(() => {
    music.volume = 1.0;
    music.play().catch(() => {});
  }, 200);

  updateScene();
  hearts();
}

// SAHNE GÜNCELLE
function updateScene() {
  const scene = scenes[currentScene];
  const photo = document.getElementById("photo");
  const text = document.getElementById("text");
  text.innerText = scene.text;

  clearInterval(slideInterval);
  slideIndex = scene.start;

  // O 10'luk grup arasındaki fotoğrafları döndür
  slideInterval = setInterval(() => {
    if (slideIndex > scene.end) slideIndex = scene.start; // yeniden başla
    photo.src = `foto${slideIndex}.jpeg`;
    slideIndex++;
  }, 600); // geçiş süresi (0.6 sn)
}

// SCROLL
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  let index = Math.floor((scrollTop / maxScroll) * scenes.length);
  if (index >= scenes.length) index = scenes.length - 1;
  if (index !== currentScene) {
    currentScene = index;
    updateScene();
  }
});

// KALPLER (değişmedi)
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

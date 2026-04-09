const TOTAL_IMAGES = 140;
const GROUP_SIZE = 10;
const scenes = [];
const totalGroups = Math.ceil(TOTAL_IMAGES / GROUP_SIZE);

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

function startSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("content").style.display = "block";

  const music = document.getElementById("music");
  setTimeout(() => {
    music.volume = 1.0;
    music.play().catch(() => {});
  }, 200);

  createScenes();
  hearts();
}

// Her grup için sayfa içinde sahne oluştur
function createScenes() {
  const container = document.getElementById("scenesContainer");
  container.innerHTML = "";

  scenes.forEach((scene, i) => {
    const div = document.createElement("div");
    div.className = "scene";
    div.innerHTML = `
      <img class="fadeMove" id="photo${i}" src="foto${scene.start}.jpeg" alt="">
      <div class="text fadeMove" id="text${i}">${scene.text}</div>
    `;
    container.appendChild(div);
  });

  // scroll animasyonu izleme
  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

// slayt + görünürlük kontrolü
function handleScroll() {
  const scenesEl = document.querySelectorAll(".scene");
  scenesEl.forEach((sceneEl, i) => {
    const rect = sceneEl.getBoundingClientRect();

    // ekranın ortasına geldiğinde aktif
    if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
      if (i !== currentScene) {
        startSlide(i);
      }
      sceneEl.querySelectorAll(".fadeMove").forEach(el => el.classList.add("show"));
    } else {
      sceneEl.querySelectorAll(".fadeMove").forEach(el => el.classList.remove("show"));
    }
  });
}

// active sahnenin 10 fotoğrafını sırayla oynat
function startSlide(index) {
  clearInterval(slideTimer);
  currentScene = index;

  const scene = scenes[index];
  let slide = scene.start;
  const photoEl = document.getElementById(`photo${index}`);

  slideTimer = setInterval(() => {
    photoEl.src = `foto${slide}.jpeg`;
    slide++;
    if (slide > scene.end) slide = scene.start;
  }, 700);
}

// kalpler
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

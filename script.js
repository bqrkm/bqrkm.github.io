const TOTAL_IMAGES = 140;
const GROUP_SIZE = 10; // her sahnede 10 foto
const TOTAL_SCENES = Math.ceil(TOTAL_IMAGES / GROUP_SIZE);
let slideTimers = [];
let currentVisible = -1;

function startSite() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('content').style.display = 'block';

  const music = document.getElementById('music');
  music.volume = 1.0;
  music.play().catch(() => {});

  hearts();
  createScenes();
  window.addEventListener('scroll', checkVisibleScenes);
  checkVisibleScenes();
}

// Her 10'luk grup için bir sahne oluştur
function createScenes() {
  const container = document.getElementById('scene-container');
  container.innerHTML = '';

  for (let i = 0; i < TOTAL_SCENES; i++) {
    const start = i * GROUP_SIZE + 1;
    const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);

    const div = document.createElement('div');
    div.className = 'scene';
    div.innerHTML = `
      <img src="foto${start}.jpeg" id="img${i}" alt="">
      <p>Seninle geçen güzel anlardan biri 💫 (${i + 1})</p>
    `;
    container.appendChild(div);
  }
}

// Scroll görünürlük kontrolü
function checkVisibleScenes() {
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach((scene, i) => {
    const rect = scene.getBoundingClientRect();
    const visibleArea = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3;

    if (visibleArea && currentVisible !== i) {
      activateScene(i);
    }
    scene.classList.toggle('active', visibleArea);
  });
}

// Aktif sahnede slayt oynat
function activateScene(index) {
  clearTimers();
  currentVisible = index;

  const scene = document.getElementById(`img${index}`);
  const start = index * GROUP_SIZE + 1;
  const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);

  let cur = start;
  slideTimers[index] = setInterval(() => {
    scene.style.opacity = 0;
    setTimeout(() => {
      scene.src = `foto${cur}.jpeg`;
      scene.style.opacity = 1;
    }, 400);
    cur++;
    if (cur > end) cur = start;
  }, 900); // hız
}

function clearTimers() {
  slideTimers.forEach(t => clearInterval(t));
  slideTimers = [];
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

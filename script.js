const TOTAL_IMAGES = 140;
const GROUP_SIZE = 10;
const TOTAL_SCENES = Math.ceil(TOTAL_IMAGES / GROUP_SIZE);
let slideTimers = [];
let currentVisible = -1;

// ==== MOBİLDE DOĞRU YÜKSEKLİK İÇİN ==== 
function fixMobileVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
fixMobileVH();
window.addEventListener('resize', fixMobileVH);


function startSite() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('content').style.display = 'block';

  const music = document.getElementById('music');
  music.volume = 1.0;
  music.play().catch(()=>{});

  hearts();
  createScenes();
  window.addEventListener('scroll', checkVisibleScenes);
  checkVisibleScenes();
}

function createScenes() {
  const container = document.getElementById('scene-container');
  container.innerHTML = '';

  for (let i = 0; i < TOTAL_SCENES; i++) {
    const start = i * GROUP_SIZE + 1;
    const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);
    container.innerHTML += `
      <div class="scene">
        <img src="foto${start}.jpeg" id="img${i}" alt="">
        <p>Seninle geçen güzel anlardan biri 💫 (${i + 1})</p>
      </div>`;
  }
}

function checkVisibleScenes() {
  document.querySelectorAll('.scene').forEach((scene, i) => {
    const rect = scene.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3;
    scene.classList.toggle('active', inView);
    if (inView && currentVisible !== i) activateScene(i);
  });
}

function activateScene(index) {
  slideTimers.forEach(t=>clearInterval(t));
  slideTimers = [];
  currentVisible = index;

  const img = document.getElementById(`img${index}`);
  const start = index * GROUP_SIZE + 1;
  const end = Math.min(start + GROUP_SIZE - 1, TOTAL_IMAGES);
  let cur = start;

  slideTimers[index] = setInterval(() => {
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = `foto${cur}.jpeg`;
      img.style.opacity = 1;
    }, 500);
    cur++;
    if (cur > end) cur = start;
  }, 1900);  // ⏳ her 4 saniyede 1 fotoğraf
}

function hearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(), 5000);
  }, 300);
}

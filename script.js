const scenes = [];

// 140 fotoğraf için döngü
for (let j = 1; j <= 140; j++) {
  scenes.push({
    img: `foto${j}.jpeg`,
    text: `Bu an, seninle geçen an ${j}`,
  });
}

let currentIndex = 0;

// BAŞLAT
function startSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("content").style.display = "block";

  const music = document.getElementById("music");

  // müzik oynatımı (tarayıcı korumalarıyla uyumlu)
  setTimeout(() => {
    music.volume = 1;
    music.play().then(() => {
      console.log("Müzik çalıyor 🎶");
    }).catch((err) => {
      console.warn("Müzik oynatılamadı:", err);
    });
  }, 200);

  updateScene();
  hearts();
}

// SAHNE GÜNCELLE
function updateScene() {
  const photo = document.getElementById("photo");
  const text = document.getElementById("text");

  photo.src = scenes[currentIndex].img;
  text.innerText = scenes[currentIndex].text;
}

// SCROLL
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  let index = Math.floor((scrollTop / maxScroll) * scenes.length);
  if (index >= scenes.length) index = scenes.length - 1;
  if (index !== currentIndex) {
    currentIndex = index;
    updateScene();
  }
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

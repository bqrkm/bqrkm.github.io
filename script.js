// FOTO + YAZI LİSTESİ
const scenes = [
  { img: "foto1.jpeg", text: "Her şey burada başladı..." },
  { img: "foto2.jpeg", text: "Seni ilk gördüğüm an..." },
  { img: "foto3.jpeg", text: "Kalbim biraz hızlı attı" },
  { img: "foto4.jpeg", text: "Sonra alıştım sana..." },
  { img: "foto5.jpeg", text: "Ama aslında bağımlı oldum ❤️" },
  { img: "foto6.jpeg", text: "Seninle her şey daha güzel" },
  { img: "foto7.jpeg", text: "İyi ki varsın..." }
];

let currentIndex = 0;
let isScrolling = false;

// BAŞLAT
function startSite(){
  document.getElementById("intro").style.display = "none";

  const music = document.getElementById("music");
  const ses = document.getElementById("ses");

  if(music) music.play().catch(()=>{});
  if(ses) ses.play().catch(()=>{});

  updateScene();
  hearts();
}

// SAHNE GÜNCELLE
function updateScene(){
  const photo = document.getElementById("photo");
  const text = document.getElementById("text");

  photo.src = scenes[currentIndex].img;
  text.innerHTML = scenes[currentIndex].text;
}

// SCROLL KONTROL
window.addEventListener("wheel", (e) => {
  if(isScrolling) return;

  isScrolling = true;

  if(e.deltaY > 0){
    currentIndex++;
  } else {
    currentIndex--;
  }

  // sınır kontrol
  if(currentIndex < 0) currentIndex = 0;
  if(currentIndex >= scenes.length) currentIndex = scenes.length - 1;

  updateScene();

  setTimeout(()=>{ isScrolling = false; }, 800);
});

// KALPLER
function hearts(){
  setInterval(()=>{
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (Math.random()*20 + 20) + "px";
    document.body.appendChild(heart);
    setTimeout(()=>{ heart.remove(); }, 5000);
  }, 300);
}

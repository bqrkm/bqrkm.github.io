const scenes = [
  { img: "foto1.jpeg", text: "Her şey burada başladı..." },
  { img: "foto2.jpeg", text: "Seni ilk gördüğüm an..." },
  { img: "foto3.jpeg", text: "Kalbim hızlandı..." },
  { img: "foto4.jpeg", text: "Senle her şey değişti" },
  { img: "foto5.jpeg", text: "İyi ki varsın ❤️" }
];

let currentIndex = 0;

// BAŞLAT
function startSite(){
  document.getElementById("intro").style.display = "none";
  document.getElementById("content").style.display = "block";

  document.getElementById("music").play().catch(()=>{});

  updateScene();
}

// SAHNE
function updateScene(){
  document.getElementById("photo").src = scenes[currentIndex].img;
  document.getElementById("text").innerText = scenes[currentIndex].text;
}

// SCROLL
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  let index = Math.floor((scrollTop / maxScroll) * scenes.length);

  if(index >= scenes.length) index = scenes.length - 1;

  if(index !== currentIndex){
    currentIndex = index;
    updateScene();
  }
});

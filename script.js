let text = "Seninle geçen her an, hayatımın en güzel parçası oldu...";
let i = 0;
let photoIndex = 1;

// Başlat butonu
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("content").style.display = "block";

  const konusma = document.getElementById("konusma");
konusma.play().catch(e=>console.log("Hala çalmıyor:", e));
  const muzik = document.getElementById("muzik");

  konusma.volume = 1.0;
  muzik.volume = 0.2;

  konusma.play().catch(()=>{});
  muzik.play().catch(()=>{});

  typeText();
  startSlideshow();
  hearts();
});

// Metni yazdır
function typeText(){
  if(i < text.length){
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

// Fotoğraf slaytı
function startSlideshow(){
  const fotos = [
    "foto1.jpeg","foto2.jpeg","foto3.jpeg","foto4.jpeg","foto5.jpeg",
    "foto6.jpeg","foto7.jpeg","foto8.jpeg","foto9.jpeg","foto10.jpeg",
    "foto11.jpeg","foto12.jpeg","foto13.jpeg","foto14.jpeg","foto15.jpeg","foto16.jpeg","foto17.jpeg","foto18.jpeg","foto19.jpeg","foto20.jpeg","foto21.jpeg","foto22.jpeg","foto23.jpeg","foto14.jpeg"
  ];
  setInterval(()=>{
    photoIndex++;
    if(photoIndex >= fotos.length) photoIndex = 0;
    document.getElementById("photo").src = fotos[photoIndex];
  }, 2000);
}

// Kalpler
function hearts(){
  setInterval(()=>{
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (Math.random()*20 + 20) + "px";
    document.body.appendChild(heart);
    setTimeout(()=>{ heart.remove(); }, 5000);
  }, 300);
}

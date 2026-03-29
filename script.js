// Metin yazma
let text = "Seninle geçen her an, hayatımın en güzel parçası oldu...";
let i = 0;

// Fotoğraf slaytı
let photoIndex = 1;

// Başlat butonuna basınca
function start(){
  // Başlat ekranını gizle, içeriği göster
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("content").style.display = "block";

  // Sesleri al
  const konusma = document.getElementById("konusma");
  const muzik = document.getElementById("muzik");

  // Ses seviyeleri
  konusma.volume = 1.0;  // konuşma yüksek
  muzik.volume = 0.2;    // arka plan hafif

  // Çalmayı dene
  konusma.play().catch(()=>{});
  muzik.play().catch(()=>{});

  // Metni yazdır
  typeText();

  // Fotoğraf slaytı
  startSlideshow();

  // Kalpler
  hearts();
}

// Metni yazma fonksiyonu
function typeText(){
  if(i < text.length){
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

// Fotoğraf slaytı fonksiyonu
function startSlideshow(){
  setInterval(()=>{
    photoIndex++;
    if(photoIndex > 68) photoIndex = 1;
    document.getElementById("photo").src = "foto" + photoIndex + ".jpeg";
  }, 2000);
}

// Kalp animasyonu
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

// TEXT
const text = "Seninle geçen her an, hayatımın en güzel parçası oldu...";
let i = 0;

// FOTO
let photoIndex = 0;
const fotos = [];
for(let j=1; j<=140; j++){
  fotos.push(`foto${j}.jpeg`);
}

// BAŞLAT
function startSite(){
  document.getElementById("intro").style.display = "none";

  const music = document.getElementById("music");
  const ses = document.getElementById("ses");

  if(music) music.play().catch(()=>{});
  if(ses) ses.play().catch(()=>{});

  typeText();
  startSlideshow();
  hearts();
}

// YAZI EFEKT
function typeText(){
  if(i < text.length){
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

// FOTO SLAYT
function startSlideshow(){
  setInterval(()=>{
    photoIndex++;
    if(photoIndex >= fotos.length) photoIndex = 0;
    document.getElementById("photo").src = fotos[photoIndex];
  }, 2000);
}

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

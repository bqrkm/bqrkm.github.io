let text = "Seninle geçen her an, hayatımın en güzel parçası oldu...";
let i = 0;
let photoIndex = 1;

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("content").style.display = "block";

  const konusma = document.getElementById("konusma");
  const muzik = document.getElementById("muzik");

  konusma.volume = 1.0;
  muzik.volume = 0.2;

  konusma.play().catch(()=>{});
  muzik.play().catch(()=>{});

  typeText();
  startSlideshow();
  hearts();
});

function typeText(){
  if(i < text.length){
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

function startSlideshow(){
  setInterval(()=>{
    photoIndex++;
    if(photoIndex > 68) photoIndex = 1;
    document.getElementById("photo").src = "foto" + photoIndex + ".jpeg";
  }, 2000);
}

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

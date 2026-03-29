// Ses dosyası
var loveSong = new Howl({
  src: ['assets/ses.mp3'],
  autoplay: false,
  loop: true,
  volume: 0.5
});

document.getElementById('playBtn').addEventListener('click', () => {
  loveSong.play();
});

// Fotoğraf animasyonu
gsap.from(".photo", {
  y: 50,
  opacity: 0,
  stagger: 0.3,
  duration: 1,
  ease: "power2.out"
});

<img id="photo" src="foto1.jpeg">

<script>
let photoIndex = 1;

setInterval(() => {
  photoIndex++;
  if(photoIndex > 68) photoIndex = 1;
  document.getElementById("photo").src = "foto" + photoIndex + ".jpeg";
}, 2000);
</script>

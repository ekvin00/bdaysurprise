// helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
  constructor() {
    this.resize()

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0

  }
  
  resize() {
    this.width = canvas.width = window.innerWidth
    let center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0
    
    this.height = canvas.height = window.innerHeight
    this.spawnC = this.height * .1
    this.spawnD = this.height * .5
    
  }
  
  onClick(evt) {
     let x = evt.clientX || evt.touches && evt.touches[0].pageX
     let y = evt.clientY || evt.touches && evt.touches[0].pageY
     
     let count = random(3,5)
     for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)))
          
     this.counter = -1
     
  }
  
  update(delta) {
    ctx.globalCompositeOperation = 'hard-light'
    ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    // if enough time passed... create new new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110)))
      this.counter = 0
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
  }
  update(delta) {
    if (this.dead) return

    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()

    } else {
      if (this.offsprings && !this.madeChilds) {
        
        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

        }

      }
      this.madeChilds = true
      this.history.shift()
    }
    
    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) { 
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i]
          ctx.beginPath()
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
          ctx.arc(point.x, point.y, 1, 0, PI2, false)
          ctx.fill()
        } 
      } else {
      ctx.beginPath()
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }

  }
}

let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

let then = timestamp()

let birthday = new Birthday
window.onresize = () => birthday.resize()
document.onclick = evt => birthday.onClick(evt)
document.ontouchstart = evt => birthday.onClick(evt)

  ;(function loop(){
  	requestAnimationFrame(loop)

  	let now = timestamp()
  	let delta = now - then

    then = now
    birthday.update(delta / 1000)
  	

  })()


// Pop Up Modal

function openModal() {
  document.getElementById("customModal").style.display = "block";
};

function closeModal() {
  document.getElementById("customModal").style.display = "none";
};




const characters = {
  makima: {
    name: "MAKIMA",
    tagline: "She is the leader of the Public Safety Devil Hunter organization, or is she?",
    description:
      "She is the leader of the PSDH organization who takes Denji under her wing, giving him a happy life. Initially acting as a helpful ally, she is later revealed to be a powerful...",
    link: "https://instagram.com/makima_official",
    signature: "Makima",
    image: "images/makima.png"
  },
  power: {
    name: "POWER",
    tagline: "The Blood Fiend, chaotic and proud.",
    description:
      "Power is a Public Safety Devil Hunter who is actually the Blood Fiend. She is wild, impulsive, and obsessed with blood, but unexpectedly loyal to her friends.",
    link: "https://instagram.com/power_official",
    signature: "Power",
    image: "images/power.png"
  }
};

const charSelect = document.getElementById("characterSelect");
const charName = document.getElementById("charName");
const charTagline = document.getElementById("charTagline");
const charDescription = document.getElementById("charDescription");
const charLink = document.getElementById("charLink");
const charSignature = document.getElementById("charSignature");
const charImage = document.getElementById("charImage");

charSelect.addEventListener("change", (e) => {
  const val = e.target.value;
  const char = characters[val];

  charName.textContent = char.name;
  charTagline.textContent = char.tagline;
  charDescription.textContent = char.description;
  charLink.href = char.link;
  charLink.textContent = char.link;
  charSignature.textContent = char.signature;
  charImage.src = char.image;
});

// Dark Mode
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Music Toggle
const bgMusic = document.getElementById("bgMusic");
const audioToggle = document.getElementById("audioToggle");
document.getElementById("bgMusic").volume = 0.05; // Set initial volume
bgMusic.loop = true; // Loop the background music
audioToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    audioToggle.textContent = "🔈";
  } else {
    bgMusic.pause();
    audioToggle.textContent = "🔇";
  }
});


// Confetti
function openModal(id = 'customModal') {
  document.getElementById(id).style.display = "block";
  launchConfetti();
  launchSparkles();
}

function closeModal(id = 'customModal') {
  document.getElementById(id).style.display = "none";
}

function launchConfetti() {
  const container = document.querySelector(`#${"customModal"} .confetti-container`);
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
    confetti.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    container.appendChild(confetti);

    // Clean up after animation
    setTimeout(() => confetti.remove(), 3000);
  }
}

function launchSparkles() {
  const container = document.querySelector(`#${"customModal"} .sparkles-container`);
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.textContent = "✨";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.bottom = Math.random() * 20 + "%";
    sparkle.style.animationDelay = Math.random() + "s";
    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 3000);
  }
}

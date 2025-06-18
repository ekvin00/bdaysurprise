



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

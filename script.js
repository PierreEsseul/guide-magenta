// --------- PROTECTION PAR CODE D'ACCÈS ---------
const API_URL = "/api/code"; // appelle ton API Vercel

let codesLoaded = false;
let validCodes = new Set();

async function loadCodes() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();

    json.codes.forEach(c => validCodes.add(c));

    console.log("Codes chargés :", validCodes);
  } catch (err) {
    console.error("Erreur:", err);
  }
}
async function checkCode(event) {
  event.preventDefault();
  const input = document.getElementById("login-code");
  const error = document.getElementById("login-error");
  const value = input.value.trim();

  if (!codesLoaded) {
    error.textContent =
      "Les codes sont en cours de chargement, merci de réessayer dans quelques secondes.";
    return;
  }

  if (validCodes.has(value)) {
    // Succès : on affiche la page, on cache l'écran de login
    document.getElementById("login").style.display = "none";
    document.getElementById("protected").style.display = "block";
    error.textContent = "";
  } else {
    error.textContent =
      "Code incorrect. Merci de vérifier votre numéro de confirmation.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCodes();
});
// --------- FIN PROTECTION ---------

// Smooth scroll “propre” sur les liens du menu
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
  
        if (target) {
          event.preventDefault();
          const offset = 80; // marge visuelle depuis le haut
          const rect = target.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - offset;
  
          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        }
      });
    });
  });
  
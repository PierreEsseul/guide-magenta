// --------- PROTECTION PAR CODE D'ACCÈS ---------
const API_URL = "/api/code";

let validCodes = new Set();
let codesLoaded = false;

async function loadCodes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    (data.codes || []).forEach((c) => {
      if (c) validCodes.add(String(c).trim());
    });

    codesLoaded = true; //IMPORTANT : on passe à true une fois chargé
    console.log("Codes chargés :", validCodes);
    const error = document.getElementById("login-error");
    if (error && error.textContent.startsWith("Les codes sont en cours")) {
      error.textContent = ""; // on efface le message d’attente si besoin
    }
  } catch (err) {
    console.error("Erreur lors du chargement des codes :", err);
    const error = document.getElementById("login-error");
    if (error) {
      error.textContent =
        "Impossible de charger les codes. Merci de réessayer un peu plus tard.";
    }
  }
}

function checkCode(event) {
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
  
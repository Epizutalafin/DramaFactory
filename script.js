// ======================================================
// LANGUE COURANTE
// ======================================================
let currentLang = "fr";

// Sélecteur FR/EN
document.getElementById("lang-picker").addEventListener("change", (e) => {
  currentLang = e.target.value;
  updateTabLabels();
});

// ======================================================
// GESTION DES DONNÉES (JSON chargés dynamiquement)
// ======================================================

// Cache mémoire : on ne recharge pas les mêmes fichiers plusieurs fois
const eventData = {};

// Fonction qui charge un fichier JSON d'une catégorie
async function loadCategory(category) {
  if (eventData[category]) return eventData[category]; // déjà chargé

  const response = await fetch(`data/${category}.json`);
  const json = await response.json();
  eventData[category] = json;
  return json;
}

// ======================================================
// LABELS DES ONGLETS + TITRE
// ======================================================
const tabLabels = {
  fr: {
    general: "Général",
    surnaturel: "Surnaturel",
    bureau: "Bureau",
    noel: "Noël",
    action: "Action",
    minis: "Minis",
    esc: "Sortie de secours",
    title: "La Fabrique à Dramas"
  },
  en: {
    general: "General",
    surnaturel: "Supernatural",
    bureau: "Workplace",
    noel: "Christmas",
    action: "Action",
    minis: "Minis",
    esc: "Emergency exit",
    title: "The Dramas Factory"
  }
};

function updateTabLabels() {
  document.querySelectorAll(".tab").forEach((btn) => {
    const cat = btn.dataset.tab;
    btn.textContent = tabLabels[currentLang][cat];
  });

  // Mise à jour du titre
  document.getElementById("main-title").textContent = tabLabels[currentLang].title;

  updateOOCIntro();
}

// ======================================================
// CHOIX ALÉATOIRE
// ======================================================
function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ======================================================
// GÉNÉRATION DE L'ÉVÉNEMENT
// ======================================================
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const category = btn.dataset.tab;

    // Charger les données dynamiquement
    const json = await loadCategory(category);

    // Sélection FR ou EN
    const pool = json[currentLang];

    const result = pick(pool);

    // Affichage
    document.getElementById("event-result").textContent = result;

    const oocText =
      currentLang === "fr"
        ? `(OOC : Introduis et développe le rebondissement suivant : ${result})`
        : `(OOC: Introduce and expand the following plot twist: ${result})`;

    document.getElementById("ooc-box").textContent = oocText;
  });
});

// ======================================================
// COPIE DU TEXTE OOC
// ======================================================
document.getElementById("ooc-box").addEventListener("click", () => {
  const box = document.getElementById("ooc-box");
  const text = box.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const old = text;
    box.textContent = currentLang === "fr" ? "Copié !" : "Copied!";
    box.style.color = "#8f8";

    setTimeout(() => {
      box.textContent = old;
      box.style.color = "#fff";
    }, 700);
  });
});

// ======================================================
// INTRO TEXTE OOC
// ======================================================
function updateOOCIntro() {
  const intro = document.getElementById("ooc-intro");

  intro.textContent =
    currentLang === "fr"
      ? "Tu veux que ce soit l'IA qui amène le rebondissement ? Fais un copié/collé de la règle suivante :"
      : "Want the AI to introduce the plot twist? Copy and paste this rule:";
}

// Initialisation
updateTabLabels();

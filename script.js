// ======================================================
// LANGUE COURANTE
// ======================================================
let currentLang = "fr";

document.getElementById("lang-picker").addEventListener("change", (e) => {
  currentLang = e.target.value;
  updateTabLabels();
});

// ======================================================
// OUTIL DE TIRAGE
// ======================================================
function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ======================================================
// DRAMA — BASE FR + EN
// ======================================================
const baseEvents = {
  fr: [
    "Retrouvailles inattendues avec un ancien crush.",
    "Un quiproquo vous force à faire semblant d'être en couple.",
    "Un seul lit dans la chambre d'hôtel.",
    "L'ennemi juré devient le seul allié possible.",
    "Une confession d'amour en pleine dispute.",
    "Un secret refait surface au pire moment."
  ],
  en: [
    "Unexpected reunion with an old crush.",
    "A misunderstanding forces you two to pretend you're dating.",
    "Only one bed in the hotel room.",
    "Your sworn enemy becomes your only ally.",
    "A love confession happens mid-argument.",
    "A hidden secret resurfaces at the worst possible time."
  ]
};

// ======================================================
// DRAMA — SPÉCIFIQUES PAR CATÉGORIE
// ======================================================
const specificEvents = {
  surnaturel: {
    fr: [
      "Une aura étrange se manifeste autour de vous deux.",
      "Votre partenaire révèle qu'il n'est pas tout à fait humain."
    ],
    en: [
      "A strange aura surrounds you both.",
      "Your partner reveals they are not entirely human."
    ]
  },

  bureau: {
    fr: [
      "Vous devez travailler ensemble sur un dossier très sensible.",
      "Une règle interdit les relations entre collègues… oups."
    ],
    en: [
      "You must collaborate on a highly sensitive file.",
      "Company policy forbids coworker relationships… oops."
    ]
  },

  noel: {
    fr: [
      "Vous êtes coincés par une tempête de neige.",
      "Quelqu'un laisse un cadeau anonyme sous votre sapin."
    ],
    en: [
      "A snowstorm traps you together.",
      "Someone leaves an anonymous gift under your tree."
    ]
  },

  action: {
    fr: [
      "Une infiltration tourne mal et vous force à coopérer.",
      "Un message chiffré change le cours de la mission."
    ],
    en: [
      "A covert infiltration goes wrong and forces you to team up.",
      "A coded message alters the mission drastically."
    ]
  },

  minis: {
    fr: [
      "Un petit geste tendre vous surprend.",
      "Un silence confortable s'installe."
    ],
    en: [
      "A small tender gesture catches you off guard.",
      "A comfortable silence settles between you."
    ]
  },

  esc: {
    fr: [
      "Une trappe grince sous tes pieds : elle mène dans les coulisses.",
      "Un personnage mystérieux murmure : « Si tu veux sortir, viens. »"
    ],
    en: [
      "A trapdoor creaks beneath your feet: it leads backstage.",
      "A mysterious figure whispers: “If you want to get out, come.”"
    ]
  }
};

// ======================================================
// DRAMA — LABELS DES ONGLETS
// ======================================================
const tabLabels = {
  fr: {
    general: "Général",
    surnaturel: "Surnaturel",
    bureau: "Bureau",
    noel: "Noël",
    action: "Action",
    minis: "Minis",
    esc: "Échap"
  },
  en: {
    general: "General",
    surnaturel: "Supernatural",
    bureau: "Workplace",
    noel: "Christmas",
    action: "Action",
    minis: "Minis",
    esc: "Escape"
  }
};

function updateTabLabels() {
  document.querySelectorAll(".tab").forEach((btn) => {
    const cat = btn.dataset.tab;
    btn.textContent = tabLabels[currentLang][cat];
  });

  updateOOCIntro();
}

// ======================================================
// DRAMA — GÉNÉRATION PAR ONGLET
// ======================================================
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    let pool;

    if (tab === "esc") {
      pool = [...specificEvents.esc[currentLang]];
    }
    else if (tab === "general") {
      pool = [...baseEvents[currentLang]];
    }
    else {
      pool = [
        ...baseEvents[currentLang],
        ...specificEvents[tab][currentLang]
      ];
    }

    const result = pick(pool);

    document.getElementById("event-result").textContent = result;

    const oocText =
      currentLang === "fr"
        ? `(OOC : Introduis et développe le rebondissement suivant : ${result})`
        : `(OOC: Introduce and expand the following plot twist: ${result})`;

    document.getElementById("ooc-box").textContent = oocText;
  });
});

// ======================================================
// COPIE EN UN CLIC DU CHAMP OOC
// ======================================================
document.getElementById("ooc-box").addEventListener("click", () => {
  const box = document.getElementById("ooc-box");
  const text = box.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const old = text;
    box.textContent = (currentLang === "fr") ? "Copié !" : "Copied!";
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

// ======================================================
// INITIALISATION
// ======================================================
updateTabLabels();

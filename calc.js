"use strict";

// ============================================================
// TARIFF DATA — SINGLE SOURCE OF TRUTH
// All values from TARIEVEN / TARIFS 2026 sheet.
// ============================================================
const TARIFF_DATA = {

  VEHICLE_IDS: [
    "voiture",
    "bestel_1pal",
    "bestel_2pal",
    "bestel_3pal",
    "camion_6pal",
    "camion_14pal",
    "camion_17pal",
    "camion_18pal_lourd",
    "bache_18pal",
    "semi_bache_33pal",
    "frigo_15pal_minus12_0",
    "frigo_15pal_0_minus20",
  ],

  VEHICLES: {
    voiture: {
      label: "Voiture / Gewone wagen",
      pallets: 0, weight: 50, height: 0.70, length: 0.70, width: 0.90, volume: 0.5,
      tailLift: false, tempRange: null,
    },
    bestel_1pal: {
      label: "Camionette bestelwagen – 1 Pal",
      pallets: 1, weight: 450, height: 1.10, length: 1.49, width: 1.05, volume: 2.7,
      tailLift: false, tempRange: null,
    },
    bestel_2pal: {
      label: "Camionette bestelwagen – 2 Pal",
      pallets: 2, weight: 500, height: 1.35, length: 2.10, width: 1.20, volume: 6,
      tailLift: false, tempRange: null,
    },
    bestel_3pal: {
      label: "Camionette bestelwagen – 3 Pal",
      pallets: 3, weight: 500, height: 1.76, length: 2.50, width: 1.38, volume: 9,
      tailLift: false, tempRange: null,
    },
    camion_6pal: {
      label: "Camion vrachtwagen – 6 Pal",
      pallets: 6, weight: 750, height: 1.96, length: 3.43, width: 2.07, volume: 15.09,
      tailLift: true, tailLiftCapacity: 700, tempRange: null,
    },
    camion_14pal: {
      label: "Camion vrachtwagen – 14 Pal",
      pallets: 14, weight: 5000, height: 2.27, length: 6.00, width: 2.46, volume: 33.5,
      tailLift: true, tailLiftCapacity: 1450, tempRange: null,
    },
    camion_17pal: {
      label: "Camion vrachtwagen – 17 Pal",
      pallets: 17, weight: 5000, height: 2.27, length: 7.20, width: 2.46, volume: 42.4,
      tailLift: true, tailLiftCapacity: 1450, tempRange: null,
    },
    camion_18pal_lourd: {
      label: "Camion lourd / zware vrachtwagen – 18 Pal",
      pallets: 18, weight: 9000, height: 2.27, length: 7.60, width: 2.46, volume: 42.4,
      tailLift: true, tailLiftCapacity: 1450, tempRange: null,
    },
    bache_18pal: {
      label: "Bâché / huifwagen – 18 Pal",
      pallets: 18, weight: 8700, height: 2.35, length: 7.60, width: 2.46, volume: 42.4,
      tailLift: true, tailLiftCapacity: 1450, tempRange: null,
    },
    semi_bache_33pal: {
      label: "Semi bâché / huifwagen – 33 Pal",
      pallets: 33, weight: 30000, height: 2.50, length: 13.60, width: 2.46, volume: 76.3,
      tailLift: false, tempRange: null,
    },
    frigo_15pal_minus12_0: {
      label: "Camion frigo / koelwagen – 15 Pal (-12°C / 0°C)",
      pallets: 15, weight: 5500, height: 2.27, length: 7.60, width: 2.26, volume: 37.5,
      tailLift: true, tailLiftCapacity: 1450, tempRange: "minus12_0",
    },
    frigo_15pal_0_minus20: {
      label: "Camion frigo / koelwagen – 15 Pal (0°C / -20°C)",
      pallets: 15, weight: 5500, height: 2.27, length: 7.60, width: 2.26, volume: 37.5,
      tailLift: true, tailLiftCapacity: 1450, tempRange: "0_minus20",
    },
  },

  PRICES: {
    bxl: {
      voiture: 17.68, bestel_1pal: 29.46, bestel_2pal: 55.98, bestel_3pal: 70.70,
      camion_6pal: 100.16, camion_14pal: 127.27, camion_17pal: 135.51, camion_18pal_lourd: 153.19,
      bache_18pal: 162.03, semi_bache_33pal: 187.36, frigo_15pal_minus12_0: 153.19, frigo_15pal_0_minus20: 168.51,
    },
    rand: {
      voiture: 21.21, bestel_1pal: 32.99, bestel_2pal: 62.45, bestel_3pal: 76.59,
      camion_6pal: 107.23, camion_14pal: 135.51, camion_17pal: 142.58, camion_18pal_lourd: 160.84,
      bache_18pal: 170.87, semi_bache_33pal: 202.68, frigo_15pal_minus12_0: 160.84, frigo_15pal_0_minus20: 175.57,
    },
    prov_min: {
      voiture: 35.35, bestel_1pal: 48.32, bestel_2pal: 70.70, bestel_3pal: 84.25,
      camion_6pal: 115.48, camion_14pal: 147.30, camion_17pal: 155.54, camion_18pal_lourd: 170.87,
      bache_18pal: 182.64, semi_bache_33pal: 223.89, frigo_15pal_minus12_0: 170.87, frigo_15pal_0_minus20: 181.47,
    },
    prov_km: {
      voiture: 0.59, bestel_1pal: 0.67, bestel_2pal: 0.71, bestel_3pal: 0.78,
      camion_6pal: 1.09, camion_14pal: 1.35, camion_17pal: 1.43, camion_18pal_lourd: 1.48,
      bache_18pal: 1.58, semi_bache_33pal: 2.00, frigo_15pal_minus12_0: 1.48, frigo_15pal_0_minus20: 1.66,
    },
  },

  KM_TAX: {
    bxl: {
      voiture: null, bestel_1pal: null, bestel_2pal: null, bestel_3pal: null, camion_6pal: null,
      camion_14pal: 0.0652, camion_17pal: 0.0620, camion_18pal_lourd: 0.0834, bache_18pal: 0.0797,
      semi_bache_33pal: 0.0680, frigo_15pal_minus12_0: 0.0834, frigo_15pal_0_minus20: 0.0797,
    },
    rand: {
      voiture: null, bestel_1pal: null, bestel_2pal: null, bestel_3pal: null, camion_6pal: null,
      camion_14pal: 0.0652, camion_17pal: 0.0620, camion_18pal_lourd: 0.0834, bache_18pal: 0.0797,
      semi_bache_33pal: 0.0680, frigo_15pal_minus12_0: 0.0834, frigo_15pal_0_minus20: 0.0797,
    },
    prov_min: {
      voiture: null, bestel_1pal: null, bestel_2pal: null, bestel_3pal: null, camion_6pal: null,
      camion_14pal: 0.0680, camion_17pal: 0.0638, camion_18pal_lourd: 0.0987, bache_18pal: 0.0931,
      semi_bache_33pal: 0.0711, frigo_15pal_minus12_0: 0.0987, frigo_15pal_0_minus20: 0.0931,
    },
    prov_km: {
      voiture: null, bestel_1pal: null, bestel_2pal: null, bestel_3pal: null, camion_6pal: null,
      camion_14pal: 0.0880, camion_17pal: 0.0826, camion_18pal_lourd: 0.1268, bache_18pal: 0.1200,
      semi_bache_33pal: 0.0898, frigo_15pal_minus12_0: 0.1268, frigo_15pal_0_minus20: 0.1200,
    },
    extra_stop_other: {
      voiture: null, bestel_1pal: null, bestel_2pal: null, bestel_3pal: null, camion_6pal: null,
      camion_14pal: 0.0880, camion_17pal: 0.0826, camion_18pal_lourd: 0.1268, bache_18pal: 0.1200,
      semi_bache_33pal: 0.0898, frigo_15pal_minus12_0: 0.1268, frigo_15pal_0_minus20: 0.1200,
    },
  },

  WAITING: {
    voiture:                { includedMin: 0,  per15min: 9.14 },
    bestel_1pal:            { includedMin: 0,  per15min: 9.14 },
    bestel_2pal:            { includedMin: 15, per15min: 9.14 },
    bestel_3pal:            { includedMin: 15, per15min: 9.14 },
    camion_6pal:            { includedMin: 15, per15min: 10.60 },
    camion_14pal:           { includedMin: 15, per15min: 13.30 },
    camion_17pal:           { includedMin: 15, per15min: 13.30 },
    camion_18pal_lourd:     { includedMin: 15, per15min: 14.03 },
    bache_18pal:            { includedMin: 30, per15min: 14.03 },
    semi_bache_33pal:       { includedMin: 30, per15min: 15.50 },
    frigo_15pal_minus12_0:  { includedMin: 15, per15min: 14.03 },
    frigo_15pal_0_minus20:  { includedMin: 30, per15min: 15.50 },
  },

  EXTRA_STOPS: {
    bxl: {
      voiture: 17.68, bestel_1pal: 23.57, bestel_2pal: 29.46, bestel_3pal: 41.25,
      camion_6pal: 53.03, camion_14pal: 69.52, camion_17pal: 73.64, camion_18pal_lourd: 82.48,
      bache_18pal: 87.20, semi_bache_33pal: 100.16, frigo_15pal_minus12_0: 82.48, frigo_15pal_0_minus20: 89.55,
    },
    other: {
      voiture: 21.21, bestel_1pal: 23.57, bestel_2pal: 29.46, bestel_3pal: 41.25,
      camion_6pal: 53.03, camion_14pal: 69.52, camion_17pal: 73.64, camion_18pal_lourd: 82.48,
      bache_18pal: 87.20, semi_bache_33pal: 100.16, frigo_15pal_minus12_0: 82.48, frigo_15pal_0_minus20: 89.55,
    },
  },

  DISPO: {
    under6: {
      voiture: null, bestel_1pal: 50.66, bestel_2pal: 50.66, bestel_3pal: 59.59,
      camion_6pal: 67.05, camion_14pal: 73.00, camion_17pal: 79.41, camion_18pal_lourd: 79.41,
      bache_18pal: 79.41, semi_bache_33pal: 94.47, frigo_15pal_minus12_0: 79.41, frigo_15pal_0_minus20: 85.83,
    },
    over6: {
      voiture: null, bestel_1pal: 44.71, bestel_2pal: 44.71, bestel_3pal: 53.63,
      camion_6pal: 60.48, camion_14pal: 66.60, camion_17pal: 73.00, camion_18pal_lourd: 73.00,
      bache_18pal: 73.00, semi_bache_33pal: 86.71, frigo_15pal_minus12_0: 73.00, frigo_15pal_0_minus20: 79.41,
    },
    kmSupp: {
      voiture: null, bestel_1pal: 0.35, bestel_2pal: 0.39, bestel_3pal: 0.53,
      camion_6pal: 0.67, camion_14pal: 0.71, camion_17pal: 0.74, camion_18pal_lourd: 0.78,
      bache_18pal: 0.78, semi_bache_33pal: 1.01, frigo_15pal_minus12_0: 0.74, frigo_15pal_0_minus20: 0.83,
    },
  },

  NAVETTES: {
    bxl:      { label: "Bxl / Brussel",    price: 8.71 },
    rand:     { label: "Banl. / Rand",     price: 10.15 },
    brabant:  { label: "Brabant",          price: 15.94 },
    prov:     { label: "Prov.",            price: 19.93 },
    prov_lux: { label: "Prov. Lux.",       price: 31.90 },
    export:   { label: "Export",           price: null, note: "À partir de €50 — prix sur demande" },
  },

  SUPPLEMENTS: {
    nightBase:        87.89,
    nightFrigo12_0:   103.87,
    nightFrigo0_20:   119.85,
    convoyeurPerHour: 40.89,
    chauffeurPerHour: 47.93,
  },

  FUEL_SURCHARGE_EXAMPLE_PCT: 19.50,
  VAT_RATE: 0.21,
};

// ============================================================
// VEHICLE DISPLAY DATA
// ============================================================
const VEHICLE_DISPLAY = {
  voiture:                { emoji: "🚗",  short: "Voiture",              desc: "Petits déplacements rapides" },
  bestel_1pal:            { emoji: "🚐",  short: "Camionnette 1 Pal",    desc: "2.70m³ · 450 kg" },
  bestel_2pal:            { emoji: "🚐",  short: "Camionnette 2 Pal",    desc: "6m³ · 500 kg" },
  bestel_3pal:            { emoji: "🚐",  short: "Camionnette 3 Pal",    desc: "9m³ · 500 kg" },
  camion_6pal:            { emoji: "🚚",  short: "Camion 6 Pal",         desc: "15m³ · 750 kg" },
  camion_14pal:           { emoji: "🚛",  short: "Camion 14 Pal",        desc: "33.5m³ · 5 000 kg" },
  camion_17pal:           { emoji: "🚛",  short: "Camion 17 Pal",        desc: "42.4m³ · 5 000 kg" },
  camion_18pal_lourd:     { emoji: "🚛",  short: "Camion Lourd 18 Pal",  desc: "42.4m³ · 9 000 kg" },
  bache_18pal:            { emoji: "🚛",  short: "Bâché 18 Pal",         desc: "42.4m³ · 8 700 kg" },
  semi_bache_33pal:       { emoji: "🚛",  short: "Semi Bâché 33 Pal",    desc: "76.3m³ · 30 000 kg" },
  frigo_15pal_minus12_0:  { emoji: "🥶",  short: "Frigo 15 Pal -12/0°C", desc: "37.5m³ · 5 500 kg" },
  frigo_15pal_0_minus20:  { emoji: "❄️",  short: "Frigo 15 Pal 0/-20°C", desc: "37.5m³ · 5 500 kg" },
};

// ============================================================
// STEP DEFINITIONS
// ============================================================
const STEP_DATA = [
  {
    l1: 'calc-step1-l1', l2: 'calc-step1-l2', sub: 'calc-step1-sub',
    emoji: "🚚",
    heroHTML: '<div class="hero-images"><img class="hero-guy" src="images/calc/guy_1.png" alt=""><img class="hero-box" src="images/calc/box_1.png" alt=""></div>',
  },
  { l1: 'calc-step2-l1', l2: 'calc-step2-l2', sub: 'calc-step2-sub', emoji: "📦" },
  { l1: 'calc-step3-l1', l2: 'calc-step3-l2', sub: 'calc-step3-sub', emoji: "🚛" },
  { l1: 'calc-step4-l1', l2: 'calc-step4-l2', sub: 'calc-step4-sub', emoji: "⚙️" },
  { l1: 'calc-step5-l1', l2: 'calc-step5-l2', sub: 'calc-step5-sub', emoji: "⛽" },
  { l1: 'calc-sum-l1',   l2: 'calc-sum-l2',   sub: 'calc-sum-sub',   emoji: "📋" },
];

let currentStep = 1;

// ============================================================
// NAVIGATION
// ============================================================

function goToStep(n) {
  document.querySelectorAll(".step-content").forEach(el => { el.style.display = "none"; });
  currentStep = n;

  if (n === "summary") {
    document.getElementById("step-summary").style.display = "block";
    updateHero(5);
    updateProgress(6);
  } else {
    document.getElementById("step-" + n).style.display = "block";
    updateHero(n - 1);
    updateProgress(n);

    if (n === 3) refreshVehicleStep();
    if (n === 4) refreshWaitingHelper();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  const cc = document.querySelector(".content-card");
  if (cc) cc.scrollTo({ top: 0, behavior: "smooth" });
}

function goToSummary() {
  currentStep = "summary";
  runCalculation();
  document.querySelectorAll(".step-content").forEach(el => { el.style.display = "none"; });
  document.getElementById("step-summary").style.display = "block";
  updateHero(5);
  updateProgress(6);
  window.scrollTo({ top: 0, behavior: "smooth" });

  const cc = document.querySelector(".content-card");
  if (cc) cc.scrollTo({ top: 0, behavior: "smooth" });
}

function resetAll() {
  // Reset all form inputs
  document.querySelectorAll('input[type="number"]').forEach(el => {
    const defaults = {
      reqPallets: "2", reqWeight: "300", reqHeight: "1.2", reqLength: "2.0",
      reqWidth: "1.1", reqVolume: "0", waitingMinutes: "0",
      extraStopsBxl: "0", extraStopsOther: "0", convoyeurHours: "0", chauffeurHours: "0",
      fuelPct: "7.75", provKmDistance: "50", dispoHours: "4", dispoExtraKm: "0",
    };
    if (defaults[el.id] !== undefined) el.value = defaults[el.id];
  });
  document.querySelectorAll('input[type="checkbox"]').forEach(el => { el.checked = false; });
  const bxlRadio = document.querySelector('input[name="pricingMode"][value="bxl"]');
  if (bxlRadio) bxlRadio.checked = true;
  toggleConditionalBlocks();
  goToStep(1);
}

// ============================================================
// HERO & PROGRESS UPDATE
// ============================================================

function updateHero(stepIndex) {
  const d = STEP_DATA[stepIndex];
  const lang = localStorage.getItem('lang') || 'fr';
  const t = (window._T && window._T[lang]) || {};
  const l1 = t[d.l1] || d.l1;
  const l2 = t[d.l2] || d.l2;
  const sub = t[d.sub] || d.sub;
  document.getElementById("hero-title").innerHTML =
    l1 + ' <span class="hero-accent">' + l2 + "</span>";
  document.getElementById("hero-subtitle").textContent = sub;
  const emojiEl = document.getElementById("hero-emoji");
  if (d.heroHTML) {
    emojiEl.innerHTML = d.heroHTML;
  } else {
    emojiEl.textContent = d.emoji;
  }
}

/* Translation helper — reads from lang.js exposed window._T */
function tr(key) {
  var lang = localStorage.getItem('lang') || 'fr';
  return (window._T && window._T[lang] && window._T[lang][key]) || key;
}

/* Re-render hero and summary when language changes */
window.onLangChange = function() {
  var idx = currentStep === "summary" ? 5 : currentStep - 1;
  updateHero(idx);
  if (currentStep === "summary") runCalculation();
};

function updateProgress(activeStep) {
  const container = document.getElementById("step-progress");
  const isSummary = activeStep === 6;
  let html = "";

  for (let i = 1; i <= 5; i++) {
    let cls;
    if (isSummary || i < activeStep) cls = "done";
    else if (i === activeStep) cls = "active";
    else cls = "future";

    html += '<div class="progress-dot ' + cls + '">' + i + "</div>";

    if (i < 5) {
      const lineActive = isSummary || i < activeStep ? " done" : "";
      html += '<div class="progress-line' + lineActive + '"></div>';
    }
  }

  container.innerHTML = html;
}

// ============================================================
// CONDITIONAL BLOCKS
// ============================================================

function toggleConditionalBlocks() {
  const mode = document.querySelector('input[name="pricingMode"]:checked')?.value;
  setVisible("block-prov-km", mode === "prov_km");
  setVisible("block-navette", mode === "navette");
  setVisible("block-dispo", mode === "dispo");
  setVisible("block-temp", document.getElementById("reqRefrigerated")?.checked);
  setVisible("block-vehicle-override", document.getElementById("vehicleOverride")?.checked);
  setVisible("block-fuel", document.getElementById("fuelEnabled")?.checked);
}

function setVisible(id, visible) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("visible", !!visible);
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function normalizeToMeters(value, unit) {
  if (!value || isNaN(value)) return 0;
  return unit === "cm" ? value / 100 : parseFloat(value);
}

function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return "€ " + n.toFixed(2);
}

function roundUpTo15(minutes) {
  return Math.ceil(minutes / 15);
}

// ============================================================
// VEHICLE SELECTION ENGINE
// ============================================================

function getCandidateVehicles(req) {
  const { pallets, weight, height, length, width, volume, tailLift, refrigerated, tempRange } = req;
  const candidates = [];
  const debugInfo = {};

  for (const id of TARIFF_DATA.VEHICLE_IDS) {
    const v = TARIFF_DATA.VEHICLES[id];
    const checks = {};

    checks.pallets = { required: pallets, capacity: v.pallets, pass: pallets <= v.pallets };
    checks.weight  = { required: weight,  capacity: v.weight,  pass: weight  <= v.weight  };

    checks.height = height > 0
      ? { required: height, capacity: v.height, pass: height <= v.height }
      : { pass: true, note: "non renseigné" };

    checks.length = length > 0
      ? { required: length, capacity: v.length, pass: length <= v.length }
      : { pass: true, note: "non renseigné" };

    checks.width = width > 0
      ? { required: width, capacity: v.width, pass: width <= v.width }
      : { pass: true, note: "non renseigné" };

    checks.volume = volume > 0
      ? { required: volume, capacity: v.volume, pass: volume <= v.volume }
      : { pass: true, note: "non renseigné" };

    if (tailLift) {
      checks.tailLift = { required: true, available: v.tailLift, pass: v.tailLift === true };
    } else {
      checks.tailLift = { pass: true, note: "non requis" };
    }

    if (refrigerated) {
      const needsTemp = tempRange !== null && tempRange !== undefined;
      if (v.tempRange === null) {
        checks.refrigeration = { required: tempRange || "frigo", available: "aucune", pass: false };
      } else if (needsTemp && v.tempRange !== tempRange) {
        checks.refrigeration = { required: tempRange, available: v.tempRange, pass: false };
      } else {
        checks.refrigeration = { required: tempRange, available: v.tempRange, pass: true };
      }
    } else {
      checks.refrigeration = { pass: true, note: "non requis" };
    }

    const allPass = Object.values(checks).every(c => c.pass);
    debugInfo[id] = { label: v.label, checks, allPass };
    if (allPass) candidates.push(id);
  }

  return { candidates, debugInfo };
}

function selectBestVehicle(candidates) {
  for (const id of TARIFF_DATA.VEHICLE_IDS) {
    if (candidates.includes(id)) return id;
  }
  return null;
}

function getRequirementsFromForm() {
  const pallets  = parseInt(document.getElementById("reqPallets")?.value) || 0;
  const weight   = parseFloat(document.getElementById("reqWeight")?.value) || 0;
  const height   = normalizeToMeters(parseFloat(document.getElementById("reqHeight")?.value) || 0, document.getElementById("reqHeightUnit")?.value);
  const length   = normalizeToMeters(parseFloat(document.getElementById("reqLength")?.value) || 0, document.getElementById("reqLengthUnit")?.value);
  const width    = normalizeToMeters(parseFloat(document.getElementById("reqWidth")?.value)  || 0, document.getElementById("reqWidthUnit")?.value);
  const volume   = parseFloat(document.getElementById("reqVolume")?.value) || 0;
  const tailLift    = document.getElementById("reqTailLift")?.checked || false;
  const refrigerated = document.getElementById("reqRefrigerated")?.checked || false;
  const tempRange    = refrigerated ? (document.getElementById("reqTempRange")?.value || null) : null;
  return { pallets, weight, height, length, width, volume, tailLift, refrigerated, tempRange };
}

// ============================================================
// VEHICLE STEP (step 3)
// ============================================================

function refreshVehicleStep() {
  const req = getRequirementsFromForm();
  const { candidates, debugInfo } = getCandidateVehicles(req);
  const best = selectBestVehicle(candidates);

  // Recommended card
  const recCard = document.getElementById("recommended-card");
  if (best) {
    const v = TARIFF_DATA.VEHICLES[best];
    const d = VEHICLE_DISPLAY[best];
    recCard.innerHTML =
      '<div class="recommended-badge">Recommandé</div>' +
      '<span class="recommended-emoji">' + d.emoji + '</span>' +
      '<div class="recommended-vehicle-name">' + v.label + '</div>' +
      '<div class="recommended-compat">' + candidates.length + ' véhicule(s) compatible(s) — plus petit sélectionné</div>';
  } else {
    recCard.innerHTML = '<div class="recommended-none">⚠ Aucun véhicule compatible — sélection manuelle requise</div>';
  }

  // Vehicle grid
  const grid = document.getElementById("vehicle-grid");
  let html = "";
  for (const id of TARIFF_DATA.VEHICLE_IDS) {
    const v = TARIFF_DATA.VEHICLES[id];
    const d = VEHICLE_DISPLAY[id];
    const isCandidate = candidates.includes(id);
    const isBest = id === best;
    let cls = "vehicle-card";
    if (!isCandidate) cls += " incompatible";
    if (isBest) cls += " best-match";

    html +=
      '<div class="' + cls + '" data-vehicle="' + id + '" onclick="selectVehicleCard(\'' + id + '\')">' +
        '<span class="vehicle-card-emoji">' + d.emoji + '</span>' +
        '<span class="vehicle-card-name">' + d.short + '</span>' +
        '<span class="vehicle-card-desc">' + d.desc + '</span>' +
      '</div>';
  }
  grid.innerHTML = html;

  // Populate override select
  const sel = document.getElementById("vehicleSelect");
  if (sel) {
    sel.innerHTML = "";
    for (const id of TARIFF_DATA.VEHICLE_IDS) {
      const opt = document.createElement("option");
      opt.value = id;
      opt.textContent = TARIFF_DATA.VEHICLES[id].label;
      sel.appendChild(opt);
    }
    if (best) sel.value = best;
  }

  updateDebugPanel(debugInfo);
}

function selectVehicleCard(vehicleId) {
  const ov = document.getElementById("vehicleOverride");
  const sel = document.getElementById("vehicleSelect");
  if (!ov || !sel) return;

  ov.checked = true;
  sel.value = vehicleId;
  toggleConditionalBlocks();

  document.querySelectorAll(".vehicle-card").forEach(card => {
    card.classList.toggle("selected", card.dataset.vehicle === vehicleId);
  });
}

function refreshWaitingHelper() {
  const req = getRequirementsFromForm();
  const { candidates } = getCandidateVehicles(req);
  const ov = document.getElementById("vehicleOverride");
  const sel = document.getElementById("vehicleSelect");
  const vehicleId = (ov && ov.checked && sel)
    ? sel.value
    : selectBestVehicle(candidates);

  const helper = document.getElementById("waitingHelper");
  if (!helper) return;
  if (vehicleId) {
    const w = TARIFF_DATA.WAITING[vehicleId];
    helper.textContent = "Temps inclus: " + (w ? w.includedMin : "—") + " min";
  }
}

// ============================================================
// PRICE CALCULATION FUNCTIONS
// ============================================================

function getBasePrice(vehicleId, mode, kmDistance) {
  const prices = TARIFF_DATA.PRICES[mode];
  if (!prices) return { price: 0, note: "Mode inconnu" };
  const p = prices[vehicleId];
  if (p === undefined || p === null) return { price: 0, note: "Prix non disponible" };
  if (mode === "prov_km") {
    const dist = parseFloat(kmDistance) || 0;
    return { price: p * dist, note: fmt(p).replace("€ ","") + " €/km × " + dist + " km" };
  }
  return { price: p, note: null };
}

function getKmTax(vehicleId, mode, basePrice) {
  const taxTable = TARIFF_DATA.KM_TAX[mode];
  if (!taxTable) return { amount: 0, pct: null };
  const pct = taxTable[vehicleId];
  if (pct === null || pct === undefined) return { amount: 0, pct: null };
  return { amount: basePrice * pct, pct };
}

function getExtraStopKmTax(vehicleId, stopPrice) {
  const pct = TARIFF_DATA.KM_TAX.extra_stop_other[vehicleId];
  if (pct === null || pct === undefined) return { amount: 0, pct: null };
  return { amount: stopPrice * pct, pct };
}

function calculateWaitingCost(vehicleId, totalWaitMinutes) {
  const w = TARIFF_DATA.WAITING[vehicleId];
  if (!w) return { amount: 0, note: "—" };
  const extra = totalWaitMinutes - w.includedMin;
  if (extra <= 0) return { amount: 0, note: totalWaitMinutes + " min ≤ " + w.includedMin + " min inclus", included: w.includedMin };
  const blocks = roundUpTo15(extra);
  const amount = blocks * w.per15min;
  return { amount, note: extra + " min extra → " + blocks + " × 15 min × " + fmt(w.per15min), included: w.includedMin, blocks, ratePerBlock: w.per15min };
}

function calculateExtraStops(vehicleId, stopsInBxl, stopsOther) {
  const bxlRate   = TARIFF_DATA.EXTRA_STOPS.bxl[vehicleId]   || 0;
  const otherRate = TARIFF_DATA.EXTRA_STOPS.other[vehicleId]  || 0;
  return {
    bxlCost: stopsInBxl * bxlRate,
    otherCost: stopsOther * otherRate,
    bxlRate, otherRate,
    totalStopCost: stopsInBxl * bxlRate + stopsOther * otherRate,
  };
}

function calculateDispoCost(vehicleId, duration, hours, extraKm) {
  const rateTable  = TARIFF_DATA.DISPO[duration];
  const kmRate     = TARIFF_DATA.DISPO.kmSupp[vehicleId];
  const hourlyRate = rateTable ? rateTable[vehicleId] : null;
  if (hourlyRate === null || hourlyRate === undefined) {
    return { amount: 0, kmCost: 0, note: "Non disponible", unavailable: true };
  }
  return {
    amount: hourlyRate * hours,
    kmCost: kmRate ? kmRate * extraKm : 0,
    hourlyRate, kmRate, hours, extraKm, unavailable: false,
  };
}

function calculateSupplements(opts) {
  const s = TARIFF_DATA.SUPPLEMENTS;
  let total = 0;
  const lines = [];
  if (opts.nightBase)      { total += s.nightBase;          lines.push({ label: tr('calc-sum-supp-night'),  amount: s.nightBase }); }
  if (opts.nightFrigo12)   { total += s.nightFrigo12_0;     lines.push({ label: tr('calc-sum-frigo12'),     amount: s.nightFrigo12_0 }); }
  if (opts.nightFrigo20)   { total += s.nightFrigo0_20;     lines.push({ label: tr('calc-sum-frigo20'),     amount: s.nightFrigo0_20 }); }
  if (opts.convoyeurHours > 0) {
    const amt = s.convoyeurPerHour * opts.convoyeurHours;
    total += amt;
    lines.push({ label: tr('calc-sum-convoyeur') + " (" + opts.convoyeurHours + "h × " + fmt(s.convoyeurPerHour) + ")", amount: amt });
  }
  if (opts.chauffeurHours > 0) {
    const amt = s.chauffeurPerHour * opts.chauffeurHours;
    total += amt;
    lines.push({ label: tr('calc-sum-chauffeur') + " (" + opts.chauffeurHours + "h × " + fmt(s.chauffeurPerHour) + ")", amount: amt });
  }
  return { total, lines };
}

// ============================================================
// MAIN CALCULATION
// ============================================================

function runCalculation() {
  const warnings = [];
  const breakdownSections = [];

  const mode      = document.querySelector('input[name="pricingMode"]:checked')?.value;
  const isNavette = mode === "navette";
  const isDispo   = mode === "dispo";
  const req       = getRequirementsFromForm();

  const { candidates, debugInfo } = getCandidateVehicles(req);
  updateDebugPanel(debugInfo);

  const overrideEnabled = document.getElementById("vehicleOverride")?.checked;
  let vehicleId, vehicleSelectionNote;

  if (overrideEnabled) {
    vehicleId = document.getElementById("vehicleSelect")?.value;
    vehicleSelectionNote = tr('calc-sum-manual-sel');
    warnings.push(tr('calc-sum-manual-sel'));
  } else {
    vehicleId = selectBestVehicle(candidates);
    vehicleSelectionNote = vehicleId
      ? tr('calc-sum-auto-sel')
      : "⚠ " + tr('calc-sum-no-vehicle');
    if (!vehicleId) warnings.push(tr('calc-sum-no-vehicle-sub'));
  }

  const warnBanner = document.getElementById("result-warning-banner");
  if (!vehicleId) {
    warnBanner.innerHTML = warnings.map(w => "⚠ " + w).join("<br>");
    warnBanner.style.display = "block";
    document.getElementById("result-vehicle-name").textContent = tr('calc-sum-no-vehicle');
    document.getElementById("result-vehicle-reason").textContent = tr('calc-sum-no-vehicle-sub');
    document.getElementById("breakdown-table").innerHTML = "";
    document.getElementById("totals-block").innerHTML = "";
    return;
  }

  if (warnings.length > 0) {
    warnBanner.innerHTML = warnings.map(w => "⚠ " + w).join("<br>");
    warnBanner.style.display = "block";
  } else {
    warnBanner.style.display = "none";
  }

  const vehicle = TARIFF_DATA.VEHICLES[vehicleId];
  document.getElementById("result-vehicle-name").textContent = vehicle.label;
  document.getElementById("result-vehicle-reason").textContent = vehicleSelectionNote;

  const waitingMinutes    = parseFloat(document.getElementById("waitingMinutes")?.value)    || 0;
  const extraStopsBxl     = parseInt(document.getElementById("extraStopsBxl")?.value)       || 0;
  const extraStopsOther   = parseInt(document.getElementById("extraStopsOther")?.value)      || 0;
  const suppNight         = document.getElementById("suppNight")?.checked;
  const suppNightFrigo12  = document.getElementById("suppNightFrigo12")?.checked;
  const suppNightFrigo20  = document.getElementById("suppNightFrigo20")?.checked;
  const convoyeurHours    = parseFloat(document.getElementById("convoyeurHours")?.value)    || 0;
  const chauffeurHours    = parseFloat(document.getElementById("chauffeurHours")?.value)    || 0;
  const fuelEnabled       = document.getElementById("fuelEnabled")?.checked;
  const fuelPct           = fuelEnabled ? (parseFloat(document.getElementById("fuelPct")?.value) || 0) : 0;
  const showVAT           = document.getElementById("showVAT")?.checked;

  // Update waiting helper
  const waitInfo = TARIFF_DATA.WAITING[vehicleId];
  const wHelper = document.getElementById("waitingHelper");
  if (wHelper) wHelper.textContent = tr('calc-sum-temps-incl') + " " + (waitInfo ? waitInfo.includedMin : "—") + " min";

  let baseTotal = 0;
  let manualQuote = false;

  // ---- MODE CALCULATION ----
  if (isNavette) {
    const navetteZone = document.getElementById("navetteZone")?.value;
    const navette = TARIFF_DATA.NAVETTES[navetteZone];
    if (navetteZone === "export" || navette.price === null) {
      manualQuote = true;
      warnings.push("Export sur demande — cotation manuelle requise.");
    } else {
      baseTotal = navette.price;
      breakdownSections.push({ title: tr('calc-sum-sect-navette'), rows: [{ label: tr('calc-sum-sect-navette') + " — " + navette.label, value: navette.price }] });
    }

  } else if (isDispo) {
    const duration = document.getElementById("dispoDuration")?.value;
    const hours    = parseFloat(document.getElementById("dispoHours")?.value) || 0;
    const extraKm  = parseFloat(document.getElementById("dispoExtraKm")?.value) || 0;
    const dispo    = calculateDispoCost(vehicleId, duration, hours, extraKm);

    if (dispo.unavailable) {
      warnings.push("Dispo/Tournée non disponible pour: " + vehicle.label);
      breakdownSections.push({ title: tr('calc-sum-sect-dispo'), rows: [{ label: tr('calc-sum-dispo-na'), value: null, note: true }] });
    } else {
      baseTotal = dispo.amount + dispo.kmCost;
      const durationLabel = duration === "under6" ? tr('calc-duree-under6') : tr('calc-duree-over6');
      breakdownSections.push({
        title: tr('calc-sum-sect-dispo'),
        rows: [
          { label: durationLabel + " — " + hours + "h × " + fmt(dispo.hourlyRate), value: dispo.amount },
          dispo.extraKm > 0 ? { label: tr('calc-sum-km-supp') + " — " + extraKm + " km × " + fmt(dispo.kmRate), value: dispo.kmCost } : null,
        ].filter(Boolean),
      });
    }

  } else {
    const kmDistance = mode === "prov_km" ? (parseFloat(document.getElementById("provKmDistance")?.value) || 0) : 0;
    const base   = getBasePrice(vehicleId, mode, kmDistance);
    const kmTax  = getKmTax(vehicleId, mode, base.price);
    baseTotal    = base.price;

    const modeLabelMap = { bxl: tr('calc-sum-prix-bxl'), rand: tr('calc-sum-prix-rand'), prov_min: tr('calc-sum-prix-prov-min'), prov_km: tr('calc-sum-prix-prov-km') };
    const baseRows = [{ label: (modeLabelMap[mode] || mode) + (base.note ? " (" + base.note + ")" : ""), value: base.price }];

    if (kmTax.pct !== null) {
      baseTotal += kmTax.amount;
      baseRows.push({ label: tr('calc-sum-taxe-km') + " (" + (kmTax.pct * 100).toFixed(2) + "% × " + fmt(base.price) + ")", value: kmTax.amount });
    } else {
      baseRows.push({ label: tr('calc-sum-taxe-km'), value: null, noteText: tr('calc-sum-taxe-km-na') });
    }

    breakdownSections.push({ title: tr('calc-sum-sect-base'), rows: baseRows });
  }

  // ---- WAITING ----
  if (!isNavette && !manualQuote) {
    const waitCost = calculateWaitingCost(vehicleId, waitingMinutes);
    const waitRows = [];
    if (waitCost.amount > 0) {
      waitRows.push({ label: tr('calc-sum-attente') + " — " + waitCost.note, value: waitCost.amount });
    } else {
      waitRows.push({ label: tr('calc-sum-attente') + " (" + waitingMinutes + " min, " + waitCost.included + " " + tr('calc-sum-min-incl') + ")", value: 0, zero: true });
    }
    baseTotal += waitCost.amount;
    breakdownSections.push({ title: tr('calc-sum-sect-waiting'), rows: waitRows });
  }

  // ---- EXTRA STOPS ----
  if (!manualQuote && (extraStopsBxl > 0 || extraStopsOther > 0)) {
    const stops = calculateExtraStops(vehicleId, extraStopsBxl, extraStopsOther);
    const stopRows = [];
    if (extraStopsBxl > 0) {
      stopRows.push({ label: tr('calc-sum-stops-bxl') + " — " + extraStopsBxl + " × " + fmt(stops.bxlRate), value: stops.bxlCost });
    }
    if (extraStopsOther > 0) {
      stopRows.push({ label: tr('calc-sum-stops-other') + " — " + extraStopsOther + " × " + fmt(stops.otherRate), value: stops.otherCost });
      const otherKmTax = getExtraStopKmTax(vehicleId, stops.otherCost);
      if (otherKmTax.pct !== null) {
        stopRows.push({ label: tr('calc-sum-taxe-stops') + " (" + (otherKmTax.pct * 100).toFixed(2) + "%)", value: otherKmTax.amount });
        baseTotal += otherKmTax.amount;
      }
    }
    baseTotal += stops.totalStopCost;
    breakdownSections.push({ title: tr('calc-sum-sect-stops'), rows: stopRows });
  }

  // ---- SUPPLEMENTS ----
  const suppResult = calculateSupplements({ nightBase: suppNight, nightFrigo12: suppNightFrigo12, nightFrigo20: suppNightFrigo20, convoyeurHours, chauffeurHours });
  if (suppResult.total > 0) {
    baseTotal += suppResult.total;
    breakdownSections.push({ title: tr('calc-sum-sect-supps'), rows: suppResult.lines.map(l => ({ label: l.label, value: l.amount })) });
  }

  // ---- FUEL ----
  const fuelAmount = fuelPct > 0 ? baseTotal * (fuelPct / 100) : 0;
  if (fuelAmount > 0) {
    breakdownSections.push({
      title: tr('calc-sum-sect-fuel'),
      rows: [{ label: tr('calc-sum-fuel-label') + " (" + fuelPct + "% — " + tr('calc-sum-fuel-note').replace('⚠ % variable — ', '') + ")", value: fuelAmount }],
    });
  }

  const subtotal      = baseTotal + fuelAmount;
  const vatAmount     = subtotal * TARIFF_DATA.VAT_RATE;
  const totalWithVAT  = subtotal + vatAmount;

  if (manualQuote) {
    document.getElementById("breakdown-table").innerHTML =
      '<div class="manual-quote-card"><strong>⚠ Prix sur demande / Prijs op aanvraag</strong>Export: à partir de €50 — Cotation manuelle requise. Contacter le département commercial.</div>';
    document.getElementById("totals-block").innerHTML = "";
    return;
  }

  renderBreakdown(breakdownSections);
  renderTotals(subtotal, vatAmount, totalWithVAT, showVAT);
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================

function renderBreakdown(sections) {
  const container = document.getElementById("breakdown-table");
  let html = "";
  for (const section of sections) {
    html += '<div class="breakdown-section-title">' + section.title + "</div>";
    for (const row of section.rows) {
      if (!row) continue;
      const valClass = row.note ? "info" : (row.zero || row.value === 0 ? "zero" : "");
      const valText  = row.note ? "—" : (row.value === null ? "—" : fmt(row.value));
      html += '<div class="breakdown-row"><span class="breakdown-label">' + row.label + '</span><span class="breakdown-value ' + valClass + '">' + valText + '</span></div>';
      if (row.noteText) html += '<div class="breakdown-note">' + row.noteText + "</div>";
    }
  }
  container.innerHTML = html;
}

function renderTotals(subtotal, vatAmount, totalWithVAT, showVAT) {
  const container = document.getElementById("totals-block");
  let html = '<div class="total-row subtotal"><span class="total-label">' + tr('calc-sum-subtotal') + '</span><span class="total-value">' + fmt(subtotal) + "</span></div>";

  if (showVAT) {
    html += '<div class="total-row vat-row"><span class="total-label">' + tr('calc-sum-vat') + '</span><span class="total-value">' + fmt(vatAmount) + '</span></div>';
    html += '<div class="total-row grand-total"><span class="total-label">' + tr('calc-sum-total-ttc') + '</span><span class="total-value">' + fmt(totalWithVAT) + "</span></div>";
  } else {
    html += '<div class="total-row grand-total"><span class="total-label">' + tr('calc-sum-total-htva') + '</span><span class="total-value">' + fmt(subtotal) + '</span></div>';
    html += '<div class="total-row vat-row"><span class="total-label">' + tr('calc-sum-vat-excl') + '</span><span class="total-value">' + fmt(vatAmount) + "</span></div>";
  }

  container.innerHTML = html;
}

function updateDebugPanel(debugInfo) {
  const container = document.getElementById("debug-body");
  if (!container) return;
  let html = "";
  for (const id of TARIFF_DATA.VEHICLE_IDS) {
    const info = debugInfo[id];
    if (!info) continue;
    const icon = info.allPass ? "✓" : "✕";
    const cls  = info.allPass ? "check-pass" : "check-fail";
    html += '<div class="debug-vehicle"><div class="debug-vehicle-name ' + cls + '">' + icon + " " + info.label + "</div>";
    for (const [key, chk] of Object.entries(info.checks)) {
      if (chk.note === "non renseigné" || chk.note === "non requis") {
        html += '<span class="check-na">  · ' + key + ": N/A (" + chk.note + ")</span><br>";
      } else if (chk.pass) {
        const detail = chk.required !== undefined ? " (requis: " + chk.required + ", cap: " + chk.capacity + ")" : "";
        html += '<span class="check-pass">  ✓ ' + key + detail + "</span><br>";
      } else {
        const detail = chk.required !== undefined ? " (requis: " + chk.required + ", cap: " + chk.capacity + ")" : "";
        html += '<span class="check-fail">  ✕ ' + key + detail + "</span><br>";
      }
    }
    html += "</div>";
  }
  container.innerHTML = html;
}

// ============================================================
// DOWNLOAD QUOTE AS PDF-READY HTML
// ============================================================

async function downloadQuote() {
  // Embed logo as base64 so it works when the file is opened from Downloads
  let logoSrc = '';
  try {
    const resp = await fetch('images/logo_01.png');
    const blob = await resp.blob();
    logoSrc = await new Promise(resolve => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.readAsDataURL(blob);
    });
  } catch(e) {}

  // Summary DOM values
  const vehicleName   = document.getElementById("result-vehicle-name")?.textContent || '—';
  const vehicleReason = document.getElementById("result-vehicle-reason")?.textContent || '';

  // User choices
  const modeMap = {
    bxl:      'Bruxelles / Brussel — Prix fixe ville',
    prov_min: 'Province min. — Tarif fixe provincial',
    rand:     'Rand / Banlieue — Périphérie',
    prov_km:  'Province / Km — Tarif kilométrique',
    navette:  'Navette',
    dispo:    'Tournée / Dispo — Tarif horaire'
  };
  const mode        = document.querySelector('input[name="pricingMode"]:checked')?.value || '';
  const modeLabel   = modeMap[mode] || mode;
  const pallets     = document.getElementById("reqPallets")?.value || '0';
  const weight      = document.getElementById("reqWeight")?.value || '0';
  const heightV     = document.getElementById("reqHeight")?.value || '0';
  const heightU     = document.getElementById("reqHeightUnit")?.value || 'm';
  const lengthV     = document.getElementById("reqLength")?.value || '0';
  const lengthU     = document.getElementById("reqLengthUnit")?.value || 'm';
  const widthV      = document.getElementById("reqWidth")?.value || '0';
  const widthU      = document.getElementById("reqWidthUnit")?.value || 'm';
  const isRefrig    = document.getElementById("reqRefrigerated")?.checked;
  const hasTailLift = document.getElementById("reqTailLift")?.checked;

  // Build breakdown table rows from DOM
  const bTable = document.getElementById("breakdown-table");
  let tableRows = '';
  if (bTable) {
    for (const child of bTable.children) {
      if (child.classList.contains('breakdown-section-title')) {
        tableRows += `<tr><td colspan="2" style="background:#f0f4fa;color:#0F417B;font-weight:700;font-size:11px;text-transform:uppercase;padding:7px 12px;border-top:1px solid #d0d8e8;">${child.textContent}</td></tr>`;
      } else if (child.classList.contains('breakdown-row')) {
        const label   = child.querySelector('.breakdown-label')?.textContent || '';
        const value   = child.querySelector('.breakdown-value')?.textContent || '';
        const isZero  = child.querySelector('.breakdown-value')?.classList.contains('zero');
        const color   = isZero ? '#aaa' : '#333';
        const wColor  = isZero ? '#aaa' : '#222';
        tableRows += `<tr><td style="padding:5px 12px;border-bottom:1px dotted #eee;color:${color}">${label}</td><td style="padding:5px 12px;border-bottom:1px dotted #eee;text-align:right;font-weight:600;color:${wColor};white-space:nowrap">${value}</td></tr>`;
      } else if (child.classList.contains('breakdown-note')) {
        tableRows += `<tr><td colspan="2" style="padding:2px 12px 6px 20px;font-size:10px;color:#888;font-style:italic;">${child.textContent}</td></tr>`;
      }
    }
  }

  // Build totals rows
  const tBlock = document.getElementById("totals-block");
  let totalRows = '';
  if (tBlock) {
    for (const child of tBlock.children) {
      const label   = child.querySelector('.total-label')?.textContent || '';
      const value   = child.querySelector('.total-value')?.textContent || '';
      const isGrand = child.classList.contains('grand-total');
      if (isGrand) {
        totalRows += `<tr style="background:#0F417B;color:#fff;"><td style="padding:10px 12px;font-weight:700;font-size:13px;">${label}</td><td style="padding:10px 12px;text-align:right;font-weight:700;font-size:13px;">${value}</td></tr>`;
      } else {
        totalRows += `<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">${label}</td><td style="padding:6px 12px;text-align:right;font-weight:700;color:#0F417B;border-bottom:1px solid #eee;">${value}</td></tr>`;
      }
    }
  }

  // Date & quote number
  const now      = new Date();
  const dateStr  = now.toLocaleDateString("fr-BE", { day: "2-digit", month: "2-digit", year: "numeric" });
  const quoteNum = 'DEV-' + now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + '-' + String(Math.floor(Math.random()*900)+100);

  const loadDetails = [
    pallets + ' PAL',
    weight + ' kg',
    heightV + heightU + ' × ' + lengthV + lengthU + ' × ' + widthV + widthU,
    isRefrig    ? 'Frigorifique' : '',
    hasTailLift ? 'Hayon'        : ''
  ].filter(Boolean).join(' — ');

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Devis Number One — ${quoteNum}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #222; background: #fff; }
  .page { max-width: 800px; margin: 0 auto; padding: 40px 40px 60px; }
  table { border-collapse: collapse; width: 100%; }
  @media print { .no-print { display: none !important; } }
</style>
</head>
<body>
<div class="page">

  <!-- HEADER: logo left, company info right -->
  <table style="margin-bottom:28px;">
    <tr>
      <td style="width:45%;vertical-align:middle;">
        ${logoSrc
          ? `<img src="${logoSrc}" alt="Number One" style="height:110px;width:auto;">`
          : `<div style="font-size:20px;font-weight:900;color:#0F417B;">NUMBER ONE</div>`}
      </td>
      <td style="vertical-align:top;text-align:right;font-size:12px;line-height:1.7;color:#333;">
        <strong>sprl NUMBER ONE bvba</strong><br>
        Rue de Lusambostraat 59<br>
        1190 Bruxelles / Brussel<br>
        Tél: 02 788 40 48<br>
        TVA / BTW : BE 0480.021.821<br>
        www.number-one.be
      </td>
    </tr>
  </table>

  <hr style="border:none;border-top:1px solid #ccc;margin-bottom:18px;">

  <!-- INFO ROWS (mirrors invoice layout) -->
  <table style="font-size:12px;margin-bottom:10px;">
    <tr>
      <td style="padding:3px 0;width:220px;color:#555;">Bruxelles / Bruxelles,</td>
      <td style="padding:3px 0;font-weight:600;">${dateStr}</td>
    </tr>
    <tr>
      <td style="padding:3px 0;color:#555;">Véhicule / Voertuig :</td>
      <td style="padding:3px 0;font-weight:600;">${vehicleName}</td>
    </tr>
    <tr>
      <td style="padding:3px 0;color:#555;">Mode de tarification :</td>
      <td style="padding:3px 0;">${modeLabel}</td>
    </tr>
    <tr>
      <td style="padding:3px 0;color:#555;">Chargement / Lading :</td>
      <td style="padding:3px 0;">${loadDetails}</td>
    </tr>
  </table>

  <!-- QUOTE NUMBER BOX -->
  <div style="border:1px solid #bbb;text-align:center;padding:9px 16px;margin:18px 0;font-weight:700;font-size:13px;">
    Devis / Offerte n° : &nbsp;${quoteNum}
  </div>

  <div style="font-size:12px;margin-bottom:4px;">Madame, Monsieur,<br>Mevrouw, Mijnheer,</div>
  <div style="font-size:11px;color:#777;margin-bottom:18px;font-style:italic;">Ce devis est établi sur base de vos paramètres de transport. Le prix final reste soumis à vérification commerciale. / Deze offerte is opgesteld op basis van uw transportparameters.</div>

  <hr style="border:none;border-top:1px solid #ccc;margin-bottom:14px;">

  <!-- BREAKDOWN TITLE -->
  <div style="text-align:center;font-weight:700;font-size:13px;text-decoration:underline;margin-bottom:12px;">
    Résumé des frais / Samenvatting van de kosten
  </div>

  <!-- BREAKDOWN + TOTALS TABLE -->
  <table style="border:1px solid #ccc;">
    ${tableRows}
    <tr><td colspan="2" style="padding:6px;border-top:1px solid #ddd;"></td></tr>
    ${totalRows}
  </table>

  <!-- FOOTER -->
  <div style="margin-top:36px;text-align:center;font-size:10px;color:#888;border-top:1px solid #eee;padding-top:12px;line-height:1.8;">
    <strong>sprl NUMBER ONE bvba</strong><br>
    Rue de Lusambostraat 59 - Bruxelles 1190 Brussel - Adm: 02 788 40 48<br>
    RPM Bruxelles / RPR Brussel &nbsp;TVA / BTW : BE 0480.021.821<br>
    <strong>www.number-one.be</strong><br>
    Conditions générales au verso - Algemene voorwaarden op keerzijde
  </div>

  <!-- PRINT BUTTON (hidden on print) -->
  <div class="no-print" style="text-align:center;margin-top:24px;">
    <button onclick="window.print()" style="padding:10px 28px;background:#0F417B;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;">
      🖨️ Imprimer / Sauvegarder en PDF
    </button>
  </div>

</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `devis-number-one-${quoteNum}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ============================================================
// INIT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Initial hero + progress
  updateHero(0);
  updateProgress(1);

  // Mode card radio listeners
  document.querySelectorAll('input[name="pricingMode"]').forEach(el => {
    el.addEventListener("change", toggleConditionalBlocks);
  });

  // Checkbox listeners
  ["reqRefrigerated", "reqTailLift", "vehicleOverride", "fuelEnabled"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", toggleConditionalBlocks);
  });

  // Debug toggle
  document.getElementById("debug-toggle")?.addEventListener("click", () => {
    const body = document.getElementById("debug-body");
    const toggle = document.getElementById("debug-toggle");
    if (!body || !toggle) return;
    const isHidden = body.style.display === "none";
    body.style.display = isHidden ? "block" : "none";
    toggle.textContent = (isHidden ? "▼" : "▶") + " Détails de sélection (afficher/masquer)";
  });

  // Print / copy
  document.getElementById("btnPrint")?.addEventListener("click", () => window.print());
  document.getElementById("btnDownload")?.addEventListener("click", downloadQuote);

  // Initial conditional block state
  toggleConditionalBlocks();
});

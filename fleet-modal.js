(function () {
  'use strict';

  // Real specs sourced from TARIFF_DATA in calc.js
  var VEHICLES = [
    {
      image: 'images/voiture.png',
      typeIcon: 'images/calc/icon_car.png',
      nameKey: 'veh1-name',
      typeKey: 'veh1-type',
      subtitleKey: 'veh1-subtitle',
      badgeKey: 'veh1-badge',
      volume: '0.50 m³',
      payload: '50 kg',
      specs: [
        { icon: 'images/calc/i_longeur.png', labelKey: 'spec-length',      value: '0.70 m' },
        { icon: 'images/calc/i_hauteur.png', labelKey: 'spec-height',      value: '0.70 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-wheels',value: '0.90 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-load',  value: '0.90 m' },
        { icon: 'images/calc/i_volume.png',  labelKey: 'spec-volume',      value: '0.50 m³' },
        { icon: 'images/calc/i_poids.png',   labelKey: 'spec-payload',     value: '50.00 kg' }
      ]
    },
    {
      image: 'images/camionnette.png',
      typeIcon: '',
      nameKey: 'veh2-name',
      typeKey: 'veh2-type',
      subtitleKey: 'veh2-subtitle',
      badgeKey: 'veh2-badge',
      volume: '9.00 m³',
      payload: '500 kg',
      specs: [
        { icon: 'images/calc/i_longeur.png', labelKey: 'spec-length',      value: '2.50 m' },
        { icon: 'images/calc/i_hauteur.png', labelKey: 'spec-height',      value: '1.76 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-wheels',value: '1.38 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-load',  value: '1.38 m' },
        { icon: 'images/calc/i_volume.png',  labelKey: 'spec-volume',      value: '9.00 m³' },
        { icon: 'images/calc/i_poids.png',   labelKey: 'spec-payload',     value: '500.00 kg' }
      ]
    },
    {
      image: 'images/camionnette.png',
      typeIcon: '',
      nameKey: 'veh3-name',
      typeKey: 'veh3-type',
      subtitleKey: 'veh3-subtitle',
      badgeKey: 'veh3-badge',
      volume: '2.70 m³',
      payload: '450 kg',
      specs: [
        { icon: 'images/calc/i_longeur.png', labelKey: 'spec-length',      value: '1.49 m' },
        { icon: 'images/calc/i_hauteur.png', labelKey: 'spec-height',      value: '1.10 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-wheels',value: '1.05 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-load',  value: '1.05 m' },
        { icon: 'images/calc/i_volume.png',  labelKey: 'spec-volume',      value: '2.70 m³' },
        { icon: 'images/calc/i_poids.png',   labelKey: 'spec-payload',     value: '450.00 kg' }
      ]
    },
    {
      image: 'images/camionnette.png',
      typeIcon: '',
      nameKey: 'veh4-name',
      typeKey: 'veh4-type',
      subtitleKey: 'veh4-subtitle',
      badgeKey: 'veh4-badge',
      volume: '6.00 m³',
      payload: '500 kg',
      specs: [
        { icon: 'images/calc/i_longeur.png', labelKey: 'spec-length',      value: '2.10 m' },
        { icon: 'images/calc/i_hauteur.png', labelKey: 'spec-height',      value: '1.35 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-wheels',value: '1.20 m' },
        { icon: 'images/calc/i_largeur.png', labelKey: 'spec-width-load',  value: '1.20 m' },
        { icon: 'images/calc/i_volume.png',  labelKey: 'spec-volume',      value: '6.00 m³' },
        { icon: 'images/calc/i_poids.png',   labelKey: 'spec-payload',     value: '500.00 kg' }
      ]
    }
  ];

  var currentIdx = 0;
  var overlay = null;

  function tr(key) {
    var lang = localStorage.getItem('lang') || 'fr';
    var dict = window._T && window._T[lang];
    return (dict && dict[key] !== undefined) ? dict[key] : key;
  }

  var SHIELD_SVG = '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2L4 6.5V13c0 5.8 4.3 11.2 10 12.5 5.7-1.3 10-6.7 10-12.5V6.5L14 2z" fill="#0F417B" fill-opacity="0.12" stroke="#0F417B" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 14l3 3 5-5" stroke="#3EB550" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ARROW_LEFT  = '<svg width="18" height="32" viewBox="0 0 18 32" fill="none"><path d="M16 2L2 16L16 30" stroke="#0F417B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARROW_RIGHT = '<svg width="18" height="32" viewBox="0 0 18 32" fill="none"><path d="M2 2L16 16L2 30" stroke="#0F417B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function createModal() {
    overlay = document.createElement('div');
    overlay.id = 'fleetModal';
    overlay.className = 'fleet-modal-overlay';
    overlay.innerHTML =
      '<button class="fleet-modal-nav fleet-modal-prev" id="fleetModalPrev" aria-label="Précédent">' + ARROW_LEFT + '</button>' +
      '<div class="fleet-modal-card-wrap">' +
      '<button class="fleet-modal-close" id="fleetModalClose" aria-label="Fermer">&#10005;</button>' +
      '<div class="fleet-modal-card" id="fleetModalCard">' +
        '<div class="fleet-modal-header">' +
          '<div class="fleet-modal-vehicle-info">' +
            '<img class="fleet-modal-type-icon" id="fmIcon" src="" alt="">' +
            '<div>' +
              '<div class="fleet-modal-type" id="fmType"></div>' +
              '<div class="fleet-modal-subtext" id="fmSubtitle"></div>' +
            '</div>' +
          '</div>' +
          '<div class="fleet-modal-badge" id="fmBadge"></div>' +
        '</div>' +
        '<div class="fleet-modal-img-wrap">' +
          '<img class="fleet-modal-img" id="fmImage" src="" alt="">' +
        '</div>' +
        '<div class="fleet-modal-stats">' +
          '<div class="fleet-modal-stat">' +
            '<img src="images/calc/i_volume.png" class="fleet-modal-stat-icon" alt="">' +
            '<div class="fleet-modal-stat-label" id="fmLblVolume"></div>' +
            '<div class="fleet-modal-stat-value" id="fmVolume"></div>' +
          '</div>' +
          '<div class="fleet-modal-stat">' +
            '<img src="images/calc/i_poids.png" class="fleet-modal-stat-icon" alt="">' +
            '<div class="fleet-modal-stat-label" id="fmLblPayload"></div>' +
            '<div class="fleet-modal-stat-value" id="fmPayload"></div>' +
          '</div>' +
          '<div class="fleet-modal-stat">' +
            '<div class="fleet-modal-stat-icon fleet-modal-shield">' + SHIELD_SVG + '</div>' +
            '<div class="fleet-modal-stat-label" id="fmLblSecurity"></div>' +
            '<div class="fleet-modal-stat-value fleet-modal-stat-green" id="fmSecurity"></div>' +
          '</div>' +
        '</div>' +
        '<div class="fleet-modal-specs">' +
          '<h3 class="fleet-modal-specs-title" id="fmSpecsTitle"></h3>' +
          '<div class="fleet-modal-specs-bar"></div>' +
          '<div class="fleet-modal-specs-list" id="fmSpecsList"></div>' +
        '</div>' +
        '<a href="mailto:express@number-one.be" class="fleet-modal-cta" id="fmCta">' +
          '<span id="fmCtaText"></span>' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</a>' +
      '</div>' +  // close .fleet-modal-card
      '</div>' +  // close .fleet-modal-card-wrap
      '<button class="fleet-modal-nav fleet-modal-next" id="fleetModalNext" aria-label="Suivant">' + ARROW_RIGHT + '</button>';

    document.body.appendChild(overlay);

    document.getElementById('fleetModalClose').addEventListener('click', closeModal);
    document.getElementById('fleetModalPrev').addEventListener('click', function () { navigate(-1); });
    document.getElementById('fleetModalNext').addEventListener('click', function () { navigate(1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('fleet-modal-open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  function populate(idx) {
    var v = VEHICLES[idx];

    var icon = document.getElementById('fmIcon');
    icon.src = v.typeIcon || '';
    icon.style.display = v.typeIcon ? '' : 'none';

    document.getElementById('fmType').textContent     = tr(v.nameKey);
    document.getElementById('fmSubtitle').textContent = tr(v.subtitleKey);
    document.getElementById('fmBadge').textContent    = tr(v.badgeKey);
    document.getElementById('fmImage').src            = v.image;
    document.getElementById('fmImage').alt            = tr(v.nameKey);
    document.getElementById('fmVolume').textContent   = v.volume;
    document.getElementById('fmPayload').textContent  = v.payload;
    document.getElementById('fmLblVolume').textContent   = tr('spec-label-volume');
    document.getElementById('fmLblPayload').textContent  = tr('spec-label-payload');
    document.getElementById('fmLblSecurity').textContent = tr('spec-label-security');
    document.getElementById('fmSecurity').textContent    = tr('spec-security-value');
    document.getElementById('fmSpecsTitle').textContent  = tr('spec-table-title');
    document.getElementById('fmCtaText').textContent     = tr('veh-select-btn');

    var list = document.getElementById('fmSpecsList');
    list.innerHTML = '';
    v.specs.forEach(function (s) {
      var row = document.createElement('div');
      row.className = 'fleet-modal-spec-row';
      var img = document.createElement('img');
      img.src = s.icon; img.className = 'fleet-modal-spec-icon'; img.alt = '';
      var lbl = document.createElement('span');
      lbl.className = 'fleet-modal-spec-label'; lbl.textContent = tr(s.labelKey);
      var val = document.createElement('span');
      val.className = 'fleet-modal-spec-value'; val.textContent = s.value;
      row.appendChild(img); row.appendChild(lbl); row.appendChild(val);
      list.appendChild(row);
    });

    // Dots
    var dots = overlay.querySelectorAll('.fleet-modal-dot');
    dots.forEach(function (d, i) { d.classList.toggle('fleet-modal-dot-active', i === idx); });
  }

  function openModal(idx) {
    currentIdx = idx;
    populate(idx);
    overlay.classList.add('fleet-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.add('fleet-modal-closing');
    setTimeout(function () {
      overlay.classList.remove('fleet-modal-open', 'fleet-modal-closing');
      document.body.style.overflow = '';
    }, 300);
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + VEHICLES.length) % VEHICLES.length;
    var card = document.getElementById('fleetModalCard');
    card.classList.add('fleet-modal-slide');
    setTimeout(function () {
      populate(currentIdx);
      card.classList.remove('fleet-modal-slide');
    }, 180);
  }

  document.addEventListener('DOMContentLoaded', function () {
    createModal();

    // Add navigation dots inside card (after card is created)
    var dots = document.createElement('div');
    dots.className = 'fleet-modal-dots';
    VEHICLES.forEach(function (_, i) {
      var d = document.createElement('div');
      d.className = 'fleet-modal-dot' + (i === 0 ? ' fleet-modal-dot-active' : '');
      d.addEventListener('click', function () { navigate(i - currentIdx); });
      dots.appendChild(d);
    });
    document.getElementById('fleetModalCard').insertBefore(dots, document.getElementById('fmCta'));

    // Wire vehicle cards
    document.querySelectorAll('.vehicle-card').forEach(function (card, idx) {
      card.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(idx);
      });
    });

    // Re-populate on language change
    var prev = window.onLangChange;
    window.onLangChange = function (lang) {
      if (typeof prev === 'function') prev(lang);
      if (overlay && overlay.classList.contains('fleet-modal-open')) populate(currentIdx);
    };
  });
})();

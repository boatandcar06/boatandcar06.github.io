/**
 * ==========================================================================
 * BOAT & CAR 06 — Script principal (partagé par toutes les pages)
 * Aucune dépendance externe, aucun serveur requis.
 * ==========================================================================
 */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* Icônes véhicules (SVG vectoriel, pas de photo — voir README)      */
  /* ---------------------------------------------------------------- */
  const ICON_COLOR = "#0091d0";

  const VEHICLE_ICONS = {
    voiture: `<svg viewBox="0 0 240 120" style="color:${ICON_COLOR}" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 82 C20 70 28 62 40 62 L58 62 L78 36 C82 30 90 26 98 26 L165 26 C176 26 186 32 192 42 L206 62 L214 62 C222 62 228 68 228 76 L228 82" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 82 L228 82" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M78 36 L86 62 M165 26 L178 62" stroke="currentColor" stroke-width="2" fill="none" opacity=".55"/>
      <circle cx="66" cy="86" r="16" stroke="currentColor" stroke-width="3" fill="none"/>
      <circle cx="188" cy="86" r="16" stroke="currentColor" stroke-width="3" fill="none"/>
    </svg>`,
    utilitaire: `<svg viewBox="0 0 240 130" style="color:${ICON_COLOR}" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 96 L18 46 C18 40 23 36 29 36 L150 36 C158 36 165 40 169 47 L196 74 L214 74 C220 74 224 79 224 85 L224 96" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M18 96 L224 96" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M150 36 L150 74 L196 74" stroke="currentColor" stroke-width="2" fill="none" opacity=".55"/>
      <path d="M60 36 L60 74 M105 36 L105 74" stroke="currentColor" stroke-width="1.5" fill="none" opacity=".3"/>
      <circle cx="64" cy="100" r="17" stroke="currentColor" stroke-width="3" fill="none"/>
      <circle cx="192" cy="100" r="17" stroke="currentColor" stroke-width="3" fill="none"/>
    </svg>`,
    moto: `<svg viewBox="0 0 240 130" style="color:${ICON_COLOR}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="56" cy="96" r="26" stroke="currentColor" stroke-width="3" fill="none"/>
      <circle cx="188" cy="96" r="26" stroke="currentColor" stroke-width="3" fill="none"/>
      <path d="M56 96 L92 60 L132 60 L150 40" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M92 60 L112 96 L188 96" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M112 96 L132 60" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M132 60 L152 58 L168 70" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M40 46 L70 46" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,
    bateau: `<svg viewBox="0 0 240 130" style="color:${ICON_COLOR}" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 92 L210 92 L192 118 L48 118 Z" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round"/>
      <path d="M70 92 L70 40 L150 92" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M70 55 L110 55" stroke="currentColor" stroke-width="2" fill="none" opacity=".5"/>
      <path d="M14 92 C 60 106, 180 106, 226 92" stroke="currentColor" stroke-width="2" fill="none" opacity=".4"/>
    </svg>`
  };

  function vehicleIcon(type) {
    return VEHICLE_ICONS[type] || VEHICLE_ICONS.voiture;
  }

  function mediaHTML(item) {
    if (item.images && item.images.length) {
      return `<img src="${item.images[0]}" alt="${item.marque} ${item.modele}">`;
    }
    return vehicleIcon(item.type);
  }

  function typeLabel(type) {
    const found = (typeof VEHICLE_TYPES !== "undefined") ? VEHICLE_TYPES.find(t => t.id === type) : null;
    return found ? found.label.replace(/s$/, "") : type;
  }

  // Catalogue complet des marques (data-brands.js), pas seulement celles en stock
  function brandsForType(type) {
    if (typeof BRANDS_BY_TYPE === "undefined") return [];
    const lists = type === "all" ? Object.values(BRANDS_BY_TYPE) : [BRANDS_BY_TYPE[type] || []];
    const set = new Set();
    lists.forEach(list => list.forEach(b => { if (b !== "Autre") set.add(b); }));
    return [...set].sort((a, b) => a.localeCompare(b, "fr")).concat(["Autre"]);
  }

  /* ---------------------------------------------------------------- */
  /* Formatage                                                         */
  /* ---------------------------------------------------------------- */
  function formatPrice(n) {
    return new Intl.NumberFormat("fr-FR").format(n) + " €";
  }
  function formatKm(n, type) {
    const unit = type === "bateau" ? "h moteur" : "km";
    return new Intl.NumberFormat("fr-FR").format(n) + " " + unit;
  }
  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /* ---------------------------------------------------------------- */
  /* Mobile nav                                                        */
  /* ---------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const drawer = document.querySelector("[data-mobile-nav]");
    if (!toggle || !drawer) return;
    toggle.addEventListener("click", () => {
      drawer.classList.toggle("open");
    });
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("open")));
  }

  /* ---------------------------------------------------------------- */
  /* Cartes annonces                                                   */
  /* ---------------------------------------------------------------- */
  function listingCardHTML(item) {
    const statusBadge = item.status === "reserve"
      ? `<span class="badge badge--reserved">Réservé</span>`
      : `<span class="badge badge--available">Disponible</span>`;
    return `
    <article class="listing-card" data-type="${item.type}" data-marque="${item.marque}" data-prix="${item.prix}" data-annee="${item.annee}">
      <div class="listing-card__media">
        ${statusBadge}
        <span class="badge badge--type">${typeLabel(item.type)}</span>
        ${mediaHTML(item)}
        <span class="stripe-bar"></span>
      </div>
      <div class="listing-card__body">
        <div class="listing-card__title">
          <h3>${item.marque} ${item.modele}</h3>
          <span class="year">${item.annee}</span>
        </div>
        <div class="listing-card__meta">
          <span class="chip">${formatKm(item.km, item.type)}</span>
          <span class="chip">${item.carburant}</span>
          <span class="chip">${item.puissance}</span>
        </div>
        <div class="listing-card__price">
          <b>${formatPrice(item.prix)}</b>
        </div>
      </div>
      <div class="listing-card__actions">
        <a class="btn btn--outline btn--sm btn--block" href="vehicule.html?id=${item.id}">Voir la fiche</a>
        <button class="btn btn--primary btn--sm btn--block" data-open-interest data-vehicle-id="${item.id}" data-vehicle-name="${item.marque} ${item.modele}">Je suis intéressé</button>
      </div>
    </article>`;
  }

  function renderFeatured() {
    const el = document.querySelector("[data-featured-listings]");
    if (!el) return;
    const items = LISTINGS.filter(l => l.featured && l.status !== "vendu").slice(0, 6);
    el.innerHTML = items.map(listingCardHTML).join("");
  }

  /* ---------------------------------------------------------------- */
  /* Page Offres : rendu + filtres                                     */
  /* ---------------------------------------------------------------- */
  function initOffresPage() {
    const grid = document.querySelector("[data-all-listings]");
    if (!grid) return;

    const typeSelect = document.querySelector("#filter-type");
    const marqueSelect = document.querySelector("#filter-marque");
    const modeleSelect = document.querySelector("#filter-modele");
    const prixMinInput = document.querySelector("#filter-prix-min");
    const prixMaxInput = document.querySelector("#filter-prix-max");
    const triSelect = document.querySelector("#filter-tri");
    const searchInput = document.querySelector("#filter-search");
    const resultsCount = document.querySelector("[data-results-count]");
    const emptyState = document.querySelector("[data-empty-state]");

    // Marque : catalogue complet (toutes marques du type choisi, en stock ou non)
    function refreshMarques() {
      const marques = brandsForType(typeSelect.value);
      const current = marqueSelect.value;
      marqueSelect.innerHTML = '<option value="all">Toutes les marques</option>' +
        marques.map(m => `<option value="${m}">${m}</option>`).join("");
      if (marques.includes(current)) marqueSelect.value = current;
    }

    // Modèle : nécessite d'avoir choisi une marque au préalable (sinon la liste
    // serait trop longue et mélangerait des modèles sans rapport entre eux)
    function refreshModeles() {
      if (marqueSelect.value === "all") {
        modeleSelect.innerHTML = '<option value="all">Choisissez une marque d’abord</option>';
        modeleSelect.value = "all";
        modeleSelect.disabled = true;
        return;
      }
      let pool = LISTINGS.filter(l => l.marque === marqueSelect.value);
      if (typeSelect.value !== "all") pool = pool.filter(l => l.type === typeSelect.value);
      const modeles = [...new Set(pool.map(l => l.modele))].sort((a, b) => a.localeCompare(b, "fr"));
      const current = modeleSelect.value;
      if (modeles.length === 0) {
        modeleSelect.innerHTML = '<option value="all">Aucun modèle disponible</option>';
        modeleSelect.value = "all";
        modeleSelect.disabled = true;
        return;
      }
      modeleSelect.innerHTML = '<option value="all">Tous les modèles</option>' +
        modeles.map(m => `<option value="${m}">${m}</option>`).join("");
      modeleSelect.disabled = false;
      if (modeles.includes(current)) modeleSelect.value = current;
    }

    function applyFilters() {
      let items = LISTINGS.filter(l => l.status !== "vendu");

      if (typeSelect.value !== "all") items = items.filter(l => l.type === typeSelect.value);
      if (marqueSelect.value !== "all") items = items.filter(l => l.marque === marqueSelect.value);
      if (modeleSelect.value !== "all") items = items.filter(l => l.modele === modeleSelect.value);
      const min = parseInt(prixMinInput.value, 10);
      const max = parseInt(prixMaxInput.value, 10);
      if (!isNaN(min)) items = items.filter(l => l.prix >= min);
      if (!isNaN(max)) items = items.filter(l => l.prix <= max);
      const q = searchInput.value.trim().toLowerCase();
      if (q) {
        items = items.filter(l => (`${l.marque} ${l.modele}`).toLowerCase().includes(q));
      }

      switch (triSelect.value) {
        case "prix-asc": items.sort((a, b) => a.prix - b.prix); break;
        case "prix-desc": items.sort((a, b) => b.prix - a.prix); break;
        case "annee-desc": items.sort((a, b) => b.annee - a.annee); break;
        default: break;
      }

      grid.innerHTML = items.map(listingCardHTML).join("");
      if (resultsCount) {
        resultsCount.textContent = items.length + (items.length > 1 ? " véhicules trouvés" : " véhicule trouvé");
      }
      if (emptyState) emptyState.style.display = items.length ? "none" : "block";
    }

    // Init depuis l'URL (?type=voiture&marque=BMW&budget=80000 depuis la recherche rapide)
    const urlType = qs("type");
    const urlMarque = qs("marque");
    const urlBudget = qs("budget");
    if (urlType) typeSelect.value = urlType;

    typeSelect.addEventListener("change", () => { refreshMarques(); refreshModeles(); applyFilters(); });
    marqueSelect.addEventListener("change", () => { refreshModeles(); applyFilters(); });
    [modeleSelect, triSelect].forEach(el => el.addEventListener("change", applyFilters));
    [prixMinInput, prixMaxInput].forEach(el => el.addEventListener("input", applyFilters));
    searchInput.addEventListener("input", applyFilters);

    refreshMarques();
    if (urlMarque) marqueSelect.value = urlMarque;
    refreshModeles();
    if (urlBudget) prixMaxInput.value = urlBudget;
    applyFilters();
  }

  /* ---------------------------------------------------------------- */
  /* Recherche rapide (hero de la page d'accueil)                      */
  /* ---------------------------------------------------------------- */
  function initHeroSearch() {
    const form = document.querySelector("[data-hero-search]");
    if (!form) return;
    const typeSelect = form.querySelector("#hero-type");
    const marqueSelect = form.querySelector("#hero-marque");

    function refreshMarques() {
      const marques = brandsForType(typeSelect.value);
      marqueSelect.innerHTML = '<option value="all">Toutes les marques</option>' +
        marques.map(m => `<option value="${m}">${m}</option>`).join("");
    }

    typeSelect.addEventListener("change", refreshMarques);
    refreshMarques();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      const type = typeSelect.value;
      const marque = marqueSelect.value;
      const budget = form.querySelector("#hero-budget").value;
      if (type !== "all") params.set("type", type);
      if (marque !== "all") params.set("marque", marque);
      if (budget !== "all") params.set("budget", budget);
      const qsString = params.toString();
      window.location.href = "offres.html" + (qsString ? "?" + qsString : "");
    });
  }

  /* ---------------------------------------------------------------- */
  /* Page détail véhicule                                              */
  /* ---------------------------------------------------------------- */
  function initDetailPage() {
    const root = document.querySelector("[data-vehicle-detail]");
    if (!root) return;
    const id = qs("id");
    const item = LISTINGS.find(l => l.id === id);

    if (!item) {
      root.innerHTML = `<div class="empty-state">
        <h3>Véhicule introuvable</h3>
        <p>Cette annonce n'existe plus ou a été retirée.</p>
        <a class="btn btn--primary" href="offres.html">Voir toutes nos offres</a>
      </div>`;
      document.title = "Véhicule introuvable · Boat & Car 06";
      return;
    }

    document.title = `${item.marque} ${item.modele} · Boat & Car 06`;
    const statusBadge = item.status === "reserve"
      ? `<span class="badge badge--reserved" style="position:static">Réservé</span>`
      : `<span class="badge badge--available" style="position:static">Disponible</span>`;

    root.innerHTML = `
      <div class="breadcrumb">
        <a href="index.html">Accueil</a> <span>/</span> <a href="offres.html">Nos offres</a> <span>/</span> <span>${item.marque} ${item.modele}</span>
      </div>
      <div class="detail-grid">
        <div>
          <div class="detail-media" data-detail-media>
            ${mediaHTML(item)}
            <span class="stripe-bar"></span>
          </div>
          ${item.images && item.images.length > 1 ? `
          <div class="detail-thumbs">
            ${item.images.map((src, i) => `<button type="button" class="${i === 0 ? "active" : ""}" data-thumb="${i}"><img src="${src}" alt=""></button>`).join("")}
          </div>` : ""}
          <div class="detail-points">${statusBadge}<span class="badge badge--type" style="position:static">${typeLabel(item.type)}</span>${(item.points_forts||[]).map(p => `<span class="chip">${p}</span>`).join("")}</div>
          <h2 style="text-transform:none;font-size:1.5rem;margin-top:24px;">Description</h2>
          <p>${item.description}</p>
          <h2 style="text-transform:none;font-size:1.3rem;margin-top:28px;">Caractéristiques</h2>
          <div class="spec-table">
            <div><small>Marque</small><strong>${item.marque}</strong></div>
            <div><small>Modèle</small><strong>${item.modele}</strong></div>
            <div><small>Année</small><strong>${item.annee}</strong></div>
            <div><small>${item.type === "bateau" ? "Heures moteur" : "Kilométrage"}</small><strong>${new Intl.NumberFormat("fr-FR").format(item.km)}</strong></div>
            <div><small>Carburant</small><strong>${item.carburant}</strong></div>
            <div><small>Transmission</small><strong>${item.transmission}</strong></div>
            <div><small>Couleur</small><strong>${item.couleur}</strong></div>
            <div><small>Puissance</small><strong>${item.puissance}</strong></div>
          </div>
        </div>
        <aside class="detail-side">
          <div class="price">${formatPrice(item.prix)}</div>
          <div class="price-sub">Prix affiché, hors frais éventuels de mise en route</div>
          <button class="btn btn--primary btn--block" data-open-interest data-vehicle-id="${item.id}" data-vehicle-name="${item.marque} ${item.modele}">Je suis intéressé</button>
          <a class="btn btn--outline btn--block" style="margin-top:12px" href="contact.html">Poser une question</a>
          <p style="margin-top:20px;font-size:.82rem;">Aucun paiement en ligne : un membre de l'équipe ${SITE_CONFIG.companyName} vous recontacte pour organiser la suite (essai, visite, réservation).</p>
        </aside>
      </div>
    `;

    if (item.images && item.images.length > 1) {
      const mediaEl = root.querySelector("[data-detail-media]");
      root.querySelectorAll("[data-thumb]").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = parseInt(btn.getAttribute("data-thumb"), 10);
          const img = mediaEl.querySelector("img");
          if (img) img.src = item.images[i];
          root.querySelectorAll("[data-thumb]").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        });
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Avis clients                                                       */
  /* ---------------------------------------------------------------- */
  function starsHTML(note) {
    let out = "";
    for (let i = 1; i <= 5; i++) {
      out += `<svg viewBox="0 0 20 20" class="${i <= note ? "" : "off"}"><path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L10 15l-5.6 3.1 1.4-6.3L1 8.5l6.4-.6z"/></svg>`;
    }
    return `<div class="stars">${out}</div>`;
  }
  function renderReviews() {
    const el = document.querySelector("[data-reviews]");
    if (!el || typeof REVIEWS === "undefined") return;
    el.innerHTML = REVIEWS.map(r => `
      <div class="review-card">
        ${starsHTML(r.note)}
        <p>"${r.texte}"</p>
        <div class="review-card__author">
          <div class="review-card__avatar">${r.nom.charAt(0)}</div>
          <div>
            <strong style="font-size:.9rem;">${r.nom}</strong>
            <small>${r.vehicule}</small>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ---------------------------------------------------------------- */
  /* Dernières ventes                                                   */
  /* ---------------------------------------------------------------- */
  function renderSales() {
    const el = document.querySelector("[data-sales-list]");
    if (!el || typeof RECENT_SALES === "undefined") return;
    el.innerHTML = RECENT_SALES.map(s => `
      <div class="sales-row">
        <div class="sales-row__name">${s.marque} ${s.modele} <span>${s.annee}</span></div>
        <div class="sales-row__price">${formatPrice(s.prix)}</div>
        <div class="sales-row__duration">${s.duree}</div>
        <div class="badge badge--sold" style="position:static;justify-self:start;">Vendu</div>
      </div>
    `).join("");
  }

  /* ---------------------------------------------------------------- */
  /* Compteurs animés (stat hero)                                       */
  /* ---------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const animate = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target + suffix; return; }
        el.textContent = current + suffix;
        requestAnimationFrame(tick);
      };
      tick();
    };
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
      }, { threshold: .4 });
      counters.forEach(c => obs.observe(c));
    } else {
      counters.forEach(animate);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Modale "Je suis intéressé"                                        */
  /* ---------------------------------------------------------------- */
  function initInterestModal() {
    const overlay = document.querySelector("#interest-modal");
    if (!overlay) return;
    const closeBtn = overlay.querySelector("[data-modal-close]");
    const subtitle = overlay.querySelector("[data-modal-sub]");
    const vehicleField = overlay.querySelector("#interest-vehicule");

    function open(name, id) {
      if (subtitle) subtitle.textContent = name ? `Concernant : ${name}` : "Décrivez votre projet, nous revenons vers vous rapidement.";
      if (vehicleField) vehicleField.value = name ? `${name} (réf. ${id})` : "";
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-open-interest]");
      if (trigger) {
        open(trigger.getAttribute("data-vehicle-name"), trigger.getAttribute("data-vehicle-id"));
      }
    });
    closeBtn && closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------------------------------------------------------------- */
  /* Envoi des formulaires (sans serveur : mailto, ou endpoint si fourni) */
  /* ---------------------------------------------------------------- */
  function handleFormSubmit(form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const successBox = form.querySelector(".form-success");
      const submitBtn = form.querySelector('[type="submit"]');

      const subject = data.vehicule
        ? `Demande d'information : ${data.vehicule}`
        : (data.sujet || `Nouveau message depuis le site ${SITE_CONFIG.companyName}`);

      const bodyLines = [
        `Nom : ${data.nom || ""} ${data.prenom || ""}`,
        `Email : ${data.email || ""}`,
        `Téléphone : ${data.telephone || ""}`,
        data.vehicule ? `Véhicule concerné : ${data.vehicule}` : null,
        "",
        "Message :",
        data.message || ""
      ].filter(Boolean).join("\n");

      const endpoint = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.formEndpoint) ? SITE_CONFIG.formEndpoint : "";

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Envoi..."; }

      try {
        if (endpoint) {
          await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(data)
          });
        } else {
          const mailto = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
          window.location.href = mailto;
        }
      } catch (err) {
        // En cas d'échec réseau, on retombe sur le mailto
        const mailto = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
        window.location.href = mailto;
      }

      if (successBox) successBox.classList.add("visible");
      form.reset();
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.getAttribute("data-label") || "Envoyer la demande"; }

      // Ferme la modale automatiquement après un envoi réussi
      const modal = form.closest(".modal-overlay");
      if (modal) {
        setTimeout(() => {
          modal.classList.remove("open");
          document.body.style.overflow = "";
          if (successBox) successBox.classList.remove("visible");
        }, 2200);
      }
    });
  }

  function initForms() {
    document.querySelectorAll("form[data-lead-form]").forEach(handleFormSubmit);
  }

  /* ---------------------------------------------------------------- */
  /* Injecte les infos de contact (téléphone, email…) depuis config     */
  /* ---------------------------------------------------------------- */
  function injectConfig() {
    if (typeof SITE_CONFIG === "undefined") return;
    document.querySelectorAll("[data-cfg-phone]").forEach(el => el.textContent = SITE_CONFIG.phoneDisplay);
    document.querySelectorAll("[data-cfg-phone-href]").forEach(el => el.setAttribute("href", "tel:" + SITE_CONFIG.phone.replace(/\s/g, "")));
    document.querySelectorAll("[data-cfg-email]").forEach(el => el.textContent = SITE_CONFIG.email);
    document.querySelectorAll("[data-cfg-email-href]").forEach(el => el.setAttribute("href", "mailto:" + SITE_CONFIG.email));
    document.querySelectorAll("[data-cfg-address]").forEach(el => el.textContent = SITE_CONFIG.address);
    document.querySelectorAll("[data-cfg-year]").forEach(el => el.textContent = new Date().getFullYear());
  }

  /* ---------------------------------------------------------------- */
  /* Init                                                               */
  /* ---------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    injectConfig();
    initMobileNav();
    renderFeatured();
    renderReviews();
    renderSales();
    initCounters();
    initInterestModal();
    initForms();
    initOffresPage();
    initDetailPage();
    initHeroSearch();
  });

  // Expose quelques utilitaires pour la page admin
  window.BC06 = { vehicleIcon, typeLabel, formatPrice, formatKm };
})();

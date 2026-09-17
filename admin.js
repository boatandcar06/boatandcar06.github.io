/**
 * ==========================================================================
 * ESPACE ADMIN — Connexion + gestion des annonces (intégré à chaque page)
 * ==========================================================================
 * Le site est hébergé sur GitHub Pages (statique, sans serveur). Cette
 * "connexion" est donc un simple verrou côté navigateur : pratique pour
 * réserver l'accès à l'outil de gestion, mais PAS une sécurité réelle
 * (le code reste visible dans les fichiers du site). Pour une vraie
 * authentification, il faudrait un service côté serveur.
 *
 * Identifiants par défaut : admin / bcar06 (à changer ci-dessous).
 * ==========================================================================
 */
(function () {
  "use strict";

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "bcar06";
  const AUTH_KEY = "bc06_admin_session";
  const DRAFT_KEY = "bc06_admin_listings_draft";

  const accountBtn = document.querySelector("[data-account-toggle]");
  const loginModal = document.querySelector("#login-modal");
  const adminModal = document.querySelector("#admin-modal");
  if (!accountBtn || !loginModal || !adminModal) return; // page sans le bloc admin

  const loginForm = loginModal.querySelector("form");
  const loginError = loginModal.querySelector(".form-error");

  /* ---------------------------------------------------------------- */
  /* État de connexion                                                 */
  /* ---------------------------------------------------------------- */
  function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  }
  function setLoggedIn(v) {
    if (v) sessionStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.removeItem(AUTH_KEY);
    refreshAccountIcon();
  }
  function refreshAccountIcon() {
    accountBtn.classList.toggle("is-active", isLoggedIn());
    accountBtn.setAttribute("title", isLoggedIn() ? "Espace admin (connecté)" : "Connexion");
    accountBtn.querySelector(".dot-badge")?.remove();
    if (isLoggedIn()) {
      const dot = document.createElement("span");
      dot.className = "dot-badge";
      accountBtn.appendChild(dot);
    }
  }

  function openModal(el) { el.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeModal(el) { el.classList.remove("open"); document.body.style.overflow = ""; }

  accountBtn.addEventListener("click", () => {
    if (isLoggedIn()) {
      openModal(adminModal);
      renderAdmin();
    } else {
      loginError.classList.remove("visible");
      loginForm.reset();
      openModal(loginModal);
    }
  });

  document.querySelectorAll("[data-modal-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      const overlay = btn.closest(".modal-overlay");
      if (overlay) closeModal(overlay);
    });
  });
  [loginModal, adminModal].forEach(overlay => {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(overlay); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (loginModal.classList.contains("open")) closeModal(loginModal);
    if (adminModal.classList.contains("open")) closeModal(adminModal);
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm).entries());
    if (data.username === ADMIN_USER && data.password === ADMIN_PASS) {
      setLoggedIn(true);
      closeModal(loginModal);
      openModal(adminModal);
      renderAdmin();
    } else {
      loginError.textContent = "Identifiant ou mot de passe incorrect.";
      loginError.classList.add("visible");
    }
  });

  const logoutBtn = adminModal.querySelector("[data-admin-logout]");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setLoggedIn(false);
      closeModal(adminModal);
    });
  }

  refreshAccountIcon();

  /* ---------------------------------------------------------------- */
  /* Gestion des annonces (identique à l'ancienne page admin.html)     */
  /* ---------------------------------------------------------------- */
  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(LISTINGS));
  }
  function saveDraft(draft) {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch (e) { /* ignore */ }
  }

  let draft = loadDraft();

  const listEl = adminModal.querySelector("[data-admin-list]");
  const countEl = adminModal.querySelector("[data-admin-count]");
  const codeEl = adminModal.querySelector("[data-admin-code]");
  const form = adminModal.querySelector("[data-admin-form]");
  const typeSelect = form.querySelector('[name="type"]');
  const marqueSelect = form.querySelector('[name="marque"]');
  const resetBtn = adminModal.querySelector("[data-admin-reset]");
  const copyBtn = adminModal.querySelector("[data-admin-copy]");
  const copyFeedback = adminModal.querySelector("[data-copy-feedback]");

  function refreshMarqueOptions() {
    const brands = BRANDS_BY_TYPE[typeSelect.value] || [];
    marqueSelect.innerHTML = brands.map(b => `<option value="${b}">${b}</option>`).join("");
  }

  function slugify(str) {
    return str.toString().toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function renderAdmin() {
    countEl.textContent = draft.length + (draft.length > 1 ? " annonces" : " annonce");
    listEl.innerHTML = draft.map((item, idx) => `
      <div class="admin-row">
        <div class="admin-row__title">
          ${item.marque} ${item.modele}
          <small>${item.annee} · ${new Intl.NumberFormat("fr-FR").format(item.prix)} € · ${item.status === "reserve" ? "Réservé" : "Disponible"}</small>
        </div>
        <div class="admin-row__actions">
          <button type="button" class="icon-btn" data-toggle-status="${idx}" title="Basculer disponible / réservé">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" class="icon-btn" data-remove="${idx}" title="Retirer l'annonce">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    `).join("") || `<p style="color:var(--text-faint);">Aucune annonce. Ajoutez-en une avec le formulaire.</p>`;

    codeEl.textContent = "const LISTINGS = " + JSON.stringify(draft, null, 2) + ";\n";
    saveDraft(draft);
  }

  listEl.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-remove]");
    const tg = e.target.closest("[data-toggle-status]");
    if (rm) {
      draft.splice(parseInt(rm.getAttribute("data-remove"), 10), 1);
      renderAdmin();
    } else if (tg) {
      const i = parseInt(tg.getAttribute("data-toggle-status"), 10);
      draft[i].status = draft[i].status === "reserve" ? "disponible" : "reserve";
      renderAdmin();
    }
  });

  typeSelect.addEventListener("change", refreshMarqueOptions);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const marqueModele = `${data.marque}-${data.modele}-${data.annee}`;
    const item = {
      id: slugify(marqueModele) + "-" + Math.random().toString(36).slice(2, 6),
      type: data.type,
      marque: data.marque,
      modele: data.modele,
      annee: parseInt(data.annee, 10),
      prix: parseInt(data.prix, 10),
      km: parseInt(data.km, 10) || 0,
      carburant: data.carburant,
      transmission: data.transmission,
      couleur: data.couleur || "—",
      puissance: data.puissance || "—",
      description: data.description || "",
      points_forts: (data.points_forts || "").split(",").map(s => s.trim()).filter(Boolean),
      featured: form.querySelector('[name="featured"]').checked,
      status: "disponible"
    };
    draft.unshift(item);
    renderAdmin();
    form.reset();
    refreshMarqueOptions();
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("Réinitialiser la liste depuis data-listings.js ? Vos modifications locales seront perdues.")) return;
    draft = JSON.parse(JSON.stringify(LISTINGS));
    renderAdmin();
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(codeEl.textContent);
      copyFeedback.textContent = "Code copié ! Collez-le dans data-listings.js puis publiez (commit + push) sur GitHub.";
    } catch (e) {
      copyFeedback.textContent = "Impossible de copier automatiquement : sélectionnez le code manuellement.";
    }
    copyFeedback.style.display = "block";
    setTimeout(() => { copyFeedback.style.display = "none"; }, 5000);
  });

  refreshMarqueOptions();
  if (isLoggedIn()) renderAdmin();
})();

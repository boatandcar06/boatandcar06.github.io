/**
 * ==========================================================================
 * ADMIN — Gestion des annonces (page hors navigation publique)
 * ==========================================================================
 * Le site n'ayant pas de serveur/base de données (hébergement GitHub Pages),
 * cette page travaille sur une copie locale des annonces (localStorage) et
 * génère le code prêt à coller dans data-listings.js pour publier vos
 * changements. Voir README.md pour la marche à suivre complète.
 * ==========================================================================
 */
(function () {
  "use strict";
  const STORAGE_KEY = "bc06_admin_listings_draft";

  function loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(LISTINGS));
  }
  function saveDraft(draft) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); } catch (e) { /* ignore */ }
  }

  let draft = loadDraft();

  const listEl = document.querySelector("[data-admin-list]");
  const countEl = document.querySelector("[data-admin-count]");
  const codeEl = document.querySelector("[data-admin-code]");
  const form = document.querySelector("[data-admin-form]");
  const typeSelect = form.querySelector('[name="type"]');
  const marqueSelect = form.querySelector('[name="marque"]');
  const resetBtn = document.querySelector("[data-admin-reset]");
  const copyBtn = document.querySelector("[data-admin-copy]");
  const copyFeedback = document.querySelector("[data-copy-feedback]");

  function refreshMarqueOptions() {
    const brands = BRANDS_BY_TYPE[typeSelect.value] || [];
    marqueSelect.innerHTML = brands.map(b => `<option value="${b}">${b}</option>`).join("");
  }

  function slugify(str) {
    return str.toString().toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function render() {
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
      render();
    } else if (tg) {
      const i = parseInt(tg.getAttribute("data-toggle-status"), 10);
      draft[i].status = draft[i].status === "reserve" ? "disponible" : "reserve";
      render();
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
    render();
    form.reset();
    refreshMarqueOptions();
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("Réinitialiser la liste depuis data-listings.js ? Vos modifications locales seront perdues.")) return;
    draft = JSON.parse(JSON.stringify(LISTINGS));
    render();
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
  render();
})();

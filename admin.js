(function () {
  "use strict";

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "bcar06";
  const AUTH_KEY = "bc06_admin_session";
  const DRAFT_KEY = "bc06_admin_listings_draft";
  const GH_REPO_KEY = "bc06_gh_repo";
  const GH_TOKEN_KEY = "bc06_gh_token";

  const accountBtn = document.querySelector("[data-account-toggle]");
  const loginModal = document.querySelector("#login-modal");
  const adminModal = document.querySelector("#admin-modal");
  if (!accountBtn || !loginModal || !adminModal) return;

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
  /* Réglages de publication (dépôt GitHub + token)                    */
  /* ---------------------------------------------------------------- */
  const settingsPanel = adminModal.querySelector("[data-admin-settings]");
  const settingsToggle = adminModal.querySelector("[data-admin-settings-toggle]");
  const repoInput = adminModal.querySelector("[data-gh-repo]");
  const tokenInput = adminModal.querySelector("[data-gh-token]");
  const ghSaveBtn = adminModal.querySelector("[data-gh-save]");
  const ghSaveFeedback = adminModal.querySelector("[data-gh-save-feedback]");

  function getGhConfig() {
    return {
      repo: localStorage.getItem(GH_REPO_KEY) || "",
      token: localStorage.getItem(GH_TOKEN_KEY) || ""
    };
  }
  if (repoInput) repoInput.value = getGhConfig().repo;

  if (settingsToggle) {
    settingsToggle.addEventListener("click", () => {
      settingsPanel.style.display = settingsPanel.style.display === "none" ? "block" : "none";
    });
  }

  if (ghSaveBtn) {
    ghSaveBtn.addEventListener("click", () => {
      const repo = repoInput.value.trim();
      const token = tokenInput.value.trim();
      if (repo) localStorage.setItem(GH_REPO_KEY, repo);
      if (token) localStorage.setItem(GH_TOKEN_KEY, token);
      tokenInput.value = "";
      ghSaveFeedback.textContent = "Enregistré sur cet appareil.";
      ghSaveFeedback.style.display = "block";
      setTimeout(() => { ghSaveFeedback.style.display = "none"; }, 3000);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Gestion des annonces                                              */
  /* ---------------------------------------------------------------- */
  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(LISTINGS));
  }
  function saveDraft(d) {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
  }

  let draft = loadDraft();
  let pendingImages = [];

  const listEl = adminModal.querySelector("[data-admin-list]");
  const countEl = adminModal.querySelector("[data-admin-count]");
  const form = adminModal.querySelector("[data-admin-form]");
  const typeSelect = form.querySelector('[name="type"]');
  const marqueSelect = form.querySelector('[name="marque"]');
  const editIdInput = form.querySelector('[name="editId"]');
  const photosInput = form.querySelector('[name="photos"]');
  const photoPreview = adminModal.querySelector("[data-photo-preview]");
  const formTitle = adminModal.querySelector("[data-form-title]");
  const submitBtn = adminModal.querySelector("[data-form-submit]");
  const cancelBtn = adminModal.querySelector("[data-form-cancel]");
  const resetBtn = adminModal.querySelector("[data-admin-reset]");
  const publishBtn = adminModal.querySelector("[data-admin-publish]");
  const publishFeedback = adminModal.querySelector("[data-publish-feedback]");

  function refreshMarqueOptions() {
    const brands = BRANDS_BY_TYPE[typeSelect.value] || [];
    marqueSelect.innerHTML = brands.map(b => `<option value="${b}">${b}</option>`).join("");
  }

  function slugify(str) {
    return str.toString().toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  /* --- Photos : compression côté client avant stockage / publication --- */
  function compressImage(file, maxW, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function renderPhotoPreview() {
    photoPreview.innerHTML = pendingImages.map((src, i) => `
      <div class="admin-photo-thumb">
        <img src="${src}" alt="">
        <button type="button" data-remove-photo="${i}" aria-label="Retirer">&times;</button>
      </div>
    `).join("");
  }

  photoPreview.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-remove-photo]");
    if (!rm) return;
    pendingImages.splice(parseInt(rm.getAttribute("data-remove-photo"), 10), 1);
    renderPhotoPreview();
  });

  photosInput.addEventListener("change", async () => {
    const room = Math.max(0, 6 - pendingImages.length);
    const files = Array.from(photosInput.files || []).slice(0, room);
    for (const file of files) {
      try {
        pendingImages.push(await compressImage(file, 1280, 0.72));
      } catch (e) { /* fichier ignoré */ }
    }
    photosInput.value = "";
    renderPhotoPreview();
  });

  function resetForm() {
    form.reset();
    editIdInput.value = "";
    pendingImages = [];
    renderPhotoPreview();
    refreshMarqueOptions();
    formTitle.textContent = "Ajouter une annonce";
    submitBtn.textContent = "Ajouter l'annonce";
    cancelBtn.style.display = "none";
  }

  function startEdit(id) {
    const item = draft.find(l => l.id === id);
    if (!item) return;
    editIdInput.value = id;
    typeSelect.value = item.type;
    refreshMarqueOptions();
    marqueSelect.value = item.marque;
    form.querySelector('[name="modele"]').value = item.modele;
    form.querySelector('[name="annee"]').value = item.annee;
    form.querySelector('[name="prix"]').value = item.prix;
    form.querySelector('[name="km"]').value = item.km;
    form.querySelector('[name="carburant"]').value = item.carburant;
    form.querySelector('[name="transmission"]').value = item.transmission;
    form.querySelector('[name="couleur"]').value = item.couleur === "—" ? "" : item.couleur;
    form.querySelector('[name="puissance"]').value = item.puissance === "—" ? "" : item.puissance;
    form.querySelector('[name="description"]').value = item.description || "";
    form.querySelector('[name="points_forts"]').value = (item.points_forts || []).join(", ");
    form.querySelector('[name="featured"]').checked = !!item.featured;
    pendingImages = Array.isArray(item.images) ? [...item.images] : [];
    renderPhotoPreview();
    formTitle.textContent = `Modifier ${item.marque} ${item.modele}`;
    submitBtn.textContent = "Enregistrer les modifications";
    cancelBtn.style.display = "inline-flex";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  cancelBtn.addEventListener("click", resetForm);

  function renderAdmin() {
    countEl.textContent = draft.length + (draft.length > 1 ? " annonces" : " annonce");
    listEl.innerHTML = draft.map((item) => `
      <div class="admin-row">
        <div class="admin-row__title">
          ${item.marque} ${item.modele}
          <small>${item.annee} · ${new Intl.NumberFormat("fr-FR").format(item.prix)} € · ${item.status === "reserve" ? "Réservé" : "Disponible"}${item.images && item.images.length ? " · " + item.images.length + " photo" + (item.images.length > 1 ? "s" : "") : ""}</small>
        </div>
        <div class="admin-row__actions">
          <button type="button" class="icon-btn" data-toggle-status="${item.id}" title="Basculer disponible / réservé">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" class="icon-btn" data-edit="${item.id}" title="Modifier l'annonce">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" class="icon-btn" data-remove="${item.id}" title="Retirer l'annonce">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    `).join("") || `<p style="color:var(--text-faint);">Aucune annonce. Ajoutez-en une avec le formulaire.</p>`;
    saveDraft(draft);
  }

  listEl.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-remove]");
    const tg = e.target.closest("[data-toggle-status]");
    const ed = e.target.closest("[data-edit]");
    if (rm) {
      const id = rm.getAttribute("data-remove");
      draft = draft.filter(l => l.id !== id);
      if (editIdInput.value === id) resetForm();
      renderAdmin();
    } else if (tg) {
      const item = draft.find(l => l.id === tg.getAttribute("data-toggle-status"));
      if (item) { item.status = item.status === "reserve" ? "disponible" : "reserve"; renderAdmin(); }
    } else if (ed) {
      startEdit(ed.getAttribute("data-edit"));
    }
  });

  typeSelect.addEventListener("change", refreshMarqueOptions);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const editId = editIdInput.value;
    const fields = {
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
      images: [...pendingImages]
    };
    if (editId) {
      const idx = draft.findIndex(l => l.id === editId);
      if (idx !== -1) draft[idx] = { ...draft[idx], ...fields };
    } else {
      const marqueModele = `${data.marque}-${data.modele}-${data.annee}`;
      draft.unshift({
        id: slugify(marqueModele) + "-" + Math.random().toString(36).slice(2, 6),
        status: "disponible",
        ...fields
      });
    }
    renderAdmin();
    resetForm();
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("Réinitialiser la liste depuis data-listings.js ? Vos modifications locales seront perdues.")) return;
    draft = JSON.parse(JSON.stringify(LISTINGS));
    resetForm();
    renderAdmin();
  });

  /* ---------------------------------------------------------------- */
  /* Publication directe sur GitHub (API Contents)                     */
  /* ---------------------------------------------------------------- */
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  async function publish() {
    const { repo, token } = getGhConfig();
    if (!repo || !token) {
      settingsPanel.style.display = "block";
      publishFeedback.textContent = "Renseignez le dépôt et le token GitHub ci-dessus avant de publier.";
      publishFeedback.style.display = "block";
      return;
    }
    publishBtn.disabled = true;
    publishBtn.textContent = "Publication en cours...";
    publishFeedback.style.display = "none";
    try {
      const api = `https://api.github.com/repos/${repo}/contents/data-listings.js`;
      const headers = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" };
      const getRes = await fetch(api, { headers });
      if (!getRes.ok) throw new Error("Dépôt ou token invalide (code " + getRes.status + ")");
      const current = await getRes.json();
      const content = "const LISTINGS = " + JSON.stringify(draft, null, 2) + ";\n";
      const putRes = await fetch(api, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Mise à jour des annonces",
          content: b64EncodeUnicode(content),
          sha: current.sha,
          branch: "main"
        })
      });
      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        throw new Error(err.message || ("échec de la publication (code " + putRes.status + ")"));
      }
      publishFeedback.textContent = "Publié. Le site se met à jour automatiquement en 1 à 2 minutes.";
    } catch (err) {
      publishFeedback.textContent = "Erreur : " + err.message;
    }
    publishFeedback.style.display = "block";
    publishBtn.disabled = false;
    publishBtn.textContent = "Publier sur le site";
  }

  if (publishBtn) publishBtn.addEventListener("click", publish);

  refreshMarqueOptions();
  renderPhotoPreview();
  if (isLoggedIn()) renderAdmin();
})();

/* SwimAI Lexicon · app.js */

const data = window.SWIMAI_DATA;

const state = {
  view: "lexicon",
  query: "",
  moduleId: "all",
  roleId: "senior-coach",
  activeTermId: data.terms[0].id,
  activeScenarioId: data.raceLab[0].id,
  quizAnswers: {},
  moduleFilterOpen: false,
  heroExpanded: true,       /* Fix 2: hero collapsed after first term click */
  prevView: null,           /* Fix 6: breadcrumb — track where user came from */
  ucPhaseId: "training",
  ucMode: "walkthrough"
};

const els = {
  contentPanel:  document.querySelector("#contentPanel"),
  termList:      document.querySelector("#termList"),
  moduleFilter:  document.querySelector("#moduleFilter"),
  moduleToggle:  document.querySelector("#moduleToggle"),
  searchInput:   document.querySelector("#searchInput"),
  roleSelect:    document.querySelector("#roleSelect"),
  termCount:     document.querySelector("#termCount"),
  homeButton:    document.querySelector("#homeButton"),
  navButtons:    [...document.querySelectorAll(".nav-button")],
  appShell:      document.querySelector(".app-shell"),
  sidebar:       document.querySelector(".sidebar"),
  /* Mobile menu */
  mobMenuBtn:    document.querySelector("#mobMenuBtn"),
  mobNavDrawer:  document.querySelector("#mobNavDrawer"),
  mobRoleSelect: document.querySelector("#mobRoleSelect"),
  mobSocial:     document.querySelector("#mobSocial"),
  mobNavItems:   [...document.querySelectorAll(".mob-nav-item")]
};

/* ── Utilities ───────────────────────────────── */
function esc(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function norm(v) { return String(v || "").toLowerCase(); }
function moduleById(id) { return data.modules.find(m => m.id === id); }
function roleById(id)   { return data.roles.find(r => r.id === id) || data.roles[0]; }
function termById(id)   { return data.terms.find(t => t.id === id) || data.terms[0]; }

function filteredTerms() {
  const q = norm(state.query);
  return data.terms.filter(t => {
    if (state.moduleId !== "all" && t.module !== state.moduleId) return false;
    if (!q) return true;
    const hay = norm([t.name, t.plain, t.swim, t.why, t.ask, t.redFlag, t.useNow, t.related.join(" ")].join(" "));
    return hay.includes(q);
  });
}

/* ── Fix 5: Role-aware content per view ─────── */
/* Role config: what changes per role beyond the term lens card */
const roleConfig = {
  "senior-coach": {
    raceLabNote: "Focus on whether the AI output matches what you saw on deck. Your pattern recognition across hundreds of races is a check the model can't replicate.",
    checklistNote: "Require staff to complete the vetting checklist before any tool reaches athletes. You're accountable for the decisions it influences.",
    privacyNote: "Senior coaches often set the culture around data. If you treat athlete data casually, the team will too.",
    ucNote: "As a head coach, the key question at every stage is: who approved this? Document your review of any AI output before it affects training plans or athlete feedback."
  },
  "age-group": {
    raceLabNote: "Be especially cautious with race predictions for young swimmers. Growth, motivation, and developmental pace make forecasts less reliable than they look.",
    checklistNote: "Age-group athletes are mostly minors. Every vendor question about data ownership and consent applies with extra weight here.",
    privacyNote: "Many of your athletes are under 13. COPPA applies. Parent consent needs to be specific about video use, not just buried in a waiver.",
    ucNote: "Age-group coaching involves the most vulnerable population. AI outputs about technique, load, and potential should always be filtered through your developmental knowledge of the individual."
  },
  "college": {
    raceLabNote: "Recruiting, academic stress, and taper timing all affect race performance in ways no load-monitoring tool captures. Keep that context central.",
    checklistNote: "Check whether AI tools comply with NCAA data governance rules and whether athlete data could affect eligibility or recruiting communications.",
    privacyNote: "College swimmers are adults, but their data still deserves care — especially video that could affect recruiting or professional prospects.",
    ucNote: "College coaching adds recruiting context, academic calendars, and compliance considerations to every AI decision. Make sure your staff knows the tool's scope."
  },
  "performance": {
    raceLabNote: "You know the measurement chain better than anyone. Focus your vetting on whether the AI's input quality matches what you'd accept from a manual analysis.",
    checklistNote: "Push vendors on validation methodology. Aggregate accuracy is rarely what matters — subgroup performance by stroke, event, and course is.",
    privacyNote: "As the person closest to the data pipeline, you're responsible for flagging when collection exceeds what coaching decisions actually require.",
    ucNote: "Performance analysts should apply their measurement quality standards to AI outputs just as rigorously as they would to video review or split analysis."
  },
  "club-admin": {
    raceLabNote: "Administrators don't typically see race-day AI in action — but you approve the tools and contracts that enable it. Know what your coaches are being asked to trust.",
    checklistNote: "Every question on this checklist is one your club should be able to answer before signing a vendor contract. Make it part of your procurement process.",
    privacyNote: "Your club is the data controller. If a vendor is breached or misuses athlete data, your club bears the relationship risk with families.",
    ucNote: "Club administrators need to understand the full AI workflow — from data collection to athlete-facing output — to know where governance and consent policies need to apply."
  },
  "swim-parent": {
    raceLabNote: "If a coach shares an AI report with you about your child, ask what data it was based on and what the coach thinks — not just what the number says.",
    checklistNote: "Parents can use this checklist too. Ask your club whether they've reviewed any AI tool they use against questions about data, consent, and uncertainty.",
    privacyNote: "You have the right to ask what data about your child is collected, how long it's kept, who can see it, and whether it's used to train vendor AI models.",
    ucNote: "As a swim parent, your role is to ask questions, not interpret AI reports yourself. The coach is responsible for translating AI output into context your child can use."
  }
};

function getRoleNote(section) {
  const role = state.roleId;
  return (roleConfig[role] && roleConfig[role][section]) || "";
}

/* ── Fix 1: Sidebar visibility ───────────────── */
function updateSidebarVisibility() {
  const lexiconOnly = state.view === "lexicon";
  els.sidebar.classList.toggle("sidebar--hidden", !lexiconOnly);
  els.appShell.classList.toggle("no-sidebar", !lexiconOnly);
}

/* ── Mobile menu toggle ──────────────────────── */
function isMobile() { return window.innerWidth <= 860; }

function updateMobileVisibility() {
  if (!els.mobSocial || !els.mobMenuBtn) return;
  const mobile = isMobile();
  els.mobSocial.style.display = mobile ? "flex" : "none";
  els.mobMenuBtn.style.display = mobile ? "flex" : "none";
}

function closeMobileMenu() {
  if (!els.mobNavDrawer) return;
  els.mobNavDrawer.classList.remove("is-open");
  if (els.mobMenuBtn) {
    els.mobMenuBtn.setAttribute("aria-expanded", "false");
    els.mobMenuBtn.textContent = "☰";
  }
}

function toggleMobileMenu() {
  if (!els.mobNavDrawer) return;
  const isOpen = els.mobNavDrawer.classList.toggle("is-open");
  els.mobMenuBtn.setAttribute("aria-expanded", isOpen);
  els.mobMenuBtn.textContent = isOpen ? "✕" : "☰";
}

/* ── State setters ───────────────────────────── */
function setView(view) {
  state.prevView = state.view;
  state.view = view;
  if (view === "lexicon") state.heroExpanded = true;
  /* Sync desktop nav */
  els.navButtons.forEach(b => b.classList.toggle("is-active", b.dataset.view === view));
  /* Sync mobile nav */
  els.mobNavItems.forEach(b => b.classList.toggle("is-active", b.dataset.view === view));
  /* Close mobile drawer on nav */
  closeMobileMenu();
  render();
}

function setModule(moduleId) {
  state.moduleId = moduleId;
  const terms = filteredTerms();
  if (terms.length && !terms.some(t => t.id === state.activeTermId)) {
    state.activeTermId = terms[0].id;
  }
  render();
}

function setTerm(termId, fromView) {
  /* Fix 6: track which view we came from for breadcrumb */
  state.prevView = fromView || state.view;
  state.activeTermId = termId;
  state.view = "lexicon";
  /* Fix 2: collapse hero after first term click */
  state.heroExpanded = false;
  els.navButtons.forEach(b => b.classList.toggle("is-active", b.dataset.view === "lexicon"));
  render();
  els.contentPanel.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleModuleFilter() {
  state.moduleFilterOpen = !state.moduleFilterOpen;
  els.moduleFilter.classList.toggle("is-open", state.moduleFilterOpen);
  els.moduleToggle.classList.toggle("is-open", state.moduleFilterOpen);
  els.moduleToggle.setAttribute("aria-expanded", state.moduleFilterOpen);
}

/* ── Render: role picker ─────────────────────── */
function renderRolePicker() {
  els.roleSelect.innerHTML = data.roles
    .map(r => `<option value="${esc(r.id)}">${esc(r.name)}</option>`)
    .join("");
  els.roleSelect.value = state.roleId;
}

/* ── Render: sidebar module filter ──────────── */
function renderModuleFilter() {
  const counts = Object.fromEntries(data.modules.map(m => [m.id, data.terms.filter(t => t.module === m.id).length]));
  const items = [
    { id: "all", name: "All modules", color: "#637d93", count: data.terms.length },
    ...data.modules.map(m => ({ id: m.id, name: m.name, color: m.color, count: counts[m.id] }))
  ];

  els.moduleFilter.innerHTML = items.map(item => `
    <button class="module-button ${item.id === state.moduleId ? "is-active" : ""}" type="button" data-module="${esc(item.id)}">
      <span class="module-dot" style="background:${esc(item.color)}"></span>
      <span>${esc(item.name)}</span>
      <small>${item.count}</small>
    </button>
  `).join("");

  els.moduleFilter.querySelectorAll("[data-module]").forEach(b => {
    b.addEventListener("click", () => setModule(b.dataset.module));
  });
}

/* ── Render: sidebar term list ───────────────── */
function renderTermList() {
  const terms = filteredTerms();
  els.termCount.textContent = terms.length;

  if (!terms.length) {
    els.termList.innerHTML = `<div class="empty">No terms match. Try a broader search.</div>`;
    return;
  }

  els.termList.innerHTML = terms.map(t => {
    const mod = moduleById(t.module);
    return `
      <button class="term-button ${t.id === state.activeTermId ? "is-active" : ""}" type="button" data-term="${esc(t.id)}" role="listitem">
        <strong>${esc(t.name)}</strong>
        <span>${esc(mod?.name)} · ${esc(t.plain)}</span>
      </button>
    `;
  }).join("");

  els.termList.querySelectorAll("[data-term]").forEach(b => {
    b.addEventListener("click", () => setTerm(b.dataset.term));
  });
}

/* ── Fix 2: Hero — full or collapsed strip ───── */
function renderIntro() {
  if (!state.heroExpanded) {
    /* Collapsed strip */
    return `
      <div class="hero-strip">
        <div class="hero-strip-text">
          <div class="hero-strip-title">SwimAI Lexicon</div>
          <div class="hero-strip-sub">Better data, not less judgment.</div>
        </div>
        <button class="hero-strip-expand" id="heroExpandBtn" type="button">About this tool ↓</button>
      </div>
    `;
  }
  /* Full hero */
  return `
    <div class="hero-grid">
      <section class="panel-section intro">
        <span class="eyebrow">AI literacy for competitive swimming</span>
        <h1>Help coaches question AI<br><em>before</em> it changes training.</h1>
        <p class="lead">This lexicon translates AI ideas into coaching decisions — race analysis, stroke video, athlete monitoring, vendor claims, and minor-athlete data protection.</p>
        <div class="mini-meta">
          <span class="tag">Coach-first language</span>
          <span class="tag">No coding background needed</span>
          <span class="tag">Built for judgment, not autopilot</span>
        </div>
      </section>
      <div class="pool-visual" aria-hidden="true">
        <div class="pool-label">What did the tool see — and what did it miss? That's the coach's question.</div>
      </div>
    </div>
  `;
}

/* ── Fix 6: Breadcrumb ───────────────────────── */
function renderBreadcrumb() {
  if (state.prevView !== "usecases") return "";
  return `
    <div class="breadcrumb">
      <button class="breadcrumb-back" id="breadcrumbBack" type="button">← Back to In Practice</button>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">Lexicon</span>
    </div>
  `;
}

/* ── Render: term detail ─────────────────────── */
function renderTermDetail() {
  const term   = termById(state.activeTermId);
  const mod    = moduleById(term.module);
  const role   = roleById(state.roleId);
  const answer = state.quizAnswers[term.id];
  const hasAnswer  = typeof answer === "number";
  const isCorrect  = answer === term.quiz.correct;
  const choiceKeys = ["A", "B", "C", "D"];

  return `
    ${renderBreadcrumb()}
    <article class="panel-section term-detail">
      <div class="term-meta">
        <span class="tag strong" style="background:${esc(mod?.color)};border-color:${esc(mod?.color)}">${esc(mod?.name)}</span>
        <span class="tag">${esc(role.name)}</span>
      </div>

      <h2>${esc(term.name)}</h2>
      <p class="term-def">${esc(term.plain)}</p>

      <div class="detail-grid">
        <section class="info-block">
          <div class="info-label">Swim example</div>
          <p>${esc(term.swim)}</p>
        </section>
        <section class="info-block">
          <div class="info-label">Why it matters</div>
          <p>${esc(term.why)}</p>
        </section>
        <section class="info-block coach-question">
          <div class="info-label">Coach question</div>
          <p>${esc(term.ask)}</p>
        </section>
        <section class="info-block red-flag">
          <div class="info-label">Red flag</div>
          <p>${esc(term.redFlag)}</p>
        </section>
        <section class="info-block use-now">
          <div class="info-label">Use it this week</div>
          <p>${esc(term.useNow)}</p>
        </section>
        <section class="info-block role-note">
          <div class="info-label">${esc(role.name)} lens</div>
          <p>${esc(role.tip)}</p>
        </section>
        <section class="info-block full">
          <div class="info-label">Related terms</div>
          <div class="related">
            ${term.related.map(name => {
              const rel = data.terms.find(t => t.name === name);
              return rel
                ? `<button type="button" data-related="${esc(rel.id)}">${esc(name)}</button>`
                : `<span class="tag">${esc(name)}</span>`;
            }).join("")}
          </div>
        </section>
      </div>

      <section class="quiz" data-quiz="${esc(term.id)}">
        <div class="quiz-label">Check your understanding</div>
        <div class="quiz-question">${esc(term.quiz.q)}</div>
        <div class="quiz-options">
          ${term.quiz.choices.map((choice, i) => {
            let cls = "";
            if (hasAnswer && i === term.quiz.correct) cls = "is-correct";
            else if (hasAnswer && i === answer && !isCorrect) cls = "is-wrong";
            return `
              <button class="quiz-choice ${cls}" type="button" data-choice="${i}" ${hasAnswer ? "disabled" : ""}>
                <span class="choice-marker">${choiceKeys[i] || i}</span>
                ${esc(choice)}
              </button>
            `;
          }).join("")}
        </div>
        ${hasAnswer ? `
          <div class="quiz-result-wrap">
            <p class="quiz-result">
              <strong>${isCorrect ? "✓ Correct." : "✗ Not quite."}</strong>
              ${esc(term.quiz.why)}
            </p>
          </div>` : ""}
      </section>
    </article>
  `;
}

function bindTermDetail() {
  /* Fix 2: hero expand button */
  const expandBtn = els.contentPanel.querySelector("#heroExpandBtn");
  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      state.heroExpanded = true;
      render();
    });
  }
  /* Fix 6: breadcrumb back */
  const backBtn = els.contentPanel.querySelector("#breadcrumbBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      state.prevView = null;
      setView("usecases");
    });
  }
  els.contentPanel.querySelectorAll("[data-related]").forEach(b => {
    b.addEventListener("click", () => setTerm(b.dataset.related));
  });
  els.contentPanel.querySelectorAll("[data-quiz]").forEach(quiz => {
    const termId = quiz.dataset.quiz;
    quiz.querySelectorAll("[data-choice]").forEach(b => {
      b.addEventListener("click", () => {
        state.quizAnswers[termId] = Number(b.dataset.choice);
        render();
      });
    });
  });
}

/* ── Render: views ───────────────────────────── */
function renderLexicon() {
  const terms = filteredTerms();
  if (!terms.some(t => t.id === state.activeTermId) && terms.length) {
    state.activeTermId = terms[0].id;
  }
  els.contentPanel.innerHTML = renderIntro() + renderTermDetail();
  bindTermDetail();
}

/* ── Fix 5: Role note banner ─────────────────── */
function roleNoteBanner(section) {
  const note = getRoleNote(section);
  if (!note) return "";
  const role = roleById(state.roleId);
  return `
    <div class="info-block role-note" style="margin-bottom:20px">
      <div class="info-label">${esc(role.name)} — how to read this section</div>
      <p>${esc(note)}</p>
    </div>
  `;
}

function renderRaceLab() {
  const scenario = data.raceLab.find(s => s.id === state.activeScenarioId) || data.raceLab[0];
  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">Race analysis lab</span>
      <h2>Practice challenging an AI race claim.</h2>
      <p class="lead">A sound AI output should survive coach questions about data quality, swimmer context, uncertainty, and what the model cannot see.</p>
      ${roleNoteBanner("raceLabNote")}

      <div class="scenario-controls">
        ${data.raceLab.map(s => `
          <button class="scenario-button ${s.id === scenario.id ? "is-active" : ""}" type="button" data-scenario="${esc(s.id)}">${esc(s.title)}</button>
        `).join("")}
      </div>

      <div class="tool-grid">
        <section class="scenario-card">
          <div class="info-label">AI says</div>
          <h3>${esc(scenario.claim)}</h3>
          <p>${esc(scenario.context)}</p>
        </section>
        <section class="scenario-card">
          <div class="info-label">Safer coach interpretation</div>
          <h3>${esc(scenario.saferRead)}</h3>
          <p>${esc(scenario.action)}</p>
        </section>
      </div>

      <div class="race-chart" aria-label="Race segment breakdown">
        ${scenario.segments.map(seg => `
          <div class="race-bar">
            <strong>${esc(seg.label)}</strong>
            <div class="race-track"><div class="race-fill" style="width:${seg.value}%"></div></div>
            <span>${seg.value}%</span>
          </div>
        `).join("")}
      </div>

      <div class="tool-grid">
        <section class="scenario-card">
          <div class="info-label">Ask before trusting it</div>
          <p>${esc(scenario.questions.join(" "))}</p>
        </section>
        <section class="scenario-card">
          <div class="info-label">Failure signs</div>
          <p>${esc(scenario.failureSigns.join(" "))}</p>
        </section>
      </div>
    </section>
  `;

  els.contentPanel.querySelectorAll("[data-scenario]").forEach(b => {
    b.addEventListener("click", () => {
      state.activeScenarioId = b.dataset.scenario;
      renderRaceLab();
    });
  });
}

function renderChecklist() {
  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">Tool vetting</span>
      <h2>Questions to ask before your program trusts an AI tool.</h2>
      <p class="lead">Use these with vendors, internal dashboards, and staff experiments. The goal is not to block useful technology — it's to keep coaches in control of decisions that affect athletes.</p>
      ${roleNoteBanner("checklistNote")}
      <div class="check-list">
        ${data.vendorChecklist.map((item, i) => `
          <section class="check-item">
            <span class="check-number">${i + 1}</span>
            <div>
              <h3>${esc(item.question)}</h3>
              <p>${esc(item.why)}</p>
            </div>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPrivacy() {
  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">Athlete data</span>
      <h2>Minor-athlete data should be treated as sensitive performance data.</h2>
      <p class="lead">Swim video can identify a child, show body position, reveal performance level, and create labels that follow an athlete. Clubs should be clear about purpose, access, retention, deletion, and model-training reuse.</p>
      ${roleNoteBanner("privacyNote")}
      <div class="privacy-list">
        ${data.privacyRules.map(item => `
          <section class="privacy-rule">
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.body)}</p>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}

/* Fix 3: Sources moved to footer — this view kept minimal as fallback */
function renderSources() {
  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">Evidence notes</span>
      <h2>What this guide is anchored to.</h2>
      <p class="lead">This is an educational tool, not legal, medical, recruiting, or training prescription advice. It uses conservative wording where AI claims are uncertain or athlete welfare is involved.</p>
      <div class="source-list">
        ${data.sources.map(s => `
          <section class="source-item">
            <h3><a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.name)}</a></h3>
            <p>${esc(s.note)}</p>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}

/* ── Render: use cases ───────────────────────── */
function renderUseCases() {
  const usecases = window.SWIMAI_USECASES;
  const phase = usecases.find(p => p.id === state.ucPhaseId) || usecases[0];
  const choiceKeys = ["1", "2", "3", "4"];

  const phaseRow = usecases.map(p => `
    <button class="uc-phase-btn ${p.id === phase.id ? "is-active" : ""}" type="button" data-ucphase="${esc(p.id)}">
      <span class="uc-phase-icon">${p.icon}</span>
      <span class="uc-phase-label">Phase</span>
      <span class="uc-phase-name">${esc(p.phase)}</span>
      <span class="uc-phase-tagline">${esc(p.tagline)}</span>
    </button>
  `).join("");

  const modeRow = `
    <div class="uc-mode-row">
      <span class="uc-mode-label">View as</span>
      <button class="uc-mode-btn ${state.ucMode === "walkthrough" ? "is-active" : ""}" type="button" data-ucmode="walkthrough">
        ➜ Step-by-step walkthrough
      </button>
      <button class="uc-mode-btn ${state.ucMode === "comparison" ? "is-active" : ""}" type="button" data-ucmode="comparison">
        ⇄ AI vs coach side-by-side
      </button>
    </div>
  `;

  const intro = `<div class="uc-intro"><p>${esc(phase.intro)}</p></div>`;

  const walkthrough = `
    <div class="uc-walkthrough">
      ${phase.steps.map((step, i) => `
        <div class="uc-step" data-type="${esc(step.type)}">
          <div class="uc-step-spine">
            <div class="uc-step-node">${choiceKeys[i]}</div>
          </div>
          <div class="uc-step-body">
            <div class="uc-step-label">${esc(step.label)}</div>
            <div class="uc-step-card">
              <h3>${esc(step.heading)}</h3>
              <p class="uc-step-narrative">${esc(step.body)}</p>
              <div class="uc-explainer">
                <span class="uc-explainer-icon">💡</span>
                <p>${esc(step.explain)}</p>
              </div>
              <div class="uc-step-terms">
                ${step.glossaryTerms.map(name => {
                  const term = data.terms.find(t => t.name === name);
                  return term
                    ? `<button class="uc-term-chip" type="button" data-related="${esc(term.id)}">↗ ${esc(name)}</button>`
                    : `<span class="uc-term-chip" style="cursor:default;color:var(--ink-muted)">${esc(name)}</span>`;
                }).join("")}
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  const comp = phase.comparison;
  const comparison = `
    <div class="uc-comparison">
      <div class="uc-comparison-scenario">
        <strong>Scenario:</strong> ${esc(comp.scenario)}
      </div>
      <div class="uc-comparison-grid">
        <div class="uc-col ai-col">
          <div class="uc-col-header ai-header">
            <span class="uc-col-header-icon">🤖</span>
            ${esc(comp.aiSide.label)}
          </div>
          ${comp.aiSide.points.map(pt => `
            <div class="uc-point">
              <h4>${esc(pt.heading)}</h4>
              <p>${esc(pt.body)}</p>
            </div>
          `).join("")}
        </div>
        <div class="uc-col coach-col">
          <div class="uc-col-header coach-header">
            <span class="uc-col-header-icon">🧠</span>
            ${esc(comp.coachSide.label)}
          </div>
          ${comp.coachSide.points.map(pt => `
            <div class="uc-point">
              <h4>${esc(pt.heading)}</h4>
              <p>${esc(pt.body)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  /* Fix 5: role note for use cases */
  const ucNote = getRoleNote("ucNote");
  const role = roleById(state.roleId);
  const ucRoleBanner = ucNote ? `
    <div class="info-block role-note" style="margin-bottom:20px">
      <div class="info-label">${esc(role.name)} — your focus here</div>
      <p>${esc(ucNote)}</p>
    </div>
  ` : "";

  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">In practice</span>
      <h2>AI in the real coaching day.</h2>
      <p class="lead">Three phases every coach encounters — training, race day, and post-race review. See what AI actually outputs, what it misses, and how to read it without over-trusting it.</p>
      ${ucRoleBanner}
      <div class="uc-phase-row">${phaseRow}</div>
      ${modeRow}
      ${intro}
      ${state.ucMode === "walkthrough" ? walkthrough : comparison}
    </section>
  `;

  els.contentPanel.querySelectorAll("[data-ucphase]").forEach(b => {
    b.addEventListener("click", () => {
      state.ucPhaseId = b.dataset.ucphase;
      renderUseCases();
    });
  });
  els.contentPanel.querySelectorAll("[data-ucmode]").forEach(b => {
    b.addEventListener("click", () => {
      state.ucMode = b.dataset.ucmode;
      renderUseCases();
    });
  });
  /* Fix 6: glossary chips track "usecases" as prevView */
  els.contentPanel.querySelectorAll(".uc-term-chip[data-related]").forEach(b => {
    b.addEventListener("click", () => setTerm(b.dataset.related, "usecases"));
  });
}

/* ── Master render ───────────────────────────── */
function render() {
  updateSidebarVisibility();  /* Fix 1 */
  renderModuleFilter();
  renderTermList();
  if (state.view === "lexicon")   renderLexicon();
  if (state.view === "lab")       renderRaceLab();
  if (state.view === "checklist") renderChecklist();
  if (state.view === "privacy")   renderPrivacy();
  if (state.view === "sources")   renderSources();
  if (state.view === "usecases")  renderUseCases();
}

/* ── Init ────────────────────────────────────── */
function init() {
  renderRolePicker();
  render();

  els.searchInput.addEventListener("input", e => {
    state.query = e.target.value;
    const terms = filteredTerms();
    if (terms.length && !terms.some(t => t.id === state.activeTermId)) {
      state.activeTermId = terms[0].id;
    }
    render();
  });

  /* Role selects handled below with mobile sync */

  els.navButtons.forEach(b => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });

  els.homeButton.addEventListener("click", () => {
    state.heroExpanded = true;
    setView("lexicon");
  });

  els.moduleToggle.addEventListener("click", toggleModuleFilter);

  /* Fix 3: footer sources link */
  const sourcesFooter = document.querySelector("#sourcesFooterLink");
  if (sourcesFooter) {
    sourcesFooter.addEventListener("click", () => setView("sources"));
  }

  /* Mobile hamburger menu */
  if (els.mobMenuBtn) {
    els.mobMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  /* Mobile nav items */
  els.mobNavItems.forEach(b => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });

  /* Mobile role select — syncs with desktop select */
  if (els.mobRoleSelect) {
    /* Populate mobile role select */
    els.mobRoleSelect.innerHTML = data.roles
      .map(r => `<option value="${esc(r.id)}">${esc(r.name)}</option>`)
      .join("");
    els.mobRoleSelect.value = state.roleId;
    els.mobRoleSelect.addEventListener("change", e => {
      state.roleId = e.target.value;
      if (els.roleSelect) els.roleSelect.value = state.roleId;
      render();
    });
  }

  /* Keep desktop role select in sync with mobile */
  if (els.roleSelect) {
    els.roleSelect.addEventListener("change", e => {
      state.roleId = e.target.value;
      if (els.mobRoleSelect) els.mobRoleSelect.value = state.roleId;
      render();
    });
  }

  /* Close drawer when clicking outside */
  document.addEventListener("click", (e) => {
    if (els.mobNavDrawer && els.mobNavDrawer.classList.contains("is-open")) {
      if (!els.mobNavDrawer.contains(e.target) && e.target !== els.mobMenuBtn) {
        closeMobileMenu();
      }
    }
  });

  /* Handle resize — show/hide mobile elements */
  updateMobileVisibility();
  window.addEventListener("resize", updateMobileVisibility);
}

init();

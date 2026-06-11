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
  ucPhaseId: "training",
  ucMode: "walkthrough"   /* "walkthrough" | "comparison" */
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
  navButtons:    [...document.querySelectorAll(".nav-button")]
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

/* ── State setters ───────────────────────────── */
function setView(view) {
  state.view = view;
  els.navButtons.forEach(b => b.classList.toggle("is-active", b.dataset.view === view));
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

function setTerm(termId) {
  state.activeTermId = termId;
  state.view = "lexicon";
  els.navButtons.forEach(b => b.classList.toggle("is-active", b.dataset.view === "lexicon"));
  render();
  // Scroll content panel to top on mobile
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

/* ── Render: hero intro ──────────────────────── */
function renderIntro() {
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
        ${hasAnswer ? `<p class="quiz-result">${isCorrect ? "✓ Correct." : "✗ Not quite."} ${esc(term.quiz.why)}</p>` : ""}
      </section>
    </article>
  `;
}

function bindTermDetail() {
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

function renderRaceLab() {
  const scenario = data.raceLab.find(s => s.id === state.activeScenarioId) || data.raceLab[0];
  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">Race analysis lab</span>
      <h2>Practice challenging an AI race claim.</h2>
      <p class="lead">A sound AI output should survive coach questions about data quality, swimmer context, uncertainty, and what the model cannot see.</p>

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

  /* Phase picker row */
  const phaseRow = usecases.map(p => `
    <button class="uc-phase-btn ${p.id === phase.id ? "is-active" : ""}" type="button" data-ucphase="${esc(p.id)}">
      <span class="uc-phase-icon">${p.icon}</span>
      <span class="uc-phase-label">Phase</span>
      <span class="uc-phase-name">${esc(p.phase)}</span>
      <span class="uc-phase-tagline">${esc(p.tagline)}</span>
    </button>
  `).join("");

  /* Mode toggle */
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

  /* Intro */
  const intro = `
    <div class="uc-intro">
      <p>${esc(phase.intro)}</p>
    </div>
  `;

  /* Walkthrough content */
  const choiceKeys = ["1", "2", "3", "4"];
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

  /* Comparison content */
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

  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">In practice</span>
      <h2>AI in the real coaching day.</h2>
      <p class="lead">Three phases every coach encounters — training, race day, and post-race review. See what AI actually outputs, what it misses, and how to read it without over-trusting it.</p>

      <div class="uc-phase-row">${phaseRow}</div>
      ${modeRow}
      ${intro}
      ${state.ucMode === "walkthrough" ? walkthrough : comparison}
    </section>
  `;

  /* Bind phase buttons */
  els.contentPanel.querySelectorAll("[data-ucphase]").forEach(b => {
    b.addEventListener("click", () => {
      state.ucPhaseId = b.dataset.ucphase;
      renderUseCases();
    });
  });

  /* Bind mode buttons */
  els.contentPanel.querySelectorAll("[data-ucmode]").forEach(b => {
    b.addEventListener("click", () => {
      state.ucMode = b.dataset.ucmode;
      renderUseCases();
    });
  });

  /* Bind glossary chips — jump to term in lexicon */
  els.contentPanel.querySelectorAll(".uc-term-chip[data-related]").forEach(b => {
    b.addEventListener("click", () => setTerm(b.dataset.related));
  });
}

/* ── Master render ───────────────────────────── */
function render() {
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

  els.roleSelect.addEventListener("change", e => {
    state.roleId = e.target.value;
    render();
  });

  els.navButtons.forEach(b => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });

  els.homeButton.addEventListener("click", () => setView("lexicon"));

  els.moduleToggle.addEventListener("click", toggleModuleFilter);
}

init();

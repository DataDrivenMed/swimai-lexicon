const data = window.SWIMAI_DATA;

const state = {
  view: "lexicon",
  query: "",
  moduleId: "all",
  roleId: "senior-coach",
  activeTermId: data.terms[0].id,
  activeScenarioId: data.raceLab[0].id,
  quizAnswers: {}
};

const els = {
  contentPanel: document.querySelector("#contentPanel"),
  termList: document.querySelector("#termList"),
  moduleFilter: document.querySelector("#moduleFilter"),
  searchInput: document.querySelector("#searchInput"),
  roleSelect: document.querySelector("#roleSelect"),
  termCount: document.querySelector("#termCount"),
  homeButton: document.querySelector("#homeButton"),
  navButtons: [...document.querySelectorAll(".nav-button")]
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value || "").toLowerCase();
}

function moduleById(id) {
  return data.modules.find((module) => module.id === id);
}

function roleById(id) {
  return data.roles.find((role) => role.id === id) || data.roles[0];
}

function termById(id) {
  return data.terms.find((term) => term.id === id) || data.terms[0];
}

function filteredTerms() {
  const query = normalize(state.query);
  return data.terms.filter((term) => {
    const moduleMatch = state.moduleId === "all" || term.module === state.moduleId;
    if (!moduleMatch) return false;
    if (!query) return true;
    const haystack = normalize([
      term.name,
      term.plain,
      term.swim,
      term.why,
      term.ask,
      term.redFlag,
      term.useNow,
      term.related.join(" ")
    ].join(" "));
    return haystack.includes(query);
  });
}

function setView(view) {
  state.view = view;
  els.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  render();
}

function setModule(moduleId) {
  state.moduleId = moduleId;
  const terms = filteredTerms();
  if (terms.length && !terms.some((term) => term.id === state.activeTermId)) {
    state.activeTermId = terms[0].id;
  }
  render();
}

function setTerm(termId) {
  state.activeTermId = termId;
  state.view = "lexicon";
  els.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === "lexicon");
  });
  render();
}

function renderRolePicker() {
  els.roleSelect.innerHTML = data.roles
    .map((role) => `<option value="${esc(role.id)}">${esc(role.name)}</option>`)
    .join("");
  els.roleSelect.value = state.roleId;
}

function renderModuleFilter() {
  const counts = data.modules.reduce((acc, module) => {
    acc[module.id] = data.terms.filter((term) => term.module === module.id).length;
    return acc;
  }, {});
  const allCount = data.terms.length;
  const buttons = [
    { id: "all", name: "All Modules", color: "#111827", count: allCount },
    ...data.modules.map((module) => ({
      id: module.id,
      name: module.name,
      color: module.color,
      count: counts[module.id]
    }))
  ];

  els.moduleFilter.innerHTML = buttons.map((button) => `
    <button class="module-button ${button.id === state.moduleId ? "is-active" : ""}" type="button" data-module="${esc(button.id)}">
      <span class="module-dot" style="background:${esc(button.color)}"></span>
      <span>${esc(button.name)}</span>
      <small>${button.count}</small>
    </button>
  `).join("");

  els.moduleFilter.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => setModule(button.dataset.module));
  });
}

function renderTermList() {
  const terms = filteredTerms();
  els.termCount.textContent = terms.length;
  if (!terms.length) {
    els.termList.innerHTML = `<div class="empty">No terms match this search.</div>`;
    return;
  }

  els.termList.innerHTML = terms.map((term) => {
    const module = moduleById(term.module);
    return `
      <button class="term-button ${term.id === state.activeTermId ? "is-active" : ""}" type="button" data-term="${esc(term.id)}">
        <strong>${esc(term.name)}</strong>
        <span>${esc(module.name)} - ${esc(term.plain)}</span>
      </button>
    `;
  }).join("");

  els.termList.querySelectorAll("[data-term]").forEach((button) => {
    button.addEventListener("click", () => setTerm(button.dataset.term));
  });
}

function renderIntro() {
  const terms = filteredTerms();
  const first = terms[0] || data.terms[0];
  if (!terms.some((term) => term.id === state.activeTermId)) {
    state.activeTermId = first.id;
  }

  return `
    <div class="hero-grid">
      <section class="panel-section intro">
        <span class="eyebrow">AI literacy for competitive swimming</span>
        <h1>Help coaches question AI before it changes training.</h1>
        <p class="lead">This lexicon translates AI ideas into coaching decisions: race analysis, stroke video, athlete monitoring, vendor claims, and minor-athlete data protection.</p>
        <div class="mini-meta">
          <span class="tag">Coach-first language</span>
          <span class="tag">No coding background needed</span>
          <span class="tag">Built for judgment, not autopilot</span>
        </div>
      </section>
      <section class="pool-visual" aria-label="Pool lane visual">
        <div class="pool-label">Practical focus: what the tool saw, what it missed, and what the coach should verify.</div>
      </section>
    </div>
  `;
}

function renderTermDetail() {
  const term = termById(state.activeTermId);
  const module = moduleById(term.module);
  const role = roleById(state.roleId);
  const answer = state.quizAnswers[term.id];
  const hasAnswer = typeof answer === "number";
  const isCorrect = answer === term.quiz.correct;

  return `
    <article class="panel-section term-detail">
      <div class="term-meta">
        <span class="tag strong" style="background:${esc(module.color)}; border-color:${esc(module.color)}">${esc(module.name)}</span>
        <span class="tag">${esc(role.name)} lens</span>
      </div>
      <h2>${esc(term.name)}</h2>
      <p class="lead">${esc(term.plain)}</p>

      <div class="detail-grid">
        <section class="info-block">
          <div class="info-label">Swim Example</div>
          <p>${esc(term.swim)}</p>
        </section>
        <section class="info-block">
          <div class="info-label">Why It Matters</div>
          <p>${esc(term.why)}</p>
        </section>
        <section class="info-block coach-question">
          <div class="info-label">Coach Question</div>
          <p>${esc(term.ask)}</p>
        </section>
        <section class="info-block red-flag">
          <div class="info-label">Red Flag</div>
          <p>${esc(term.redFlag)}</p>
        </section>
        <section class="info-block use-now">
          <div class="info-label">Use It This Week</div>
          <p>${esc(term.useNow)}</p>
        </section>
        <section class="info-block role-note">
          <div class="info-label">${esc(role.name)} Lens</div>
          <p>${esc(role.tip)}</p>
        </section>
        <section class="info-block full">
          <div class="info-label">Related Terms</div>
          <div class="related">
            ${term.related.map((name) => {
              const related = data.terms.find((item) => item.name === name);
              if (!related) return `<span class="tag">${esc(name)}</span>`;
              return `<button type="button" data-related="${esc(related.id)}">${esc(name)}</button>`;
            }).join("")}
          </div>
        </section>
      </div>

      <section class="quiz" data-quiz="${esc(term.id)}">
        <div class="info-label">Check Understanding</div>
        <div class="quiz-question">${esc(term.quiz.q)}</div>
        <div class="quiz-options">
          ${term.quiz.choices.map((choice, index) => `
            <button class="quiz-choice ${hasAnswer && index === term.quiz.correct ? "is-correct" : ""} ${hasAnswer && index === answer && !isCorrect ? "is-wrong" : ""}" type="button" data-choice="${index}">
              ${esc(choice)}
            </button>
          `).join("")}
        </div>
        ${hasAnswer ? `<p class="quiz-result">${isCorrect ? "Correct." : "Not quite."} ${esc(term.quiz.why)}</p>` : ""}
      </section>
    </article>
  `;
}

function bindTermDetail() {
  els.contentPanel.querySelectorAll("[data-related]").forEach((button) => {
    button.addEventListener("click", () => setTerm(button.dataset.related));
  });
  els.contentPanel.querySelectorAll("[data-quiz]").forEach((quiz) => {
    const termId = quiz.dataset.quiz;
    quiz.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        state.quizAnswers[termId] = Number(button.dataset.choice);
        render();
      });
    });
  });
}

function renderLexicon() {
  els.contentPanel.innerHTML = `${renderIntro()}${renderTermDetail()}`;
  bindTermDetail();
}

function renderRaceLab() {
  const scenario = data.raceLab.find((item) => item.id === state.activeScenarioId) || data.raceLab[0];
  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">Race Analysis Lab</span>
      <h2>Practice challenging an AI race claim.</h2>
      <p class="lead">A good AI output should survive coach questions about data quality, swimmer context, uncertainty, and what the model cannot see.</p>

      <div class="scenario-controls">
        ${data.raceLab.map((item) => `
          <button class="scenario-button ${item.id === scenario.id ? "is-active" : ""}" type="button" data-scenario="${esc(item.id)}">${esc(item.title)}</button>
        `).join("")}
      </div>

      <div class="tool-grid">
        <section class="scenario-card">
          <div class="info-label">AI Says</div>
          <h3>${esc(scenario.claim)}</h3>
          <p>${esc(scenario.context)}</p>
        </section>
        <section class="scenario-card">
          <div class="info-label">Safer Coach Interpretation</div>
          <h3>${esc(scenario.saferRead)}</h3>
          <p>${esc(scenario.action)}</p>
        </section>
      </div>

      <div class="race-chart" aria-label="Race segment chart">
        ${scenario.segments.map((segment) => `
          <div class="race-bar">
            <strong>${esc(segment.label)}</strong>
            <div class="race-track"><div class="race-fill" style="width:${segment.value}%"></div></div>
            <span>${segment.value}%</span>
          </div>
        `).join("")}
      </div>

      <div class="tool-grid">
        <section class="scenario-card">
          <div class="info-label">Ask Before Trusting It</div>
          <p>${esc(scenario.questions.join(" "))}</p>
        </section>
        <section class="scenario-card">
          <div class="info-label">Failure Signs</div>
          <p>${esc(scenario.failureSigns.join(" "))}</p>
        </section>
      </div>
    </section>
  `;

  els.contentPanel.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeScenarioId = button.dataset.scenario;
      renderRaceLab();
    });
  });
}

function renderChecklist() {
  els.contentPanel.innerHTML = `
    <section class="panel-section tool-page">
      <span class="eyebrow">Tool Vetting Center</span>
      <h2>Questions to ask before a swim program trusts an AI tool.</h2>
      <p class="lead">Use these questions with vendors, internal dashboards, and staff experiments. The goal is not to block useful technology. The goal is to keep coaches in control of decisions that affect athletes.</p>
      <div class="check-list">
        ${data.vendorChecklist.map((item, index) => `
          <section class="check-item">
            <span class="check-number">${index + 1}</span>
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
      <span class="eyebrow">Athlete Data</span>
      <h2>Minor-athlete data should be treated as sensitive performance data.</h2>
      <p class="lead">Swim video can identify a child, show body position, reveal performance level, and create labels that follow an athlete. Clubs should be clear about purpose, access, retention, deletion, and model-training reuse.</p>
      <div class="privacy-list">
        ${data.privacyRules.map((item) => `
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
      <span class="eyebrow">Evidence Notes</span>
      <h2>What this prototype is anchored to.</h2>
      <p class="lead">This is an educational tool, not legal, medical, recruiting, or training prescription advice. It uses conservative wording where AI claims are uncertain or athlete welfare is involved.</p>
      <div class="source-list">
        ${data.sources.map((source) => `
          <section class="source-item">
            <h3><a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.name)}</a></h3>
            <p>${esc(source.note)}</p>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}

function render() {
  renderModuleFilter();
  renderTermList();

  if (state.view === "lexicon") renderLexicon();
  if (state.view === "lab") renderRaceLab();
  if (state.view === "checklist") renderChecklist();
  if (state.view === "privacy") renderPrivacy();
  if (state.view === "sources") renderSources();
}

function init() {
  renderRolePicker();
  render();

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    const terms = filteredTerms();
    if (terms.length && !terms.some((term) => term.id === state.activeTermId)) {
      state.activeTermId = terms[0].id;
    }
    render();
  });

  els.roleSelect.addEventListener("change", (event) => {
    state.roleId = event.target.value;
    render();
  });

  els.navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  els.homeButton.addEventListener("click", () => setView("lexicon"));
}

init();

# SwimAI Lexicon

Practical AI literacy for competitive swim coaches, performance staff, club administrators, and swim families.

The project is positioned around a simple idea:

> Better data, not less judgment.

This is not an AI coach and not a training-plan generator. It is a coach-facing education tool that helps users question AI outputs before those outputs affect training, race strategy, athlete feedback, privacy, or vendor purchasing.

## What Is Included

- 50 swim-specific AI literacy terms
- Six modules:
  - AI Foundations
  - Race Analytics
  - Video and Stroke AI
  - Athlete Monitoring
  - AI Risks
  - Coach Governance
- Role lenses for senior coaches, age-group coaches, college coaches, performance analysts, club administrators, and swim parents
- Race Analysis Lab scenarios
- AI vendor vetting checklist
- Minor-athlete data and video privacy guidance
- Source notes for AI risk, child privacy, Safe Sport context, and pose-estimation limits

## Design Principles

- Explain AI in plain coaching language.
- Treat AI as decision support, not decision replacement.
- Make uncertainty visible.
- Separate observed data from interpretation.
- Protect minor-athlete data.
- Avoid claims that a model can guarantee performance improvement.

## Running Locally

Open `index.html` in a browser. No build step is required.

## Deploying on Vercel

This is a static site. Import the repository into Vercel and use the default static deployment settings. No framework preset is required.

## Publishing to GitHub

The intended remote is:

```bash
https://github.com/DataDrivenMed/swimai-lexicon.git
```

If the GitHub repo already exists:

```bash
git push -u origin main
```

If you install GitHub CLI later:

```bash
gh repo create DataDrivenMed/swimai-lexicon --public --source=. --remote=origin --push
```

## Evidence Boundary

This prototype is educational. It is not legal advice, medical advice, recruiting advice, or a training prescription. Coaches and clubs should validate tools in their own context and consult appropriate legal or safeguarding guidance before collecting or sharing minor-athlete data.

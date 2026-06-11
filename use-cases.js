/* SwimAI Lexicon · use-cases.js
   Three phases: Training, Race Day, Post-Race.
   Each phase has:
     - A scenario walkthrough (steps A-style)
     - A side-by-side comparison (AI output vs coach interpretation)
*/

window.SWIMAI_USECASES = [
  {
    id: "training",
    phase: "Training",
    icon: "🏋️",
    tagline: "What the AI saw in practice — and what the coach still needs to decide.",
    intro: "It's Tuesday morning. You've uploaded last week's practice data to your AI load-monitoring platform. The system has processed heart rate, yardage, pace, and stroke-count data from 18 swimmers. Here's what it tells you — and what you need to think about before acting.",

    /* ── Scenario walkthrough (Style A) ── */
    steps: [
      {
        id: "training-1",
        label: "The AI output",
        heading: "The system flags three swimmers for elevated training load.",
        body: "The platform shows a red alert for Maya (16, 200 fly), Jordan (14, 200 free), and Sam (17, 400 IM). It recommends reducing their yardage by 15% next week and limiting race-pace sets.",
        type: "ai-output",
        explain: "This is an inference — the model took inputs (heart rate, yardage, completion rate) and produced a classification (elevated load). It did not observe illness, school exams, sleep, or mood.",
        glossaryTerms: ["Inference", "Training Load", "Classification"]
      },
      {
        id: "training-2",
        label: "What to ask first",
        heading: "Does the platform know what happened outside the pool?",
        body: "Jordan had final exams this week. Maya reported shoulder tightness in Thursday's session. Sam missed Wednesday entirely due to a family commitment — the platform counted that as zero load, not recovery.",
        type: "coach-check",
        explain: "Missing data changes everything. A model cannot factor in what it was never given. The platform's load number is based only on what it could measure — which is rarely the whole picture.",
        glossaryTerms: ["Missing Data", "Confounding Variables", "Recovery Modeling"]
      },
      {
        id: "training-3",
        label: "The confidence question",
        heading: "How confident is the alert — and what does that number actually mean?",
        body: "The platform shows an 87% confidence score on Maya's flag. That sounds reassuring. But it means the model is internally consistent about its inputs — not that it's correct about Maya's real-world fatigue.",
        type: "caution",
        explain: "Confidence is not correctness. A model can be 90% confident and wrong when the inputs it was given don't match the real situation. Always ask: confident based on what data?",
        glossaryTerms: ["Confidence Score", "Calibration", "False Precision"]
      },
      {
        id: "training-4",
        label: "Coach decision",
        heading: "Use the alert as a conversation starter, not a directive.",
        body: "You check in with all three athletes before changing the plan. Maya confirms the shoulder. Jordan says she felt fine despite exams. Sam says he's fully recovered and wants a hard week. You adjust Maya's plan, leave Jordan's unchanged, and talk Sam through a modified version.",
        type: "resolution",
        explain: "This is AI supporting coaching judgment — not replacing it. The alert surfaced something worth investigating. The coach's conversation with the athletes provided the context the model couldn't.",
        glossaryTerms: ["Human Oversight", "Automation Bias", "Guardrails"]
      }
    ],

    /* ── Side-by-side comparison (Style C) ── */
    comparison: {
      scenario: "End-of-week training load report for a 16-year-old 200 fly specialist.",
      aiSide: {
        label: "What the AI reported",
        points: [
          { heading: "Load score: 94 / 100", body: "Elevated. Recommend 15% yardage reduction next week." },
          { heading: "Race-pace sets: limit to 2", body: "Heart rate recovery time exceeded threshold on 3 of 5 sessions." },
          { heading: "Stroke count drift: +4%", body: "Butterfly stroke count increased in sets 4 and 5, suggesting fatigue accumulation." },
          { heading: "Confidence: 87%", body: "Based on 6 days of heart rate and pace data." }
        ]
      },
      coachSide: {
        label: "What the coach needs to add",
        points: [
          { heading: "Shoulder tightness reported Thursday", body: "The platform doesn't know this. The load score doesn't capture pain signals — only external workload metrics." },
          { heading: "Stroke count drift may be technical, not fatigue", body: "She was working on a new underwater timing cue. The drift could be intentional technique adjustment, not tiredness." },
          { heading: "Recovery day quality matters", body: "Saturday was listed as rest — but she had a 90-minute dryland session with her club's strength coach. That's not in the platform." },
          { heading: "87% confidence on incomplete inputs", body: "The model is confident about the numbers it saw. It had no access to pain, sleep, dryland load, or the technique change context." }
        ]
      }
    }
  },

  {
    id: "raceday",
    phase: "Race Day",
    icon: "🏁",
    tagline: "Split predictions, real-time alerts, and what the model cannot see on the blocks.",
    intro: "It's the regional championship. Your 17-year-old 100 backstroke swimmer is seeded 3rd. Your timing system has a pre-race prediction module, and a vendor tablet is showing live split comparisons. Here's what the AI says at three key moments — and what the coach needs to hold onto.",

    steps: [
      {
        id: "race-1",
        label: "Pre-race prediction",
        heading: "The system predicts a 54.2 — a 0.6 second drop from his seed time.",
        body: "Based on his training splits over the last six weeks, the model forecasts a personal best. It displays the number prominently on the coach tablet. His parents can also see it on the meet app.",
        type: "ai-output",
        explain: "This is a forecast built from training data — not a guarantee. The model doesn't know how he slept, what he ate, whether he's anxious, or how the warm-up felt. Exact numbers with no range are a red flag.",
        glossaryTerms: ["Forecasting", "Prediction Interval", "False Precision"]
      },
      {
        id: "race-2",
        label: "The warm-up problem",
        heading: "He had a rough warm-up. The model doesn't know that.",
        body: "He cramped slightly in the warm-up pool and felt sluggish through his back-half build. The prediction was generated before warm-up and hasn't updated. The 54.2 is still showing on the tablet.",
        type: "caution",
        explain: "A prediction model using training data can't observe warm-up quality in real time. The coach standing at the end of the warm-up pool has information the system will never have.",
        glossaryTerms: ["Missing Data", "Distribution Shift", "Signal vs Noise"]
      },
      {
        id: "race-3",
        label: "Mid-race split alert",
        heading: "At the turn, the tablet shows: 'On pace. Projected finish: 54.4.'",
        body: "He touches the wall at 27.1 — slightly behind his seed-pace split. The model adjusts its projection. A green indicator suggests he's still within range. The coach sees the split but trusts what they see in the water more.",
        type: "coach-check",
        explain: "Split-based mid-race modeling is useful context, but it can't see body position, breathing pattern, or whether he's holding back intentionally. The coach's eye is still the primary sensor.",
        glossaryTerms: ["Split Modeling", "Confidence Score", "Human Oversight"]
      },
      {
        id: "race-4",
        label: "The finish",
        heading: "He swims 55.1. The model was off by nearly a second.",
        body: "He finished strong in the last 15 meters but the cramp and warm-up fatigue showed in the back half. His coach uses this as a teaching moment: the model saw six weeks of training. The coach saw the morning. Both matter. Neither is the whole story.",
        type: "resolution",
        explain: "A model misses exactly the information coaches know best — athlete state on the day. The output wasn't wrong because the algorithm failed. It was wrong because the inputs stopped at last night.",
        glossaryTerms: ["Prediction", "Variance", "Automation Bias"]
      }
    ],

    comparison: {
      scenario: "100m backstroke, regional championship, seeded 3rd, age 17.",
      aiSide: {
        label: "What the AI reported",
        points: [
          { heading: "Pre-race forecast: 54.2", body: "Confidence: 81%. Based on 6-week training splits and taper progression model." },
          { heading: "Turn split: on pace", body: "27.1 at the turn. Projected finish adjusted to 54.4. Green status indicator." },
          { heading: "Stroke rate: within normal range", body: "Accelerometer data within expected bounds for this swimmer at race pace." },
          { heading: "Training load: optimal pre-meet", body: "Taper compliance was 96% over the final two weeks." }
        ]
      },
      coachSide: {
        label: "What the coach needed to factor in",
        points: [
          { heading: "Warm-up cramp — not in the model", body: "A minor cramp in the warm-up pool changed his confidence and back-half pacing plan. The tablet had no way to know this." },
          { heading: "Sluggish warm-up feel", body: "The coach noted he looked flat in his build sets. That qualitative read is not captured by any sensor. It changes the race plan conversation on the blocks." },
          { heading: "Turn split reads fine — body language didn't", body: "27.1 is a normal split for this swimmer, but he came off the wall with less push than usual. The number looked fine. The visual didn't." },
          { heading: "Prediction was built on optimal conditions", body: "The model assumes a swimmer who shows up the way they showed up in training. Championship morning adds variables no training log captures." }
        ]
      }
    }
  },

  {
    id: "postrace",
    phase: "Post-Race",
    icon: "📊",
    tagline: "AI-generated race reports, stroke analysis, and how to read them without over-trusting them.",
    intro: "The meet is over. Your AI race-analysis platform has processed the video and split data overnight. By 8am it has generated individual reports for 12 swimmers on your team. Here's what those reports contain — and how to review them before passing them to athletes and parents.",

    steps: [
      {
        id: "post-1",
        label: "The video analysis report",
        heading: "The platform identifies a 'dropped elbow on entry' in 8 of 12 freestyle swimmers.",
        body: "The stroke analysis tool processed 45-minute video files from four camera angles. It flagged early elbow drop at entry for the majority of the team, assigning each swimmer a technique score between 42 and 78 out of 100.",
        type: "ai-output",
        explain: "This is computer vision output — the system detected body landmark positions from video and classified them against a reference model. The question is whether the landmark detection was reliable in your pool conditions.",
        glossaryTerms: ["Computer Vision", "Pose Estimation", "Landmark Detection", "Annotation"]
      },
      {
        id: "post-2",
        label: "Check the video quality first",
        heading: "Three of the camera angles had significant glare and lane-rope obstruction.",
        body: "The morning session had low sun angle through the natatorium windows. Two cameras were partially obstructed by lane ropes in the wide shots. The model processed all footage and returned scores regardless — no input quality warning was shown.",
        type: "caution",
        explain: "Occlusion and lighting affect what the model can actually see. If the system doesn't flag poor-quality inputs, it may return confident-looking scores from frames where the swimmer was partly hidden.",
        glossaryTerms: ["Occlusion", "Frame Rate", "Confidence Score", "False Precision"]
      },
      {
        id: "post-3",
        label: "The benchmark problem",
        heading: "The technique scores compare your 13-year-olds to an adult freestyle reference model.",
        body: "The platform's default reference is a biomechanical model built from elite senior swimmers. Your age-group athletes score poorly partly because their proportions, stroke rate, and power curves are developmentally different — not because their technique is actually worse.",
        type: "caution",
        explain: "Benchmarks only make sense when the reference group matches your athlete. Comparing a 13-year-old's stroke mechanics to an Olympic-level adult produces a misleading score that can damage confidence without improving technique.",
        glossaryTerms: ["Benchmarking", "Dataset Bias", "Distribution Shift", "Training Data"]
      },
      {
        id: "post-4",
        label: "How to use the reports responsibly",
        heading: "Review every report before it reaches an athlete or parent. Add context. Change the language.",
        body: "You review the 12 reports and annotate each one before distribution. You add a coach note explaining the camera conditions, flag the benchmark mismatch for the age-group swimmers, and rewrite three reports that used language like 'significant technical deficiency' — which is vendor copy, not coaching language.",
        type: "resolution",
        explain: "AI-generated reports are starting points, not final deliverables. The coach's review is not optional — it's the step that makes the output safe to share with athletes whose confidence and development are at stake.",
        glossaryTerms: ["Human Oversight", "Transparency", "Audit Trail", "Athlete Privacy"]
      }
    ],

    comparison: {
      scenario: "Post-meet stroke analysis report for a 14-year-old 100m freestyle swimmer.",
      aiSide: {
        label: "What the AI report said",
        points: [
          { heading: "Technique score: 51 / 100", body: "Significant elbow drop detected on entry. Recommend corrective drills: fingertip drag, catch-up stroke." },
          { heading: "Stroke rate: 48 cycles/min", body: "Below optimal range for this event. Model suggests increasing tempo." },
          { heading: "Underwater time: 4.1 seconds", body: "Below benchmark. Recommend extended underwater work in practice." },
          { heading: "Overall assessment: Needs improvement", body: "Multiple technical flags. Performance is below peer-group average." }
        ]
      },
      coachSide: {
        label: "What the coach's review found",
        points: [
          { heading: "Score of 51 was from an obstructed camera angle", body: "The primary camera was partially blocked during the first 25m. The elbow-drop detection was flagging splash and arm position simultaneously — the model couldn't clearly distinguish them." },
          { heading: "48 cycles/min is appropriate for her build and age", body: "The 'optimal range' the model used is derived from senior elite swimmers. Her stroke rate is within normal developmental range for a 14-year-old with her limb length." },
          { heading: "4.1 second underwater is actually an improvement", body: "Her underwater was 3.6 seconds at the last meet. The model compared her to a static benchmark rather than her own recent trend — which is what actually matters for her development." },
          { heading: "'Needs improvement' is not coach language", body: "This assessment, if sent to a parent or athlete unedited, could undermine confidence. The coach rewrote it as: 'Strong effort. Three focus areas for next training block.' Same information, different effect." }
        ]
      }
    }
  }
];

window.SWIMAI_DATA = {
  modules: [
    {
      id: "foundations",
      name: "AI Foundations",
      color: "#147d88",
      blurb: "Basic AI ideas translated into coaching judgment."
    },
    {
      id: "race",
      name: "Race Analytics",
      color: "#2f6fbb",
      blurb: "How AI reads splits, trends, benchmarks, and race segments."
    },
    {
      id: "video",
      name: "Video and Stroke AI",
      color: "#6b5ca5",
      blurb: "Computer vision concepts for starts, turns, strokes, and underwater work."
    },
    {
      id: "load",
      name: "Athlete Monitoring",
      color: "#2f7d4f",
      blurb: "Training load, recovery signals, wearables, and context."
    },
    {
      id: "risks",
      name: "AI Risks",
      color: "#c94f3d",
      blurb: "Common ways AI can mislead a coach or athlete."
    },
    {
      id: "governance",
      name: "Coach Governance",
      color: "#b9770e",
      blurb: "Privacy, consent, accountability, and responsible adoption."
    }
  ],

  roles: [
    {
      id: "senior-coach",
      name: "Senior Coach",
      tip: "Use AI as a second set of eyes. Require evidence before changing practice design, race plans, or athlete messaging."
    },
    {
      id: "age-group",
      name: "Age Group Coach",
      tip: "Be extra careful with growth, maturity, motivation, and parent communication. Young swimmers are not small college swimmers."
    },
    {
      id: "college",
      name: "College Coach",
      tip: "Check whether the model handles event group, roster depth, taper phase, recruiting context, and academic stress."
    },
    {
      id: "performance",
      name: "Performance Analyst",
      tip: "Focus on measurement quality, validation, uncertainty, repeatability, and whether the output changes the decision."
    },
    {
      id: "club-admin",
      name: "Club Administrator",
      tip: "Look at consent, contracts, data retention, staff training, parent questions, and who is accountable when a tool is wrong."
    },
    {
      id: "swim-parent",
      name: "Swim Parent",
      tip: "Use AI reports as conversation starters. Do not let a dashboard label a child or override a coach who knows the athlete."
    }
  ],

  terms: [
    {
      id: "algorithm",
      name: "Algorithm",
      module: "foundations",
      plain: "A step-by-step method a system uses to turn inputs into an output.",
      swim: "A race app may use an algorithm to turn splits, stroke count, and prior best times into a suggested training focus.",
      why: "Knowing the algorithm's inputs helps a coach see what the tool considered and what it ignored.",
      ask: "What specific data went into this recommendation?",
      redFlag: "The vendor cannot explain the basic variables behind the output.",
      useNow: "Ask a tool vendor to show one example from raw race data to final recommendation.",
      related: ["Model", "Feature Engineering", "Explainability"],
      quiz: {
        q: "A tool recommends more underwater work after reading race splits. What should the coach ask first?",
        choices: ["What data drove the recommendation?", "Whether the app looks modern", "Whether the swimmer liked the output"],
        correct: 0,
        why: "The coach needs to know the inputs before changing training."
      }
    },
    {
      id: "model",
      name: "Model",
      module: "foundations",
      plain: "A system trained or configured to recognize patterns and produce predictions, classifications, or recommendations.",
      swim: "A model may classify a stroke flaw, predict a likely time range, or identify whether time is being lost into or out of a turn.",
      why: "A model only earns trust when it has been tested in conditions like the coach's real swimmers, races, and videos.",
      ask: "Was this model tested on swimmers like mine?",
      redFlag: "One overall accuracy number is shown without age, event, sex, stroke, level, or camera-condition detail.",
      useNow: "Compare the tool's claim against three swimmers whose race context you already understand well.",
      related: ["Training Data", "Validation", "Distribution Shift"],
      quiz: {
        q: "Why might a model trained on college sprinters fail for age-group swimmers?",
        choices: ["The swimmer population differs", "AI cannot analyze swimming", "Pools are always different lengths"],
        correct: 0,
        why: "Models often fail when used on athletes unlike the data they learned from."
      }
    },
    {
      id: "training-data",
      name: "Training Data",
      module: "foundations",
      plain: "The examples used to teach an AI system before it is deployed.",
      swim: "Training data might include race videos, meet results, splits, practice logs, wearable signals, or coach-labeled stroke errors.",
      why: "The tool's strengths and blind spots usually come from what its training data did and did not include.",
      ask: "Which ages, strokes, events, camera angles, and competitive levels were represented?",
      redFlag: "The tool gives no useful information about what data it learned from.",
      useNow: "Create a short list of swimmer groups your team cares about and ask whether each was included in testing.",
      related: ["Dataset Bias", "Validation", "Annotation"],
      quiz: {
        q: "What is the concern if a video model was trained mostly on clear elite freestyle footage?",
        choices: ["It may struggle with other strokes and messy footage", "It will automatically work for everyone", "It cannot use video"],
        correct: 0,
        why: "Narrow training data can make a system unreliable in different real-world conditions."
      }
    },
    {
      id: "inference",
      name: "Inference",
      module: "foundations",
      plain: "The moment a trained AI system uses new information to produce an output.",
      swim: "When a coach uploads a 100 back video and the app returns a breakout diagnosis, that output is inference.",
      why: "Inference quality depends on whether the new input is good enough and similar enough to what the model can handle.",
      ask: "Is this video, split file, or wearable signal good enough for the model to interpret?",
      redFlag: "The tool gives confident results from shaky, incomplete, or low-frame-rate video.",
      useNow: "Before trusting an output, rate the input quality as good, usable, weak, or unusable.",
      related: ["Model", "Frame Rate", "Distribution Shift"],
      quiz: {
        q: "A shaky video produces a precise elbow-angle score. What is the concern?",
        choices: ["The input quality may not support that precision", "The swimmer cannot improve", "The model is guaranteed correct"],
        correct: 0,
        why: "Poor input can make precise-looking AI output misleading."
      }
    },
    {
      id: "prediction",
      name: "Prediction",
      module: "foundations",
      plain: "An estimate about a future or unknown outcome based on available data.",
      swim: "A system might predict whether a swimmer is likely to reach a championship cut by the end of the season.",
      why: "Predictions are not promises. They should be treated as uncertain estimates shaped by training, health, growth, and race execution.",
      ask: "What is the uncertainty around this prediction?",
      redFlag: "The tool presents an exact future time without a range or explanation.",
      useNow: "Rewrite exact predictions as ranges before discussing them with athletes or parents.",
      related: ["Prediction Interval", "Forecasting", "Calibration"],
      quiz: {
        q: "What is the safest way to interpret a predicted time drop?",
        choices: ["As a plausible estimate with uncertainty", "As a guaranteed result", "As proof the coach is wrong"],
        correct: 0,
        why: "Performance predictions are estimates, not guarantees."
      }
    },
    {
      id: "classification",
      name: "Classification",
      module: "foundations",
      plain: "Putting an input into a category.",
      swim: "A video tool might classify a turn as clean, late, short breakout, or poor wall contact.",
      why: "Classification can simplify review, but categories can hide nuance when technique problems overlap.",
      ask: "What categories exist, and what does the model do when the case does not fit cleanly?",
      redFlag: "The tool forces every swimmer into a single label without uncertainty or coach review.",
      useNow: "Use AI labels to prioritize review, then check the actual video before coaching the correction.",
      related: ["Confidence Score", "Annotation", "Human Oversight"],
      quiz: {
        q: "What is a classification output?",
        choices: ["A category such as late turn", "A training philosophy", "A guarantee of improvement"],
        correct: 0,
        why: "Classification assigns an input to a defined category."
      }
    },
    {
      id: "confidence-score",
      name: "Confidence Score",
      module: "foundations",
      plain: "A number that tries to express how sure a system is about an output.",
      swim: "A stroke app may say it is 82 percent confident that the swimmer breathed late into the wall.",
      why: "Confidence is not the same as correctness. A model can be confidently wrong, especially outside its tested setting.",
      ask: "Has this confidence score been calibrated against real outcomes?",
      redFlag: "High confidence is used to shut down coach review.",
      useNow: "Treat low confidence as a review flag, and treat high confidence as still requiring evidence.",
      related: ["Calibration", "False Precision", "Validation"],
      quiz: {
        q: "What does high confidence fail to prove by itself?",
        choices: ["That the output is correct", "That the model produced an output", "That data was entered"],
        correct: 0,
        why: "A model can be confident and wrong."
      }
    },
    {
      id: "validation",
      name: "Validation",
      module: "foundations",
      plain: "Testing whether a system works on data it did not learn from.",
      swim: "A vendor should show that a stroke tool works on new swimmers, different pools, multiple strokes, and realistic camera setups.",
      why: "Validation is the difference between a useful tool and a polished demo.",
      ask: "Has this tool been validated on the athlete population and use case I care about?",
      redFlag: "Testimonials replace performance metrics, subgroup checks, and failure-case reporting.",
      useNow: "Ask for validation results by stroke, event, age group, sex, course, and video condition.",
      related: ["Benchmarking", "Dataset Bias", "Distribution Shift"],
      quiz: {
        q: "What is stronger evidence than a coach testimonial?",
        choices: ["External validation on similar swimmers", "A colorful dashboard", "A celebrity endorsement"],
        correct: 0,
        why: "Independent or realistic validation is stronger than marketing claims."
      }
    },
    {
      id: "explainability",
      name: "Explainability",
      module: "foundations",
      plain: "The ability to understand why an AI system produced a specific output.",
      swim: "A useful race tool should show whether it blamed the start, first 25, turn, underwater, tempo, or back-half fade.",
      why: "A coach needs evidence, not just a score. Explanations help the coach decide whether the output is usable.",
      ask: "Can the tool show the race segment, video frame, or data feature behind the recommendation?",
      redFlag: "The tool gives advice but cannot show what evidence drove it.",
      useNow: "Before using an AI recommendation in feedback, ask what observable evidence supports it.",
      related: ["Feature Engineering", "Human Oversight", "False Precision"],
      quiz: {
        q: "Which output is more explainable?",
        choices: ["Breakout speed dropped after lap two", "Train harder", "AI score is 73"],
        correct: 0,
        why: "It links the recommendation to a specific observable performance component."
      }
    },
    {
      id: "calibration",
      name: "Calibration",
      module: "foundations",
      plain: "How well a model's confidence matches reality.",
      swim: "If a tool says it is 80 percent confident on many turn labels, it should be right about 80 percent of the time in similar cases.",
      why: "Uncalibrated confidence can make coaches trust weak outputs or ignore useful warnings.",
      ask: "When the tool says high confidence, how often is it actually right?",
      redFlag: "Confidence numbers are displayed but never tested against real outcomes.",
      useNow: "Track a small sample of AI labels against coach-reviewed truth to see whether confidence means anything.",
      related: ["Confidence Score", "Validation", "False Precision"],
      quiz: {
        q: "What does calibration test?",
        choices: ["Whether confidence matches actual correctness", "Whether the screen is readable", "Whether all outputs are true"],
        correct: 0,
        why: "Calibration compares stated confidence with real-world accuracy."
      }
    },
    {
      id: "signal-vs-noise",
      name: "Signal vs Noise",
      module: "race",
      plain: "The difference between a meaningful pattern and random variation.",
      swim: "One slow race may reflect illness, travel, stress, suit choice, poor sleep, or a bad warm-up instead of a real decline.",
      why: "Good coaching avoids overreacting to one data point.",
      ask: "Has this pattern repeated enough to change training?",
      redFlag: "The tool treats one race or one practice set as a firm diagnosis.",
      useNow: "Look for the same pattern across multiple meets, sets, or videos before changing the plan.",
      related: ["Trend Analysis", "Variance", "False Precision"],
      quiz: {
        q: "Which is a stronger signal?",
        choices: ["Repeated slow breakouts across three meets", "One bad 50 free", "One parent's impression"],
        correct: 0,
        why: "Repeated patterns are more reliable than isolated results."
      }
    },
    {
      id: "variance",
      name: "Variance",
      module: "race",
      plain: "Normal spread or fluctuation in performance measurements.",
      swim: "A 50 free time can vary because of start quality, touch, pool, warm-up, nerves, sleep, travel, or timing conditions.",
      why: "Understanding normal variation prevents overreacting to tiny changes.",
      ask: "Is this change bigger than the swimmer's normal race-to-race variation?",
      redFlag: "The tool treats a tiny difference as meaningful without comparing it to normal fluctuation.",
      useNow: "Look at several comparable races before calling a small time change a breakthrough or decline.",
      related: ["Signal vs Noise", "Trend Analysis", "False Precision"],
      quiz: {
        q: "Why does variance matter?",
        choices: ["Small changes may be normal fluctuation", "It makes all timing useless", "It proves a training plan worked"],
        correct: 0,
        why: "Some performance movement is expected noise, not a new signal."
      }
    },
    {
      id: "split-modeling",
      name: "Split Modeling",
      module: "race",
      plain: "Analyzing how time is distributed across race segments.",
      swim: "For a 100 free, the model may compare first 50, second 50, turn speed, underwater distance, and final 15 meters.",
      why: "Total time alone rarely tells the coach where the race was won or lost.",
      ask: "Which race segment is the actual limiter?",
      redFlag: "The tool recommends generic conditioning without identifying where the race breaks down.",
      useNow: "Compare the AI diagnosis to video and splits for the same race segment.",
      related: ["Feature Engineering", "Benchmarking", "Performance Trajectory"],
      quiz: {
        q: "A swimmer opens fast and fades heavily. What should the coach examine?",
        choices: ["Back-half speed, pacing, turns, and fatigue mechanics", "Only total time", "Only the start"],
        correct: 0,
        why: "Race diagnosis needs segment-level evidence."
      }
    },
    {
      id: "benchmarking",
      name: "Benchmarking",
      module: "race",
      plain: "Comparing a swimmer to a relevant reference group or target standard.",
      swim: "Benchmarks may include team norms, state cuts, Futures cuts, college ranges, or similar swimmers by age and event.",
      why: "Bad benchmarks create bad expectations and misleading training priorities.",
      ask: "Is the comparison group appropriate for this swimmer?",
      redFlag: "Every swimmer is compared to elite adult standards without developmental context.",
      useNow: "Check whether the benchmark matches age, sex, stroke, event, course, and training age.",
      related: ["Validation", "Distribution Shift", "Prediction"],
      quiz: {
        q: "What makes a benchmark useful?",
        choices: ["It matches the swimmer's context", "It is always Olympic-level", "It never changes"],
        correct: 0,
        why: "A benchmark must fit the athlete and decision."
      }
    },
    {
      id: "feature-engineering",
      name: "Feature Engineering",
      module: "race",
      plain: "Choosing and shaping the variables an AI system uses.",
      swim: "Useful features may include reaction time, breakout distance, stroke rate, stroke count, turn time, attendance, and taper phase.",
      why: "Domain knowledge often matters more than model complexity. A model cannot use context it never receives.",
      ask: "Were the right swim-specific variables included?",
      redFlag: "The model uses only age and final time but makes detailed technical recommendations.",
      useNow: "List the variables a good coach would inspect, then compare that list to what the tool uses.",
      related: ["Algorithm", "Split Modeling", "Explainability"],
      quiz: {
        q: "Which feature is directly useful for turn diagnosis?",
        choices: ["Wall contact to breakout time", "Favorite suit color", "Team mascot"],
        correct: 0,
        why: "A turn diagnosis needs turn-specific variables."
      }
    },
    {
      id: "trend-analysis",
      name: "Trend Analysis",
      module: "race",
      plain: "Looking at direction over time rather than one result.",
      swim: "A dashboard may show whether a swimmer's 200 pace is improving across the season while their 50 speed is flat.",
      why: "Trends help separate real development from one-off meet conditions.",
      ask: "Is the pattern stable across enough time and enough comparable races?",
      redFlag: "The tool calls a plateau after two races in different contexts.",
      useNow: "Review trends within the same event, course, season phase, and training block.",
      related: ["Signal vs Noise", "Performance Trajectory", "Outlier Detection"],
      quiz: {
        q: "Why is trend analysis useful?",
        choices: ["It shows direction over time", "It ignores context", "It guarantees future cuts"],
        correct: 0,
        why: "Longitudinal direction is usually more informative than one time."
      }
    },
    {
      id: "prediction-interval",
      name: "Prediction Interval",
      module: "race",
      plain: "A range of likely values around a prediction.",
      swim: "Instead of saying a swimmer will drop exactly 1.2 seconds, a safer system might say 0.4 to 1.4 seconds under similar conditions.",
      why: "Ranges remind coaches, parents, and athletes that performance is uncertain.",
      ask: "How wide is the realistic range, and what could move the swimmer outside it?",
      redFlag: "A predicted time is shown to the hundredth without uncertainty.",
      useNow: "When discussing a forecast, include the range and the assumptions.",
      related: ["Prediction", "False Precision", "Forecasting"],
      quiz: {
        q: "Which output is safer?",
        choices: ["Likely 0.4 to 1.4 seconds", "Exactly 1.17 seconds", "Guaranteed cut"],
        correct: 0,
        why: "A range communicates uncertainty better than false exactness."
      }
    },
    {
      id: "forecasting",
      name: "Forecasting",
      module: "race",
      plain: "Estimating likely future performance from current and past information.",
      swim: "A forecast may estimate whether a swimmer is on pace for a championship cut by the target meet.",
      why: "Forecasts can help planning, but they are fragile when health, growth, attendance, taper response, or motivation changes.",
      ask: "What assumptions does this forecast depend on?",
      redFlag: "The forecast is treated as destiny rather than a planning estimate.",
      useNow: "Review forecasts monthly and update them when the athlete's context changes.",
      related: ["Prediction", "Prediction Interval", "Performance Trajectory"],
      quiz: {
        q: "What is a responsible use of forecasting?",
        choices: ["Planning with uncertainty", "Promising a cut", "Ignoring new athlete context"],
        correct: 0,
        why: "Forecasting is useful when it stays flexible and uncertain."
      }
    },
    {
      id: "outlier-detection",
      name: "Outlier Detection",
      module: "race",
      plain: "Finding results that are unusual compared with expected patterns.",
      swim: "An app might flag an unusually slow back-half split or a race that does not match the swimmer's recent progression.",
      why: "Outliers can reveal illness, injury, data-entry errors, tactical mistakes, or real performance breakthroughs.",
      ask: "Is this outlier a data problem, a context problem, or a real performance signal?",
      redFlag: "The tool flags unusual results but does not help the coach investigate why.",
      useNow: "For every outlier, check timing accuracy, meet context, health, warm-up, and video.",
      related: ["Signal vs Noise", "Missing Data", "Trend Analysis"],
      quiz: {
        q: "What should a coach do with an outlier?",
        choices: ["Investigate the context", "Ignore all other evidence", "Assume it proves the athlete changed"],
        correct: 0,
        why: "Outliers need investigation before interpretation."
      }
    },
    {
      id: "performance-trajectory",
      name: "Performance Trajectory",
      module: "race",
      plain: "The pattern of improvement, plateau, regression, or event shift over time.",
      swim: "A swimmer may stall in the 50 free but improve in the 200 free, suggesting a changing event profile.",
      why: "Trajectory helps coaches see development rather than reacting only to best times.",
      ask: "Is the swimmer's event profile changing over time?",
      redFlag: "Every plateau is treated as poor effort or poor coaching.",
      useNow: "Review trajectory alongside growth, attendance, training block, and race execution.",
      related: ["Trend Analysis", "Forecasting", "Benchmarking"],
      quiz: {
        q: "What does trajectory add beyond one best time?",
        choices: ["Direction over time", "A guaranteed future result", "A reason to ignore practice"],
        correct: 0,
        why: "Trajectory shows how the athlete is moving over time."
      }
    },
    {
      id: "computer-vision",
      name: "Computer Vision",
      module: "video",
      plain: "AI that interprets images or video.",
      swim: "A computer-vision tool may identify body position, arm path, head movement, turn timing, or breakout distance.",
      why: "Swimming video is hard: water distortion, bubbles, lane lines, reflections, and camera angle all affect what the system sees.",
      ask: "What video conditions does the tool handle well, and where does it fail?",
      redFlag: "The vendor shows perfect demo clips but no messy real-pool examples.",
      useNow: "Test the tool on ordinary meet footage, not only controlled practice video.",
      related: ["Pose Estimation", "Occlusion", "Frame Rate"],
      quiz: {
        q: "Why is swimming video difficult for computer vision?",
        choices: ["Water and camera conditions can hide body parts", "Video cannot contain data", "Coaches cannot review it"],
        correct: 0,
        why: "Aquatic environments create visibility and tracking problems."
      }
    },
    {
      id: "pose-estimation",
      name: "Pose Estimation",
      module: "video",
      plain: "Estimating body position by locating joints or body landmarks in an image or video.",
      swim: "A tool may estimate shoulder, elbow, hip, knee, and ankle positions during freestyle or butterfly.",
      why: "Pose estimates are useful only if the detected landmarks match the swimmer's real body position.",
      ask: "Can I see the detected body points on the video?",
      redFlag: "The system reports joint angles without showing whether it tracked the swimmer correctly.",
      useNow: "Overlay the landmarks and inspect missed frames before accepting the technique score.",
      related: ["Landmark Detection", "Computer Vision", "False Precision"],
      quiz: {
        q: "Why should a coach inspect detected landmarks?",
        choices: ["To verify the model tracked the body correctly", "To avoid watching video", "To guarantee a time drop"],
        correct: 0,
        why: "Bad landmark detection leads to bad technique interpretation."
      }
    },
    {
      id: "landmark-detection",
      name: "Landmark Detection",
      module: "video",
      plain: "Finding specific points on the body or pool environment.",
      swim: "A system might mark wrist entry, shoulder line, hip position, wall touch, or breakout point.",
      why: "Small landmark errors can become large errors in timing, angle, or distance calculations.",
      ask: "How often does the tool lose the landmark in bubbles, glare, or lane-line obstruction?",
      redFlag: "The tool hides low-quality landmark tracking behind a clean score.",
      useNow: "Review a few slow-motion frames where the tool claims the biggest technical issue.",
      related: ["Pose Estimation", "Motion Tracking", "Occlusion"],
      quiz: {
        q: "What can happen when landmarks are wrong?",
        choices: ["The technique measurement can be wrong", "The pool changes length", "The swimmer cannot improve"],
        correct: 0,
        why: "Measurements built from bad points are unreliable."
      }
    },
    {
      id: "frame-rate",
      name: "Frame Rate",
      module: "video",
      plain: "The number of video frames captured per second.",
      swim: "Starts, turns, hand entries, and breakouts happen quickly, so low-frame-rate video may miss critical moments.",
      why: "A tool cannot precisely measure events that the camera did not capture clearly.",
      ask: "Is the footage fast enough for the movement being measured?",
      redFlag: "The system reports hundredths-of-a-second timing from ordinary low-quality video.",
      useNow: "Use higher frame-rate footage for starts, turns, and breakout timing when possible.",
      related: ["Computer Vision", "False Precision", "Motion Tracking"],
      quiz: {
        q: "Why does frame rate matter for turns?",
        choices: ["Fast events need enough frames to measure timing", "It determines motivation", "It replaces coaching"],
        correct: 0,
        why: "Temporal resolution matters when movements happen quickly."
      }
    },
    {
      id: "motion-tracking",
      name: "Motion Tracking",
      module: "video",
      plain: "Following a swimmer, body part, or object across video frames.",
      swim: "A tool may track head position into a breath, hand speed through the catch, or the swimmer's body line off the wall.",
      why: "Tracking errors can look like technical errors when the software loses the swimmer.",
      ask: "Does the tracked path stay on the athlete across the full movement?",
      redFlag: "Tracking jumps from the swimmer to splash, lane rope, or another athlete.",
      useNow: "Watch the tracking overlay before using a motion metric in athlete feedback.",
      related: ["Landmark Detection", "Occlusion", "Frame Rate"],
      quiz: {
        q: "What is a tracking failure?",
        choices: ["The software follows splash instead of the swimmer", "The coach uses video", "The swimmer changes lane"],
        correct: 0,
        why: "The model has lost the object it was supposed to follow."
      }
    },
    {
      id: "occlusion",
      name: "Occlusion",
      module: "video",
      plain: "When something blocks what the AI needs to see.",
      swim: "Water, another swimmer, a lane rope, bubbles, arms crossing the body, or a poor angle can hide key body parts.",
      why: "A hidden body part may force the system to guess.",
      ask: "Which frames or body parts were blocked, and how did the tool handle that?",
      redFlag: "The tool gives full certainty even when the swimmer was partly hidden.",
      useNow: "Mark occluded segments as lower-confidence review zones.",
      related: ["Computer Vision", "Pose Estimation", "Confidence Score"],
      quiz: {
        q: "What is occlusion?",
        choices: ["A blocked view of needed information", "A faster split", "A type of training set"],
        correct: 0,
        why: "Occlusion means the system cannot see something important."
      }
    },
    {
      id: "annotation",
      name: "Annotation",
      module: "video",
      plain: "Human labeling of data so a model can learn or be evaluated.",
      swim: "Coaches might label frames for hand entry, early breath, dropped elbow, breakout point, or turn initiation.",
      why: "AI trained on poor labels learns poor targets.",
      ask: "Who labeled the data, and were they qualified to label swimming technique?",
      redFlag: "Labels were created by non-swimmers without reliability checks.",
      useNow: "For internal projects, define technique labels before asking staff to tag video.",
      related: ["Inter-rater Reliability", "Training Data", "Validation"],
      quiz: {
        q: "Why does annotation quality matter?",
        choices: ["The model learns from the labels", "Labels are decorative", "Labels remove all bias"],
        correct: 0,
        why: "Supervised models learn from human examples."
      }
    },
    {
      id: "inter-rater-reliability",
      name: "Inter-rater Reliability",
      module: "video",
      plain: "How much different observers agree when judging the same thing.",
      swim: "If three coaches rate the same breaststroke pullout differently, AI trained on those ratings may learn an unstable target.",
      why: "Low agreement means the label may be unclear, not that the AI needs more confidence.",
      ask: "Do expert coaches agree on the labels used to train or test the system?",
      redFlag: "The vendor claims technique accuracy but never checked whether human experts agreed.",
      useNow: "Have multiple coaches label the same clips before building or buying a technique dataset.",
      related: ["Annotation", "Validation", "Computer Vision"],
      quiz: {
        q: "What does low inter-rater reliability suggest?",
        choices: ["The labels may be inconsistent", "The model is perfect", "Video is unnecessary"],
        correct: 0,
        why: "If humans do not agree, the AI target may be unstable."
      }
    },
    {
      id: "training-load",
      name: "Training Load",
      module: "load",
      plain: "A summary of how much training stress an athlete is exposed to over time.",
      swim: "Load may include yardage, intensity, dryland, race-pace work, attendance, heart rate, perceived effort, and meet schedule.",
      why: "The same workout can stress two swimmers differently.",
      ask: "Does this load metric reflect the athlete's actual stress?",
      redFlag: "The system recommends more work without considering recovery, school stress, illness, or growth.",
      useNow: "Pair load numbers with coach observation and athlete check-ins.",
      related: ["Recovery Modeling", "Confounding Variables", "Wearable Data"],
      quiz: {
        q: "Why is yardage alone an incomplete load measure?",
        choices: ["Intensity and athlete context matter", "Yardage never matters", "All swimmers respond equally"],
        correct: 0,
        why: "Training stress depends on more than distance."
      }
    },
    {
      id: "recovery-modeling",
      name: "Recovery Modeling",
      module: "load",
      plain: "Estimating whether an athlete is adapting well or may need adjusted load.",
      swim: "Inputs may include sleep, soreness, mood, heart rate, practice performance, school stress, illness, and recent racing.",
      why: "Recovery is individual and noisy. A model may miss the real reason a swimmer looks flat.",
      ask: "What non-swimming factors could explain this signal?",
      redFlag: "The AI labels a swimmer as overtrained based on one wearable metric.",
      useNow: "Use recovery scores to start a conversation, not to make automatic lane or load decisions.",
      related: ["Wearable Data", "Confounding Variables", "Missing Data"],
      quiz: {
        q: "What should a coach avoid?",
        choices: ["Treating one recovery metric as the whole athlete", "Asking about sleep", "Reviewing practice trends"],
        correct: 0,
        why: "Single metrics can mislead without athlete context."
      }
    },
    {
      id: "wearable-data",
      name: "Wearable Data",
      module: "load",
      plain: "Data collected by devices such as watches, straps, rings, or sensors.",
      swim: "Wearables may estimate heart rate, sleep, strain, distance, stroke count, or pace.",
      why: "Wearables can be useful, but water, fit, movement, device algorithms, and updates affect accuracy.",
      ask: "Has this device and metric been validated for swimming specifically?",
      redFlag: "Consumer wearable estimates are treated as exact physiological truth.",
      useNow: "Compare wearable trends with coach observation and swimmer self-report before acting.",
      related: ["Training Load", "Missing Data", "False Precision"],
      quiz: {
        q: "Why should swim wearable data be interpreted cautiously?",
        choices: ["Water and motion can affect measurement", "All wearables are perfect", "Coaches cannot use data"],
        correct: 0,
        why: "Device measurements can be noisy in aquatic settings."
      }
    },
    {
      id: "missing-data",
      name: "Missing Data",
      module: "load",
      plain: "Important information that is absent from the dataset or input.",
      swim: "Missing data may include skipped practices, illness, incomplete splits, poor video angles, or missing sleep logs.",
      why: "AI often sounds confident even when key context is absent.",
      ask: "What important information is not in the system?",
      redFlag: "The tool gives strong conclusions despite incomplete records.",
      useNow: "Add a missing-context note before using any AI report with an athlete or parent.",
      related: ["Training Data", "Recovery Modeling", "Dataset Bias"],
      quiz: {
        q: "What happens if only good races are uploaded?",
        choices: ["Progress may be overestimated", "Accuracy automatically improves", "The model becomes unbiased"],
        correct: 0,
        why: "Selective data entry can bias conclusions."
      }
    },
    {
      id: "confounding-variables",
      name: "Confounding Variables",
      module: "load",
      plain: "Factors that distort the apparent relationship between an input and an outcome.",
      swim: "A swimmer may improve after a new set, but the true driver could be growth, taper, attendance, nutrition, or easier meet conditions.",
      why: "Confounding is why correlation is not automatically a coaching cause.",
      ask: "What else changed at the same time?",
      redFlag: "The tool claims one training change caused improvement without controlling for context.",
      useNow: "List plausible alternate explanations before calling a training change successful.",
      related: ["Causation", "Correlation", "Recovery Modeling"],
      quiz: {
        q: "What is the key confounding question?",
        choices: ["What else changed?", "Can we ignore context?", "Is the dashboard colorful?"],
        correct: 0,
        why: "Another factor may explain the outcome."
      }
    },
    {
      id: "correlation",
      name: "Correlation",
      module: "load",
      plain: "When two things move together, without proving that one caused the other.",
      swim: "A dashboard may show that swimmers with higher attendance improved more, but attendance may also reflect health, motivation, family support, or lane placement.",
      why: "Correlation can guide questions, but it should not be sold as proof.",
      ask: "Does this relationship still hold after considering obvious context?",
      redFlag: "The tool converts a correlation into a guaranteed training rule.",
      useNow: "Use correlations to form coaching hypotheses that you check against real athletes.",
      related: ["Causation", "Confounding Variables", "Trend Analysis"],
      quiz: {
        q: "What does correlation prove by itself?",
        choices: ["That two measures move together", "That one measure caused the other", "That training should change immediately"],
        correct: 0,
        why: "Correlation does not establish cause."
      }
    },
    {
      id: "causation",
      name: "Causation",
      module: "load",
      plain: "A relationship where one factor actually contributes to an outcome.",
      swim: "A coach may believe a new race-pace set caused better 100 free performance, but taper, growth, starts, or attendance may also explain the drop.",
      why: "Causal claims need stronger evidence than ordinary dashboard patterns.",
      ask: "What evidence shows this change caused the outcome rather than simply happened before it?",
      redFlag: "The AI says a training block caused a time drop without a comparison or context.",
      useNow: "Be careful with phrases like caused, guaranteed, or proven in athlete feedback.",
      related: ["Correlation", "Confounding Variables", "Validation"],
      quiz: {
        q: "What does a causal claim require?",
        choices: ["Evidence beyond simple association", "A precise chart label", "A larger font"],
        correct: 0,
        why: "Causation needs stronger evidence than correlation."
      }
    },
    {
      id: "automation-bias",
      name: "Automation Bias",
      module: "risks",
      plain: "Over-trusting a computer recommendation because it appears objective or precise.",
      swim: "An app says stroke rate is the limiter, but the coach knows the swimmer was sick, slept poorly, and had a bad warm-up.",
      why: "Coaches hold context that may not exist in the data.",
      ask: "What do I know as a coach that the AI does not know?",
      redFlag: "The training plan changes without reviewing video, splits, recent training, and athlete condition.",
      useNow: "Require a coach note before acting on high-impact AI recommendations.",
      related: ["Human Oversight", "False Precision", "Explainability"],
      quiz: {
        q: "What protects against automation bias?",
        choices: ["Coach review of context and evidence", "Blind trust", "More decimals"],
        correct: 0,
        why: "Human oversight keeps AI output in context."
      }
    },
    {
      id: "hallucination",
      name: "Hallucination",
      module: "risks",
      plain: "When a generative AI system produces plausible-sounding but unsupported or false information.",
      swim: "A chatbot might invent a coaching study, fabricate a swimmer progression pattern, or make up a training principle.",
      why: "Confident language is not the same as evidence.",
      ask: "Can this claim be verified from a real source or our own data?",
      redFlag: "The tool gives scientific-sounding claims without references, methods, or data.",
      useNow: "Verify external claims before putting them into a training plan, parent email, or athlete meeting.",
      related: ["Transparency", "Human Oversight", "Validation"],
      quiz: {
        q: "What is hallucination in this context?",
        choices: ["Plausible but unsupported AI output", "A swimmer visualizing a race", "A stopwatch error"],
        correct: 0,
        why: "Generative AI can produce confident false statements."
      }
    },
    {
      id: "overfitting",
      name: "Overfitting",
      module: "risks",
      plain: "When a model fits past data too closely and performs poorly on new situations.",
      swim: "A plan may look perfect for last season but fail when the swimmer grows, changes events, or faces a different meet schedule.",
      why: "Overfit systems mistake old noise for future truth.",
      ask: "Did this pattern generalize beyond the past examples?",
      redFlag: "The model performs well on historical data but poorly with new races.",
      useNow: "Test patterns on new meets or comparable swimmers before trusting them.",
      related: ["Validation", "Signal vs Noise", "Performance Trajectory"],
      quiz: {
        q: "What is the main danger of overfitting?",
        choices: ["It fails on new data", "It improves generalization", "It proves causation"],
        correct: 0,
        why: "Overfitting captures noise rather than generalizable signal."
      }
    },
    {
      id: "false-precision",
      name: "False Precision",
      module: "risks",
      plain: "Presenting an estimate with more exactness than the data can justify.",
      swim: "A tool says the swimmer will drop exactly 0.87 seconds, even though performance depends on many unstable factors.",
      why: "Decimals can make weak evidence look scientific.",
      ask: "Is the data quality strong enough for this level of precision?",
      redFlag: "The dashboard uses exact numbers without uncertainty ranges or input-quality warnings.",
      useNow: "Round uncertain results and add plain-language caveats before sharing them.",
      related: ["Prediction Interval", "Frame Rate", "Signal vs Noise"],
      quiz: {
        q: "Which is a safer output?",
        choices: ["Likely within 0.5 to 1.0 seconds of the target", "Exactly 0.73 seconds will be dropped", "Guaranteed cut"],
        correct: 0,
        why: "Ranges communicate uncertainty."
      }
    },
    {
      id: "dataset-bias",
      name: "Dataset Bias",
      module: "risks",
      plain: "Systematic skew in data that makes a tool work better for some groups than others.",
      swim: "A tool may work better for elite freestyle sprinters than younger breaststrokers, distance swimmers, or para swimmers.",
      why: "Overall accuracy can hide poor performance for specific athlete groups.",
      ask: "Which swimmers were underrepresented in the data?",
      redFlag: "Only one average accuracy score is reported.",
      useNow: "Ask for subgroup performance before using a tool across a whole team.",
      related: ["Training Data", "Validation", "Distribution Shift"],
      quiz: {
        q: "Why are subgroup results important?",
        choices: ["Averages can hide failures", "They make models slower", "They remove coach responsibility"],
        correct: 0,
        why: "A model can look strong overall while failing a subgroup."
      }
    },
    {
      id: "distribution-shift",
      name: "Distribution Shift",
      module: "risks",
      plain: "When real-world input differs from the data a tool was trained or tested on.",
      swim: "A short-course yards model may not transfer cleanly to long-course meters, outdoor pools, underwater cameras, or younger swimmers.",
      why: "The model may be solving yesterday's setting, not today's.",
      ask: "Is today's use case meaningfully different from the validation setting?",
      redFlag: "The tool assumes it works everywhere, for every pool, level, and course.",
      useNow: "Treat new cameras, pools, events, or athlete groups as a reason to recheck reliability.",
      related: ["Validation", "Training Data", "Benchmarking"],
      quiz: {
        q: "Which is a distribution shift?",
        choices: ["Using a short-course model for long-course racing", "Testing on similar swimmers", "Repeating validation"],
        correct: 0,
        why: "The real-world use differs from the model's tested setting."
      }
    },
    {
      id: "confirmation-bias",
      name: "Confirmation Bias",
      module: "risks",
      plain: "Favoring information that supports what you already believe.",
      swim: "A coach who already thinks a swimmer lacks endurance may focus only on AI evidence that supports more conditioning.",
      why: "AI can make existing assumptions feel more objective.",
      ask: "What evidence would change my mind?",
      redFlag: "The AI report is used only to justify a decision already made.",
      useNow: "Ask another coach to review whether the same evidence supports a different explanation.",
      related: ["Automation Bias", "Human Oversight", "Signal vs Noise"],
      quiz: {
        q: "How can a coach reduce confirmation bias?",
        choices: ["Look for evidence against the favored explanation", "Only read matching data", "Hide uncertainty"],
        correct: 0,
        why: "Good review tests alternate explanations."
      }
    },
    {
      id: "human-oversight",
      name: "Human Oversight",
      module: "governance",
      plain: "The coach remains responsible for interpreting AI output and making final decisions.",
      swim: "AI can surface a pattern, but the coach integrates health, motivation, psychology, maturity, technique, and team context.",
      why: "Athletes are not data profiles. Decisions affect bodies, confidence, opportunity, and trust.",
      ask: "Who is accountable for the final decision?",
      redFlag: "The club treats AI output as mandatory instruction.",
      useNow: "Define which AI outputs require coach review before they reach athletes or parents.",
      related: ["Automation Bias", "Guardrails", "Explainability"],
      quiz: {
        q: "What is the coach's role with AI?",
        choices: ["Final judgment and accountability", "Passive acceptance", "Ignoring all data"],
        correct: 0,
        why: "AI supports coaching judgment; it does not replace it."
      }
    },
    {
      id: "athlete-privacy",
      name: "Athlete Privacy",
      module: "governance",
      plain: "Protecting athlete data, especially video, health, performance, and information about minors.",
      swim: "Swim data can include identifiable video, age, health status, training history, recruiting potential, and school information.",
      why: "Performance data can follow an athlete and shape how adults talk about them.",
      ask: "Who can access the data, and can it be deleted?",
      redFlag: "Athlete video can be reused for model training without clear consent.",
      useNow: "Check whether your club knows where uploaded video is stored and who can access it.",
      related: ["Data Ownership", "Minor Consent", "Data Minimization"],
      quiz: {
        q: "Why is swim video sensitive?",
        choices: ["It can identify minors and reveal body or performance data", "It is never personal", "It cannot be stored"],
        correct: 0,
        why: "Video and performance data can identify athletes."
      }
    },
    {
      id: "minor-consent",
      name: "Minor Consent",
      module: "governance",
      plain: "Appropriate permission and safeguards when collecting or using data from athletes under 18.",
      swim: "Many competitive swimmers are minors, so video uploads, AI labels, and dashboards need parent-aware and athlete-aware consent.",
      why: "In the U.S., COPPA has specific rules for online personal information from children under 13, and older minors still deserve clear safeguards.",
      ask: "What exactly are the parent and athlete consenting to?",
      redFlag: "The tool collects minor-athlete data through vague click-through terms only.",
      useNow: "Spell out purpose, access, retention, deletion, and model-training reuse before collecting data.",
      related: ["Athlete Privacy", "Data Ownership", "Transparency"],
      quiz: {
        q: "What should consent specify?",
        choices: ["Purpose, access, storage, reuse, and deletion", "Only the swimmer's best event", "Nothing specific"],
        correct: 0,
        why: "Meaningful consent requires clear terms."
      }
    },
    {
      id: "data-ownership",
      name: "Data Ownership",
      module: "governance",
      plain: "Who controls, can use, can export, can sell, or can delete athlete data.",
      swim: "A club should know whether the athlete, parent, coach, club, or vendor controls uploaded videos, splits, and reports.",
      why: "Ownership and usage rights shape privacy, vendor lock-in, and future model training.",
      ask: "Can athletes and clubs export and delete their data?",
      redFlag: "Terms allow broad reuse of minor-athlete data without meaningful limits.",
      useNow: "Ask the vendor to identify the data controller, retention period, deletion process, and reuse rights.",
      related: ["Athlete Privacy", "Minor Consent", "Transparency"],
      quiz: {
        q: "What should clubs clarify before adopting a tool?",
        choices: ["Who owns and can reuse the data", "Only the app color", "Whether the logo is modern"],
        correct: 0,
        why: "Data rights determine control and risk."
      }
    },
    {
      id: "guardrails",
      name: "Guardrails",
      module: "governance",
      plain: "Rules and system limits designed to prevent unsafe, inappropriate, or overconfident recommendations.",
      swim: "A guardrail might block an app from recommending more butterfly volume when shoulder pain is reported.",
      why: "Guardrails reduce risk but do not eliminate the need for coach judgment.",
      ask: "What recommendations should this tool never make automatically?",
      redFlag: "The tool gives injury-related or high-load guidance without safety checks.",
      useNow: "Create a short no-automatic-recommendation list for injury, health, load, and athlete labeling.",
      related: ["Human Oversight", "Athlete Privacy", "Automation Bias"],
      quiz: {
        q: "What is a useful guardrail?",
        choices: ["Coach review when injury signals exist", "Always increasing load", "Hiding uncertainty"],
        correct: 0,
        why: "Guardrails should prevent risky automatic action."
      }
    },
    {
      id: "transparency",
      name: "Transparency",
      module: "governance",
      plain: "Clear disclosure of what an AI system does, what it does not do, and how reliable it is.",
      swim: "A transparent tool states the data source, validation setting, intended athlete population, failure cases, and uncertainty.",
      why: "Coaches cannot use a tool responsibly if its limits are hidden.",
      ask: "What does the vendor openly admit the tool cannot do?",
      redFlag: "The system is marketed as universally accurate with no limitations.",
      useNow: "Ask vendors for a plain-language limitations sheet before purchase.",
      related: ["Validation", "Explainability", "Data Ownership"],
      quiz: {
        q: "What is a sign of transparency?",
        choices: ["The vendor lists limitations and validation context", "The vendor promises perfection", "The model is secret in every way"],
        correct: 0,
        why: "Responsible vendors disclose scope and limits."
      }
    },
    {
      id: "audit-trail",
      name: "Audit Trail",
      module: "governance",
      plain: "A record of what data, model output, human review, and final decision occurred.",
      swim: "A club may record that an AI load alert was reviewed by the coach and not used because the swimmer had reported illness.",
      why: "An audit trail supports accountability, learning, and safer use over time.",
      ask: "Can we reconstruct why this decision was made?",
      redFlag: "Important AI-influenced decisions leave no record.",
      useNow: "For high-impact recommendations, save the output, coach review, and final action.",
      related: ["Human Oversight", "Transparency", "Guardrails"],
      quiz: {
        q: "Why keep an audit trail?",
        choices: ["To understand and review decisions later", "To replace coaching", "To hide uncertainty"],
        correct: 0,
        why: "Records make decisions accountable and reviewable."
      }
    },
    {
      id: "data-minimization",
      name: "Data Minimization",
      module: "governance",
      plain: "Collecting only the data needed for the stated purpose.",
      swim: "A turn-analysis tool may need race video and event details, but not school grades, address, or unrelated health notes.",
      why: "Less unnecessary data means less privacy risk if a system is misused or breached.",
      ask: "What data is truly necessary for this coaching use?",
      redFlag: "The vendor asks for broad athlete information that is not needed for the feature.",
      useNow: "Before adopting a tool, remove fields that do not affect the coaching decision.",
      related: ["Athlete Privacy", "Minor Consent", "Data Ownership"],
      quiz: {
        q: "What is data minimization?",
        choices: ["Collecting only what is needed", "Collecting everything just in case", "Deleting all useful data"],
        correct: 0,
        why: "Privacy risk falls when unnecessary collection is avoided."
      }
    }
  ],

  raceLab: [
    {
      id: "prediction",
      title: "100 Fly Prediction",
      claim: "Swimmer likely drops 1.2 seconds in the 100 fly.",
      context: "The model used best times, recent meet results, and age-group benchmarks. It did not include illness, sleep, training attendance, growth, or stroke video.",
      saferRead: "Treat this as a forecast range, not a promise.",
      action: "Ask what data drove the estimate, what the range is, and whether similar swimmers were used for validation before discussing it with the athlete.",
      segments: [
        { label: "Start", value: 42 },
        { label: "Underwater", value: 76 },
        { label: "Tempo hold", value: 58 },
        { label: "Finish", value: 35 }
      ],
      questions: [
        "What assumptions are behind the predicted drop?",
        "What would make the prediction wrong?",
        "Is the athlete in the same population the model was tested on?"
      ],
      failureSigns: [
        "No prediction interval.",
        "No taper or health context.",
        "Exact hundredths presented as certainty."
      ]
    },
    {
      id: "turn",
      title: "Turn Diagnosis",
      claim: "The main limiter is slow wall exit.",
      context: "The tool detected a weak breakout on lap three, but the video is from the stands and the swimmer is partly hidden by splash.",
      saferRead: "The hypothesis is useful, but the evidence may be weak.",
      action: "Review the original frames, compare the same segment across multiple races, and check whether the tracking stayed on the swimmer.",
      segments: [
        { label: "Wall contact", value: 52 },
        { label: "Rotation", value: 44 },
        { label: "Push-off", value: 69 },
        { label: "Breakout", value: 82 }
      ],
      questions: [
        "Can the coach see the detected landmarks?",
        "Was the athlete occluded?",
        "Does the pattern repeat in cleaner footage?"
      ],
      failureSigns: [
        "Hidden tracking overlay.",
        "Poor camera angle.",
        "No input-quality warning."
      ]
    },
    {
      id: "load",
      title: "Load Alert",
      claim: "Increase race-pace volume by 12 percent next week.",
      context: "The tool used practice completion and target pace data, but did not include shoulder soreness, school exams, sleep, or illness.",
      saferRead: "A load recommendation without health context is incomplete.",
      action: "Use the alert as a planning prompt, then check athlete readiness, pain, sleep, mood, and recent race schedule before changing load.",
      segments: [
        { label: "Yardage", value: 64 },
        { label: "Intensity", value: 78 },
        { label: "Recovery", value: 31 },
        { label: "Context", value: 24 }
      ],
      questions: [
        "What athlete context is missing?",
        "Does this recommendation have a safety guardrail?",
        "Who approves the final plan?"
      ],
      failureSigns: [
        "No pain or wellness inputs.",
        "Automatic high-load advice.",
        "No coach override record."
      ]
    }
  ],

  vendorChecklist: [
    {
      question: "What swimmer population was used to train and test the model?",
      why: "Age-group, senior club, college, para, sprint, distance, stroke, and course differences can change reliability."
    },
    {
      question: "Was the tool validated on swimmers like ours?",
      why: "A polished demo does not prove the tool works for your pool, camera setup, events, or athlete level."
    },
    {
      question: "What are the known failure cases?",
      why: "Responsible vendors can name conditions where the tool is weak, such as bubbles, low light, low frame rate, or missing wellness context."
    },
    {
      question: "Does the output include uncertainty?",
      why: "Exact times, scores, and joint angles can create false precision when the data is noisy."
    },
    {
      question: "Can coaches inspect the evidence?",
      why: "Coaches should be able to see the video frames, race segments, features, or source data that drove the recommendation."
    },
    {
      question: "Who owns the athlete data?",
      why: "Contracts should clarify access, export, deletion, reuse, model training, and what happens if the club leaves."
    },
    {
      question: "How are minor-athlete video and personal data protected?",
      why: "Video and performance data can identify minors and should have clear consent, access, retention, and deletion safeguards."
    },
    {
      question: "Can recommendations be overridden and recorded?",
      why: "Coach judgment should remain accountable, especially for load, injury, athlete labeling, and parent-facing reports."
    },
    {
      question: "Does the vendor make claims the evidence cannot support?",
      why: "Be cautious with promises of guaranteed time drops, universal stroke accuracy, or injury guidance without appropriate validation."
    },
    {
      question: "What staff training is needed?",
      why: "A tool is safer when coaches know what it means, what it does not mean, and when to ignore it."
    }
  ],

  privacyRules: [
    {
      title: "Do not collect data just because a tool can collect it.",
      body: "Start from the coaching purpose. If the data does not help that decision, avoid collecting it."
    },
    {
      title: "Treat video as identifiable athlete data.",
      body: "Race and underwater video can show a child's face, body, team, event, performance level, and training environment."
    },
    {
      title: "Separate parent consent from athlete understanding.",
      body: "Parent permission matters, but athletes should also understand what is being recorded, why, who sees it, and how it may be used."
    },
    {
      title: "Be explicit about model-training reuse.",
      body: "A club should know whether uploaded videos or reports can be used to improve a vendor's model."
    },
    {
      title: "Use retention limits.",
      body: "Keep data only as long as it serves the stated purpose. Long retention creates long-term risk."
    },
    {
      title: "Avoid permanent labels.",
      body: "Terms like low potential, poor responder, or bad racer can harm athlete development if treated as fixed identity instead of current evidence."
    },
    {
      title: "Require coach review before parent-facing outputs.",
      body: "AI reports can be misunderstood. Parent-facing language should be checked for uncertainty, tone, and athlete context."
    }
  ],

  sources: [
    {
      name: "NIST AI Risk Management Framework",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      note: "Used for the general framing that AI systems should be evaluated for risk, trustworthiness, context of use, and human impact."
    },
    {
      name: "FTC COPPA FAQ",
      url: "https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions",
      note: "Used for cautious U.S. wording around online collection of personal information from children under 13, parental notice, consent, deletion, and data minimization."
    },
    {
      name: "USA Swimming Safe Sport",
      url: "https://www.usaswimming.org/safe-sport",
      note: "Used as a practical anchor for the idea that youth swimming environments need explicit athlete-safety policies, education, and reporting structures."
    },
    {
      name: "U.S. Center for SafeSport MAAPP",
      url: "https://uscenterforsafesport.org/response-and-resolution/maapp/",
      note: "Used for the broader principle that minor-athlete interactions and communications require clear safeguards."
    },
    {
      name: "Einfalt, Zecha, and Lienhart: swimmer pose estimation",
      url: "https://arxiv.org/abs/1802.00634",
      note: "Used to ground the video-AI section in the reality that swimmer pose estimation is a challenging aquatic computer-vision problem."
    },
    {
      name: "Human Pose Estimation Review",
      url: "https://arxiv.org/abs/2110.06877",
      note: "Used for the basic explanation that pose estimation localizes body joints or landmarks in images and video."
    }
  ]
};

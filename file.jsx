import { useState } from "react";

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const LAGREE_EXERCISES = [
  // LEGS
  { name: "Lunge", category: "Legs", muscles: ["Quads", "Glutes", "Hip Flexors"], level: "Beginner", position: "Standing" },
  { name: "Lunge with Knee Drive", category: "Legs", muscles: ["Quads", "Glutes", "Hip Flexors"], level: "Intermediate", position: "Standing" },
  { name: "Lunge with Rotation", category: "Legs", muscles: ["Quads", "Glutes", "Obliques"], level: "Intermediate", position: "Standing" },
  { name: "Split Squat", category: "Legs", muscles: ["Quads", "Glutes", "Hip Flexors"], level: "Intermediate", position: "Standing" },
  { name: "Squat", category: "Legs", muscles: ["Quads", "Glutes", "Inner Thighs"], level: "Beginner", position: "Standing" },
  { name: "Squat with Bicep Curl", category: "Legs", muscles: ["Quads", "Glutes", "Biceps"], level: "Beginner", position: "Standing" },
  { name: "Curtsy Lunge", category: "Legs", muscles: ["Glutes", "Quads", "Outer Thighs"], level: "Intermediate", position: "Standing" },
  { name: "Skating", category: "Legs", muscles: ["Outer Thighs", "Glutes", "Inner Thighs"], level: "Intermediate", position: "Standing" },
  { name: "Elephant", category: "Legs", muscles: ["Hamstrings", "Glutes", "Posterior Core"], level: "Intermediate", position: "Standing" },
  { name: "Calf Raise", category: "Legs", muscles: ["Calves", "Anterior Core"], level: "Beginner", position: "Standing" },
  { name: "Standing Abduction", category: "Legs", muscles: ["Outer Thighs", "Glutes"], level: "Beginner", position: "Standing" },
  { name: "Standing Hip Extension", category: "Legs", muscles: ["Glutes", "Hamstrings"], level: "Beginner", position: "Standing" },
  { name: "Donkey Kick", category: "Legs", muscles: ["Glutes", "Hamstrings", "Posterior Core"], level: "Beginner", position: "Quadruped" },
  { name: "Fire Hydrant", category: "Legs", muscles: ["Outer Thighs", "Glutes"], level: "Beginner", position: "Quadruped" },
  { name: "Hamstring Curl", category: "Legs", muscles: ["Hamstrings", "Glutes"], level: "Beginner", position: "Prone" },
  { name: "Hip Extension", category: "Legs", muscles: ["Glutes", "Hamstrings"], level: "Beginner", position: "Prone" },
  { name: "Bridge", category: "Legs", muscles: ["Glutes", "Hamstrings", "Posterior Core"], level: "Beginner", position: "Supine" },
  { name: "Single Leg Bridge", category: "Legs", muscles: ["Glutes", "Hamstrings"], level: "Intermediate", position: "Supine" },
  { name: "Frog", category: "Legs", muscles: ["Inner Thighs", "Glutes"], level: "Intermediate", position: "Supine" },
  { name: "Reverse Lunge Arabesque", category: "Legs", muscles: ["Glutes", "Hamstrings", "Balance"], level: "Advanced", position: "Standing" },
  { name: "Spoon", category: "Legs", muscles: ["Glutes", "Outer Thighs", "Hamstrings"], level: "Intermediate", position: "Side-lying" },
  { name: "Clam Shell", category: "Legs", muscles: ["Outer Thighs", "Glutes", "Inner Thighs"], level: "Beginner", position: "Side-lying" },
  { name: "Inner Thigh Lift", category: "Legs", muscles: ["Inner Thighs"], level: "Beginner", position: "Side-lying" },
  // ARMS
  { name: "Chest Press", category: "Arms", muscles: ["Chest", "Triceps", "Shoulders"], level: "Beginner", position: "Supine" },
  { name: "Chest Fly", category: "Arms", muscles: ["Chest", "Shoulders"], level: "Beginner", position: "Supine" },
  { name: "Pull Down", category: "Arms", muscles: ["Back & Lats", "Biceps"], level: "Beginner", position: "Seated" },
  { name: "Row", category: "Arms", muscles: ["Back & Lats", "Biceps", "Posterior Core"], level: "Beginner", position: "Seated" },
  { name: "Hug a Tree", category: "Arms", muscles: ["Chest", "Shoulders"], level: "Beginner", position: "Seated" },
  { name: "Overhead Press", category: "Arms", muscles: ["Shoulders", "Triceps"], level: "Intermediate", position: "Seated" },
  { name: "Lateral Raise", category: "Arms", muscles: ["Shoulders", "Back & Lats"], level: "Beginner", position: "Seated" },
  { name: "Bicep Curl", category: "Arms", muscles: ["Biceps"], level: "Beginner", position: "Seated" },
  { name: "Tricep Extension", category: "Arms", muscles: ["Triceps"], level: "Beginner", position: "Seated" },
  { name: "T-Pull", category: "Arms", muscles: ["Back & Lats", "Shoulders", "Posterior Core"], level: "Intermediate", position: "Plank" },
  { name: "Wheelbarrow", category: "Arms", muscles: ["Chest", "Shoulders", "Anterior Core"], level: "Intermediate", position: "Plank" },
  // OBLIQUES
  { name: "Mermaid", category: "Obliques", muscles: ["Obliques", "Hip Flexors"], level: "Intermediate", position: "Side-lying" },
  { name: "Side Hip", category: "Obliques", muscles: ["Obliques", "Outer Thighs"], level: "Beginner", position: "Side-lying" },
  { name: "Criss Cross", category: "Obliques", muscles: ["Obliques", "Anterior Core", "Hip Flexors"], level: "Intermediate", position: "Supine" },
  { name: "Twisted Climber", category: "Obliques", muscles: ["Obliques", "Hip Flexors", "Shoulders"], level: "Advanced", position: "Plank" },
  { name: "Lunge with Rotation", category: "Obliques", muscles: ["Obliques", "Quads", "Glutes"], level: "Intermediate", position: "Standing" },
  // CENTER CORE
  { name: "Pike", category: "Core", muscles: ["Anterior Core", "Shoulders", "Hip Flexors"], level: "Advanced", position: "Plank" },
  { name: "Catfish", category: "Core", muscles: ["Anterior Core", "Hip Flexors", "Obliques"], level: "Intermediate", position: "Plank" },
  { name: "Bear", category: "Core", muscles: ["Anterior Core", "Shoulders", "Hip Flexors"], level: "Advanced", position: "Plank" },
  { name: "Climber", category: "Core", muscles: ["Anterior Core", "Hip Flexors", "Shoulders"], level: "Intermediate", position: "Plank" },
  { name: "Plank to Pike", category: "Core", muscles: ["Anterior Core", "Shoulders", "Glutes"], level: "Advanced", position: "Plank" },
  { name: "Plank Reach", category: "Core", muscles: ["Anterior Core", "Shoulders"], level: "Advanced", position: "Plank" },
  { name: "Bear Plank Hold", category: "Core", muscles: ["Anterior Core", "Shoulders", "Hip Flexors"], level: "Intermediate", position: "Plank" },
  { name: "Mountain Climber", category: "Core", muscles: ["Anterior Core", "Hip Flexors", "Shoulders"], level: "Intermediate", position: "Plank" },
  { name: "Hundred", category: "Core", muscles: ["Anterior Core", "Hip Flexors"], level: "Intermediate", position: "Supine" },
  { name: "Teaser", category: "Core", muscles: ["Anterior Core", "Hip Flexors"], level: "Advanced", position: "Supine" },
  { name: "Reverse Crunch", category: "Core", muscles: ["Anterior Core", "Hip Flexors"], level: "Beginner", position: "Supine" },
  { name: "Leg Circle", category: "Core", muscles: ["Hip Flexors", "Anterior Core", "Inner Thighs"], level: "Intermediate", position: "Supine" },
];

const CATEGORY_CONFIG = {
  Legs:     { color: "#3d7a5c", light: "#eaf4ef", label: "Legs",        icon: "◈" },
  Arms:     { color: "#2e5f8a", light: "#e4eef7", label: "Arms",        icon: "◇" },
  Obliques: { color: "#8a5c2e", light: "#f7efe4", label: "Obliques",    icon: "◑" },
  Core:     { color: "#6b3d8a", light: "#f0e8f7", label: "Core", icon: "○" },
};

const LEVEL_DOT = { Beginner: "#86efac", Intermediate: "#fde68a", Advanced: "#fca5a5" };
const POSITION_ICON = { Plank: "▱", Standing: "↑", Supine: "─", "Side-lying": "◁", Seated: "□", Quadruped: "⊕", Prone: "▿" };

const MIN_TOTAL = 8;
const MAX_TOTAL = 14;

export default function LagreePlanner() {
  const [step, setStep] = useState("configure");
  const [fitnessLevel, setFitnessLevel] = useState("Mixed");
  const [numDays, setNumDays] = useState(4);
  const [counts, setCounts] = useState({ Legs: 4, Arms: 3, Obliques: 2, Core: 3 });
  const [schedule, setSchedule] = useState(null);
  const [activeDay, setActiveDay] = useState(0);

  const total = counts.Legs + counts.Arms + counts.Obliques + counts.Core;
  const totalOk = total >= MIN_TOTAL && total <= MAX_TOTAL;

  const setCount = (cat, val) => {
    const n = Math.max(1, parseInt(val) || 1);
    setCounts(prev => ({ ...prev, [cat]: n }));
  };

  const generate = async () => {
    setStep("loading");
    const levelGuidance = {
      Beginner: "Beginners only. No Advanced exercises. Keep it accessible and clear.",
      Intermediate: "Mix Beginner and Intermediate, one or two Advanced options for stronger clients.",
      Advanced: "Full range. Heavy on Advanced exercises. High intensity throughout.",
      Mixed: "Mixed ability. Choose scalable exercises that work across fitness levels.",
    };
    const byCategory = (cat) => LAGREE_EXERCISES.filter(e => e.category === cat).map(e => e.name).join(", ");

    const prompt = `You are an expert Lagree Megaformer instructor designing a ${numDays}-class weekly schedule.

CLASS LEVEL: ${fitnessLevel} — ${levelGuidance[fitnessLevel]}

MANDATORY STRUCTURE — every single class must have exactly:
- ${counts.Legs} LEG exercises
- ${counts.Arms} ARM exercises
- ${counts.Obliques} OBLIQUE exercises
- ${counts.Core} CORE exercises
= ${total} total

This structure guarantees any student coming just once gets a complete full-body workout.
Across the ${numDays} classes, rotate the SPECIFIC exercises so frequent students experience variety and depth without repetition.

AVAILABLE EXERCISES (use ONLY these exact names):
LEGS: ${byCategory("Legs")}
ARMS: ${byCategory("Arms")}
OBLIQUES: ${byCategory("Obliques")}
CENTER CORE: ${byCategory("Core")}
RULES:
- No exercise should appear in more than 2 of the ${numDays} classes
- Each class gets a theme (e.g. "Posterior Chain", "Push & Pull", "Deep Core")
- Group exercises within each class so positions flow sensibly
- ${fitnessLevel === "Beginner" ? "Exclude all Advanced exercises." : fitnessLevel === "Advanced" ? "Include Advanced exercises throughout." : "Mix levels intelligently."}
- Write a one-sentence coaching note per class

Respond ONLY in valid JSON, no markdown:
{
  "weekSummary": "1-2 sentences on rotation philosophy",
  "classes": [
    {
      "day": 1,
      "theme": "Theme",
      "coachingNote": "One sentence",
      "exercises": [
        { "category": "Legs", "name": "Exercise Name", "side": "bilateral", "duration": "45 sec", "cue": "brief tip" }
        ...IMPORTANT: category must be exactly one of: "Legs", "Arms", "Obliques", "Core"
      ]
    }
  ]
}
side values: "bilateral" | "right then left" | "left then right"
duration values: "30 sec" | "45 sec" | "60 sec" | "12 reps"`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const raw = data.content.map(i => i.text || "").join("");
      const clean = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      const parsed = JSON.parse(clean);
      setSchedule(parsed);
      setActiveDay(0);
      setStep("results");
    } catch (err) {
      console.error(err);
      setStep("configure");
      alert("Generation failed — please try again.");
    }
  };

  // ── CONFIGURE ────────────────────────────────────────────────────────────
  if (step === "configure") return (
    <div style={{ minHeight: "100vh", background: "#faf9f6", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .sel:hover { opacity: 0.8; transform: translateY(-1px); transition: all 0.15s; }
        .go:hover { background: #333 !important; }
      `}</style>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ padding: "64px 0 40px", borderBottom: "1px solid #e8e2d8" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.4em", color: "#c4a96c", textTransform: "uppercase", marginBottom: 20 }}>Lagree · Class Architect</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.05, color: "#1c1c1c", marginBottom: 16 }}>
            Every class,<br /><em>a complete body.</em>
          </h1>
          <p style={{ fontSize: 16, color: "#888", lineHeight: 1.7, maxWidth: 460 }}>
            Each class follows the same structure — legs, arms, obliques, core — so one visit is always enough. Come more and the exercises rotate, building progressive depth week after week.
          </p>
        </div>

        <div style={{ padding: "32px 0" }}>
          {/* Level */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.35em", color: "#bbb", textTransform: "uppercase", marginBottom: 12 }}>Class Level</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Beginner", "Intermediate", "Advanced", "Mixed"].map(l => (
                <button key={l} className="sel" onClick={() => setFitnessLevel(l)} style={{
                  padding: "10px 22px", borderRadius: 40, cursor: "pointer",
                  fontFamily: "'Playfair Display', serif", fontSize: 15,
                  background: fitnessLevel === l ? "#1c1c1c" : "transparent",
                  color: fitnessLevel === l ? "#faf9f6" : "#888",
                  border: `1.5px solid ${fitnessLevel === l ? "#1c1c1c" : "#d8d0c4"}`,
                  fontStyle: fitnessLevel === l ? "italic" : "normal",
                }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Classes / week */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.35em", color: "#bbb", textTransform: "uppercase", marginBottom: 12 }}>Classes per Week</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[3, 4, 5, 6].map(n => (
                <button key={n} className="sel" onClick={() => setNumDays(n)} style={{
                  width: 56, height: 56, borderRadius: "50%", cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 20,
                  background: numDays === n ? "#1c1c1c" : "transparent",
                  color: numDays === n ? "#faf9f6" : "#888",
                  border: `1.5px solid ${numDays === n ? "#1c1c1c" : "#d8d0c4"}`,
                }}>{n}</button>
              ))}
            </div>
          </div>

          {/* Per-category counts */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.35em", color: "#bbb", textTransform: "uppercase", marginBottom: 16 }}>Exercises per Category</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => (
                <div key={cat} style={{ padding: "14px 16px", background: cfg.light, border: `1px solid ${cfg.color}44`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: cfg.color, fontSize: 14 }}>{cfg.icon}</span>
                    <span style={{ fontSize: 14, color: cfg.color }}>{cfg.label}</span>
                  </div>
                  <select
                    value={counts[cat]}
                    onChange={e => setCount(cat, e.target.value)}
                    style={{
                      padding: "6px 10px", background: "#fff",
                      border: `1.5px solid ${cfg.color}66`, borderRadius: 3,
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 16,
                      color: cfg.color, cursor: "pointer", fontWeight: 500,
                      minWidth: 60, textAlign: "center",
                    }}
                  >
                    {[1,2,3,4,5,6,7].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {/* Total indicator */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px", borderRadius: 3,
              background: totalOk ? "#f0faf4" : "#fef2f2",
              border: `1px solid ${totalOk ? "#86efac" : "#fca5a5"}`,
            }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: totalOk ? "#3d7a5c" : "#c0392b" }}>
                Total: <strong>{total}</strong> exercises per class
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: totalOk ? "#86a890" : "#e07070" }}>
                {totalOk ? `✓ within 8–14 range` : total < MIN_TOTAL ? `↑ add ${MIN_TOTAL - total} more` : `↓ remove ${total - MAX_TOTAL}`}
              </span>
            </div>
          </div>

          <button className="go" onClick={generate} disabled={!totalOk} style={{
            width: "100%", padding: "18px",
            background: totalOk ? "#1c1c1c" : "#d8d0c4",
            color: totalOk ? "#faf9f6" : "#aaa",
            border: "none", cursor: totalOk ? "pointer" : "not-allowed",
            fontFamily: "'Playfair Display', serif",
            fontSize: 18, fontStyle: "italic", borderRadius: 4, transition: "background 0.2s",
          }}>Design This Week →</button>
        </div>
      </div>
    </div>
  );

  // ── LOADING ────────────────────────────────────────────────────────────────
  if (step === "loading") return (
    <div style={{ minHeight: "100vh", background: "#1c1c1c", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');
        @keyframes breathe { 0%,100%{transform:scale(1);opacity:0.3} 50%{transform:scale(1.2);opacity:1} }
        .ring { animation: breathe 1.8s ease-in-out infinite; }
      `}</style>
      <div className="ring" style={{ width: 52, height: 52, borderRadius: "50%", border: "2px solid #c4a96c", marginBottom: 24 }} />
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#555" }}>Building your week</p>
    </div>
  );

  // ── RESULTS ────────────────────────────────────────────────────────────────
  const cls = schedule?.classes?.[activeDay];

  const grouped = cls ? {
    Legs:     cls.exercises.filter(e => e.category === "Legs"),
    Arms:     cls.exercises.filter(e => e.category === "Arms"),
    Obliques: cls.exercises.filter(e => e.category === "Obliques"),
    Core:     cls.exercises.filter(e => e.category === "Core"),
  } : {};

  // Detect cross-week repeats for the "×N this week" badge
  const allNames = schedule?.classes?.flatMap(c => c.exercises.map(e => e.name)) || [];
  const usageCount = allNames.reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {});

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f6", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab:hover { color: #1c1c1c !important; }
        .ex:hover { background: rgba(0,0,0,0.02) !important; }
        @media print { .no-print { display: none !important; } }
      `}</style>

      {/* Nav */}
      <div className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,249,246,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e8e2d8", padding: "12px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#c4a96c", letterSpacing: "0.3em", textTransform: "uppercase" }}>Lagree · Class Architect</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setStep("configure")} style={{ padding: "7px 14px", background: "transparent", border: "1px solid #d8d0c4", color: "#888", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2 }}>← New Plan</button>
          <button onClick={generate} style={{ padding: "7px 14px", background: "transparent", border: "1px solid #c4a96c", color: "#c4a96c", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2 }}>↻ Regenerate</button>
          <button onClick={() => window.print()} style={{ padding: "7px 14px", background: "#1c1c1c", border: "none", color: "#faf9f6", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2 }}>⎙ Print</button>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px 80px" }}>
        {/* Week header */}
        <div style={{ padding: "40px 0 24px", borderBottom: "1px solid #e8e2d8" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 400, color: "#1c1c1c", marginBottom: 8 }}>
            {numDays}-Class Week · <em>{fitnessLevel} Level</em>
          </h1>
          <p style={{ fontSize: 15, color: "#999", fontStyle: "italic", maxWidth: 560, lineHeight: 1.65, marginBottom: 20 }}>{schedule?.weekSummary}</p>
          {/* Structure pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {Object.entries(counts).map(([cat, n]) => (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: CATEGORY_CONFIG[cat].light, border: `1px solid ${CATEGORY_CONFIG[cat].color}44`, borderRadius: 20 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 500, color: CATEGORY_CONFIG[cat].color }}>{n}</span>
                <span style={{ fontSize: 12, color: CATEGORY_CONFIG[cat].color }}>{CATEGORY_CONFIG[cat].label}</span>
              </div>
            ))}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#ccc", paddingLeft: 4 }}>{total} exercises · every class</span>
          </div>
        </div>

        {/* Day tabs */}
        <div className="no-print" style={{ display: "flex", borderBottom: "2px solid #e8e2d8", marginTop: 24 }}>
          {schedule?.classes?.map((c, i) => (
            <button key={i} className="tab" onClick={() => setActiveDay(i)} style={{
              padding: "11px 22px", border: "none", background: "transparent",
              color: activeDay === i ? "#1c1c1c" : "#bbb",
              fontFamily: "'Playfair Display', serif", fontSize: 15, cursor: "pointer",
              borderBottom: `2px solid ${activeDay === i ? "#c4a96c" : "transparent"}`,
              marginBottom: -2, transition: "color 0.15s",
              fontStyle: activeDay === i ? "italic" : "normal",
            }}>Day {i + 1}</button>
          ))}
        </div>

        {/* Class detail */}
        {cls && (
          <div style={{ paddingTop: 32 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.4em", color: "#ccc", textTransform: "uppercase", marginBottom: 6 }}>
                  Day {activeDay + 1} of {numDays}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 400, color: "#1c1c1c" }}>{cls.theme}</h2>
              </div>
              <div style={{ padding: "14px 18px", background: "#f5f0e8", borderLeft: "3px solid #c4a96c", borderRadius: 2, maxWidth: 290 }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.35em", color: "#c4a96c", textTransform: "uppercase", marginBottom: 6 }}>Instructor Note</div>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, fontStyle: "italic" }}>{cls.coachingNote}</p>
              </div>
            </div>

            {/* 2×2 category grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {Object.entries(grouped).map(([cat, exercises]) => {
                const cfg = CATEGORY_CONFIG[cat];
                return (
                  <div key={cat} style={{ border: `1px solid ${cfg.color}2a`, borderTop: `3px solid ${cfg.color}`, borderRadius: 3, overflow: "hidden", background: "#fff" }}>
                    {/* Category header */}
                    <div style={{ padding: "10px 16px", background: cfg.light, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ color: cfg.color, fontSize: 13 }}>{cfg.icon}</span>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: cfg.color, fontWeight: 500 }}>{cfg.label}</span>
                      </div>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: cfg.color, background: `${cfg.color}18`, padding: "2px 7px", borderRadius: 9 }}>{exercises.length}</span>
                    </div>
                    {/* Exercises */}
                    {exercises.map((ex, idx) => {
                      const meta = LAGREE_EXERCISES.find(e => e.name === ex.name);
                      const timesUsed = usageCount[ex.name] || 1;
                      return (
                        <div key={idx} className="ex" style={{ padding: "12px 16px", borderTop: idx === 0 ? "none" : "1px solid #f0ede6" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 15, color: "#1c1c1c" }}>{ex.name}</span>
                                {timesUsed > 1 && (
                                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#d97706", background: "#fef3c7", padding: "1px 5px", borderRadius: 8 }}>×{timesUsed} this week</span>
                                )}
                              </div>
                              {meta && (
                                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center", marginBottom: ex.cue ? 5 : 0 }}>
                                  {meta.muscles.slice(0, 2).map(m => (
                                    <span key={m} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#c0b8b0" }}>{m}</span>
                                  ))}
                                  <span style={{ color: "#ddd" }}>·</span>
                                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: LEVEL_DOT[meta.level], background: "#1c1c1c", padding: "1px 5px", borderRadius: 2 }}>{meta.level}</span>
                                  <span style={{ fontSize: 11, color: "#ccc", marginLeft: 2 }}>{POSITION_ICON[meta.position]}</span>
                                </div>
                              )}
                              {ex.cue && <p style={{ fontSize: 12, color: "#aaa", fontStyle: "italic", lineHeight: 1.45 }}>"{ex.cue}"</p>}
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>{ex.duration}</div>
                              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#ccc", whiteSpace: "nowrap", marginTop: 2 }}>{ex.side}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Day nav */}
            <div className="no-print" style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
              <button onClick={() => setActiveDay(d => Math.max(0, d - 1))} disabled={activeDay === 0} style={{ padding: "10px 22px", background: "transparent", fontFamily: "'Playfair Display', serif", color: activeDay === 0 ? "#ccc" : "#1c1c1c", border: `1px solid ${activeDay === 0 ? "#eee" : "#1c1c1c"}`, cursor: activeDay === 0 ? "default" : "pointer", fontSize: 14, borderRadius: 2 }}>
                ← {activeDay > 0 ? `Day ${activeDay}` : ""}
              </button>
              <button onClick={() => setActiveDay(d => Math.min(schedule.classes.length - 1, d + 1))} disabled={activeDay >= schedule.classes.length - 1} style={{ padding: "10px 22px", fontFamily: "'Playfair Display', serif", background: activeDay < schedule.classes.length - 1 ? "#1c1c1c" : "transparent", color: activeDay < schedule.classes.length - 1 ? "#faf9f6" : "#ccc", border: `1px solid ${activeDay < schedule.classes.length - 1 ? "#1c1c1c" : "#eee"}`, cursor: activeDay >= schedule.classes.length - 1 ? "default" : "pointer", fontSize: 14, borderRadius: 2, fontStyle: "italic" }}>
                {activeDay < schedule.classes.length - 1 ? `Day ${activeDay + 2}` : ""} →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
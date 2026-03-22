"use client";
import { useState, useMemo } from "react";
 
// ─── DATA ─────────────────────────────────────────────────────────────────────
// lin | pod (app) | subteam
// null = no constraint for that field (leads, team leads)
 
const PEOPLE = [
  // Baddies Lin
  { name: "Selena",       lin: "Baddies",          pod: "Uplift",  subteam: "Design"     },
  { name: "Kaylee",       lin: "Baddies",          pod: "Resell",  subteam: "iOS"        },
  // American Dream Lin
  { name: "Jiwon",        lin: "American Dream",   pod: "Uplift",  subteam: "iOS"        },
  { name: "Seojin",       lin: "American Dream",   pod: "Navi",    subteam: "Design"     },
  { name: "Tran",         lin: "American Dream",   pod: "Chimes",  subteam: "Backend"    },
  { name: "Amy Yang",     lin: "American Dream",   pod: "Score",   subteam: "iOS"        },
  // Manifest Destiny Lin
  { name: "Amy Wang",     lin: "Manifest Destiny", pod: "Score",   subteam: "Android"    },
  { name: "Angela",       lin: "Manifest Destiny", pod: "Uplift",  subteam: "Design"     },
  { name: "Connie",       lin: "Manifest Destiny", pod: "Resell",  subteam: "Android"    },
  { name: "Katie",        lin: "Manifest Destiny", pod: "Eatery",  subteam: "Design"     },
  { name: "Carolyn",      lin: "Manifest Destiny", pod: "Eatery",  subteam: "Marketing"  },
  { name: "Alyssa",       lin: "Manifest Destiny", pod: "Resell",  subteam: "iOS"        },
  // Brainrotters Lin
  { name: "Rohan",        lin: "Brainrotters",     pod: "Chimes",  subteam: "Marketing"  },
  { name: "Wendy",        lin: "Brainrotters",     pod: "Uplift",  subteam: "Marketing"  },
  // Nicole & Josh's Combined Lin
  { name: "Wonjin",       lin: "Nicole & Josh's",  pod: "Chimes",  subteam: "Design"     },
  { name: "Olivia",       lin: "Nicole & Josh's",  pod: "Chimes",  subteam: "Backend"    },
  { name: "Joshua",       lin: "Nicole & Josh's",  pod: null,      subteam: "Backend"    }, // Backend Lead
  { name: "Lauren",       lin: "Nicole & Josh's",  pod: "Resell",  subteam: "Backend"    },
  { name: "Ethan",        lin: "Nicole & Josh's",  pod: "Resell",  subteam: "Design"     },
  { name: "Ryan",         lin: "Nicole & Josh's",  pod: "Navi",    subteam: "Android"    },
  // Golden Divas Lin
  { name: "Michael",      lin: "Golden Divas",     pod: "Score",   subteam: "Marketing"  },
  { name: "Ashley",       lin: "Golden Divas",     pod: "Resell",  subteam: "Backend"    },
  { name: "Nina",         lin: "Golden Divas",     pod: "Navi",    subteam: "Marketing"  },
  { name: "Melissa",      lin: "Golden Divas",     pod: "Uplift",  subteam: "Android"    },
  { name: "Duru",         lin: "Golden Divas",     pod: "Score",   subteam: "iOS"        },
  { name: "Maya",         lin: "Golden Divas",     pod: "Navi",    subteam: "Marketing"  },
  { name: "Mabel",        lin: "Golden Divas",     pod: "Score",   subteam: "Android"    },
  // Spice Girls Lin
  { name: "Caitlyn",      lin: "Spice Girls",      pod: "Uplift",  subteam: "iOS"        },
  { name: "Angelina",     lin: "Spice Girls",      pod: "Eatery",  subteam: "iOS"        },
  { name: "Lorna",        lin: "Spice Girls",      pod: "Score",   subteam: "Design"     },
  { name: "Amber",        lin: "Spice Girls",      pod: "Resell",  subteam: "Marketing"  },
  { name: "Mina",         lin: "Spice Girls",      pod: "Resell",  subteam: "Design"     },
  // Mort Lin
  { name: "Yoobin",       lin: "Mort Lin",         pod: null,      subteam: "Design"     }, // Design Lead
  { name: "Arielle",      lin: "Mort Lin",         pod: "Chimes",  subteam: "iOS"        },
  { name: "Anna",         lin: "Mort Lin",         pod: "Eatery",  subteam: "Marketing"  },
  { name: "Abigail",      lin: "Mort Lin",         pod: "Navi",    subteam: "Android"    },
  // Charles' Lin
  { name: "Charles",      lin: "Charles' Lin",     pod: null,      subteam: "iOS"        }, // iOS Lead
  { name: "Andrew Gao",   lin: "Charles' Lin",     pod: "Resell",  subteam: "iOS"        },
  { name: "Anik",         lin: "Charles' Lin",     pod: "Score",   subteam: "Backend"    }, // confirmed Score/Backend
  { name: "Preston",      lin: "Charles' Lin",     pod: "Uplift",  subteam: "Android"    },
  // Caleb's Lin
  { name: "Caleb",        lin: "Caleb's Lin",      pod: "Eatery",  subteam: "Android"    },
  { name: "Jarmin",       lin: "Caleb's Lin",      pod: "Chimes",  subteam: "Android"    },
  // Goondev Lin
  { name: "Aayush",       lin: "Goondev",          pod: null,      subteam: null         }, // Team Lead
  { name: "Peter",        lin: "Goondev",          pod: "Eatery",  subteam: "iOS"        },
  { name: "Asen",         lin: "Goondev",          pod: "Navi",    subteam: "iOS"        },
  { name: "Zain",         lin: "Goondev",          pod: "Score",   subteam: "iOS"        },
  { name: "Chris",        lin: "Goondev",          pod: "Eatery",  subteam: "Backend"    },
  // Anvi's Lin
  { name: "Christine",    lin: "Anvi's Lin",       pod: null,      subteam: "Marketing"  }, // Marketing Lead
  { name: "Sylvia",       lin: "Anvi's Lin",       pod: "Chimes",  subteam: "Design"     },
  { name: "Isha",         lin: "Anvi's Lin",       pod: "Navi",    subteam: "iOS"        },
  { name: "Anvi",         lin: "Anvi's Lin",       pod: null,      subteam: null         }, // Product Lead
  // Munch Bunch Lin
  { name: "Skye",         lin: "Munch Bunch",      pod: "Chimes",  subteam: "Backend"    },
  { name: "Jay",          lin: "Munch Bunch",      pod: "Chimes",  subteam: "iOS"        },
  { name: "Enzo",         lin: "Munch Bunch",      pod: "Uplift",  subteam: "Marketing"  },
  { name: "Anatoli",      lin: "Munch Bunch",      pod: "Uplift",  subteam: "iOS"        },
  { name: "Wyatt",        lin: "Munch Bunch",      pod: "Navi",    subteam: "Backend"    },
  { name: "Fanhao",       lin: "Munch Bunch",      pod: "Eatery",  subteam: "Backend"    },
  { name: "Danny",        lin: "Munch Bunch",      pod: "Resell",  subteam: "Android"    },
  { name: "Andrew Pung",  lin: "Munch Bunch",      pod: "Score",   subteam: "Backend"    },
  // Not found in lin list (appears in pod chart only)
  { name: "Sophie",       lin: null,               pod: "Uplift",  subteam: "Backend"    },
  { name: "Gregor",       lin: null,               pod: "Chimes",  subteam: "Android"    },
  // Team Lead (you!)
];
 
const PEOPLE_MAP = Object.fromEntries(PEOPLE.map(p => [p.name, p]));
 
const LIN_COLORS = {
  "Baddies":          "#FF8FAB",
  "American Dream":   "#FFD166",
  "Manifest Destiny": "#06D6A0",
  "Brainrotters":     "#118AB2",
  "Nicole & Josh's":  "#A8DADC",
  "Golden Divas":     "#F4A261",
  "Spice Girls":      "#E76F51",
  "Mort Lin":         "#B5838D",
  "Charles' Lin":     "#6D6875",
  "Caleb's Lin":      "#84A98C",
  "Goondev":          "#52B788",
  "Anvi's Lin":       "#F6BD60",
  "Munch Bunch":      "#90BE6D",
};
 
const SUBTEAM_META = {
  Android:   { color: "#2ECC71", emoji: "🤖" },
  Backend:   { color: "#3498DB", emoji: "⚙️" },
  Design:    { color: "#E67E22", emoji: "🎨" },
  iOS:       { color: "#9B59B6", emoji: "🍎" },
  Marketing: { color: "#E74C3C", emoji: "📣" },
};
 
const POD_COLORS = {
  Eatery:  "#FF6B6B",
  Resell:  "#4ECDC4",
  Navi:    "#45B7D1",
  Score:   "#96CEB4",
  Uplift:  "#FFEAA7",
  Chimes:  "#DDA0DD",
};
 
// ─── LOGIC ───────────────────────────────────────────────────────────────────
 
function canPair(a, b) {
  if (a.name === b.name) return false;
  if (a.lin    && b.lin    && a.lin    === b.lin)    return false;
  if (a.pod    && b.pod    && a.pod    === b.pod)    return false;
  if (a.subteam && b.subteam && a.subteam === b.subteam) return false;
  return true;
}
 
function computeSplit() {
  // Shuffle all people randomly, then assign alternately to stationary/transient
  // so we always get exactly floor(n/2) vs ceil(n/2) — no one sits out.
  // Use a seeded-ish shuffle (fixed so it's stable across renders).
  const all = [...PEOPLE];
  // Stable deterministic shuffle based on name so it doesn't change on re-render
  all.sort((a, b) => {
    const ha = a.name.split("").reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7);
    const hb = b.name.split("").reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7);
    return ha - hb;
  });
  const stationary = [], transient = [];
  all.forEach((p, i) => {
    (i % 2 === 0 ? stationary : transient).push(p);
  });
  return { stationary, transient };
}
 
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
 
function computeRounds(stationary, transient) {
  const metPairs = new Set();
  const rounds   = [];
 
  function pairKey(a, b) {
    return a < b ? `${a}|||${b}` : `${b}|||${a}`;
  }
 
  function runMatching(shuffledStat, shuffledTrans) {
    const curMatch = {};
    function augment(tpName, seen) {
      const tp = PEOPLE_MAP[tpName];
      for (const sp of shuffledStat) {
        if (seen.has(sp.name)) continue;
        if (metPairs.has(pairKey(tpName, sp.name))) continue;
        if (!canPair(tp, sp)) continue;
        seen.add(sp.name);
        if (!curMatch[sp.name] || augment(curMatch[sp.name], seen)) {
          curMatch[sp.name] = tpName;
          return true;
        }
      }
      return false;
    }
    for (const tp of shuffledTrans) augment(tp.name, new Set());
    return curMatch;
  }
 
  for (let r = 0; r < 60; r++) {
    // Run 8 attempts with different shuffles, keep the best (most pairs)
    let bestMatch = {};
    for (let attempt = 0; attempt < 8; attempt++) {
      const candidate = runMatching(shuffle(stationary), shuffle(transient));
      if (Object.keys(candidate).length > Object.keys(bestMatch).length) {
        bestMatch = candidate;
      }
    }
 
    const pairs = [];
    for (const [spName, tpName] of Object.entries(bestMatch)) {
      metPairs.add(pairKey(tpName, spName));
      pairs.push({ t: tpName, s: spName });
    }
    if (pairs.length === 0) break;
    rounds.push(pairs);
  }
  return rounds;
}
 
// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
 
function Tag({ name, style = {} }) {
  const p = PEOPLE_MAP[name];
  const bg     = p?.lin    ? LIN_COLORS[p.lin]                        : "#E8E8E8";
  const border = p?.subteam ? SUBTEAM_META[p.subteam]?.color           : "#ccc";
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 9px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      background: bg,
      border: `2.5px solid ${border}`,
      color: "#1a1a2e",
      letterSpacing: "0.01em",
      ...style,
    }}>
      {name}
    </span>
  );
}
 
function PairRow({ t, s }) {
  const tp = PEOPLE_MAP[t];
  const sp = PEOPLE_MAP[s];
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#fff",
      border: "1.5px solid #eee",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 13,
    }}>
      <span title="Circulating" style={{ fontSize: 11, color: "#999" }}>🚶</span>
      <Tag name={t} />
      <span style={{ color: "#ddd", fontWeight: 700 }}>⟷</span>
      <span title="Stationary" style={{ fontSize: 11, color: "#999" }}>🪑</span>
      <Tag name={s} />
      {(tp?.subteam !== sp?.subteam) && (
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#aaa" }}>
          {tp?.subteam || "—"} × {sp?.subteam || "—"}
        </span>
      )}
    </div>
  );
}
 
// ─── MAIN ─────────────────────────────────────────────────────────────────────
 
export default function AppDevSpeedDating() {
  const { stationary, transient } = useMemo(computeSplit, []);
  const rounds = useMemo(() => computeRounds(stationary, transient), [stationary, transient]);
 
  const [tab,        setTab]        = useState("groups");
  const [numRounds,  setNumRounds]  = useState(Math.min(10, rounds.length));
  const [searchName, setSearchName] = useState("");
 
  const selectedPerson = useMemo(() => {
    const q = searchName.toLowerCase().trim();
    if (q.length < 2) return null;
    return PEOPLE.find(p => p.name.toLowerCase().includes(q)) ?? null;
  }, [searchName]);
 
  const isStationary = useMemo(
    () => selectedPerson ? stationary.some(s => s.name === selectedPerson.name) : null,
    [selectedPerson, stationary]
  );
 
  const personSched = useMemo(() => {
    if (!selectedPerson) return [];
    return rounds.slice(0, numRounds).map((round, i) => {
      const pair = isStationary
        ? round.find(p => p.s === selectedPerson.name)
        : round.find(p => p.t === selectedPerson.name);
      return {
        round: i + 1,
        partner: pair ? PEOPLE_MAP[isStationary ? pair.t : pair.s] : null,
      };
    });
  }, [selectedPerson, isStationary, rounds, numRounds]);
 
  const TABS = [
    { id: "groups",   label: "👥 Groups"      },
    { id: "rounds",   label: "🔄 All Rounds"  },
    { id: "me",       label: "🔍 My Schedule" },
  ];
 
  const stationarySet = useMemo(() => new Set(stationary.map(s => s.name)), [stationary]);
 
  return (
    <div style={{
      fontFamily: "'DM Sans', 'Trebuchet MS', sans-serif",
      background: "#F7F4EF",
      minHeight: "100vh",
      padding: "0 0 60px 0",
    }}>
      {/* ── Header ── */}
      <div style={{
        background: "#1a1a2e",
        color: "white",
        padding: "28px 28px 24px",
        borderBottom: "4px solid #FFD166",
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#FFD166", marginBottom: 6 }}>
          CORNELL APPDEV ✦ SPEED DATING
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Meet Across the Team 🎉
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 20, fontSize: 13, color: "#aaa", flexWrap: "wrap" }}>
          <span>👤 {PEOPLE.length} members</span>
          <span>🪑 {stationary.length} stationary</span>
          <span>🚶 {transient.length} circulating</span>
          <span>🔄 {rounds.length} max rounds possible</span>
        </div>
        <div style={{
          marginTop: 14,
          background: "#ffffff18",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 13,
          lineHeight: 1.6,
          maxWidth: 620,
        }}>
          <strong style={{ color: "#FFD166" }}>How it works:</strong>{" "}
          Stationary folks stay in their assigned seat all event. Circulating folks rotate to a new seat every round.
          Each pairing avoids shared <span style={{ color: "#06D6A0" }}>lin</span>,{" "}
          <span style={{ color: "#FF8FAB" }}>pod</span>, and{" "}
          <span style={{ color: "#90BE6D" }}>subteam</span>.
        </div>
      </div>
 
      {/* ── Tab bar ── */}
      <div style={{
        background: "#1a1a2e",
        padding: "0 28px",
        display: "flex",
        gap: 4,
        borderBottom: "1px solid #333",
      }}>
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              background: tab === id ? "#FFD166" : "transparent",
              color: tab === id ? "#1a1a2e" : "#888",
              border: "none",
              padding: "12px 18px",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              borderBottom: tab === id ? "none" : "2px solid transparent",
              transition: "all 0.15s",
              borderRadius: "8px 8px 0 0",
            }}
          >
            {label}
          </button>
        ))}
      </div>
 
      <div style={{ padding: "24px 28px" }}>
 
        {/* ══ GROUPS TAB ══ */}
        {tab === "groups" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {[
                { title: "🪑 Stationary", people: stationary, desc: "Stay in your seat all event", accent: "#06D6A0" },
                { title: "🚶 Circulating", people: transient, desc: "Rotate to a new seat every round", accent: "#FFD166" },
              ].map(({ title, people, desc, accent }) => (
                <div key={title} style={{
                  background: "white",
                  borderRadius: 14,
                  border: `2px solid ${accent}`,
                  padding: 20,
                  boxShadow: "2px 2px 0 " + accent,
                }}>
                  <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>{desc} · {people.length} people</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {[...people].sort((a, b) => a.name.localeCompare(b.name)).map(p => (
                      <Tag key={p.name} name={p.name} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
 
            {/* Legend */}
            <div style={{ background: "white", borderRadius: 14, padding: 20, border: "1.5px solid #eee" }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14, letterSpacing: "0.05em" }}>
                COLOR LEGEND
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 8, letterSpacing: "0.08em" }}>
                  CHIP FILL = LIN
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {Object.entries(LIN_COLORS).map(([l, c]) => (
                    <span key={l} style={{
                      fontSize: 12, fontWeight: 600,
                      padding: "3px 10px", borderRadius: 20,
                      background: c, color: "#1a1a2e",
                      border: "2px solid #fff",
                    }}>{l}</span>
                  ))}
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    padding: "3px 10px", borderRadius: 20,
                    background: "#E8E8E8", color: "#1a1a2e",
                    border: "2px solid #fff",
                  }}>No lin (leads/unknown)</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 8, letterSpacing: "0.08em" }}>
                  CHIP BORDER = SUBTEAM
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {Object.entries(SUBTEAM_META).map(([s, { color, emoji }]) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 14, height: 14, background: color, borderRadius: 3, display: "inline-block" }} />
                      <span style={{ fontSize: 13 }}>{emoji} {s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
 
        {/* ══ ROUNDS TAB ══ */}
        {tab === "rounds" && (
          <div>
            {/* Controls */}
            <div style={{
              background: "white",
              borderRadius: 14,
              padding: "16px 20px",
              marginBottom: 20,
              border: "1.5px solid #eee",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>Rounds to plan:</div>
              <input
                type="range"
                min={1}
                max={rounds.length}
                value={numRounds}
                onChange={e => setNumRounds(+e.target.value)}
                style={{ flex: 1, minWidth: 160, accentColor: "#1a1a2e" }}
              />
              <div style={{
                fontWeight: 900, fontSize: 22, color: "#1a1a2e",
                background: "#FFD166", padding: "2px 14px", borderRadius: 8
              }}>
                {numRounds}
              </div>
              <div style={{ fontSize: 13, color: "#aaa" }}>of {rounds.length} max</div>
              <div style={{
                marginLeft: "auto",
                background: "#F7F4EF",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 12,
                color: "#555",
              }}>
                ~{numRounds * 3}–{numRounds * 5} min at 3–5 min/round
              </div>
            </div>
 
            {rounds.slice(0, numRounds).map((round, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  marginBottom: 10
                }}>
                  <div style={{
                    background: "#1a1a2e",
                    color: "#FFD166",
                    fontWeight: 900,
                    fontSize: 13,
                    padding: "4px 14px",
                    borderRadius: 20,
                    letterSpacing: "0.05em",
                  }}>
                    ROUND {i + 1}
                  </div>
                  <div style={{ fontSize: 13, color: "#999" }}>{round.length} pairs</div>
                  <div style={{ flex: 1, height: 1, background: "#eee" }} />
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 6,
                }}>
                  {[...round].sort((a, b) => a.s.localeCompare(b.s)).map((pair, j) => (
                    <PairRow key={j} t={pair.t} s={pair.s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
 
        {/* ══ MY SCHEDULE TAB ══ */}
        {tab === "me" && (
          <div>
            <div style={{
              background: "white",
              borderRadius: 14,
              padding: 20,
              marginBottom: 20,
              border: "1.5px solid #eee",
            }}>
              <input
                list="people-dl"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                placeholder="Start typing your name…"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2.5px solid #1a1a2e",
                  borderRadius: 10,
                  fontSize: 16,
                  fontFamily: "inherit",
                  fontWeight: 600,
                  outline: "none",
                  boxSizing: "border-box",
                  marginBottom: 14,
                }}
              />
              <datalist id="people-dl">
                {PEOPLE.map(p => <option key={p.name} value={p.name} />)}
              </datalist>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, color: "#666", whiteSpace: "nowrap" }}>Rounds to show:</span>
                <input
                  type="range"
                  min={1}
                  max={rounds.length}
                  value={numRounds}
                  onChange={e => setNumRounds(+e.target.value)}
                  style={{ flex: 1, accentColor: "#1a1a2e" }}
                />
                <span style={{ fontWeight: 800, color: "#1a1a2e", minWidth: 28 }}>{numRounds}</span>
              </div>
            </div>
 
            {!selectedPerson && searchName.length < 2 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Type your name above</div>
                <div style={{ fontSize: 14, marginTop: 6 }}>to see your personalized speed dating schedule</div>
              </div>
            )}
 
            {!selectedPerson && searchName.length >= 2 && (
              <div style={{ textAlign: "center", padding: 40, color: "#aaa" }}>
                No one found matching "{searchName}"
              </div>
            )}
 
            {selectedPerson && (
              <div>
                {/* Person card */}
                <div style={{
                  borderRadius: 14,
                  padding: 20,
                  marginBottom: 16,
                  background: selectedPerson.lin ? LIN_COLORS[selectedPerson.lin] : "#E8E8E8",
                  border: `3px solid ${selectedPerson.subteam ? SUBTEAM_META[selectedPerson.subteam]?.color : "#ccc"}`,
                  boxShadow: `4px 4px 0 ${selectedPerson.subteam ? SUBTEAM_META[selectedPerson.subteam]?.color : "#ccc"}`,
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#1a1a2e" }}>
                    {isStationary ? "🪑" : "🚶"} {selectedPerson.name}
                  </div>
                  <div style={{
                    marginTop: 6,
                    fontSize: 15,
                    fontWeight: 700,
                    color: isStationary ? "#1a5c3a" : "#5c3a1a",
                  }}>
                    {isStationary
                      ? "You are STATIONARY — stay in your seat! People will come to you."
                      : "You are CIRCULATING — rotate to the next seat after each round!"}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: "#555", display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span>Lin: {selectedPerson.lin || "N/A"}</span>
                    <span>Pod: {selectedPerson.pod || "N/A"}</span>
                    <span>Subteam: {selectedPerson.subteam || "N/A"}</span>
                  </div>
                </div>
 
                {/* Schedule list */}
                <div style={{
                  background: "white", borderRadius: 14,
                  border: "1.5px solid #eee", overflow: "hidden",
                }}>
                  <div style={{
                    background: "#1a1a2e", color: "white",
                    padding: "10px 16px",
                    fontWeight: 800, fontSize: 12,
                    letterSpacing: "0.1em",
                    display: "grid",
                    gridTemplateColumns: "70px 1fr 1fr 1fr",
                    gap: 8,
                  }}>
                    <span>ROUND</span>
                    <span>PARTNER</span>
                    <span>THEIR POD</span>
                    <span>THEIR SUBTEAM</span>
                  </div>
                  {personSched.map(({ round, partner }) => (
                    <div key={round} style={{
                      display: "grid",
                      gridTemplateColumns: "70px 1fr 1fr 1fr",
                      gap: 8,
                      padding: "10px 16px",
                      borderTop: "1px solid #f0f0f0",
                      alignItems: "center",
                      background: partner ? "white" : "#FFF9F0",
                    }}>
                      <span style={{
                        fontWeight: 900, fontSize: 13,
                        color: "#1a1a2e",
                        background: "#FFD16640",
                        padding: "2px 8px",
                        borderRadius: 6,
                        display: "inline-block",
                      }}>
                        #{round}
                      </span>
                      {partner ? (
                        <>
                          <Tag name={partner.name} />
                          <span style={{
                            fontSize: 12, fontWeight: 600,
                            color: partner.pod ? "#333" : "#bbb",
                            display: "flex", alignItems: "center", gap: 4,
                          }}>
                            {partner.pod ? (
                              <>
                                <span style={{
                                  width: 8, height: 8, borderRadius: "50%",
                                  background: POD_COLORS[partner.pod] || "#ccc",
                                  display: "inline-block", flexShrink: 0,
                                }} />
                                {partner.pod}
                              </>
                            ) : "—"}
                          </span>
                          <span style={{
                            fontSize: 12, fontWeight: 600,
                            color: partner.subteam ? SUBTEAM_META[partner.subteam]?.color : "#bbb",
                          }}>
                            {partner.subteam
                              ? `${SUBTEAM_META[partner.subteam]?.emoji} ${partner.subteam}`
                              : "—"}
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "#ccc", fontStyle: "italic", fontSize: 13, gridColumn: "2 / 5" }}>
                          Sit out this round
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
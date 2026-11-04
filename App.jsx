import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sparkles, Ticket, Crown, Newspaper, FlaskConical, Droplets, Heart, Wand2, KeyRound, Star, Hourglass, Gem, Candy, Cake, Lock, Unlock, ChevronDown, PawPrint, Flame } from "lucide-react";

/* ---------- EDIT HERE: make it yours ---------- */
const CFG = {
  name: "Pragati",
  from: "Ashu",
  roomCode: "PRAGATI",
  memories: [
    { t: "How it began", d: "Ten months of messages. We never met and never spoke on a video call, because I hid behind pictures that were not mine.", photo: "" },
    { t: "Ashu", d: "You called me Ashu. It was your name for me, and it is one of the kindest things I was ever called.", photo: "" },
    { t: "Our nok-jhok", d: "I teased you on purpose, ragebaited you for fun, and you got irritated and angry.", photo: "" },
    { t: "Your laughter", d: "You laughed at my jokes a lot. Making you smile was a regular part of our conversations.", photo: "" },
    { t: "The care you gave", d: "You supported me, looked after me, worried about me, and stood by me.", photo: "" },
  ],
  candies: [
    { n: "Sugar Quill", note: "I teased you on purpose. You got irritated, and I enjoyed it a little too much." },
    { n: "Chocolate Frog", note: "You laughed at my jokes a lot. Earning that laugh was my favourite thing." },
    { n: "Fizzing Whizzbee", note: "Ragebaiting you was my game. You got angry, and you laughed anyway. I remember both." },
    { n: "Cauldron Cake", note: "You worried about me, even when I deserved it least." },
    { n: "Pumpkin Pasty", note: "You called me Ashu, and to me it always sounded like affection." },
    { n: "Peppermint Toad", note: "Some of it was joyful. I want that remembered next to the part that was not." },
  ],
  promises: [
    "I am not asking you to forgive me.",
    "I am not asking you to reply.",
    "I am not asking for another chance.",
    "You owe me nothing: not a message, not a memory, not the future we imagined.",
  ],
};
const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const N = CFG.name;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
.font-display{font-family:'Cinzel',serif}.font-body{font-family:'Lora',Georgia,serif}
.gold{background:linear-gradient(120deg,#8a6a1f,#f2d98a 45%,#b8902e 70%,#f6e7b0);-webkit-background-clip:text;background-clip:text;color:transparent}
.glass{background:rgba(255,255,255,.055);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(212,175,55,.28);border-radius:1.25rem;box-shadow:0 20px 60px rgba(0,0,0,.45)}
.btn{font-family:'Cinzel',serif;padding:.85rem 1.8rem;border-radius:999px;border:1px solid #d4af37;color:#f6e7b0;background:linear-gradient(135deg,rgba(212,175,55,.22),rgba(16,185,129,.14));transition:.3s;letter-spacing:.04em}
.btn:hover{box-shadow:0 0 28px rgba(212,175,55,.5);transform:translateY(-2px)}
.btn:focus-visible,input:focus-visible{outline:2px solid #f2d98a;outline-offset:3px}
@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;

const Img = ({ id, w, className = "", alt = "" }) => {
  const [bad, setBad] = useState(false);
  return bad ? (
    <div className={`${className} bg-gradient-to-br from-emerald-900 via-slate-900 to-amber-900/60 flex items-center justify-center`}><PawPrint className="text-amber-200/50" /></div>
  ) : (
    <img src={(id.startsWith("http") || id.startsWith("/")) ? id : U(id, w)} alt={alt} loading="lazy" onError={() => setBad(true)} className={`${className} object-cover`} />
  );
};

const Dust = () => {
  const p = useMemo(() => Array.from({ length: 34 }, (_, i) => ({ i, x: Math.random() * 100, s: 2 + Math.random() * 4, d: 9 + Math.random() * 14, de: Math.random() * 10 })), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {p.map((o) => (
        <motion.span key={o.i} className="absolute rounded-full bg-amber-200" style={{ left: `${o.x}%`, bottom: -10, width: o.s, height: o.s, boxShadow: "0 0 10px #f2d98a" }}
          animate={{ y: [0, -900], opacity: [0, 0.9, 0] }} transition={{ duration: o.d, repeat: Infinity, delay: o.de, ease: "linear" }} />
      ))}
    </div>
  );
};

const Chap = ({ n, title, children }) => (
  <section className="relative z-10 px-5 py-20 md:py-28 max-w-4xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.9 }}>
      <p className="text-center italic font-body text-amber-200/60 mb-2">Chapter {n}</p>
      <h2 className="font-display text-3xl md:text-5xl text-center gold mb-10 leading-tight">{title}</h2>
      {children}
    </motion.div>
  </section>
);

const CatSil = ({ glow = "#a5f3fc", size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 18px ${glow}) drop-shadow(0 0 50px ${glow})` }}>
    <path d="M40 30 L72 62 Q100 54 128 62 L160 30 L166 96 Q172 150 100 170 Q28 150 34 96 Z" fill={glow} fillOpacity=".85" />
    <circle cx="76" cy="98" r="7" fill="#0b1226" /><circle cx="124" cy="98" r="7" fill="#0b1226" />
    <path d="M94 116 L106 116 L100 124 Z" fill="#0b1226" />
    <path d="M20 112 L62 118 M20 130 L62 124 M180 112 L138 118 M180 130 L138 124" stroke={glow} strokeWidth="2" />
  </svg>
);

/* 1 */
const Entrance = ({ onOpen }) => {
  const [broken, setBroken] = useState(false);
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center" style={{ background: "radial-gradient(ellipse at 50% 80%, #3b1f10 0%, #120a0a 55%, #05070f 100%)" }}
      exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 1.4 }}>
      <div className="absolute bottom-0 inset-x-0 h-1/3" style={{ background: "linear-gradient(#2a140b,#1a0c07)", borderTop: "2px solid #5a3519" }} />
      {[12, 86].map((l) => (
        <div key={l} className="absolute bottom-[30%]" style={{ left: `${l}%` }}>
          <motion.div animate={{ scaleY: [1, 1.2, 0.9, 1.15, 1], opacity: [0.9, 1, 0.8, 1, 0.9] }} transition={{ duration: 1.6, repeat: Infinity }} className="mx-auto w-3 h-7 rounded-full bg-gradient-to-t from-orange-500 to-yellow-200" style={{ boxShadow: "0 0 50px 20px rgba(255,170,60,.45)" }} />
          <div className="w-5 h-24 bg-amber-100/80 rounded-sm mx-auto" />
        </div>
      ))}
      <motion.div initial={{ rotate: -3, y: 20, opacity: 0 }} animate={{ rotate: -2, y: 0, opacity: 1 }} transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-sm rounded-md p-8 shadow-2xl" style={{ background: "linear-gradient(135deg,#efe0b8,#d9c08a)", boxShadow: "0 30px 80px rgba(0,0,0,.7)" }}>
        <p className="font-body italic text-stone-700">Hogwarts School of Witchcraft and Wizardry</p>
        <p className="font-display text-2xl text-stone-900 mt-4">Miss {N}</p>
        <p className="font-body text-stone-700 text-sm mt-1">For your birthday, 5 November</p>
        <motion.button aria-label="Break the wax seal" onClick={() => { setBroken(true); setTimeout(onOpen, 1100); }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
          className="mx-auto mt-6 w-24 h-24 rounded-full flex items-center justify-center font-display text-3xl text-amber-200 relative"
          style={{ background: "radial-gradient(circle at 35% 30%,#b91c3c,#6b0f24)", boxShadow: "0 8px 20px rgba(0,0,0,.5), inset 0 0 14px rgba(0,0,0,.5)" }}>
          {broken ? "" : "P"}
          {broken && Array.from({ length: 18 }).map((_, i) => (
            <motion.span key={i} className="absolute w-2 h-2 rounded-full bg-amber-300" initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: Math.cos(i) * 140, y: Math.sin(i * 1.7) * 140, opacity: 0 }} transition={{ duration: 1.1 }} style={{ boxShadow: "0 0 10px #fde68a" }} />
          ))}
        </motion.button>
      </motion.div>
      <p className="relative z-10 font-body italic text-amber-100/80 mt-8">Touch the seal if you wish, {N}. Nothing here asks for a reply.</p>
    </motion.div>
  );
};

/* 2 */
const TicketC = () => (
  <Chap n={2} title="Platform 9¾: Where It Began">
    <div className="relative mx-auto max-w-2xl p-8 md:p-10 text-stone-900 rounded-lg" style={{ background: "linear-gradient(135deg,#f6e7b0,#d4af37 55%,#a9812a)", boxShadow: "0 30px 70px rgba(0,0,0,.6)" }}>
      <div className="absolute -left-4 top-1/2 w-8 h-8 rounded-full bg-[#060a18]" /><div className="absolute -right-4 top-1/2 w-8 h-8 rounded-full bg-[#060a18]" />
      <div className="flex items-center gap-3"><Ticket /><p className="font-display text-xl">The Birthday Express</p></div>
      <p className="font-display text-4xl md:text-5xl mt-5">Admit {N}</p>
      <p className="font-body mt-3 text-lg">One passenger. A journey through our ten months, told as honestly as I can.</p>
      <div className="grid grid-cols-3 gap-3 mt-7 border-t-2 border-dashed border-stone-800/50 pt-5 font-body text-sm">
        <div><p className="opacity-70">Departs</p><p className="font-display">Where it began</p></div>
        <div><p className="opacity-70">Carriage</p><p className="font-display">Ten months</p></div>
        <div><p className="opacity-70">Return</p><p className="font-display">Not required</p></div>
      </div>
    </div>
  </Chap>
);

/* 3 */
const Sorting = () => {
  const [ph, setPh] = useState(0);
  const go = () => { setPh(1); setTimeout(() => setPh(2), 2600); };
  return (
    <Chap n={3} title="The Sorting Hat: The Little Things">
      <div className="glass p-8 text-center font-body">
        <motion.div animate={ph === 1 ? { rotate: [-6, 6, -6, 6, 0], y: [0, -8, 0] } : { y: [0, -6, 0] }} transition={{ duration: ph === 1 ? 0.8 : 4, repeat: Infinity }} className="text-7xl select-none" aria-hidden>🎩</motion.div>
        <AnimatePresence mode="wait">
          {ph === 0 && <motion.div key="a" exit={{ opacity: 0 }}><p className="mt-5 text-amber-100/80 italic">Place the hat upon your head, {N}.</p><button className="btn mt-5" onClick={go}>Sort me</button></motion.div>}
          {ph === 1 && <motion.p key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 italic text-amber-100/80">Hmm… caring, steady, always quick to worry about others…</motion.p>}
          {ph === 2 && (
            <motion.div key="c" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-5">
              <p className="font-display text-3xl md:text-4xl gold">KINDHEARTED!</p>
              <p className="mt-3 text-lg text-amber-50/90">{N}, sorted by how she treats the people she cares about: with support, loyalty, and worry.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {["Supported me", "Looked after me", "Worried about me", "Stood by me"].map((t) => <span key={t} className="px-4 py-1.5 rounded-full border border-emerald-400/40 text-emerald-200 text-sm">{t}</span>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chap>
  );
};

/* 4 */
const Prophet = () => (
  <Chap n={4} title="The Daily Prophet: The Ashu Edition">
    <div className="mx-auto p-6 md:p-9 text-stone-900 font-body rounded-sm" style={{ background: "#e9dcb8", boxShadow: "0 25px 60px rgba(0,0,0,.6)" }}>
      <p className="font-display text-center text-2xl md:text-3xl border-b-2 border-stone-800 pb-2">The Daily Prophet</p>
      <motion.h3 animate={{ scale: [1, 1.025, 1] }} transition={{ duration: 3, repeat: Infinity }} className="font-display text-center text-2xl md:text-4xl mt-5 leading-tight">THE MOST MAGICAL DAY: {N.toUpperCase()}'S BIRTHDAY!</motion.h3>
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <div>
          <Img id="photo-1514888286974-6c03e2ca1dba" w={700} className="w-full h-56 grayscale sepia contrast-110" alt="Wizard cat" />
          <p className="text-xs italic mt-1">Illustration only. Not a photograph from our story.</p>
        </div>
        <div className="space-y-3 text-[15px] leading-relaxed">
          <p>For ten months, a girl named {N} had a name for the boy she cared about: Ashu. It still means something to him.</p>
          <p>She was often irritated by his teasing, and she still laughed at his jokes. Neither is in dispute.</p>
          <p>Today's edition is about her. Happy birthday, {N}.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <Img id="photo-1573865526739-10659fec78a5" w={600} className="w-full h-36 grayscale sepia" alt="Cat" />
        <Img id="photo-1495360010541-f48722b2f7d2" w={600} className="w-full h-36 grayscale sepia" alt="Cat" />
      </div>
    </div>
  </Chap>
);

/* 5 */
const Apology = () => (
  <Chap n={5} title="The Chamber of Truth">
    <div className="glass p-7 md:p-12 font-body text-amber-50/90 leading-8 text-[17px] space-y-5">
      <p className="font-display text-xl gold">{N},</p>
      <p>For ten months you cared about someone who was not who you believed. The pictures you saw were not mine. They belonged to an AI-generated character, and I let you believe that was me.</p>
      <p>You asked to meet me, and you cried because you wanted to. I kept avoiding it, because the truth was the one thing I was afraid to give you. That was my choice, made again and again.</p>
      <p>When I finally told you, I admitted the face was not mine. You met me one last time, and you called me a fraud. You were not wrong to say it.</p>
      <p>I am not explaining this to excuse it. I am saying it plainly because you deserved plainness from the very beginning. I am sorry for the lies, and for the pain they caused you.</p>
      <p className="italic text-right">{CFG.from}</p>
    </div>
  </Chap>
);

/* 6 */
const Potion = () => {
  const ings = [{ n: "The Truth I Owed You", c: "#34d399", I: Droplets }, { n: "Real Regret", c: "#93c5fd", I: Droplets }, { n: "Accountability", c: "#f9a8d4", I: Heart }];
  const [added, setAdded] = useState([]);
  const done = added.length === 3;
  const col = added.length ? ings[added[added.length - 1]].c : "#334155";
  return (
    <Chap n={6} title="The Potion Lab: The Broken Trust">
      <div className="glass p-8 text-center font-body">
        <p className="text-amber-100/80 italic mb-6">Add all three ingredients, {N}. This potion cannot repair trust, and it does not try to.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {ings.map((g, i) => (
            <button key={g.n} disabled={added.includes(i)} onClick={() => setAdded([...added, i])} className="btn flex items-center gap-2 disabled:opacity-35" style={{ borderColor: g.c }}><g.I size={18} color={g.c} />{g.n}</button>
          ))}
        </div>
        <div className="mx-auto relative w-40 h-48 rounded-b-[5rem] rounded-t-xl border-2 border-amber-200/50 overflow-hidden bg-black/30">
          <motion.div animate={{ height: `${added.length * 30 + 8}%`, backgroundColor: col }} transition={{ duration: 0.9 }} className="absolute bottom-0 inset-x-0" style={{ boxShadow: `0 0 40px ${col}` }} />
          {done && Array.from({ length: 8 }).map((_, i) => <motion.span key={i} className="absolute bottom-6 w-3 h-3 rounded-full bg-white/70" style={{ left: `${12 + i * 10}%` }} animate={{ y: [0, -150], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} />)}
        </div>
        {done && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-xl border border-pink-300/40 bg-pink-300/5">
          <p className="font-display text-xl gold">Some things cannot be brewed back.</p>
          <p className="mt-2 text-amber-50/90">Trust is one of them, and I broke it. These three are only what I should have given you from the start. What you do with this, including nothing at all, is entirely yours.</p>
        </motion.div>}
      </div>
    </Chap>
  );
};

/* 7 */
const Pensieve = () => {
  const [k, setK] = useState(-1);
  const [rip, setRip] = useState(0);
  const m = CFG.memories;
  return (
    <Chap n={7} title="The Pensieve: Ten Months">
      <div className="text-center">
        <button aria-label="Touch the silver water" onClick={() => { setK((k + 1) % m.length); setRip(rip + 1); }} className="relative mx-auto block w-64 h-64 md:w-80 md:h-80 rounded-full" style={{ background: "radial-gradient(circle,#e0f2fe 0%,#7dd3fc55 45%,#1e293b 72%)", boxShadow: "0 0 70px #7dd3fc66, inset 0 0 30px #0f172a", border: "6px solid #8a6a1f" }}>
          <motion.span key={rip} initial={{ scale: 0.2, opacity: 0.9 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.4 }} className="absolute inset-0 rounded-full border-2 border-sky-100" />
          <span className="font-body italic text-slate-800 text-sm">{k < 0 ? "Touch the water" : "Touch again"}</span>
        </button>
        <AnimatePresence mode="wait">
          {k >= 0 && (
            <motion.div key={k} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass mt-8 overflow-hidden max-w-xl mx-auto">
              {m[k].photo && <Img id={m[k].photo} w={800} className="w-full h-56" alt={m[k].t} />}
              <div className="p-6 font-body"><p className="font-display text-lg gold">{m[k].t}</p><p className="mt-2 text-amber-50/90">{m[k].d}</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chap>
  );
};

/* 8 */
const Patronus = () => {
  const [on, setOn] = useState(false);
  useEffect(() => { if (on) { const t = setTimeout(() => setOn(false), 6500); return () => clearTimeout(t); } }, [on]);
  return (
    <Chap n={8} title="McGonagall's Charm Class: Her Laughter">
      <div className="glass p-10 text-center font-body">
        <p className="text-amber-100/80 italic">Think of laughing at one of my terrible jokes. Raise your wand. Say it with feeling.</p>
        <button className="btn mt-6 inline-flex items-center gap-2" onClick={() => setOn(true)}><Wand2 size={18} />Expecto Patronum!</button>
      </div>
      <AnimatePresence>
        {on && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} onClick={() => setOn(false)} className="fixed inset-0 z-40 flex flex-col items-center justify-center text-center px-6" style={{ background: "radial-gradient(circle,#0c1a3a,#02040c 70%)" }}>
            <motion.div initial={{ scale: 0.2, y: 200, opacity: 0 }} animate={{ scale: 1.5, y: 0, opacity: 1 }} transition={{ duration: 2.4, ease: "easeOut" }}><motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3, repeat: Infinity }}><CatSil size={280} /></motion.div></motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1.5 }} className="font-display text-2xl md:text-3xl text-cyan-100 mt-14">May this guardian keep your laughter safe, {N}.</motion.p>
            <p className="font-body italic text-cyan-100/50 mt-3 text-sm">Tap anywhere to return</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Chap>
  );
};

/* 9 */
const Room = () => {
  const [v, setV] = useState("");
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const rooms = [["Marriage", "We talked about becoming husband and wife."], ["Children", "We talked about having children."], ["A family", "We talked about building one together."], ["A lifetime", "We imagined spending our lives together."]];
  const tryIt = () => (v.trim().toUpperCase() === CFG.roomCode ? setOpen(true) : (setErr(true), setTimeout(() => setErr(false), 1200)));
  return (
    <Chap n={9} title="The Room of Requirement: The Family We Imagined">
      {!open ? (
        <div className="glass p-8 text-center font-body">
          <KeyRound className="mx-auto text-amber-300" />
          <p className="mt-3 text-amber-100/80 italic">The door appears only for the one who knows the word. Hint: the name on this whole castle.</p>
          <motion.div animate={err ? { x: [-8, 8, -8, 8, 0] } : {}} className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && tryIt()} aria-label="Secret code" placeholder="Speak the word" className="bg-black/30 border border-amber-300/40 rounded-full px-5 py-3 text-center text-amber-50 font-display" />
            <button className="btn" onClick={tryIt}>Open the door</button>
          </motion.div>
          {err && <p className="text-rose-300 mt-3 text-sm">The wall stays silent. Try again.</p>}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-5">
          {rooms.map(([h, t]) => <div key={h} className="glass p-6"><p className="font-display gold text-lg">{h}</p><p className="mt-2 font-body text-amber-50/90">{t}</p></div>)}
          <p className="sm:col-span-2 text-center font-body italic text-amber-100/80">These were dreams we shared once. They never became real, and nothing about them is owed to me.</p>
        </motion.div>
      )}
    </Chap>
  );
};

/* 10 */
const Stars = () => {
  const pts = [[25, 18], [30, 48], [36, 80], [64, 80], [70, 48], [75, 18], [50, 38]];
  const [lit, setLit] = useState([]);
  const all = lit.length === pts.length;
  const toggle = (i) => !lit.includes(i) && setLit([...lit, i]);
  return (
    <Chap n={10} title="Forbidden Forest Stargazing: The Care She Gave">
      <div className="glass p-4 md:p-8 text-center font-body" style={{ background: "linear-gradient(#050a1c,#0b1a2a)" }}>
        <p className="text-amber-100/80 italic mb-3">Tap every star to draw the Constellation of the Cat.</p>
        <svg viewBox="0 0 100 100" className="mx-auto w-full max-w-md h-auto" role="img" aria-label="Cat constellation">
          {pts.map((p, i) => { const q = pts[(i + 1) % 7]; return lit.includes(i) && lit.includes((i + 1) % 7) ? <motion.line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="#f2d98a" strokeWidth=".6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} /> : null; })}
          {pts.map((p, i) => (
            <g key={i} onClick={() => toggle(i)} style={{ cursor: "pointer" }} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && toggle(i)}>
              <circle cx={p[0]} cy={p[1]} r="6" fill="transparent" />
              <motion.circle cx={p[0]} cy={p[1]} r={lit.includes(i) ? 2.6 : 1.6} fill={lit.includes(i) ? "#f2d98a" : "#cbd5e1"} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity }} style={{ filter: "drop-shadow(0 0 3px #f2d98a)" }} />
            </g>
          ))}
        </svg>
        {all && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-xl gold mt-3">Each star is a way you cared: you supported me, looked after me, worried about me, and stood by me. Thank you, {N}.</motion.p>}
      </div>
    </Chap>
  );
};

/* 11 */
const Turner = () => {
  const steps = [["The beginning", "It began through messages. I should have been honest from the first one."], ["Ten months", "You cared, laughed, got angry at my teasing, and asked to meet me. I kept avoiding it."], ["The confession", "I told you the pictures were an AI-generated character, not me."], ["The last meeting", "You met me one last time. I was in shock and do not remember it clearly, so I will not describe it. You ended it, and I understand why."], ["If I could go back", "I would not change that you left. I would change that I lied."]];
  const [i, setI] = useState(-1);
  return (
    <Chap n={11} title="The Time-Turner: Ten Months and a Last Meeting">
      <div className="text-center font-body">
        <motion.button aria-label="Turn back time" onClick={() => setI(Math.min(i + 1, steps.length - 1))} animate={{ rotate: (i + 1) * 180 }} transition={{ duration: 1.1 }} className="inline-block text-amber-300" style={{ filter: "drop-shadow(0 0 22px #d4af37)" }}><Hourglass size={120} strokeWidth={1.2} /></motion.button>
        <p className="mt-4 text-amber-100/70 italic">{i < 0 ? "Turn the hourglass." : i < steps.length - 1 ? "Turn it again." : "That is all of it."}</p>
        <AnimatePresence mode="wait">{i >= 0 && <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass p-6 mt-6 max-w-lg mx-auto"><p className="font-display gold text-xl">{steps[i][0]}</p><p className="mt-2 text-amber-50/90">{steps[i][1]}</p></motion.div>}</AnimatePresence>
      </div>
    </Chap>
  );
};

/* 12 */
const Mirror = () => (
  <Chap n={12} title="The Mirror of Erised: The Apology">
    <div className="mx-auto max-w-sm p-4 rounded-t-[10rem] rounded-b-xl" style={{ background: "linear-gradient(145deg,#f6e7b0,#8a6a1f 40%,#d4af37 70%,#6e5316)", boxShadow: "0 0 80px rgba(212,175,55,.35), 0 30px 60px rgba(0,0,0,.6)" }}>
      <div className="rounded-t-[9rem] rounded-b-md px-6 py-14 text-center font-body" style={{ background: "radial-gradient(circle at 50% 35%,#6d3b66,#241437 70%,#0a0714)" }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}><Sparkles className="mx-auto text-pink-200" /></motion.div>
        <p className="italic text-pink-100/80 mt-4">What does the mirror show?</p>
        <p className="font-display text-xl text-pink-50 mt-3 leading-relaxed">It shows you, smiling and safe, and it shows me as I was: someone who lied to you. I take full responsibility. I am sorry.</p>
      </div>
    </div>
  </Chap>
);

/* 13 */
const Honey = () => {
  const [o, setO] = useState(null);
  const cols = ["#f472b6", "#34d399", "#fbbf24", "#a78bfa", "#fb923c", "#38bdf8"];
  return (
    <Chap n={13} title="Honeydukes: Our Nok-Jhok">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CFG.candies.map((c, i) => (
          <motion.button key={c.n} whileHover={{ y: -6, rotate: 2 }} whileTap={{ scale: 0.95 }} onClick={() => setO(o === i ? null : i)} className="glass p-5 text-center font-body" style={o === i ? { borderColor: cols[i] } : {}}>
            <Candy className="mx-auto" color={cols[i]} size={34} /><p className="mt-2 text-amber-50">{c.n}</p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">{o !== null && <motion.p key={o} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass p-6 mt-6 text-center font-body text-lg text-amber-50/95 italic">"{CFG.candies[o].note}"</motion.p>}</AnimatePresence>
    </Chap>
  );
};

/* 14 */
const Feast = () => {
  const [out, setOut] = useState(false);
  const bits = useMemo(() => Array.from({ length: 90 }, (_, i) => ({ i, x: Math.random() * 100, r: Math.random() * 720, d: 2.5 + Math.random() * 2.5, c: ["#f2d98a", "#f9a8d4", "#fbcfe8", "#d4af37", "#fda4af"][i % 5] })), []);
  return (
    <Chap n={14} title="The Grand Birthday Feast & Cake Cutting">
      <div className="text-center font-body">
        <div className="mx-auto w-64 relative pt-10">
          <div className="absolute top-0 inset-x-0 flex justify-around px-10">
            {[0, 1, 2].map((c) => (
              <div key={c} className="flex flex-col items-center"><motion.div animate={out ? { opacity: 0, scale: 0 } : { scaleY: [1, 1.25, 0.9, 1], opacity: [0.9, 1, 0.85, 1] }} transition={out ? { duration: 0.4 } : { duration: 1.2, repeat: Infinity, delay: c * 0.2 }} className="w-3 h-6 rounded-full bg-gradient-to-t from-orange-500 to-yellow-100" style={{ boxShadow: "0 0 20px 6px rgba(255,190,80,.6)" }} /><div className="w-2 h-10 bg-pink-100 rounded-sm" /></div>
            ))}
          </div>
          <div className="relative mt-8">
            <div className="h-16 rounded-t-3xl mx-6" style={{ background: "linear-gradient(#fbcfe8,#f9a8d4)", boxShadow: "inset 0 -8px 0 #f472b6" }} />
            <div className="h-20 rounded-md" style={{ background: "linear-gradient(#064e3b,#022c22)", borderTop: "4px solid #d4af37", boxShadow: "0 25px 40px rgba(0,0,0,.6)" }}><p className="font-display gold pt-5">{N}</p></div>
            <div className="h-3 rounded-full mx-[-16px] bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700" />
          </div>
        </div>
        {!out ? <button className="btn mt-10" onClick={() => setOut(true)}>Make a wish and blow</button> : <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-10"><p className="font-display text-3xl gold">Happy Birthday, {N}!</p><p className="mt-3 text-amber-50/90 text-lg max-w-md mx-auto">May this year be gentle with you and full of everything you deserve: peace, success, and people who are honest with you.</p></motion.div>}
      </div>
      {out && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden>
          {bits.map((b) => <motion.span key={b.i} className="absolute w-2.5 h-4 rounded-sm" style={{ left: `${b.x}%`, top: -20, background: b.c }} initial={{ y: 0, rotate: 0, opacity: 1 }} animate={{ y: "110vh", rotate: b.r, opacity: [1, 1, 0.8] }} transition={{ duration: b.d, ease: "easeIn" }} />)}
        </div>
      )}
    </Chap>
  );
};

/* 15 */
const Vault = () => {
  const [open, setOpen] = useState(false);
  return (
    <Chap n={15} title="The Vault of Unsaid Things">
      {!open ? (
        <div className="text-center"><motion.button aria-label="Unlock the vault" whileHover={{ scale: 1.06 }} onClick={() => setOpen(true)} className="glass p-10 inline-block" style={{ boxShadow: "0 0 60px rgba(212,175,55,.3)" }}><Lock size={72} className="text-amber-300 mx-auto" /><p className="font-display mt-4 text-amber-100">Unlock with a touch, {N}</p></motion.button></div>
      ) : (
        <div className="space-y-4 font-body">
          <div className="text-center"><motion.div initial={{ rotate: -20, y: 10 }} animate={{ rotate: 0, y: 0 }}><Unlock className="mx-auto text-emerald-300" size={44} /></motion.div></div>
          {CFG.promises.map((p, i) => <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.7 }} className="glass p-5 flex gap-3 text-amber-50/95"><Gem className="shrink-0 text-amber-300 mt-1" size={18} /><p>{p}</p></motion.div>)}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: CFG.promises.length * 0.7 + 0.4, duration: 1.4 }} className="glass p-8 md:p-10 mt-8 leading-8 text-[17px] text-amber-50/95">
            <p className="font-display text-2xl gold">{N},</p>
            <p className="mt-4">You once called me Ashu. Somewhere between all those laughs, little fights, and dreams, we imagined a whole lifetime. I wish I had been honest enough to deserve that trust.</p>
            <p className="mt-4">I remember your care, your support, your worry for me, and how much you laughed. I remember the future we talked about. I regret the lies I told, and I know I hurt you and broke your trust. I am genuinely sorry.</p>
            <p className="mt-4">I still love you. I am saying it only because it is true, not because it asks anything of you.</p>
            <p className="mt-4">Happy Birthday, {N}. I wish you happiness, peace, success, and a beautiful future.</p>
            <p className="mt-6 italic text-right">{CFG.from}</p>
          </motion.div>
        </div>
      )}
    </Chap>
  );
};

export default function App() {
  const [entered, setEntered] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <div className="font-body min-h-screen text-amber-50 relative overflow-x-hidden" style={{ background: "radial-gradient(ellipse at 20% 0%,#0d2b2a 0%,#070d24 45%,#04060f 100%)" }}>
      <style>{css}</style>
      <Dust />
      <AnimatePresence>{!entered && <Entrance onOpen={() => setEntered(true)} />}</AnimatePresence>
      {entered && (
        <>
          <motion.div style={{ scaleX: bar, transformOrigin: "0 50%" }} className="fixed top-0 inset-x-0 h-1 z-30 bg-gradient-to-r from-emerald-400 via-amber-300 to-pink-300" />
          <header className="relative z-10 min-h-[92vh] flex flex-col items-center justify-center text-center px-6">
            <Img id="photo-1507842217343-583bb7270b66" w={1600} className="absolute inset-0 w-full h-full opacity-20" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%,#04060f)" }} />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6 }} className="relative">
              <PawPrint className="mx-auto text-amber-300 mb-4" />
              <h1 className="font-display text-5xl md:text-8xl gold leading-tight">Happy Birthday,<br />{N}</h1>
              <p className="mt-5 italic text-amber-100/80 text-lg">Fifteen chapters of what I remember, told honestly. No reply needed.</p>
              <ChevronDown className="mx-auto mt-10 text-amber-200 animate-bounce" />
            </motion.div>
          </header>
          <TicketC /><Sorting /><Prophet /><Apology /><Potion /><Pensieve /><Patronus /><Room /><Stars /><Turner /><Mirror /><Honey /><Feast /><Vault />
          <footer className="relative z-10 text-center py-16 text-amber-200/60 italic">Happy Birthday. Take good care of yourself.</footer>
        </>
      )}
    </div>
  );
}

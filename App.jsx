import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sparkles, Ticket, Droplets, Heart, Wand2, KeyRound, Hourglass, Gem, Candy, Lock, Unlock, ChevronDown, PawPrint } from "lucide-react";

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

/* ---------- shared pieces ---------- */
const Img = ({ id, w, className = "", alt = "" }) => {
  const [bad, setBad] = useState(false);
  return bad ? (
    <div role="img" aria-label={alt} className={`${className} bg-gradient-to-br from-[#3a0c1c] via-[#0b1226] to-amber-900/50 flex items-center justify-center`}>
      <PawPrint className="text-amber-200/50" />
    </div>
  ) : (
    <img src={id.startsWith("http") || id.startsWith("/") ? id : U(id, w)} alt={alt} loading="lazy" onError={() => setBad(true)} className={`${className} object-cover`} />
  );
};

/* rising golden motes */
const Dust = () => {
  const p = useMemo(() => Array.from({ length: 36 }, (_, i) => ({ i, x: Math.random() * 100, s: 2 + Math.random() * 4, d: 10 + Math.random() * 14, de: Math.random() * 10 })), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden>
      {p.map((o) => (
        <motion.span key={o.i} className="absolute rounded-full bg-amber-200" style={{ left: `${o.x}%`, bottom: -10, width: o.s, height: o.s, boxShadow: "0 0 10px #f2d98a" }}
          animate={{ y: [0, -1000], opacity: [0, 0.85, 0] }} transition={{ duration: o.d, repeat: Infinity, delay: o.de, ease: "linear" }} />
      ))}
    </div>
  );
};

/* twinkling star field */
const StarField = ({ count = 70 }) => {
  const s = useMemo(() => Array.from({ length: count }, (_, i) => ({ i, x: Math.random() * 100, y: Math.random() * 70, r: 1 + Math.random() * 2, d: 2 + Math.random() * 4, de: Math.random() * 4 })), [count]);
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {s.map((o) => (
        <span key={o.i} className="absolute rounded-full bg-white twinkle" style={{ left: `${o.x}%`, top: `${o.y}%`, width: o.r, height: o.r, animationDuration: `${o.d}s`, animationDelay: `${o.de}s`, boxShadow: "0 0 6px #fff" }} />
      ))}
    </div>
  );
};

/* generic castle silhouette with glowing windows */
const TOWERS = [[40, 46, 150], [120, 40, 210], [200, 66, 140], [310, 44, 260], [400, 90, 180], [520, 56, 320], [620, 80, 200], [730, 44, 250], [820, 70, 160], [930, 50, 220], [1030, 46, 140], [1110, 60, 190]];
const Castle = ({ className = "" }) => (
  <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
    <defs>
      <linearGradient id="cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c1230" /><stop offset="1" stopColor="#04060f" /></linearGradient>
    </defs>
    <rect x="0" y="330" width="1200" height="70" fill="url(#cw)" />
    {TOWERS.map(([x, w, h], i) => {
      const top = 400 - h;
      const wins = [];
      for (let k = 0; top + 34 + k * 46 < 370; k++) wins.push(top + 34 + k * 46);
      return (
        <g key={i} fill="url(#cw)">
          <rect x={x} y={top} width={w} height={h} />
          <polygon points={`${x - 7},${top} ${x + w / 2},${top - w * 1.15} ${x + w + 7},${top}`} />
          {wins.map((wy, k) => (
            <rect key={k} x={x + w / 2 - 3} y={wy} width="6" height="12" rx="3" fill="#ffd27a" className="flicker" style={{ animationDelay: `${(i * 0.37 + k * 0.6) % 3}s`, filter: "drop-shadow(0 0 5px #ffb347)" }} />
          ))}
        </g>
      );
    })}
  </svg>
);

const Fog = ({ opacity = 0.35, bottom = 0 }) => (
  <div className="absolute inset-x-0 overflow-hidden pointer-events-none" style={{ bottom, height: "38%" }} aria-hidden>
    <div className="fog flex w-[200%] h-full" style={{ opacity }}>
      {[0, 1].map((k) => (
        <div key={k} className="w-1/2 h-full" style={{ background: "radial-gradient(ellipse at 20% 80%,rgba(180,195,230,.55),transparent 55%), radial-gradient(ellipse at 70% 90%,rgba(150,170,215,.5),transparent 60%)" }} />
      ))}
    </div>
  </div>
);

const Candle = ({ x, y, delay = 0, h = 46 }) => (
  <motion.div className="absolute flex flex-col items-center" style={{ left: `${x}%`, top: `${y}%` }} animate={{ y: [0, -12, 0] }} transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }} aria-hidden>
    <motion.div animate={{ scaleY: [1, 1.25, 0.9, 1.1, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-2.5 h-5 rounded-full bg-gradient-to-t from-orange-500 to-yellow-100" style={{ boxShadow: "0 0 26px 10px rgba(255,180,70,.5)" }} />
    <div className="w-3 rounded-sm bg-gradient-to-b from-amber-50 to-amber-200/80" style={{ height: h }} />
  </motion.div>
);

const Chap = ({ n, title, children }) => (
  <section className="relative z-10 px-5 py-20 md:py-28 max-w-4xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.9 }}>
      <div className="ornament font-display text-xs md:text-sm tracking-[.35em] uppercase mb-4"><span>Chapter {n}</span></div>
      <h2 className="font-display text-3xl md:text-5xl text-center gold mb-12 leading-tight">{title}</h2>
      {children}
    </motion.div>
  </section>
);

const CatSil = ({ glow = "#a5f3fc", size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 18px ${glow}) drop-shadow(0 0 50px ${glow})`, maxWidth: "70vw", height: "auto" }} aria-hidden>
    <path d="M40 30 L72 62 Q100 54 128 62 L160 30 L166 96 Q172 150 100 170 Q28 150 34 96 Z" fill={glow} fillOpacity=".85" />
    <circle cx="76" cy="98" r="7" fill="#0b1226" /><circle cx="124" cy="98" r="7" fill="#0b1226" />
    <path d="M94 116 L106 116 L100 124 Z" fill="#0b1226" />
    <path d="M20 112 L62 118 M20 130 L62 124 M180 112 L138 118 M180 130 L138 124" stroke={glow} strokeWidth="2" />
  </svg>
);

/* 1 — cinematic opening with envelope */
const Entrance = ({ onOpen }) => {
  const [broken, setBroken] = useState(false);
  const open = () => {
    if (broken) return;
    setBroken(true);
    setTimeout(onOpen, 2600);
  };
  return (
    <motion.div className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center px-6 text-center" style={{ background: "linear-gradient(#050818 0%,#0a1030 55%,#1a0a1a 100%)" }}
      exit={{ opacity: 0, scale: 1.06 }} transition={{ duration: 1.4 }}>
      <StarField count={90} />
      <div className="absolute rounded-full" style={{ top: "9%", right: "12%", width: 90, height: 90, background: "radial-gradient(circle at 35% 35%,#fffbe8,#f1e3b0 60%,#c9b77a)", boxShadow: "0 0 80px 30px rgba(255,244,200,.25)" }} aria-hidden />
      <Castle className="absolute bottom-0 inset-x-0 w-full h-[55%]" />
      <Fog opacity={0.5} />
      <Candle x={8} y={14} delay={0.2} /><Candle x={20} y={30} delay={1} h={60} /><Candle x={80} y={22} delay={0.6} h={54} /><Candle x={92} y={38} delay={1.4} />

      <p className="relative z-10 font-display tracking-[.35em] text-xs md:text-sm text-amber-200/80 mb-6 uppercase">A letter has arrived</p>

      {/* envelope */}
      <div className="relative z-10 w-[min(88vw,380px)]" style={{ perspective: 900 }}>
        <div className="relative h-56 sm:h-60">
          {/* letter */}
          <motion.div animate={broken ? { y: -120 } : { y: 0 }} transition={{ delay: 0.9, duration: 1.2, ease: "easeInOut" }}
            className="parchment absolute inset-x-4 top-3 bottom-0 rounded-md px-5 pt-6 shadow-xl" style={{ zIndex: 2 }}>
            <p className="font-body italic text-stone-700 text-[13px] sm:text-sm leading-snug">Hogwarts School of Witchcraft and Wizardry</p>
            <p className="font-display text-2xl text-stone-900 mt-3">Miss {N}</p>
            <p className="font-body text-stone-700 text-sm mt-1">For your birthday, 5 November</p>
          </motion.div>
          {/* front pocket */}
          <div className="absolute inset-0 rounded-md pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(160deg,#7a1630,#4a0b1d)", clipPath: "polygon(0 0,50% 52%,100% 0,100% 100%,0 100%)", boxShadow: "0 24px 60px rgba(0,0,0,.6)" }} />
          {/* flap */}
          <motion.div animate={{ rotateX: broken ? 180 : 0 }} transition={{ delay: 0.5, duration: 0.9 }}
            className="absolute inset-x-0 top-0 h-[52%] origin-top" style={{ zIndex: broken ? 1 : 5, background: "linear-gradient(180deg,#8e1b3a,#5a0f24)", clipPath: "polygon(0 0,100% 0,50% 100%)" }} />
          {/* seal */}
          {(
            <motion.button aria-label="Break the wax seal" onClick={open} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              animate={broken ? { opacity: 0, scale: 1.6 } : { scale: [1, 1.06, 1] }} transition={broken ? { duration: 0.5 } : { duration: 2.4, repeat: Infinity }}
              className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center font-display text-3xl text-amber-200" style={{ zIndex: 6, background: "radial-gradient(circle at 35% 30%,#d6284f,#7a0f2a)", boxShadow: "0 8px 20px rgba(0,0,0,.55), inset 0 0 14px rgba(0,0,0,.5), 0 0 30px rgba(214,40,79,.4)" }}>
              P
              {broken && Array.from({ length: 18 }).map((_, i) => (
                <motion.span key={i} className="absolute w-2 h-2 rounded-full bg-amber-300" initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: Math.cos(i) * 130, y: Math.sin(i * 1.7) * 130, opacity: 0 }} transition={{ duration: 1.1 }} style={{ boxShadow: "0 0 10px #fde68a" }} />
              ))}
            </motion.button>
          )}
        </div>
      </div>

      <p className="relative z-10 font-body italic text-amber-100/90 mt-10 max-w-xs">Touch the seal if you wish, {N}. Nothing here asks for a reply.</p>
    </motion.div>
  );
};

/* 2 */
const TicketC = () => (
  <Chap n={2} title="Platform 9¾: Where It Began">
    <div className="relative mx-auto max-w-2xl p-8 md:p-10 text-stone-900 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,#f6e7b0,#d4af37 55%,#a9812a)", boxShadow: "0 30px 70px rgba(0,0,0,.6), 0 0 60px rgba(212,175,55,.2)" }}>
      <div className="absolute -left-4 top-[62%] w-8 h-8 rounded-full bg-[#060a18]" /><div className="absolute -right-4 top-[62%] w-8 h-8 rounded-full bg-[#060a18]" />
      <div className="flex items-center gap-3"><Ticket /><p className="font-display text-lg md:text-xl tracking-wide">The Birthday Express</p></div>
      <p className="font-display text-4xl md:text-5xl mt-5">Admit {N}</p>
      <p className="font-body mt-3 text-lg">One passenger. A journey through our ten months, told as honestly as I can.</p>
      <div className="grid grid-cols-3 gap-3 mt-8 border-t-2 border-dashed border-stone-800/50 pt-5 font-body text-sm">
        <div><p className="opacity-75">Departs</p><p className="font-display">Where it began</p></div>
        <div><p className="opacity-75">Carriage</p><p className="font-display">Ten months</p></div>
        <div><p className="opacity-75">Return</p><p className="font-display">Not required</p></div>
      </div>
    </div>
  </Chap>
);

/* 3 */
const Sorting = () => {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    if (ph !== 1) return undefined;
    const t = setTimeout(() => setPh(2), 2600);
    return () => clearTimeout(t);
  }, [ph]);
  return (
    <Chap n={3} title="The Sorting Hat: The Little Things">
      <div className="glass p-8 md:p-12 text-center font-body">
        <motion.div animate={ph === 1 ? { rotate: [-6, 6, -6, 6, 0], y: [0, -8, 0] } : { y: [0, -6, 0] }} transition={{ duration: ph === 1 ? 0.8 : 4, repeat: Infinity }} className="text-7xl md:text-8xl select-none" style={{ filter: "drop-shadow(0 0 24px rgba(212,175,55,.5))" }} aria-hidden>🎩</motion.div>
        <AnimatePresence mode="wait">
          {ph === 0 && <motion.div key="a" exit={{ opacity: 0 }}><p className="mt-6 text-amber-100/90 italic text-lg">Place the hat upon your head, {N}.</p><button className="btn mt-6" onClick={() => setPh(1)}>Sort me</button></motion.div>}
          {ph === 1 && <motion.p key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 italic text-amber-100/90 text-lg">Hmm… caring, steady, always quick to worry about others…</motion.p>}
          {ph === 2 && (
            <motion.div key="c" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6">
              <p className="font-display text-3xl md:text-5xl gold">KINDHEARTED!</p>
              <p className="mt-4 text-lg text-amber-50/95">{N}, sorted by how she treats the people she cares about: with support, loyalty, and worry.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {["Supported me", "Looked after me", "Worried about me", "Stood by me"].map((t) => <span key={t} className="px-4 py-1.5 rounded-full border border-emerald-400/50 bg-emerald-400/10 text-emerald-100 text-sm">{t}</span>)}
              </div>
              <button className="btn mt-8 text-sm" onClick={() => setPh(0)}>Sort again</button>
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
    <div className="parchment mx-auto p-6 md:p-10 font-body rounded-sm" style={{ boxShadow: "0 30px 70px rgba(0,0,0,.65)" }}>
      <div className="flex justify-between text-[11px] md:text-xs tracking-widest uppercase border-b border-stone-700/60 pb-1 font-display"><span>Special Edition</span><span>5 November</span></div>
      <p className="font-display text-center text-4xl md:text-6xl border-b-4 border-double border-stone-800 py-3 tracking-wide">The Daily Prophet</p>
      <motion.h3 animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }} className="font-display text-center text-2xl md:text-4xl mt-6 leading-tight">THE MOST MAGICAL DAY: {N.toUpperCase()}'S BIRTHDAY!</motion.h3>
      <div className="grid md:grid-cols-2 gap-6 mt-7">
        <div>
          <Img id="photo-1514888286974-6c03e2ca1dba" w={700} className="w-full h-56 md:h-64 grayscale sepia contrast-110 border border-stone-800/60" alt="Wizard cat" />
          <p className="text-xs italic mt-1 text-stone-700">Illustration only. Not a photograph from our story.</p>
        </div>
        <div className="space-y-3 text-[15px] md:text-base leading-relaxed md:columns-1">
          <p><span className="font-display float-left text-6xl leading-[.8] pr-2 pt-1">F</span>or ten months, a girl named {N} had a name for the boy she cared about: Ashu. It still means something to him.</p>
          <p>She was often irritated by his teasing, and she still laughed at his jokes. Neither is in dispute.</p>
          <p>Today's edition is about her. Happy birthday, {N}.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Img id="photo-1573865526739-10659fec78a5" w={600} className="w-full h-36 md:h-44 grayscale sepia border border-stone-800/60" alt="Cat" />
        <Img id="photo-1495360010541-f48722b2f7d2" w={600} className="w-full h-36 md:h-44 grayscale sepia border border-stone-800/60" alt="Cat" />
      </div>
    </div>
  </Chap>
);

/* 5 */
const Apology = () => (
  <Chap n={5} title="The Chamber of Truth">
    <div className="glass p-7 md:p-12 font-body text-amber-50/95 leading-8 text-[17px] space-y-5">
      <p className="font-display text-2xl gold">{N},</p>
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
        <p className="text-amber-100/90 italic mb-6 text-lg">Add all three ingredients, {N}. This potion cannot repair trust, and it does not try to.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {ings.map((g, i) => (
            <button key={g.n} disabled={added.includes(i)} onClick={() => setAdded([...added, i])} className="btn flex items-center gap-2 disabled:opacity-40" style={{ borderColor: g.c }}><g.I size={18} color={g.c} />{g.n}</button>
          ))}
        </div>
        <div className="mx-auto relative w-40 h-48 rounded-b-[5rem] rounded-t-xl border-2 border-amber-200/60 overflow-hidden bg-black/30">
          <motion.div animate={{ height: `${added.length * 30 + 8}%`, backgroundColor: col }} transition={{ duration: 0.9 }} className="absolute bottom-0 inset-x-0" style={{ boxShadow: `0 0 40px ${col}` }} />
          {done && Array.from({ length: 8 }).map((_, i) => <motion.span key={i} className="absolute bottom-6 w-3 h-3 rounded-full bg-white/70" style={{ left: `${12 + i * 10}%` }} animate={{ y: [0, -150], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} />)}
        </div>
        {added.length > 0 && !done && <button className="btn mt-6 text-sm" onClick={() => setAdded([])}>Empty the cauldron</button>}
        {done && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-xl border border-pink-300/40 bg-pink-300/5">
            <p className="font-display text-xl gold">Some things cannot be brewed back.</p>
            <p className="mt-2 text-amber-50/95">Trust is one of them, and I broke it. These three are only what I should have given you from the start. What you do with this, including nothing at all, is entirely yours.</p>
          </motion.div>
        )}
      </div>
    </Chap>
  );
};

/* 7 — memories timeline, revealed through the Pensieve */
const Pensieve = () => {
  const m = CFG.memories;
  const [shown, setShown] = useState(0);
  const [rip, setRip] = useState(0);
  const touch = () => { setShown((s) => Math.min(s + 1, m.length)); setRip((r) => r + 1); };
  return (
    <Chap n={7} title="The Pensieve: Ten Months">
      <div className="text-center">
        <button aria-label="Touch the silver water" onClick={touch} className="relative mx-auto block w-60 h-60 md:w-72 md:h-72 rounded-full" style={{ background: "radial-gradient(circle,#f0f9ff 0%,#7dd3fc88 42%,#1e293b 72%)", boxShadow: "0 0 80px #7dd3fc77, inset 0 0 30px #0f172a", border: "7px solid #a9812a" }}>
          <motion.span key={rip} initial={{ scale: 0.2, opacity: 0.9 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.4 }} className="absolute inset-0 rounded-full border-2 border-sky-100" />
          <span className="font-body italic text-slate-900 text-sm md:text-base font-medium px-6">{shown === 0 ? "Touch the water" : shown < m.length ? "Touch again" : "Every memory is here"}</span>
        </button>
        {shown > 0 && shown < m.length && <button className="btn mt-6 text-sm" onClick={() => setShown(m.length)}>Reveal all</button>}

        <div className="relative mt-12 max-w-2xl mx-auto text-left">
          {shown > 0 && <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-300/70 via-amber-300/30 to-transparent" aria-hidden />}
          <AnimatePresence>
            {m.slice(0, shown).map((x, i) => (
              <motion.div key={x.t} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className={`relative pl-12 md:pl-0 mb-8 md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:ml-auto md:pl-10"}`}>
                <span className={`absolute left-[9px] md:left-auto top-6 w-3.5 h-3.5 rounded-full bg-amber-300 ${i % 2 === 0 ? "md:-right-[7px]" : "md:-left-[7px]"}`} style={{ boxShadow: "0 0 16px #f2d98a" }} />
                <div className="glass overflow-hidden">
                  {x.photo && <Img id={x.photo} w={800} className="w-full h-48" alt={x.t} />}
                  <div className="p-5 font-body">
                    <p className="font-display text-xs tracking-widest text-amber-200/70">MEMORY {i + 1}</p>
                    <p className="font-display text-xl gold mt-1">{x.t}</p>
                    <p className="mt-2 text-amber-50/95 leading-relaxed">{x.d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Chap>
  );
};

/* 8 */
const Patronus = () => {
  const [on, setOn] = useState(false);
  useEffect(() => { if (!on) return undefined; const t = setTimeout(() => setOn(false), 6500); return () => clearTimeout(t); }, [on]);
  return (
    <Chap n={8} title="McGonagall's Charm Class: Her Laughter">
      <div className="glass p-10 text-center font-body">
        <p className="text-amber-100/90 italic text-lg">Think of laughing at one of my terrible jokes. Raise your wand. Say it with feeling.</p>
        <button className="btn mt-6 inline-flex items-center gap-2" onClick={() => setOn(true)}><Wand2 size={18} />Expecto Patronum!</button>
      </div>
      <AnimatePresence>
        {on && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} onClick={() => setOn(false)} className="fixed inset-0 z-[60] flex flex-col items-center justify-center text-center px-6 cursor-pointer" style={{ background: "radial-gradient(circle,#0c1a3a,#02040c 70%)" }}>
            <StarField count={60} />
            <motion.div initial={{ scale: 0.2, y: 200, opacity: 0 }} animate={{ scale: 1.4, y: 0, opacity: 1 }} transition={{ duration: 2.4, ease: "easeOut" }} className="relative"><motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3, repeat: Infinity }}><CatSil size={260} /></motion.div></motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1.5 }} className="relative font-display text-2xl md:text-3xl text-cyan-100 mt-14">May this guardian keep your laughter safe, {N}.</motion.p>
            <p className="relative font-body italic text-cyan-100/70 mt-3 text-sm">Tap anywhere to return</p>
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
          <p className="mt-3 text-amber-100/90 italic text-lg">The door appears only for the one who knows the word. Hint: the name on this whole castle.</p>
          <motion.div animate={err ? { x: [-8, 8, -8, 8, 0] } : {}} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && tryIt()} aria-label="Secret code" placeholder="Speak the word" className="w-full sm:w-64 bg-black/40 border border-amber-300/50 rounded-full px-5 py-3 text-center text-amber-50 placeholder:text-amber-100/50 font-display" />
            <button className="btn" onClick={tryIt}>Open the door</button>
          </motion.div>
          {err && <p className="text-rose-300 mt-3 text-sm">The wall stays silent. Try again.</p>}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-5">
          {rooms.map(([h, t]) => <div key={h} className="glass p-6"><p className="font-display gold text-xl">{h}</p><p className="mt-2 font-body text-amber-50/95">{t}</p></div>)}
          <p className="sm:col-span-2 text-center font-body italic text-amber-100/90">These were dreams we shared once. They never became real, and nothing about them is owed to me.</p>
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
        <p className="text-amber-100/90 italic mb-3 text-lg">Tap every star to draw the Constellation of the Cat.</p>
        <svg viewBox="0 0 100 100" className="mx-auto w-full max-w-md h-auto" role="group" aria-label="Cat constellation">
          {pts.map((p, i) => { const q = pts[(i + 1) % 7]; return lit.includes(i) && lit.includes((i + 1) % 7) ? <motion.line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="#f2d98a" strokeWidth=".6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} /> : null; })}
          {pts.map((p, i) => (
            <g key={i} onClick={() => toggle(i)} style={{ cursor: "pointer" }} tabIndex={0} role="button" aria-label={`Star ${i + 1}`} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i)}>
              <circle cx={p[0]} cy={p[1]} r="7" fill="transparent" />
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
        <p className="mt-4 text-amber-100/80 italic">{i < 0 ? "Turn the hourglass." : i < steps.length - 1 ? "Turn it again." : "That is all of it."}</p>
        <AnimatePresence mode="wait">{i >= 0 && <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass p-6 mt-6 max-w-lg mx-auto"><p className="font-display gold text-xl">{steps[i][0]}</p><p className="mt-2 text-amber-50/95">{steps[i][1]}</p></motion.div>}</AnimatePresence>
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
        <p className="italic text-pink-100/90 mt-4">What does the mirror show?</p>
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
          <motion.button key={c.n} whileHover={{ y: -6, rotate: 2 }} whileTap={{ scale: 0.95 }} onClick={() => setO(o === i ? null : i)} className="glass p-5 text-center font-body" style={o === i ? { borderColor: cols[i], boxShadow: `0 0 30px ${cols[i]}55` } : {}}>
            <Candy className="mx-auto" color={cols[i]} size={34} /><p className="mt-2 text-amber-50">{c.n}</p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">{o !== null && <motion.p key={o} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass p-6 mt-6 text-center font-body text-lg text-amber-50 italic">"{CFG.candies[o].note}"</motion.p>}</AnimatePresence>
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
            <div className="h-20 rounded-md" style={{ background: "linear-gradient(#7a1630,#3d0a18)", borderTop: "4px solid #d4af37", boxShadow: "0 25px 40px rgba(0,0,0,.6)" }}><p className="font-display gold pt-5 text-xl">{N}</p></div>
            <div className="h-3 rounded-full mx-[-16px] bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700" />
          </div>
        </div>
        {!out ? <button className="btn mt-10" onClick={() => setOut(true)}>Make a wish and blow</button> : <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-10"><p className="font-display text-3xl md:text-4xl gold">Happy Birthday, {N}!</p><p className="mt-3 text-amber-50/95 text-lg max-w-md mx-auto">May this year be gentle with you and full of everything you deserve: peace, success, and people who are honest with you.</p></motion.div>}
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
    <div className="font-body min-h-screen text-amber-50 relative overflow-x-hidden" style={{ background: "radial-gradient(ellipse at 20% 0%,#2a0a1a 0%,#070d24 42%,#04060f 100%)" }}>
      <Dust />
      <AnimatePresence>{!entered && <Entrance onOpen={() => setEntered(true)} />}</AnimatePresence>
      {entered && (
        <>
          <motion.div style={{ scaleX: bar, transformOrigin: "0 50%" }} className="fixed top-0 inset-x-0 h-1 z-[45] bg-gradient-to-r from-rose-700 via-amber-300 to-amber-100" />
          <header className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden" style={{ background: "linear-gradient(#050818,#0a1030 60%,#1a0a1a)" }}>
            <Img id="photo-1507842217343-583bb7270b66" w={1600} className="absolute inset-0 w-full h-full opacity-20" />
            <StarField count={90} />
            <div className="absolute rounded-full" style={{ top: "8%", left: "10%", width: 80, height: 80, background: "radial-gradient(circle at 35% 35%,#fffbe8,#f1e3b0 60%,#c9b77a)", boxShadow: "0 0 90px 30px rgba(255,244,200,.22)" }} aria-hidden />
            <Castle className="absolute bottom-0 inset-x-0 w-full h-[48%]" />
            <Fog opacity={0.45} />
            <Candle x={10} y={20} delay={0.3} /><Candle x={24} y={42} delay={1.2} h={58} /><Candle x={78} y={30} delay={0.8} h={58} /><Candle x={90} y={16} delay={1.6} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%,rgba(4,6,15,.55),transparent 65%), linear-gradient(transparent 70%,#04060f)" }} />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6 }} className="relative">
              <PawPrint className="mx-auto text-amber-300 mb-4" />
              <p className="font-display text-xs md:text-sm tracking-[.5em] text-amber-200/90 uppercase mb-4">5 November</p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl gold leading-tight" style={{ filter: "drop-shadow(0 0 28px rgba(212,175,55,.35))" }}>Happy Birthday,<br />{N}</h1>
              <p className="mt-6 italic text-amber-100/90 text-lg max-w-md mx-auto">Fifteen chapters of what I remember, told honestly. No reply needed.</p>
              <ChevronDown className="mx-auto mt-10 text-amber-200 animate-bounce" />
            </motion.div>
          </header>
          <TicketC /><Sorting /><Prophet /><Apology /><Potion /><Pensieve /><Patronus /><Room /><Stars /><Turner /><Mirror /><Honey /><Feast /><Vault />
          <footer className="relative z-10 text-center py-16 text-amber-200/70 italic">Happy Birthday. Take good care of yourself.</footer>
        </>
      )}
    </div>
  );
}

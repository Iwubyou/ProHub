import { useState } from "react";
import {
  Home, Swords, Trophy, User, Bell, Flame, Zap, CheckCircle2,
  Play, Star, Target, BarChart3, Shield, ChevronRight, Users,
  Calendar, Settings, Edit3, TrendingUp, Clock, ArrowLeft,
  MessageSquare, Award,
} from "lucide-react";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: "#0C0A1E",
  card: "#16133A",
  card2: "#1E1B4B",
  accent: "#818CF8",
  accentVi: "#A78BFA",
  accentGlow: "rgba(129,140,248,0.18)",
  accentGlowSoft: "rgba(129,140,248,0.08)",
  fg: "#EEF0FF",
  muted: "#7C6FA0",
  mutedLight: "#A5B4FC",
  border: "rgba(255,255,255,0.08)",
  gold: "#FACC15",
  gold2: "rgba(250,204,21,0.12)",
};

// ─── Types ───────────────────────────────────────────────────────────────────
type NavTab = "home" | "challenges" | "battle" | "leaderboard" | "profile";

type Route =
  | { type: "masters" }
  | { type: "master-profile"; masterId: number }
  | { type: "master-dashboard" };

interface Challenge {
  id: number; icon: string; name: string; detail: string;
  xp: number; done: boolean; category: string; duration: string;
}

interface MasterReview {
  name: string; avatar: string; rating: number; text: string; improvement: string;
}

interface Master {
  id: number; name: string; avatar: string; specialty: string;
  category: string; rating: number; students: number; price: number;
  experience: string; bio: string; specialties: string[];
  gradient: string; reviews: MasterReview[];
}

// ─── Static data ─────────────────────────────────────────────────────────────
const ALL_CHALLENGES: Challenge[] = [
  { id: 1, icon: "💪", name: "Push-up Set", detail: "20 Push-ups", xp: 80, done: false, category: "Strength", duration: "~5 min" },
  { id: 2, icon: "🦵", name: "Squat Blast", detail: "30 Squats", xp: 60, done: true, category: "Lower Body", duration: "~4 min" },
  { id: 3, icon: "⏱️", name: "Core Hold", detail: "1-Min Plank", xp: 100, done: false, category: "Core", duration: "1 min" },
  { id: 4, icon: "🚶", name: "Easy Walk", detail: "10-Min Walk", xp: 40, done: false, category: "Cardio", duration: "10 min" },
  { id: 5, icon: "🏋️", name: "Dumbbell Row", detail: "15 Bent-Over Rows", xp: 90, done: false, category: "Strength", duration: "~6 min" },
  { id: 6, icon: "🧘", name: "Stretch Flow", detail: "5-Min Stretch", xp: 30, done: true, category: "Flexibility", duration: "5 min" },
];

const LEADERBOARD_DATA = [
  { rank: 1, name: "Carlo M.", xp: 12400, level: 28, streak: 21, avatar: "C", wins: 54 },
  { rank: 2, name: "Bea R.", xp: 11850, level: 27, streak: 18, avatar: "B", wins: 48 },
  { rank: 3, name: "Weyn D.", xp: 10320, level: 24, streak: 12, avatar: "W", wins: 38, isYou: true },
  { rank: 4, name: "Janelle F.", xp: 9800, level: 23, streak: 9, avatar: "J", wins: 31 },
  { rank: 5, name: "Miguel S.", xp: 9100, level: 22, streak: 7, avatar: "M", wins: 27 },
  { rank: 6, name: "Trisha G.", xp: 8750, level: 21, streak: 5, avatar: "T", wins: 22 },
  { rank: 7, name: "Ramon V.", xp: 8200, level: 20, streak: 3, avatar: "R", wins: 19 },
  { rank: 8, name: "Kaye A.", xp: 7900, level: 19, streak: 6, avatar: "K", wins: 15 },
];

const RECENT_BATTLES = [
  { id: 1, opponent: "Carlo M.", result: "loss", xpDelta: -20, challenge: "50 Push-ups", time: "2h ago" },
  { id: 2, opponent: "Janelle F.", result: "win", xpDelta: +120, challenge: "3-Min Plank", time: "Yesterday" },
  { id: 3, opponent: "Miguel S.", result: "win", xpDelta: +95, challenge: "100 Squats", time: "2 days ago" },
];

const MASTER_QUESTS = [
  { id: 0, label: "30 Push-ups", xp: 80, icon: "💪" },
  { id: 1, label: "40 Squats", xp: 90, icon: "🦵" },
  { id: 2, label: "60s Plank", xp: 100, icon: "⏱️" },
  { id: 3, label: "20 Lunges", xp: 80, icon: "🏃" },
];

const MASTERS_DATA: Master[] = [
  {
    id: 1, name: "Kai Reyes", avatar: "K", specialty: "Strength & Conditioning",
    category: "Strength", rating: 4.9, students: 328, price: 1000, experience: "7 years",
    gradient: "linear-gradient(135deg, #7C3AED, #6366F1)",
    bio: "Former national weightlifting athlete turned certified S&C coach. Specializes in building lean muscle and explosive power for athletes and beginners.",
    specialties: ["Olympic Lifting", "Powerlifting", "Calisthenics", "Nutrition Basics"],
    reviews: [
      { name: "Carlo M.", avatar: "C", rating: 5, text: "Master Kai helped me hit Level 28 in just 6 weeks. The quests are perfectly programmed.", improvement: "+4 levels in 6 weeks" },
      { name: "Bea R.", avatar: "B", rating: 5, text: "My bench press went up 20kg. Absolutely worth every peso.", improvement: "+20kg bench press" },
    ],
  },
  {
    id: 2, name: "Ana Santos", avatar: "A", specialty: "Weight Loss & Cardio",
    category: "Weight Loss", rating: 4.8, students: 241, price: 800, experience: "5 years",
    gradient: "linear-gradient(135deg, #EC4899, #F97316)",
    bio: "Certified personal trainer and nutritionist. Helped 200+ clients sustainably lose weight through fun, game-like programs built for busy students.",
    specialties: ["HIIT", "Fat Loss", "Nutrition Planning", "Running Programs"],
    reviews: [
      { name: "Janelle F.", avatar: "J", rating: 5, text: "Lost 8kg in 2 months without starving. The quests kept me consistent every day.", improvement: "-8kg in 2 months" },
      { name: "Trisha G.", avatar: "T", rating: 5, text: "My energy levels doubled. Ana's approach is sustainable and actually fun.", improvement: "Maintained -6kg for 3 months" },
    ],
  },
  {
    id: 3, name: "Renz dela Cruz", avatar: "R", specialty: "Sports Performance",
    category: "Sports", rating: 4.7, students: 189, price: 1200, experience: "9 years",
    gradient: "linear-gradient(135deg, #059669, #10B981)",
    bio: "Former pro basketball player and certified sports performance coach. Train like an athlete, compete like a champion. Specialized in college-level sports prep.",
    specialties: ["Agility Training", "Plyometrics", "Sport-Specific Drills", "Recovery"],
    reviews: [
      { name: "Miguel S.", avatar: "M", rating: 5, text: "My vertical jump improved by 8cm. The sport-specific quests made every session count.", improvement: "+8cm vertical jump" },
    ],
  },
  {
    id: 4, name: "Lhea Mendoza", avatar: "L", specialty: "Mobility & Yoga",
    category: "Mobility", rating: 4.9, students: 412, price: 600, experience: "6 years",
    gradient: "linear-gradient(135deg, #0EA5E9, #6366F1)",
    bio: "Certified yoga instructor and mobility specialist. Reduce injury risk, improve posture, and move better in everyday life and your sport of choice.",
    specialties: ["Yoga Flow", "Mobility Drills", "Injury Prevention", "Breathwork"],
    reviews: [
      { name: "Kaye A.", avatar: "K", rating: 5, text: "My posture improved drastically in 4 weeks. The daily mobility quests are addictive.", improvement: "Full splits in 8 weeks" },
      { name: "Trisha G.", avatar: "T", rating: 5, text: "No more back pain after two months. Lhea's feedback is always spot-on.", improvement: "Zero back pain in 6 weeks" },
    ],
  },
  {
    id: 5, name: "Gio Bautista", avatar: "G", specialty: "Beginner Strength",
    category: "Strength", rating: 4.6, students: 156, price: 900, experience: "4 years",
    gradient: "linear-gradient(135deg, #D97706, #F59E0B)",
    bio: "Gym enthusiast turned certified trainer. Makes lifting accessible and fun for complete beginners. Known for breaking down complex movements into simple quests.",
    specialties: ["Hypertrophy", "Beginner Programming", "Form Coaching", "Meal Prep"],
    reviews: [
      { name: "Ramon V.", avatar: "R", rating: 4, text: "Went from zero to benching my bodyweight. Gio's beginner-friendly approach is unmatched.", improvement: "Benched bodyweight in 3 months" },
    ],
  },
];

const COACHING_PLANS = [
  { name: "Consultation", price: 300, desc: "1-on-1 session, goal-setting, personalized advice", icon: "💬" },
  { name: "Custom Plan", price: 500, desc: "Personalized 4-week program + weekly check-in", icon: "📋" },
  { name: "Monthly Master", price: 1000, desc: "Full coaching: daily quests, XP tracking, 24/7 messaging", icon: "👑", featured: true },
];

// ─── Shared components ───────────────────────────────────────────────────────
function AvatarBubble({ letter, size = 40, gradient }: { letter: string; size?: number; gradient?: string }) {
  return (
    <div className="rounded-2xl flex items-center justify-center font-extrabold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4, background: gradient ?? "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff" }}>
      {letter}
    </div>
  );
}

function XPBar({ current, max, level }: { current: number; max: number; level: number }) {
  const safeMax = Math.max(max, current + 1);
  const pct = Math.min(Math.round((current / safeMax) * 100), 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: C.accentGlow, color: C.accent }}>LVL {level}</span>
          <span className="text-xs font-semibold" style={{ color: C.muted }}>Challenger</span>
        </div>
        <span className="text-xs font-semibold" style={{ color: C.muted }}>{current.toLocaleString()} / {safeMax.toLocaleString()} XP</span>
      </div>
      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: C.card2 }}>
        <div className="h-full rounded-full transition-all duration-700 relative overflow-hidden"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #6366F1 0%, #A78BFA 100%)" }}>
          <div className="absolute inset-0 opacity-40" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            backgroundSize: "200% 100%", animation: "shimmer 2s infinite",
          }} />
        </div>
      </div>
      <p className="text-xs" style={{ color: C.muted }}>{(safeMax - current).toLocaleString()} XP to Level {level + 1}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-extrabold leading-none" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>{children}</h2>;
}

function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl p-4 ${className}`} style={{ background: C.card, border: `1px solid ${C.border}`, ...style }}>
      {children}
    </div>
  );
}

function GradientButton({ onClick, children, className = "", disabled = false }: { onClick?: () => void; children: React.ReactNode; className?: string; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-150 active:scale-95 ${className}`}
      style={{ background: disabled ? "#3730A3" : "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff", opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
}

function VerifiedBadge() {
  return (
    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(129,140,248,0.15)", color: C.accent }}>✓ Verified</span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? C.gold : "rgba(255,255,255,0.15)", fontSize: 11 }}>★</span>
      ))}
    </span>
  );
}

// ─── Find / Your Master card (shared between Home & Profile) ─────────────────
function MasterTeaser({
  hiredMaster, masterQuestProgress, onNavigate,
}: {
  hiredMaster: Master | null;
  masterQuestProgress: boolean[];
  onNavigate: (r: Route) => void;
}) {
  if (hiredMaster) {
    const done = masterQuestProgress.filter(Boolean).length;
    const total = MASTER_QUESTS.length;
    const earnedXP = MASTER_QUESTS.filter((_, i) => masterQuestProgress[i]).reduce((s, q) => s + q.xp, 0);
    return (
      <div>
        <SectionTitle>Your Master Quest</SectionTitle>
        <button onClick={() => onNavigate({ type: "master-dashboard" })}
          className="w-full mt-3 rounded-2xl p-4 text-left relative overflow-hidden transition-all active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #1E1244, #16133A)", border: "1px solid rgba(129,140,248,0.25)" }}>
          <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)" }} />
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-extrabold"
                style={{ background: hiredMaster.gradient, color: "#fff" }}>
                {hiredMaster.avatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#6366F1", border: `2px solid ${C.bg}` }}>
                <span style={{ fontSize: 8, color: "#fff" }}>✓</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-extrabold" style={{ color: C.fg }}>Master {hiredMaster.name}</p>
                <VerifiedBadge />
              </div>
              <p className="text-xs" style={{ color: C.muted }}>Today's quest · {done}/{total} done</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: C.accentGlow, color: C.accent }}>
              +{earnedXP} XP
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(done / total) * 100}%`, background: "linear-gradient(90deg, #6366F1, #A78BFA)" }} />
          </div>
          <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: C.mutedLight }}>
            Tap to view full quest <ChevronRight size={11} />
          </p>
        </button>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>Unlock Your Potential</SectionTitle>
      <button onClick={() => onNavigate({ type: "masters" })}
        className="w-full mt-3 rounded-2xl p-4 flex items-center gap-4 text-left transition-all active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #1E1244, #16133A)", border: "1px solid rgba(129,140,248,0.2)" }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(167,139,250,0.25)" }}>
          👑
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold" style={{ color: C.fg }}>Find Your Master</p>
          <p className="text-xs mt-0.5" style={{ color: C.muted }}>Train smarter. Level up faster.</p>
        </div>
        <ChevronRight size={16} style={{ color: C.muted }} />
      </button>
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({
  challenges, onToggle, onNavigate, hiredMaster, masterQuestProgress, userXP,
}: {
  challenges: Challenge[]; onToggle: (id: number) => void;
  onNavigate: (r: Route) => void; hiredMaster: Master | null;
  masterQuestProgress: boolean[]; userXP: number;
}) {
  const daily = challenges.slice(0, 4);
  const completedCount = daily.filter((c) => c.done).length;
  const totalXP = challenges.filter((c) => c.done).reduce((s, c) => s + c.xp, 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <AvatarBubble letter="W" size={44} />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: C.bg, background: C.accent }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.bg }} />
            </div>
          </div>
          <div>
            <p className="text-xs" style={{ color: C.muted }}>Good morning,</p>
            <p className="text-base font-extrabold leading-none" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>Weyn! 👋</p>
          </div>
        </div>
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <Bell size={16} style={{ color: C.mutedLight }} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2" style={{ borderColor: C.bg, background: C.accentVi }} />
        </button>
      </div>

      {/* Level card */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-extrabold"
              style={{ background: C.gold2, color: C.gold, border: "1px solid rgba(250,204,21,0.2)" }}>#3</div>
            <div>
              <p className="text-sm font-bold leading-none" style={{ color: C.fg }}>Top 3 — Philippines</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Competitive Rank</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl" style={{ background: C.gold2 }}>
            <Star size={12} style={{ color: C.gold, fill: C.gold }} />
            <span className="text-xs font-bold" style={{ color: C.gold }}>Challenger</span>
          </div>
        </div>
        <XPBar current={userXP} max={12000} level={24} />
      </Card>

      {/* Stats row */}
      <div className="flex gap-2">
        {[
          { icon: <Flame size={16} />, label: "Day Streak", value: "12🔥", accent: true },
          { icon: <Zap size={16} />, label: "XP Today", value: `+${totalXP + 60}` },
          { icon: <Shield size={16} />, label: "Wins", value: "38" },
        ].map((s) => (
          <div key={s.label} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl"
            style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: s.accent ? C.accentGlow : "rgba(165,180,252,0.08)" }}>
              <span style={{ color: s.accent ? C.accent : C.mutedLight }}>{s.icon}</span>
            </div>
            <p className="text-base font-bold leading-none" style={{ color: C.fg }}>{s.value}</p>
            <p className="text-xs leading-none" style={{ color: C.muted }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Daily Challenges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <SectionTitle>Daily Challenges</SectionTitle>
            <p className="text-xs mt-0.5" style={{ color: C.muted }}>{completedCount} / {daily.length} completed</p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold"
            style={{ background: C.accentGlowSoft, color: C.accent }}>
            <BarChart3 size={11} />
            <span>{Math.round((completedCount / daily.length) * 100)}%</span>
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full mb-3 overflow-hidden" style={{ background: C.card2 }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / daily.length) * 100}%`, background: "linear-gradient(90deg, #6366F1, #A78BFA)" }} />
        </div>
        <div className="flex flex-col gap-2.5">
          {daily.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200"
              style={{ background: c.done ? "rgba(129,140,248,0.07)" : C.card, border: c.done ? "1px solid rgba(129,140,248,0.25)" : `1px solid ${C.border}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: c.done ? "rgba(129,140,248,0.14)" : C.card2 }}>{c.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-none truncate mb-0.5" style={{ color: C.fg }}>{c.detail}</p>
                <p className="text-xs leading-none" style={{ color: C.muted }}>{c.category} · {c.duration}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"
                  style={{ background: C.accentGlow, color: C.accent }}>
                  <Zap size={9} />{c.xp} XP
                </span>
                <button onClick={() => onToggle(c.id)}
                  className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-95"
                  style={c.done ? { background: "rgba(129,140,248,0.15)", color: C.accent } : { background: "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff" }}>
                  {c.done ? <><CheckCircle2 size={12} />Done</> : <><Play size={11} className="fill-current" />Start</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Find / Your Master teaser */}
      <MasterTeaser hiredMaster={hiredMaster} masterQuestProgress={masterQuestProgress} onNavigate={onNavigate} />

      {/* Multiplayer Battle teaser */}
      <div>
        <SectionTitle>Multiplayer Battle</SectionTitle>
        <div className="mt-3 rounded-2xl p-4 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1E1244 0%, #16133A 55%, #1A1040 100%)", border: "1px solid rgba(129,140,248,0.22)" }}>
          <div className="absolute top-0 right-0 w-36 h-36 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)" }} />
          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Swords size={15} style={{ color: C.accentVi }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accentVi }}>Multiplayer Battle</span>
              </div>
              <h3 className="text-lg font-extrabold leading-tight mb-1" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>Challenge a<br />Player Now</h3>
              <p className="text-xs" style={{ color: C.muted }}>Win battles to earn bonus XP &amp; climb the ranks.</p>
            </div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ml-3"
              style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(167,139,250,0.25)" }}>
              <span className="text-2xl">⚔️</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 relative z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
              style={{ background: "rgba(255,255,255,0.05)", color: C.muted }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.accent }} />
              <span className="font-semibold">284 online</span>
            </div>
            <GradientButton className="flex-1 py-2.5 text-sm"><Users size={14} />Find Opponent</GradientButton>
          </div>
        </div>
      </div>

      {/* Weekly activity */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>This Week</SectionTitle>
          <span className="text-xs font-semibold" style={{ color: C.accent }}>4 / 7 days</span>
        </div>
        <div className="flex items-end gap-1.5 h-12">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
            const act = [0.4, 0.85, 0.6, 1, 0.75, 0.3, 0][i];
            const isToday = i === 3;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: 36 }}>
                  <div className="w-full rounded-t-md rounded-b-sm transition-all duration-300" style={{
                    height: `${Math.max(act * 36, act > 0 ? 4 : 0)}px`,
                    background: isToday ? "linear-gradient(180deg, #A78BFA, #6366F1)" : act > 0 ? "rgba(129,140,248,0.28)" : "rgba(255,255,255,0.05)",
                    borderRadius: 4,
                  }} />
                </div>
                <span style={{ color: isToday ? C.accent : C.muted, fontSize: 10, fontWeight: 600 }}>{d}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Top Ranks preview */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Trophy size={14} style={{ color: C.gold }} />
            <SectionTitle>Top Ranks</SectionTitle>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-bold" style={{ color: C.accent }}>
            See all <ChevronRight size={12} />
          </button>
        </div>
        {LEADERBOARD_DATA.slice(0, 5).map((e) => (
          <div key={e.rank} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-sm w-5 text-center font-bold" style={{ color: e.rank <= 3 ? C.gold : C.muted }}>
              {e.rank <= 3 ? ["🥇", "🥈", "🥉"][e.rank - 1] : `#${e.rank}`}
            </span>
            <AvatarBubble letter={e.avatar} size={28} />
            <p className="flex-1 text-sm font-bold" style={{ color: (e as any).isYou ? C.accent : C.fg }}>
              {e.name}{(e as any).isYou && <span className="text-xs font-semibold"> (You)</span>}
            </p>
            <span className="text-xs font-bold" style={{ color: C.mutedLight }}>{e.xp.toLocaleString()}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── CHALLENGES PAGE ──────────────────────────────────────────────────────────
function ChallengesPage({ challenges, onToggle }: { challenges: Challenge[]; onToggle: (id: number) => void }) {
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [cat, setCat] = useState("All");
  const categories = ["All", "Strength", "Cardio", "Core", "Lower Body", "Flexibility"];

  const filtered = challenges.filter((c) => {
    const statusOk = filter === "all" || (filter === "done" ? c.done : !c.done);
    const catOk = cat === "All" || c.category === cat;
    return statusOk && catOk;
  });

  const totalXP = challenges.filter((c) => c.done).reduce((s, c) => s + c.xp, 0);
  const pct = Math.round((challenges.filter((c) => c.done).length / challenges.length) * 100);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionTitle>Daily Quests</SectionTitle>
        <p className="text-xs mt-0.5" style={{ color: C.muted }}>Monday, Aug 4 · Resets in 8h 22m</p>
      </div>
      <div className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E1244, #16133A)", border: `1px solid ${C.border}` }}>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)" }} />
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-extrabold" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>
              {challenges.filter((c) => c.done).length}<span className="text-base font-semibold" style={{ color: C.muted }}>/{challenges.length}</span>
            </p>
            <p className="text-xs" style={{ color: C.muted }}>Challenges done today</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xl font-extrabold" style={{ color: C.accent, fontFamily: "'Barlow', sans-serif" }}>+{totalXP} XP</span>
            <span className="text-xs" style={{ color: C.muted }}>earned today</span>
          </div>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #6366F1, #A78BFA)" }} />
        </div>
        <p className="text-xs mt-1.5" style={{ color: C.muted }}>{pct}% complete</p>
      </div>
      <div className="flex gap-2">
        {(["all", "active", "done"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="flex-1 py-1.5 rounded-xl text-xs font-bold capitalize transition-all"
            style={filter === f ? { background: "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff" } : { background: C.card, color: C.muted, border: `1px solid ${C.border}` }}>
            {f === "all" ? "All" : f === "done" ? "Completed" : "Active"}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all"
            style={cat === c ? { background: C.accentGlow, color: C.accent, border: "1px solid rgba(129,140,248,0.3)" } : { background: C.card, color: C.muted, border: `1px solid ${C.border}` }}>
            {c}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 && <p className="text-center py-8 text-sm" style={{ color: C.muted }}>No challenges match this filter.</p>}
        {filtered.map((c) => (
          <div key={c.id} className="flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200"
            style={{ background: c.done ? "rgba(129,140,248,0.07)" : C.card, border: c.done ? "1px solid rgba(129,140,248,0.25)" : `1px solid ${C.border}` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: c.done ? "rgba(129,140,248,0.14)" : C.card2 }}>{c.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-none mb-0.5" style={{ color: C.fg }}>{c.detail}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ background: C.card2, color: C.muted }}>{c.category}</span>
                <span className="flex items-center gap-0.5 text-xs" style={{ color: C.muted }}><Clock size={9} />{c.duration}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5" style={{ background: C.accentGlow, color: C.accent }}>
                <Zap size={9} />{c.xp} XP
              </span>
              <button onClick={() => onToggle(c.id)}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-95"
                style={c.done ? { background: "rgba(129,140,248,0.15)", color: C.accent } : { background: "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff" }}>
                {c.done ? <><CheckCircle2 size={12} />Done</> : <><Play size={11} className="fill-current" />Start</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BATTLE PAGE ──────────────────────────────────────────────────────────────
function BattlePage() {
  const [searching, setSearching] = useState(false);
  const [mode, setMode] = useState<"quick" | "ranked">("ranked");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <SectionTitle>Battle Arena</SectionTitle>
          <p className="text-xs mt-0.5" style={{ color: C.muted }}>Season 3 · Week 2</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
          <span className="font-semibold" style={{ color: C.fg }}>284 online</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[{ label: "Wins", value: "38", color: "#22C55E" }, { label: "Losses", value: "14", color: "#F87171" }, { label: "Win Rate", value: "73%", color: C.accent }].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 py-3 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <p className="text-xl font-extrabold" style={{ color: s.color, fontFamily: "'Barlow', sans-serif" }}>{s.value}</p>
            <p className="text-xs" style={{ color: C.muted }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-1 rounded-2xl" style={{ background: C.card2 }}>
        {(["quick", "ranked"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className="flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all"
            style={mode === m ? { background: "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff" } : { background: "transparent", color: C.muted }}>
            {m === "quick" ? "⚡ Quick" : "🏆 Ranked"}
          </button>
        ))}
      </div>
      <div className="rounded-2xl p-5 relative overflow-hidden text-center"
        style={{ background: "linear-gradient(135deg, #1E1244 0%, #16133A 55%, #1A1040 100%)", border: "1px solid rgba(129,140,248,0.22)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl"
            style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(167,139,250,0.25)" }}>⚔️</div>
          <h3 className="text-xl font-extrabold mb-1" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>
            {mode === "ranked" ? "Ranked Battle" : "Quick Match"}
          </h3>
          <p className="text-xs mb-4" style={{ color: C.muted }}>
            {mode === "ranked" ? "Win to earn rank points and bonus XP. Stakes are higher." : "Casual match for practice. No rank points at stake."}
          </p>
          <GradientButton onClick={() => setSearching((s) => !s)} className="w-full py-3 text-sm">
            {searching ? <><div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: "#fff", borderTopColor: "transparent" }} />Searching...</> : <><Users size={16} />Find Opponent</>}
          </GradientButton>
          {searching && <p className="text-xs mt-2" style={{ color: C.muted }}>Estimated wait: ~15s</p>}
        </div>
      </div>
      <div>
        <SectionTitle>Recent Battles</SectionTitle>
        <div className="flex flex-col gap-2.5 mt-3">
          {RECENT_BATTLES.map((b) => (
            <div key={b.id} className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: b.result === "win" ? "rgba(34,197,94,0.12)" : "rgba(248,113,113,0.12)" }}>
                {b.result === "win" ? "🏆" : "💀"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-none mb-0.5" style={{ color: C.fg }}>vs {b.opponent}</p>
                <p className="text-xs" style={{ color: C.muted }}>{b.challenge} · {b.time}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-extrabold" style={{ color: b.result === "win" ? "#22C55E" : "#F87171", fontFamily: "'Barlow', sans-serif" }}>
                  {b.xpDelta > 0 ? "+" : ""}{b.xpDelta} XP
                </span>
                <span className="text-xs font-bold uppercase" style={{ color: b.result === "win" ? "#22C55E" : "#F87171" }}>{b.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── LEADERBOARD PAGE ─────────────────────────────────────────────────────────
function LeaderboardPage() {
  const [scope, setScope] = useState<"global" | "friends" | "university">("global");
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionTitle>Leaderboard</SectionTitle>
        <p className="text-xs mt-0.5" style={{ color: C.muted }}>Season 3 · Resets in 5 days</p>
      </div>
      <div className="flex gap-2 p-1 rounded-2xl" style={{ background: C.card2 }}>
        {(["global", "university", "friends"] as const).map((s) => (
          <button key={s} onClick={() => setScope(s)}
            className="flex-1 py-1.5 rounded-xl text-xs font-bold capitalize transition-all"
            style={scope === s ? { background: "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff" } : { background: "transparent", color: C.muted }}>
            {s === "university" ? "🎓 Uni" : s === "friends" ? "👥 Friends" : "🌏 Global"}
          </button>
        ))}
      </div>
      <div className="flex items-end justify-center gap-3 pt-2 pb-1">
        <div className="flex flex-col items-center gap-2">
          <AvatarBubble letter={LEADERBOARD_DATA[1].avatar} size={52} gradient="linear-gradient(135deg, #94A3B8, #CBD5E1)" />
          <div className="text-center">
            <p className="text-xs font-bold" style={{ color: C.fg }}>{LEADERBOARD_DATA[1].name.split(" ")[0]}</p>
            <p className="text-xs" style={{ color: C.muted }}>{LEADERBOARD_DATA[1].xp.toLocaleString()}</p>
          </div>
          <div className="w-16 flex items-center justify-center rounded-t-xl py-2" style={{ background: "#3730A3", height: 56 }}>
            <span style={{ fontSize: 22 }}>🥈</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 -mb-1">
          <div className="text-lg">👑</div>
          <AvatarBubble letter={LEADERBOARD_DATA[0].avatar} size={60} gradient="linear-gradient(135deg, #F59E0B, #FACC15)" />
          <div className="text-center">
            <p className="text-xs font-bold" style={{ color: C.fg }}>{LEADERBOARD_DATA[0].name.split(" ")[0]}</p>
            <p className="text-xs" style={{ color: C.muted }}>{LEADERBOARD_DATA[0].xp.toLocaleString()}</p>
          </div>
          <div className="w-16 flex items-center justify-center rounded-t-xl py-2" style={{ background: "#4C1D95", height: 72 }}>
            <span style={{ fontSize: 22 }}>🥇</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AvatarBubble letter={LEADERBOARD_DATA[2].avatar} size={52} gradient="linear-gradient(135deg, #6366F1, #A78BFA)" />
          <div className="text-center">
            <p className="text-xs font-bold" style={{ color: C.accent }}>{LEADERBOARD_DATA[2].name.split(" ")[0]}</p>
            <p className="text-xs" style={{ color: C.muted }}>{LEADERBOARD_DATA[2].xp.toLocaleString()}</p>
          </div>
          <div className="w-16 flex items-center justify-center rounded-t-xl py-2" style={{ background: "#2D1B69", height: 44 }}>
            <span style={{ fontSize: 22 }}>🥉</span>
          </div>
        </div>
      </div>
      <Card className="!p-2">
        {LEADERBOARD_DATA.map((e) => (
          <div key={e.rank}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
            style={{ background: (e as any).isYou ? "rgba(129,140,248,0.08)" : "transparent", border: (e as any).isYou ? "1px solid rgba(129,140,248,0.2)" : "1px solid transparent", marginBottom: 2 }}>
            <span className="w-6 text-center text-sm font-bold flex-shrink-0" style={{ color: e.rank <= 3 ? C.gold : C.muted }}>
              {e.rank <= 3 ? ["🥇", "🥈", "🥉"][e.rank - 1] : `#${e.rank}`}
            </span>
            <AvatarBubble letter={e.avatar} size={36} gradient={(e as any).isYou ? "linear-gradient(135deg, #6366F1, #A78BFA)" : "linear-gradient(135deg, #3730A3, #4C1D95)"} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-none" style={{ color: (e as any).isYou ? C.accent : C.fg }}>
                {e.name}{(e as any).isYou && " (You)"}
              </p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Lv.{e.level} · {e.streak}🔥 streak</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-extrabold" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>{e.xp.toLocaleString()}</p>
              <p className="text-xs" style={{ color: C.muted }}>XP</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ onNavigate, hiredMaster, masterQuestProgress }: {
  onNavigate: (r: Route) => void; hiredMaster: Master | null; masterQuestProgress: boolean[];
}) {
  const badges = [
    { icon: "🔥", name: "On Fire", desc: "10-day streak" },
    { icon: "⚔️", name: "Warrior", desc: "30 battle wins" },
    { icon: "💪", name: "Iron Will", desc: "100 challenges" },
    { icon: "🏃", name: "Speedster", desc: "5 cardio quests" },
    { icon: "🧘", name: "Zen Master", desc: "Flexibility streak" },
    { icon: "👑", name: "Top 3", desc: "National rank" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <SectionTitle>Profile</SectionTitle>
        <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <Settings size={16} style={{ color: C.mutedLight }} />
        </button>
      </div>
      <div className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E1244, #16133A)", border: "1px solid rgba(129,140,248,0.2)" }}>
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)" }} />
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <AvatarBubble letter="W" size={64} />
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.accent }}>
              <Edit3 size={11} style={{ color: "#0C0A1E" }} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-extrabold" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>Weyn Domingo</h2>
            <p className="text-xs" style={{ color: C.muted }}>BS Computer Science · 2nd Year</p>
            <p className="text-xs mt-0.5" style={{ color: C.mutedLight }}>University of Santo Tomas</p>
          </div>
        </div>
        <XPBar current={10320} max={12000} level={24} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: <Trophy size={18} />, label: "National Rank", value: "#3", color: C.gold },
          { icon: <Flame size={18} />, label: "Day Streak", value: "12 days", color: "#F97316" },
          { icon: <Swords size={18} />, label: "Battle Wins", value: "38", color: C.accent },
          { icon: <Zap size={18} />, label: "Total XP", value: "10,320", color: C.accentVi },
          { icon: <Target size={18} />, label: "Challenges", value: "142 done", color: "#22C55E" },
          { icon: <TrendingUp size={18} />, label: "Best Streak", value: "21 days", color: "#EC4899" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold leading-none truncate" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Find / Your Master teaser */}
      <MasterTeaser hiredMaster={hiredMaster} masterQuestProgress={masterQuestProgress} onNavigate={onNavigate} />

      <div>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Badges</SectionTitle>
          <span className="text-xs font-semibold" style={{ color: C.muted }}>{badges.length} earned</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div key={b.name} className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <span className="text-2xl">{b.icon}</span>
              <p className="text-xs font-bold text-center leading-tight" style={{ color: C.fg }}>{b.name}</p>
              <p className="text-center leading-tight" style={{ color: C.muted, fontSize: 9 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Card>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Activity This Month</SectionTitle>
          <Calendar size={14} style={{ color: C.muted }} />
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {Array.from({ length: 31 }, (_, i) => {
            const intensity = [0, 1, 2, 3, 2, 1, 0, 2, 3, 2, 1, 2, 3, 1, 0, 1, 2, 3, 2, 1, 0, 0, 1, 2, 3, 2, 0, 1, 2, 1, 0][i] ?? 0;
            return (
              <div key={i} className="aspect-square rounded-sm" style={{
                background: intensity === 3 ? "rgba(129,140,248,0.7)" : intensity === 2 ? "rgba(129,140,248,0.35)" : intensity === 1 ? "rgba(129,140,248,0.15)" : "rgba(255,255,255,0.04)",
                borderRadius: 3,
              }} />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <span className="text-xs" style={{ color: C.muted }}>Less</span>
          {[0.04, 0.15, 0.35, 0.7, 1].map((o) => (
            <div key={o} className="w-3 h-3 rounded-sm" style={{ background: `rgba(129,140,248,${o})`, borderRadius: 2 }} />
          ))}
          <span className="text-xs" style={{ color: C.muted }}>More</span>
        </div>
      </Card>
    </div>
  );
}

// ─── MASTERS PAGE ─────────────────────────────────────────────────────────────
function MastersPage({ onNavigate }: { onNavigate: (r: Route) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Strength", "Cardio", "Mobility", "Weight Loss", "Sports"];
  const filtered = filter === "All" ? MASTERS_DATA : MASTERS_DATA.filter((m) => m.category === filter);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionTitle>Find Your Master</SectionTitle>
        <p className="text-xs mt-1 leading-relaxed" style={{ color: C.muted }}>
          Hire a verified professional trainer for personalized quests and faster leveling.
        </p>
      </div>

      {/* Hero stat strip */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: "5", label: "Masters", icon: "👑" },
          { value: "1,326", label: "Students", icon: "🎓" },
          { value: "4.8★", label: "Avg Rating", icon: "⭐" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 py-2.5 rounded-2xl"
            style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 16 }}>{s.icon}</span>
            <p className="text-sm font-extrabold leading-none" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>{s.value}</p>
            <p style={{ color: C.muted, fontSize: 10 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all"
            style={filter === f ? { background: "linear-gradient(135deg, #6366F1, #A78BFA)", color: "#fff" } : { background: C.card, color: C.muted, border: `1px solid ${C.border}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* Master cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((master) => (
          <div key={master.id} className="rounded-2xl p-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
                  style={{ background: master.gradient, color: "#fff" }}>
                  {master.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#6366F1", border: `2px solid ${C.card}` }}>
                  <span style={{ fontSize: 9, color: "#fff" }}>✓</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <p className="text-sm font-extrabold" style={{ color: C.fg }}>Master {master.name}</p>
                  <VerifiedBadge />
                </div>
                <p className="text-xs mb-1.5" style={{ color: C.muted }}>{master.specialty}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={master.rating} />
                  <span className="text-xs font-bold" style={{ color: C.gold }}>{master.rating}</span>
                  <span className="text-xs" style={{ color: C.muted }}>· {master.students} students</span>
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <p className="text-sm font-extrabold" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>₱{master.price.toLocaleString()}</p>
                <p className="text-xs" style={{ color: C.muted }}>/month</p>
              </div>
            </div>
            <button onClick={() => onNavigate({ type: "master-profile", masterId: master.id })}
              className="w-full py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
              style={{ background: C.accentGlowSoft, color: C.accent, border: "1px solid rgba(129,140,248,0.2)" }}>
              View Profile →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MASTER PROFILE PAGE ──────────────────────────────────────────────────────
function MasterProfilePage({ masterId, onHire }: { masterId: number; onHire: (m: Master) => void }) {
  const master = MASTERS_DATA.find((m) => m.id === masterId)!;
  const [selectedPlan, setSelectedPlan] = useState(2);

  return (
    <div className="flex flex-col gap-5">
      {/* Profile hero */}
      <div className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E1244, #16133A)", border: "1px solid rgba(129,140,248,0.22)" }}>
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)" }} />
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-extrabold"
              style={{ background: master.gradient, color: "#fff" }}>
              {master.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#6366F1", border: `2px solid #0C0A1E` }}>
              <span style={{ fontSize: 12, color: "#fff" }}>✓</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-extrabold mb-1" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>Master {master.name}</h2>
            <VerifiedBadge />
            <p className="text-xs mt-1.5 mb-1" style={{ color: C.muted }}>{master.specialty}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <StarRating rating={master.rating} />
                <span className="text-xs font-bold ml-0.5" style={{ color: C.gold }}>{master.rating}</span>
              </div>
              <span className="text-xs" style={{ color: C.muted }}>{master.students} students</span>
              <span className="text-xs" style={{ color: C.muted }}>{master.experience}</span>
            </div>
          </div>
        </div>
        <p className="text-xs leading-relaxed relative z-10" style={{ color: C.mutedLight }}>{master.bio}</p>
      </div>

      {/* Specialties */}
      <div>
        <SectionTitle>Specialties</SectionTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {master.specialties.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: C.accentGlow, color: C.accent, border: "1px solid rgba(129,140,248,0.2)" }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Student Results */}
      <div>
        <SectionTitle>Student Results</SectionTitle>
        <div className="flex flex-col gap-2 mt-2">
          {master.reviews.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <AvatarBubble letter={r.avatar} size={36} gradient="linear-gradient(135deg, #3730A3, #4C1D95)" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold" style={{ color: C.fg }}>{r.name}</p>
                <p className="text-xs mt-0.5 font-bold" style={{ color: "#22C55E" }}>📈 {r.improvement}</p>
              </div>
              <StarRating rating={r.rating} />
            </div>
          ))}
        </div>
      </div>

      {/* Coaching Plans */}
      <div>
        <SectionTitle>Coaching Plans</SectionTitle>
        <div className="flex flex-col gap-2 mt-2">
          {COACHING_PLANS.map((plan, i) => (
            <button key={i} onClick={() => setSelectedPlan(i)}
              className="flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all"
              style={{
                background: selectedPlan === i ? "rgba(129,140,248,0.1)" : C.card,
                border: selectedPlan === i ? "1px solid rgba(129,140,248,0.35)" : `1px solid ${C.border}`,
              }}>
              <span className="text-2xl flex-shrink-0">{plan.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="text-sm font-bold" style={{ color: C.fg }}>{plan.name}</p>
                  {plan.featured && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: C.accentGlow, color: C.accent }}>Best Value</span>
                  )}
                </div>
                <p className="text-xs" style={{ color: C.muted }}>{plan.desc}</p>
              </div>
              <div className="flex-shrink-0 text-right ml-2">
                <p className="text-sm font-extrabold" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>₱{plan.price.toLocaleString()}</p>
                {i === 2 && <p className="text-xs" style={{ color: C.muted }}>/month</p>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <SectionTitle>Reviews</SectionTitle>
        <div className="flex flex-col gap-2 mt-2">
          {master.reviews.map((r, i) => (
            <div key={i} className="p-3.5 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2 mb-2">
                <AvatarBubble letter={r.avatar} size={28} />
                <p className="text-xs font-bold flex-1" style={{ color: C.fg }}>{r.name}</p>
                <StarRating rating={r.rating} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.muted }}>"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hire button */}
      <GradientButton onClick={() => onHire(master)} className="w-full py-4 text-sm">
        👑 Hire Master {master.name} — ₱{COACHING_PLANS[selectedPlan].price.toLocaleString()}{selectedPlan === 2 ? "/mo" : ""}
      </GradientButton>

      <div style={{ height: 4 }} />
    </div>
  );
}

// ─── MASTER DASHBOARD PAGE ────────────────────────────────────────────────────
function MasterDashboardPage({ master, masterQuestProgress, onToggleQuest }: {
  master: Master; masterQuestProgress: boolean[]; onToggleQuest: (i: number) => void;
}) {
  const completedXP = MASTER_QUESTS.filter((_, i) => masterQuestProgress[i]).reduce((s, q) => s + q.xp, 0);
  const totalQuestXP = MASTER_QUESTS.reduce((s, q) => s + q.xp, 0);
  const completedCount = masterQuestProgress.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Master info card */}
      <div className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E1244, #16133A)", border: "1px solid rgba(129,140,248,0.25)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)" }} />
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
              style={{ background: master.gradient, color: "#fff" }}>
              {master.avatar}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#6366F1", border: `2px solid #0C0A1E` }}>
              <span style={{ fontSize: 9, color: "#fff" }}>✓</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <p className="text-base font-extrabold" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>Master {master.name}</p>
              <VerifiedBadge />
            </div>
            <p className="text-xs" style={{ color: C.muted }}>{master.specialty}</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 flex-shrink-0"
            style={{ background: C.accentGlowSoft, color: C.accent, border: "1px solid rgba(129,140,248,0.2)" }}>
            <MessageSquare size={11} />Message
          </button>
        </div>

        {/* Goal progress */}
        <div className="relative z-10 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold" style={{ color: C.muted }}>Your Goal</p>
            <p className="text-xs font-extrabold" style={{ color: C.accent }}>Level 24 → Level 30</p>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full" style={{ width: "30%", background: "linear-gradient(90deg, #6366F1, #A78BFA)" }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: C.muted }}>2 of 6 levels completed with this Master</p>
        </div>
      </div>

      {/* Today's Master Quest */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Today's Master Quest</SectionTitle>
          <span className="text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
            style={{ background: C.accentGlow, color: C.accent }}>
            <Zap size={10} />+{totalQuestXP} XP
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
          {MASTER_QUESTS.map((q, i) => (
            <button key={i} onClick={() => onToggleQuest(i)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all active:scale-[0.99]"
              style={{
                background: masterQuestProgress[i] ? "rgba(129,140,248,0.07)" : C.card,
                borderBottom: i < MASTER_QUESTS.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={{ borderColor: masterQuestProgress[i] ? C.accent : "rgba(255,255,255,0.2)", background: masterQuestProgress[i] ? C.accentGlow : "transparent" }}>
                {masterQuestProgress[i] && <span style={{ color: C.accent, fontSize: 12, lineHeight: 1 }}>✓</span>}
              </div>
              <span className="text-lg flex-shrink-0">{q.icon}</span>
              <p className="flex-1 text-sm font-bold transition-all"
                style={{ color: masterQuestProgress[i] ? C.muted : C.fg, textDecoration: masterQuestProgress[i] ? "line-through" : "none" }}>
                {q.label}
              </p>
              <span className="text-xs font-bold flex-shrink-0" style={{ color: masterQuestProgress[i] ? C.muted : C.accent }}>
                +{q.xp} XP
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-xs" style={{ color: C.muted }}>{completedCount}/{MASTER_QUESTS.length} completed</p>
          <p className="text-xs font-bold" style={{ color: C.accent }}>Earned today: +{completedXP} XP</p>
        </div>
      </div>

      {/* Master Feedback */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0"
            style={{ background: master.gradient, color: "#fff" }}>
            {master.avatar}
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: C.fg }}>Master {master.name}</p>
            <p className="text-xs" style={{ color: C.muted }}>Feedback · Today 9:00 AM</p>
          </div>
        </div>
        <div className="p-3 rounded-xl" style={{ background: C.card2 }}>
          <p className="text-xs leading-relaxed" style={{ color: C.mutedLight }}>
            "Great consistency this week, Weyn! Your plank form has improved a lot. Push through today's session — you're only 2 levels away from your next milestone. 💪"
          </p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Sessions", value: "14", icon: "🏋️" },
          { label: "Master XP", value: `+${completedXP + 1960}`, icon: "⚡" },
          { label: "Days Active", value: "12", icon: "🔥" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 py-3 rounded-2xl"
            style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <span className="text-xl">{s.icon}</span>
            <p className="text-sm font-extrabold leading-none" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>{s.value}</p>
            <p className="text-center leading-tight" style={{ color: C.muted, fontSize: 9 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly Progress */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Weekly Progress</SectionTitle>
          <span className="text-xs font-semibold" style={{ color: C.accent }}>5 / 7 days</span>
        </div>
        <div className="flex items-end gap-1.5 h-12">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
            const act = [1, 0.7, 0.9, 1, 0.8, 0.5, 0][i];
            const isToday = i === 3;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: 36 }}>
                  <div className="w-full rounded-t-md rounded-b-sm transition-all duration-300" style={{
                    height: `${Math.max(act * 36, act > 0 ? 4 : 0)}px`,
                    background: isToday ? "linear-gradient(180deg, #A78BFA, #6366F1)" : act > 0 ? "rgba(129,140,248,0.28)" : "rgba(255,255,255,0.05)",
                    borderRadius: 4,
                  }} />
                </div>
                <span style={{ color: isToday ? C.accent : C.muted, fontSize: 10, fontWeight: 600 }}>{d}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ height: 4 }} />
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [challenges, setChallenges] = useState<Challenge[]>(ALL_CHALLENGES);
  const [routeStack, setRouteStack] = useState<Route[]>([]);
  const [hiredMaster, setHiredMaster] = useState<Master | null>(null);
  const [masterQuestProgress, setMasterQuestProgress] = useState([true, true, false, false]);
  const [userXP, setUserXP] = useState(10320 + MASTER_QUESTS.filter((_, i) => [true, true, false, false][i]).reduce((s, q) => s + q.xp, 0));

  const currentRoute = routeStack[routeStack.length - 1] ?? null;

  const pushRoute = (r: Route) => setRouteStack((s) => [...s, r]);
  const popRoute = () => setRouteStack((s) => s.slice(0, -1));

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    setRouteStack([]);
  };

  const toggleChallenge = (id: number) =>
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));

  const toggleMasterQuest = (i: number) => {
    const wasCompleted = masterQuestProgress[i];
    const xp = MASTER_QUESTS[i].xp;
    setMasterQuestProgress((prev) => { const n = [...prev]; n[i] = !n[i]; return n; });
    setUserXP((prev) => prev + (wasCompleted ? -xp : xp));
  };

  const handleHire = (master: Master) => {
    setHiredMaster(master);
    setRouteStack([{ type: "master-dashboard" }]);
  };

  const routePageTitle: Record<string, string> = {
    masters: "Find Your Master",
    "master-profile": currentRoute?.type === "master-profile"
      ? `Master ${MASTERS_DATA.find((m) => m.id === (currentRoute as any).masterId)?.name ?? ""}`
      : "",
    "master-dashboard": "My Master",
  };

  const navItems: { id: NavTab; icon: React.ReactNode; label: string }[] = [
    { id: "home", icon: <Home size={20} />, label: "Home" },
    { id: "challenges", icon: <Target size={20} />, label: "Quests" },
    { id: "battle", icon: <Swords size={20} />, label: "Battle" },
    { id: "leaderboard", icon: <Trophy size={20} />, label: "Ranks" },
    { id: "profile", icon: <User size={20} />, label: "Profile" },
  ];

  const mainPageMap: Record<NavTab, React.ReactNode> = {
    home: <HomePage challenges={challenges} onToggle={toggleChallenge} onNavigate={pushRoute} hiredMaster={hiredMaster} masterQuestProgress={masterQuestProgress} userXP={userXP} />,
    challenges: <ChallengesPage challenges={challenges} onToggle={toggleChallenge} />,
    battle: <BattlePage />,
    leaderboard: <LeaderboardPage />,
    profile: <ProfilePage onNavigate={pushRoute} hiredMaster={hiredMaster} masterQuestProgress={masterQuestProgress} />,
  };

  const routePageMap: Partial<Record<Route["type"], React.ReactNode>> = {
    masters: <MastersPage onNavigate={pushRoute} />,
    "master-profile": currentRoute?.type === "master-profile"
      ? <MasterProfilePage masterId={(currentRoute as any).masterId} onHire={handleHire} />
      : null,
    "master-dashboard": hiredMaster
      ? <MasterDashboardPage master={hiredMaster} masterQuestProgress={masterQuestProgress} onToggleQuest={toggleMasterQuest} />
      : null,
  };

  const pageContent = currentRoute ? routePageMap[currentRoute.type] : mainPageMap[activeTab];
  const showBackButton = routeStack.length > 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #07061A 0%, #0E0B2E 50%, #07061A 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      {/* ── Phone shell ── */}
      <div style={{ width: 390, height: 844, position: "relative", flexShrink: 0 }}>
        {/* Outer phone body */}
        <div style={{
          position: "absolute", inset: -12, borderRadius: 56,
          background: "linear-gradient(160deg, #2A2A3A 0%, #1A1A28 40%, #111120 100%)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 120px rgba(99,102,241,0.08)",
        }} />

        {/* Side buttons */}
        <div style={{ position: "absolute", left: -16, top: 120, width: 4, height: 36, background: "#1A1A28", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -16, top: 168, width: 4, height: 56, background: "#1A1A28", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -16, top: 232, width: 4, height: 56, background: "#1A1A28", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -16, top: 160, width: 4, height: 72, background: "#1A1A28", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 44, overflow: "hidden", background: C.bg, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}>
          {/* Dynamic island */}
          <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, borderRadius: 20, background: "#000", zIndex: 50, boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }} />

          {/* Status bar */}
          <div className="flex items-center justify-between px-7" style={{ paddingTop: 16 }}>
            <span className="text-xs font-bold" style={{ color: C.fg, letterSpacing: 0.3, paddingTop: 2 }}>9:41</span>
            <div style={{ width: 120 }} />
            <div className="flex items-center gap-1.5" style={{ paddingTop: 2 }}>
              <div className="flex gap-0.5 items-end">
                {[3, 5, 7, 9].map((h, i) => (
                  <div key={i} className="w-1 rounded-sm" style={{ height: h, background: i < 3 ? C.fg : "rgba(255,255,255,0.3)" }} />
                ))}
              </div>
              <div className="w-4 h-2.5 rounded-sm border flex items-center pl-0.5" style={{ borderColor: "rgba(255,255,255,0.4)" }}>
                <div className="h-1.5 rounded-sm" style={{ width: 10, background: C.accent }} />
              </div>
            </div>
          </div>

          {/* Back button bar (shown when a sub-route is active) */}
          {showBackButton && (
            <div className="flex items-center gap-3 px-5 py-2" style={{ borderBottom: `1px solid ${C.border}`, marginTop: 2 }}>
              <button onClick={popRoute} className="flex items-center gap-1.5 text-sm font-bold transition-all active:opacity-70"
                style={{ color: C.accent }}>
                <ArrowLeft size={16} />
                Back
              </button>
              <span className="text-sm font-extrabold truncate" style={{ color: C.fg, fontFamily: "'Barlow', sans-serif" }}>
                {currentRoute ? routePageTitle[currentRoute.type] : ""}
              </span>
            </div>
          )}

          {/* Scrollable content */}
          <div
            className="absolute overflow-y-auto px-5"
            style={{
              top: showBackButton ? 106 : 58,
              bottom: 90,
              left: 0,
              right: 0,
              paddingBottom: 16,
            }}
          >
            {pageContent}
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 px-4"
            style={{ paddingBottom: 28, paddingTop: 12, background: `linear-gradient(to top, ${C.bg} 75%, transparent)` }}>
            <div className="flex items-center justify-between px-2 py-2 rounded-2xl"
              style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 -4px 24px rgba(0,0,0,0.5)" }}>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => handleTabChange(item.id)}
                  className="flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all duration-200 relative"
                  style={{ color: activeTab === item.id && !showBackButton ? C.accent : C.muted }}>
                  {activeTab === item.id && !showBackButton && item.id !== "battle" && (
                    <div className="absolute inset-0 rounded-xl" style={{ background: C.accentGlowSoft }} />
                  )}
                  {item.id === "battle" ? (
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center -mt-6 mb-0.5"
                      style={{ background: "linear-gradient(135deg, #6366F1, #A78BFA)", boxShadow: "0 4px 20px rgba(99,102,241,0.5), 0 0 0 3px rgba(99,102,241,0.2)" }}>
                      <span style={{ color: "#fff" }}>{item.icon}</span>
                    </div>
                  ) : (
                    <span className="relative z-10">{item.icon}</span>
                  )}
                  <span className="relative z-10 font-semibold"
                    style={{ fontSize: 10, color: activeTab === item.id && !showBackButton ? C.accent : C.muted }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

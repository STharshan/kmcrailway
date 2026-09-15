import React, { useEffect, useState } from "react";

const STAFF_MEMBERS = [
  { id: 1, name: "V.S.Polwattage", role: "Operation Manager", image: "/pol.png" },
  { id: 2, name: "B.A.S.G.D.Balasooriya", role: "Administrator", image: "/kan.png" },
  { id: 3, name: "W.I.A.S.FERNANDO", role: "HR officer", image: "/sac.png" },
  { id: 4, name: "V.Dilani", role: "Development Officer", image: "/dil.png" },
  { id: 5, name: "W.R.D.S.Wijesundara", role: "Transport Officer", image: "/thi.png" },
  { id: 6, name: "S.Thashan", role: "IT Officer", image: "/tha.png" },
  { id: 7, name: "H.P.T. Hettiarachchi", role: "System Operator", image: "/ima.png" },
  { id: 8, name: "D.S.R.Jayasinghe", role: "Maintenance Supervisor", image: "/raj.png" },
  { id: 9, name: "D.M.A.Ahamad", role: "Information Officer", image: "/aha.png" },
  { id: 10, name: "H.N. Pathirana", role: "Security Manager", image: "/path.png" },
  { id: 11, name: "H.N. Pathirana", role: "Security Manager", image: "/piu.png" },
  { id: 12, name: "H.N. Pathirana", role: "Security Manager", image: "/din.png" },
];

// Three role tiers, each carrying one accent — keeps the board legible
// from across a platform instead of turning into a dozen clashing colors.
const ROLE_TIER = {
  "Operation Manager": "lead",
  Administrator: "lead",
  "HR officer": "ops",
  "Development Officer": "ops",
  "IT Officer": "ops",
  "System Operator": "ops",
  "Maintenance Supervisor": "ops",
  "Information Officer": "ops",
  "Transport Officer": "safety",
  "Security Manager": "safety",
};

const TIER_STYLE = {
  lead: {
    badge: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30",
    dot: "bg-amber-400",
  },
  ops: {
    badge: "bg-teal-400/15 text-teal-300 ring-1 ring-teal-400/30",
    dot: "bg-teal-400",
  },
  safety: {
    badge: "bg-sky-400/15 text-sky-300 ring-1 ring-sky-400/30",
    dot: "bg-sky-400",
  },
};

function initials(name) {
  const clean = name.replace(/[.]/g, " ").trim().split(/\s+/);
  const first = clean[0]?.[0] || "";
  const last = clean[clean.length - 1]?.[0] || "";
  return (first + last).toUpperCase();
}

function StaffPhoto({ src, name }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-700 text-2xl font-medium tracking-wide text-slate-200">
        {initials(name)}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function StaffCard({ member }) {
  const tier = ROLE_TIER[member.role] || "ops";
  const style = TIER_STYLE[tier];
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-800/60 ring-1 ring-white/5">
      <div className={`absolute left-0 top-0 h-full w-[3px] ${style.dot}`} />
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-700">
        <StaffPhoto src={member.image} name={member.name} />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
        <p className="text-[17px] font-semibold leading-tight text-slate-50">
          {member.name}
        </p>
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${style.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {member.role}
        </span>
      </div>
    </div>
  );
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return (
    <div className="text-right">
      <p className="font-mono text-3xl font-semibold tabular-nums text-slate-50">{time}</p>
      <p className="text-sm text-slate-400">{date}</p>
    </div>
  );
}

export default function StaffDirectoryBoard() {
  return (
    <div className="min-h-screen w-full bg-slate-900 p-8 text-slate-50">
      <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-8">
        {/* Header band */}
        <header className="flex items-center justify-between rounded-2xl bg-slate-800/60 px-8 py-6 ring-1 ring-white/5">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-sky-500">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-slate-900" fill="none">
                <path
                  d="M4 17V8.5a2 2 0 0 1 1.2-1.83l6-2.57a2 2 0 0 1 1.6 0l6 2.57A2 2 0 0 1 20 8.5V17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 17h16M8 17v-4h8v4M12 3v3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                  Kadawatha Multimodal Centre
                </h1>
                <span className="rounded-md bg-slate-700/70 px-2 py-0.5 text-sm font-medium text-slate-300">
                  KMC-K
                </span>
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-teal-400">
                Staff directory
                <span className="text-slate-600">•</span>
                <span className="normal-case tracking-normal text-slate-400">
                  Safe · Convenient · Connected
                </span>
              </p>
            </div>
          </div>
          <LiveClock />
        </header>

        {/* Staff grid */}
        <div className="grid flex-1 grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {STAFF_MEMBERS.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Activity, Bell, Bot, BrainCircuit, Building2, ChevronRight, CircleGauge, CloudSun, Droplets,
  Gauge, History, Layers3, Leaf, Map, MapPin, Menu, Minus, Navigation, Plus, Radio, Route as RouteIcon,
  Satellite, Send, ShieldCheck, Sparkles, Sprout, Sun, ThermometerSun, TrafficCone, TreePine,
  TrendingDown, TrendingUp, Users, Waves, Wind, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { factors, forecast, historicalTrend, interventions, priorities, sensors } from "@/data/thermal-pune";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ThermalPune AI | Urban Heat Intelligence" },
    { name: "description", content: "AI-powered urban heat intelligence and green planning prototype for Pune city planners." },
    { property: "og:title", content: "ThermalPune AI | Urban Heat Intelligence" },
    { property: "og:description", content: "Measure, predict and cool Pune with heat-risk mapping and simulated interventions." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Dashboard,
});

const nav = [
  [CircleGauge, "Overview", "overview"], [Map, "Heat Map", "heat-map"], [Activity, "Predictions", "predictions"],
  [BrainCircuit, "AI Recommendations", "recommendations"], [Sparkles, "Intervention Simulator", "simulator"],
  [History, "Historical Analysis", "predictions"], [Users, "Citizen Reports", "reports"],
] as const;

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const [scenario, setScenario] = useState(interventions.map((item) => item.active));
  const [ran, setRan] = useState(false);
  const selectedCount = scenario.filter(Boolean).length;
  const outcome = useMemo(() => ({
    risk: 86 - selectedCount * 4 - (ran ? 2 : 0),
    green: 9 + selectedCount * 2,
    temp: (41.3 - selectedCount * 0.5 - (ran ? 0.4 : 0)).toFixed(1),
  }), [selectedCount, ran]);

  const jump = (id: string) => {
    setActiveNav(id); setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar active={activeNav} open={menuOpen} onClose={() => setMenuOpen(false)} onJump={jump} />
      <main className="min-w-0 lg:pl-64">
        <Header onMenu={() => setMenuOpen(true)} />
        <div className="mx-auto max-w-[1680px] px-4 pb-12 pt-5 sm:px-6 lg:px-8">
          <section id="overview" className="scroll-mt-24">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><Eyebrow>City pulse · 24 June 2026</Eyebrow><h2 className="section-title">Heat intelligence overview</h2></div>
              <p className="hidden max-w-md text-right text-xs leading-5 text-muted-foreground md:block">Simulated citywide signals from weather stations, land-cover indices and mobility patterns.</p>
            </div>
            <KpiGrid />
          </section>

          <section id="heat-map" className="mt-8 scroll-mt-24">
            <SectionHeader eyebrow="Geospatial intelligence" title="Urban Heat Risk Map" subtitle="AI-generated risk assessment across monitored zones" action={<span className="status-chip"><span className="live-dot" /> 47 active hotspots</span>} />
            <HeatMap onAnalyze={() => jump("analysis")} />
          </section>

          <section id="analysis" className="mt-8 grid scroll-mt-24 gap-5 xl:grid-cols-[1.06fr_.94fr]">
            <AnalysisCard />
            <InsightCard onGenerate={() => jump("recommendations")} />
          </section>

          <section id="recommendations" className="mt-8 scroll-mt-24">
            <Recommendation />
          </section>

          <section className="mt-8">
            <SectionHeader eyebrow="Ground truth" title="Live Sensor Network" subtitle="Simulated hyperlocal readings across Pune" action={<span className="status-chip"><Radio className="size-3.5" /> 6 / 6 online</span>} />
            <SensorGrid />
          </section>

          <section id="predictions" className="mt-8 scroll-mt-24">
            <SectionHeader eyebrow="Climate trajectory" title="Heat Trend & Prediction" subtitle="Historical signals with a seven-day risk outlook" />
            <Charts />
          </section>

          <section id="simulator" className="mt-8 scroll-mt-24">
            <Simulator scenario={scenario} setScenario={setScenario} ran={ran} setRan={setRan} outcome={outcome} />
          </section>

          <section className="mt-8">
            <SectionHeader eyebrow="Action queue" title="Where Should Pune Act First?" subtitle="Ranked by composite heat vulnerability and intervention readiness" />
            <PriorityTable />
          </section>

          <section id="reports" className="mt-8 scroll-mt-24">
            <SectionHeader eyebrow="Community signals" title="Citizen Heat Reports" subtitle="Recent observations from public spaces" />
            <CitizenReports />
          </section>

          <ImpactStrip />
        </div>
      </main>
    </div>
  );
}

function Sidebar({ active, open, onClose, onJump }: { active: string; open: boolean; onClose: () => void; onJump: (id: string) => void }) {
  return <>
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-overlay lg:hidden" onClick={onClose} />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-2">
        <button onClick={() => onJump("overview")} className="flex items-center gap-3 text-left" aria-label="ThermalPune AI overview">
          <span className="logo-mark"><Sun className="size-5" /></span>
          <span><strong className="block font-display text-[15px] leading-none">ThermalPune <em className="not-italic text-heat">AI</em></strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[.2em] text-sidebar-muted">Measure · Predict · Cool</small></span>
        </button>
        <Button size="icon" variant="ghost" className="lg:hidden" onClick={onClose} aria-label="Close navigation"><X className="size-4" /></Button>
      </div>
      <div className="my-6 h-px bg-sidebar-border" />
      <p className="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-sidebar-muted">City intelligence</p>
      <nav className="mt-3 space-y-1">
        {nav.map(([Icon, label, id]) => <button key={label} onClick={() => onJump(id)} className={`nav-item ${active === id ? "nav-item-active" : ""}`}><Icon className="size-[17px]" /><span>{label}</span>{active === id && <span className="ml-auto size-1.5 rounded-full bg-heat" />}</button>)}
      </nav>
      <div className="mt-auto rounded-lg border border-sidebar-border bg-sidebar-panel p-3.5">
        <div className="flex items-center gap-2 text-xs font-semibold"><span className="live-dot" /> Prototype Mode</div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-sidebar-muted"><MapPin className="size-3.5" /> Pune, Maharashtra</div>
        <p className="mt-2 text-[9px] leading-4 text-sidebar-muted">Illustrative data · Not for operational use</p>
      </div>
    </aside>
  </>;
}

function Header({ onMenu }: { onMenu: () => void }) {
  return <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <Button size="icon" variant="outline" className="lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu className="size-4" /></Button>
        <div className="min-w-0"><h1 className="truncate font-display text-xl font-bold text-primary sm:text-[26px]">Pune Urban Heat Intelligence</h1><p className="hidden text-xs text-muted-foreground sm:block">Real-time monitoring, predictive risk analysis & AI-assisted cooling strategies</p></div>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden text-right xl:block"><p className="text-xs font-semibold">Pune, Maharashtra</p><p className="text-[10px] text-muted-foreground">Last updated: 10:42 PM</p></div>
        <span className="live-pill"><span className="live-dot" /> LIVE</span>
        <Button size="icon" variant="outline" aria-label="Notifications" className="relative"><Bell className="size-4" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-heat" /></Button>
        <div className="avatar" aria-label="City planner profile">PP</div>
      </div>
    </div>
  </header>;
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-heat">{children}</p>; }
function SectionHeader({ eyebrow, title, subtitle, action }: { eyebrow: string; title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><Eyebrow>{eyebrow}</Eyebrow><h2 className="section-title">{title}</h2><p className="mt-1 text-xs text-muted-foreground sm:text-sm">{subtitle}</p></div>{action}</div>;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => { let frame = 0; const timer = window.setInterval(() => { frame += 1; setShown(Math.round((value * frame) / 24 * 10) / 10); if (frame >= 24) window.clearInterval(timer); }, 24); return () => window.clearInterval(timer); }, [value]);
  return <>{Number.isInteger(value) ? Math.round(shown) : shown.toFixed(1)}{suffix}</>;
}

function KpiGrid() {
  const cards: { label: string; value: number; suffix?: string; note: string; meta: string; icon: ComponentType<{ className?: string }>; tone: string; progress: number }[] = [
    { label: "City Heat Risk", value: 72, suffix: " / 100", note: "High", meta: "↑ 8.4% vs last week", icon: Gauge, tone: "heat", progress: 72 },
    { label: "Hotspots Detected", value: 47, note: "12 critical zones", meta: "5 newly detected", icon: MapPin, tone: "red", progress: 64 },
    { label: "Avg City Temperature", value: 34.8, suffix: "°C", note: "Above baseline", meta: "+2.3°C vs baseline", icon: ThermometerSun, tone: "amber", progress: 78 },
    { label: "Green Cover", value: 18.6, suffix: "%", note: "Below target", meta: "↓ 1.8% since 2015", icon: Leaf, tone: "green", progress: 38 },
    { label: "Cooling Opportunities", value: 128, note: "Priority interventions", meta: "34 high impact", icon: Sparkles, tone: "blue", progress: 83 },
  ];
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{cards.map(({ label, value, suffix, note, meta, icon: Icon, tone, progress }) => <article key={label} className={`kpi-card tone-${tone}`}>
    <div className="flex items-start justify-between"><div className="icon-well"><Icon className="size-[18px]" /></div><MiniSpark tone={tone} /></div>
    <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[.13em] text-muted-foreground">{label}</p>
    <p className="mt-1 whitespace-nowrap font-display text-[28px] font-extrabold leading-none text-primary"><AnimatedNumber value={value} suffix={suffix} /></p>
    <div className="mt-4 flex items-end justify-between gap-2"><div><p className="text-xs font-bold">{note}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{meta}</p></div></div>
    <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary"><span className="block h-full rounded-full bg-current transition-all duration-1000" style={{ width: `${progress}%` }} /></div>
  </article>)}</div>;
}

function MiniSpark({ tone }: { tone: string }) { return <svg viewBox="0 0 76 30" className={`mini-spark tone-${tone}`} aria-hidden="true"><path d="M2 25 C12 22, 13 12, 22 16 S34 23, 41 11 S52 18, 59 8 S68 9,74 3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M2 25 C12 22,13 12,22 16 S34 23,41 11 S52 18,59 8 S68 9,74 3 V30 H2Z" fill="currentColor" opacity=".08" /></svg>; }

function HeatMap({ onAnalyze }: { onAnalyze: () => void }) {
  const [layer, setLayer] = useState("Heat Risk"); const [zoom, setZoom] = useState(1);
  return <div className="map-shell">
    <div className="map-canvas" style={{ "--map-zoom": zoom } as React.CSSProperties}>
      <svg viewBox="0 0 1100 560" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full transition-transform duration-500" style={{ transform: `scale(${zoom})` }} aria-label="Stylized heat risk map of Pune">
        <defs><pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M46 0H0V46" fill="none" stroke="currentColor" strokeOpacity=".055" /></pattern><filter id="glow"><feGaussianBlur stdDeviation="18" /></filter><linearGradient id="river" x1="0" x2="1"><stop stopColor="var(--map-water)"/><stop offset="1" stopColor="var(--cool)"/></linearGradient></defs>
        <rect width="1100" height="560" fill="var(--map-bg)"/><rect width="1100" height="560" fill="url(#grid)"/>
        <g className="map-boundaries" fill="var(--map-zone)" stroke="var(--map-border)" strokeWidth="1.2"><path d="M28 108L188 42l125 53-18 135-103 65-150-38Z"/><path d="M313 95l172-44 93 78-34 138-134 18-115-55Z"/><path d="M578 129l166-50 93 72-36 122-142 39-115-45Z"/><path d="M837 151l197 31 48 135-135 71-146-115Z"/><path d="M42 257l150 38 65 98-94 133-131-51Z"/><path d="M192 295l218-10 53 134-117 105-183 2 94-133Z"/><path d="M410 285l134-18 115 45 39 137-163 80-72-110Z"/><path d="M659 312l142-39 146 115-65 127-184-66Z"/></g>
        <g className="roads" fill="none" strokeLinecap="round"><path d="M4 393C198 351 292 401 480 322S787 213 1110 273"/><path d="M115 2C173 137 255 186 352 281s190 127 262 278"/><path d="M353 2c48 132 149 165 221 229s174 119 383 217"/><path d="M30 181c193 15 313 61 440 144s301 122 596 131"/><path d="M654 6c-35 169 4 249 107 331s165 130 207 223"/></g>
        <path d="M-20 332C132 307 224 343 344 328s190-78 294-53 140 98 251 84 147-76 235-78" fill="none" stroke="url(#river)" strokeWidth="8" opacity=".72"/><path d="M-20 332C132 307 224 343 344 328s190-78 294-53 140 98 251 84 147-76 235-78" fill="none" stroke="var(--map-bg)" strokeWidth="2" opacity=".65"/>
        <g className="minor-roads" fill="none"><path d="M70 120l240 211 54 180M174 70l86 209 212 129M448 68l-22 183 288 247M617 95l60 155 246 220M859 164L694 312 523 425M1021 216L799 344 612 501"/></g>
        <Hotspot x={319} y={250} r={70} level="critical" /><Hotspot x={787} y={352} r={58} level="critical" /><Hotspot x={666} y={204} r={50} level="high" /><Hotspot x={457} y={386} r={43} level="high" /><Hotspot x={187} y={203} r={38} level="moderate" /><Hotspot x={918} y={251} r={36} level="moderate" />
        <g className="map-labels"><text x="279" y="244">KOTHRUD</text><text x="754" y="348">HADAPSAR</text><text x="628" y="194">SHIVAJINAGAR</text><text x="417" y="382">SWARGATE</text><text x="150" y="196">BANER</text><text x="877" y="244">VIMAN NAGAR</text><text x="469" y="116">AUNDH</text><text x="862" y="452">KHARADI</text></g>
      </svg>
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        <div className="map-control flex flex-col"><button aria-label="Zoom in" onClick={() => setZoom((v) => Math.min(1.16, v + .04))}><Plus /></button><span/><button aria-label="Zoom out" onClick={() => setZoom((v) => Math.max(1, v - .04))}><Minus /></button></div>
        <button className="map-control single" aria-label="Map layers"><Layers3 /></button><button className="map-control single" aria-label="Satellite view"><Satellite /></button>
      </div>
      <div className="absolute right-4 top-4 z-10 hidden rounded-lg border border-map-control-border bg-map-control p-1.5 shadow-lg backdrop-blur sm:flex">
        {["Heat Risk", "NDVI", "Built-up"].map((item) => <button key={item} onClick={() => setLayer(item)} className={`rounded-md px-3 py-2 text-[10px] font-bold transition ${layer === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>{item}</button>)}
      </div>
      <div className="map-legend"><span><i className="bg-risk-low"/>Low</span><span><i className="bg-risk-moderate"/>Moderate</span><span><i className="bg-risk-high"/>High</span><span><i className="bg-risk-very-high"/>Very High</span><span><i className="bg-risk-critical"/>Critical</span></div>
      <div className="hotspot-panel">
        <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-heat">Selected hotspot</p><h3 className="mt-1 font-display text-xl font-extrabold">Kothrud <span className="text-heat">— Critical</span></h3></div><span className="live-dot mt-2" /></div>
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-xs"><Metric label="Heat Risk" value="86 / 100" hot/><Metric label="Temperature" value="41.3°C"/><Metric label="NDVI" value="0.09"/><Metric label="Built-up" value="89%"/><Metric label="Traffic" value="High"/><Metric label="Shade" value="Low"/></div>
        <Button variant="heat" className="mt-4 w-full" onClick={onAnalyze}>Analyze Hotspot <ChevronRight className="size-4" /></Button>
      </div>
      <div className="absolute bottom-4 right-4 hidden rounded-md border border-map-control-border bg-map-control px-2 py-1 text-[9px] font-semibold text-muted-foreground sm:block">{layer} · Prototype visualization</div>
    </div>
  </div>;
}

function Hotspot({ x, y, r, level }: { x: number; y: number; r: number; level: string }) { const color = level === "critical" ? "var(--risk-critical)" : level === "high" ? "var(--risk-high)" : "var(--risk-moderate)"; return <g><circle cx={x} cy={y} r={r * 1.3} fill={color} opacity=".14" filter="url(#glow)"/><circle cx={x} cy={y} r={r} fill={color} opacity=".17"/><circle cx={x} cy={y} r={r * .58} fill={color} opacity=".35"/><circle cx={x} cy={y} r="8" fill={color} className="hotspot-core"/><circle cx={x} cy={y} r="16" fill="none" stroke={color} strokeWidth="2" className="hotspot-ring"/></g>; }
function Metric({ label, value, hot }: { label: string; value: string; hot?: boolean }) { return <div><p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p><p className={`mt-0.5 font-bold ${hot ? "text-heat" : ""}`}>{value}</p></div>; }

function AnalysisCard() { return <article className="panel p-5 sm:p-6"><SectionHeader eyebrow="Selected zone · Kothrud" title="AI Hotspot Analysis" subtitle="Composite exposure and land-cover assessment" />
  <div className="grid items-center gap-8 sm:grid-cols-[180px_1fr]">
    <div className="risk-gauge"><svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="66" className="gauge-track"/><circle cx="80" cy="80" r="66" className="gauge-value" strokeDasharray={`${86 * 4.15} 415`}/></svg><div><strong>86</strong><span>CRITICAL</span></div></div>
    <div className="space-y-4">{factors.map((factor) => <div key={factor.label}><div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold">{factor.label}</span><span className="font-bold">{factor.value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-secondary"><span className={`factor-bar bg-${factor.tone}`} style={{ width: `${factor.value}%` }} /></div></div>)}</div>
  </div></article>; }

function InsightCard({ onGenerate }: { onGenerate: () => void }) { return <article className="insight-panel p-5 sm:p-6"><div className="flex items-start gap-3"><div className="ai-orb"><Bot className="size-5" /></div><div><Eyebrow>ThermalPune intelligence</Eyebrow><h2 className="section-title">Why is this area hot?</h2></div></div><p className="mt-6 max-w-2xl text-lg font-medium leading-7">High heat risk is primarily associated with <mark>very low vegetation</mark>, high impervious surface coverage and heavy traffic exposure.</p><div className="my-6 h-px bg-border"/><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-muted-foreground">Recommended intervention mix</p><div className="mt-3 flex flex-wrap gap-2">{[[TreePine,"Native Shade Trees"],[RouteIcon,"Cool Pavement"],[CloudSun,"Bus Stop Shade"],[Building2,"Cool Roofs"]].map(([Icon,label]) => { const C = Icon as ComponentType<{className?: string}>; return <span className="recommend-chip" key={label as string}><C className="size-3.5"/>{label as string}</span>})}</div><Button variant="heat" className="mt-6" onClick={onGenerate}>Generate Cooling Plan <Sparkles className="size-4" /></Button></article>; }

function Recommendation() { const items = [
  [TreePine,"Plant 40 native shade trees","High","Estimated cooling: 1.2–1.8°C"], [CloudSun,"Add shaded bus-stop infrastructure","Medium–High","Estimated exposure reduction: 18%"], [RouteIcon,"Apply cool pavement to 1.2 km road segment","Medium","Estimated surface reduction: 4–7°C"], [Building2,"Encourage cool roofs on nearby buildings","Medium","Coverage target: 20 buildings"],
] as const; return <article className="strategy-panel"><div className="strategy-heading"><div><Eyebrow>Decision support · Kothrud</Eyebrow><h2 className="font-display text-2xl font-extrabold">AI-Powered Cooling Strategy</h2><p className="mt-1 text-sm text-primary-foreground/70">Phased interventions ranked by feasibility and expected urban cooling value.</p></div><span className="critical-badge"><Zap className="size-3.5"/> Critical priority</span></div><div className="grid lg:grid-cols-[1fr_300px]"><div className="divide-y divide-border">{items.map(([Icon,label,impact,effect], index) => { const C=Icon as ComponentType<{className?: string}>; return <div className="strategy-row" key={label}><span className="strategy-number">0{index+1}</span><span className="strategy-icon"><C className="size-5"/></span><div className="min-w-0 flex-1"><h3 className="font-bold">{label}</h3><p className="mt-1 text-xs text-muted-foreground">{effect}</p></div><span className="impact-badge">{impact} impact</span></div>})}</div><aside className="strategy-summary"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Scenario economics</p><div className="mt-5"><p className="text-xs text-muted-foreground">Estimated Investment</p><p className="mt-1 font-display text-3xl font-extrabold">₹6.4 Lakh</p></div><div className="mt-5"><p className="text-xs text-muted-foreground">Estimated Annual Benefit</p><p className="mt-1 font-display text-2xl font-extrabold text-cool">₹2.1 Lakh</p></div><div className="mt-5 flex items-center gap-2 text-sm"><span className="priority-high">HIGH</span><span className="text-muted-foreground">Priority score</span></div><p className="mt-6 border-t border-border pt-4 text-[10px] leading-4 text-muted-foreground"><ShieldCheck className="mr-1 inline size-3"/>Estimated / simulation based on assumptions. Values are directional, not scientifically exact.</p></aside></div></article>; }

function SensorGrid() { return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{sensors.map((sensor) => <article key={sensor.id} className={`sensor-card ${sensor.temp >= 40 ? "sensor-hot" : ""}`}><div className="flex items-center justify-between"><span className="text-[9px] font-extrabold tracking-[.12em] text-muted-foreground">{sensor.id}</span><span className="flex items-center gap-1 text-[9px] font-bold text-cool"><span className="signal"><i/><i/><i/></span> LIVE</span></div><div className="mt-4 flex items-center justify-between"><div><h3 className="text-sm font-bold">{sensor.place}</h3><p className="mt-1 font-display text-2xl font-extrabold">{sensor.temp}°C</p></div><ThermometerSun className="size-8 text-heat opacity-70"/></div><div className="mt-4 flex gap-3 border-t border-border pt-3 text-[10px] text-muted-foreground"><span><Droplets className="mr-1 inline size-3 text-sky"/>{sensor.humidity}% RH</span><span><Wind className="mr-1 inline size-3"/>{sensor.pressure} hPa</span></div></article>)}</div>; }

const tooltipStyle = { borderRadius: "8px", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)", fontSize: 11 };
function Charts() { return <div className="grid gap-5 lg:grid-cols-2"><article className="chart-panel"><div className="flex items-start justify-between"><div><h3 className="font-display text-lg font-bold">Historical Heat Trend</h3><p className="mt-1 text-xs text-muted-foreground">Average city heat-risk index</p></div><span className="trend-up"><TrendingUp className="size-3.5"/> +53% since 2015</span></div><div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={historicalTrend} margin={{left:-25,right:8}}><CartesianGrid strokeDasharray="3 6" stroke="var(--border)" vertical={false}/><XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill:"var(--muted-foreground)",fontSize:10}}/><YAxis domain={[40,80]} axisLine={false} tickLine={false} tick={{fill:"var(--muted-foreground)",fontSize:10}}/><Tooltip contentStyle={tooltipStyle}/><Line type="monotone" dataKey="risk" stroke="var(--heat)" strokeWidth={3} dot={{r:4,fill:"var(--card)",strokeWidth:3}} activeDot={{r:6}} animationDuration={1200}/></LineChart></ResponsiveContainer></div></article><article className="chart-panel"><div className="flex items-start justify-between"><div><h3 className="font-display text-lg font-bold">7-Day Heat Risk Forecast</h3><p className="mt-1 text-xs text-muted-foreground">Modelled composite risk outlook</p></div><span className="forecast-peak"><Sun className="size-3.5"/> Peak +4 days</span></div><div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={forecast} margin={{left:-25,right:8}}><defs><linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--risk-critical)" stopOpacity=".32"/><stop offset="100%" stopColor="var(--heat)" stopOpacity=".02"/></linearGradient></defs><CartesianGrid strokeDasharray="3 6" stroke="var(--border)" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"var(--muted-foreground)",fontSize:10}}/><YAxis domain={[60,95]} axisLine={false} tickLine={false} tick={{fill:"var(--muted-foreground)",fontSize:10}}/><Tooltip contentStyle={tooltipStyle}/><Area type="monotone" dataKey="risk" stroke="var(--risk-critical)" fill="url(#riskGradient)" strokeWidth={3} animationDuration={1200}/></AreaChart></ResponsiveContainer></div></article></div>; }

function Simulator({ scenario, setScenario, ran, setRan, outcome }: { scenario: boolean[]; setScenario: React.Dispatch<React.SetStateAction<boolean[]>>; ran: boolean; setRan: (v:boolean)=>void; outcome:{risk:number;green:number;temp:string} }) { const icons = {trees:TreePine,roofs:Building2,road:RouteIcon,shade:CloudSun,rain:Waves}; return <article className="simulator-panel"><div className="simulator-top"><div><Eyebrow>Flagship scenario lab · Kothrud</Eyebrow><h2 className="font-display text-2xl font-extrabold sm:text-3xl">What If Pune Cools This Zone?</h2><p className="mt-2 text-sm text-muted-foreground">Select interventions to model a directional neighborhood-scale outcome.</p></div><span className="selected-zone"><Navigation className="size-4"/> Selected zone: <strong>Kothrud</strong></span></div><div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1.05fr]"><div><p className="mb-3 text-[10px] font-bold uppercase tracking-[.15em] text-muted-foreground">Configure intervention mix</p><div className="grid gap-3 sm:grid-cols-2">{interventions.map((item,index)=>{const Icon=icons[item.icon]; const active=scenario[index]; return <button key={item.label} aria-pressed={active} onClick={()=>{setRan(false);setScenario(s=>s.map((v,i)=>i===index?!v:v))}} className={`intervention ${active?"intervention-active":""}`}><span className="intervention-icon"><Icon className="size-5"/></span><span className="text-left"><strong className="block text-sm">{item.label}</strong><small className="text-muted-foreground">{item.value}</small></span><span className="ml-auto toggle"><i/></span></button>})}</div><Button variant="cool" className="mt-4 w-full sm:w-auto" onClick={()=>setRan(true)}><Sparkles className="size-4"/>{ran?"Scenario Updated":"Run Scenario"}</Button></div><div className={`comparison ${ran?"comparison-ran":""}`}><ComparisonColumn label="Current" risk="86" green="9%" temp="41.3°C" current/><div className="comparison-arrow"><ChevronRight/></div><ComparisonColumn label="After Simulation" risk={String(outcome.risk)} green={`${outcome.green}%`} temp={`${outcome.temp}°C`}/><div className="col-span-full mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center"><Impact value={`↓ ${86-outcome.risk}`} label="Risk points"/><Impact value={`↓ ${(41.3-Number(outcome.temp)).toFixed(1)}°C`} label="Surface temp"/><Impact value={`↑ ${outcome.green-9}%`} label="Green cover"/></div></div></div><p className="mt-6 text-[10px] text-muted-foreground"><ShieldCheck className="mr-1 inline size-3"/>Simulation — illustrative estimates based on configurable assumptions.</p></article>; }
function ComparisonColumn({label,risk,green,temp,current}:{label:string;risk:string;green:string;temp:string;current?:boolean}) { return <div className="min-w-0"><p className={`text-[10px] font-extrabold uppercase tracking-[.15em] ${current?"text-heat":"text-cool"}`}>{label}</p><div className="mt-4 space-y-4"><Result label="Heat Risk" value={risk}/><Result label="Green Cover" value={green}/><Result label="Surface Temp" value={temp}/></div></div>; }
function Result({label,value}:{label:string;value:string}) { return <div><p className="text-[10px] text-muted-foreground">{label}</p><p className="font-display text-2xl font-extrabold">{value}</p></div>; }
function Impact({value,label}:{value:string;label:string}) { return <div><p className="font-display text-lg font-extrabold text-cool">{value}</p><p className="text-[9px] text-muted-foreground">{label}</p></div>; }

function PriorityTable() { return <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead><tr className="border-b border-border bg-secondary/70 text-[9px] uppercase tracking-[.13em] text-muted-foreground"><th className="px-5 py-4">Priority zone</th><th>Risk score</th><th>Temperature</th><th>NDVI</th><th>Recommended intervention</th><th className="pr-5">Status</th></tr></thead><tbody>{priorities.map((row)=><tr key={row.zone} className="group border-b border-border last:border-0 hover:bg-secondary/45"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="rank">#{row.rank}</span><div><strong className="text-sm">{row.zone}</strong><p className="text-[10px] text-muted-foreground">Pune zone</p></div></div></td><td><span className="risk-score">{row.risk}</span></td><td className="text-xs font-semibold">{row.temp}</td><td className="text-xs font-semibold">{row.ndvi}</td><td className="text-xs font-semibold">{row.action}</td><td className="pr-5"><span className={row.level==="Critical"?"critical-small":"high-small"}>{row.level}</span></td></tr>)}</tbody></table></div></div>; }
function CitizenReports() { const reports=[["heat","No shade near bus stop","FC Road","12 min ago","Verified"],["tree","Very low tree cover","Baner","28 min ago","Verified"],["sun","Extreme afternoon heat","Hadapsar","43 min ago","Pending"]] as const; const icons={heat:ThermometerSun,tree:TreePine,sun:Sun}; return <div className="grid gap-3 md:grid-cols-3">{reports.map(([type,title,place,time,status])=>{const Icon=icons[type]; return <article className="report-card" key={title}><span className="report-icon"><Icon className="size-5"/></span><div className="min-w-0"><h3 className="text-sm font-bold">“{title}”</h3><p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><MapPin className="size-3"/>{place}<span>·</span>{time}</p></div><span className={status==="Verified"?"verified":"pending"}>{status}</span></article>})}</div>; }
function ImpactStrip() { return <section className="impact-strip"><div><Eyebrow>Citywide opportunity</Eyebrow><h2 className="font-display text-2xl font-extrabold sm:text-3xl">From Heat Data → Climate Action</h2></div><div className="impact-grid"><ImpactStat value="47" label="Hotspots Identified"/><ImpactStat value="128" label="Cooling Opportunities"/><ImpactStat value="₹18.4 Cr" label="Potential Intervention Planning"/><ImpactStat value="12,400+" label="Citizens Covered"/></div><Button variant="heat" onClick={()=>document.getElementById("heat-map")?.scrollIntoView({behavior:"smooth"})}>Explore Pune’s Heat Risk <ChevronRight className="size-4"/></Button></section>; }
function ImpactStat({value,label}:{value:string;label:string}) { return <div><p className="font-display text-2xl font-extrabold text-primary-foreground">{value}</p><p className="mt-1 text-[10px] text-primary-foreground/60">{label}</p></div>; }

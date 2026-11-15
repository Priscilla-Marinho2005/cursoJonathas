import { LuChartNoAxesCombined, LuHeadset, LuMonitorPlay, LuShieldCheck } from "react-icons/lu";

const diferenciais = [
    {
        icon: LuMonitorPlay,
        label: "Aulas práticas e diretas",
    },
    {
        icon: LuChartNoAxesCombined,
        label: "Estratégias aplicadas na prática",
    },
    {
        icon: LuShieldCheck,
        label: "Gestão de risco e controle emocional",
    },
    {
        icon: LuHeadset,
        label: "Suporte e acompanhamento",
    },
] as const;

const candles = [
    { x: 28, body: 92, wick: 118, y: 250, up: false },
    { x: 78, body: 70, wick: 104, y: 232, up: true },
    { x: 128, body: 110, wick: 136, y: 188, up: false },
    { x: 178, body: 64, wick: 96, y: 210, up: true },
    { x: 228, body: 86, wick: 112, y: 168, up: true },
    { x: 278, body: 48, wick: 78, y: 186, up: false },
    { x: 328, body: 102, wick: 128, y: 122, up: true },
    { x: 378, body: 58, wick: 84, y: 148, up: false },
    { x: 428, body: 96, wick: 120, y: 88, up: true },
    { x: 478, body: 44, wick: 70, y: 112, up: true },
    { x: 528, body: 78, wick: 108, y: 64, up: true },
];

function MarketAtmosphere() {
    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
        >
            <div className="absolute -top-24 left-[-8%] h-10 w-10 rounded-full bg-pine/10 blur-3xl" />
            <div className="absolute top-[8%] right-[-6%] h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(227,179,65,0.28)_0%,rgba(31,191,106,0.08)_38%,transparent_68%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.72)_100%)]" />

            <svg
                className="absolute top-[16%] right-0 hidden h-[66%] w-[48%] mask:[linear-gradient(90deg,transparent,black_24%)] lg:block"
                viewBox="0 0 640 420"
                fill="none"
            >
                <path
                    d="M20 310 C 90 300, 140 250, 200 236 C 270 220, 300 150, 370 132 C 450 112, 490 70, 610 42"
                    pathLength="1"
                    stroke="url(#trend)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    className="animate-trend-draw motion-reduce:animate-none"
                />
                {candles.map((candle, index) => (
                    <g
                        key={candle.x}
                        className={
                            candle.up
                                ? "animate-candle-rise transform-fill motion-reduce:animate-none"
                                : "animate-candle-drop transform-fill motion-reduce:animate-none"
                        }
                        style={{ animationDelay: `${index * 0.14}s` }}
                    >
                        <line
                            x1={candle.x + 12}
                            x2={candle.x + 12}
                            y1={candle.y - (candle.wick - candle.body) / 2}
                            y2={candle.y + candle.body + (candle.wick - candle.body) / 2}
                            stroke={candle.up ? "#86efac" : "#f6e3a1"}
                            strokeWidth="1.5"
                        />
                        <rect
                            x={candle.x}
                            y={candle.y}
                            width="24"
                            height={candle.body}
                            rx="2"
                            fill={candle.up ? "#1fbf6a" : "#e3b341"}
                        />
                    </g>
                ))}
                <defs>
                    <linearGradient id="trend" x1="20" y1="310" x2="610" y2="42" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#e3b341" stopOpacity="0" />
                        <stop offset="0.3" stopColor="#e3b341" />
                        <stop offset="1" stopColor="#1fbf6a" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.7)_0.5px,transparent_0.5px)] bg-size-[3px_3px] opacity-[0.07] mix-blend-soft-light" />
        </div>
    );
}

export default function Hero() {
    return (
        <section id="inicio" className="relative isolate min-h-screen overflow-hidden bg-black text-white">
            <MarketAtmosphere />

            <div className="relative mx-auto flex min-h-screen w-full max-w-365 flex-col justify-center px-6 pt-28 pb-14 sm:px-10 sm:pt-32 lg:px-16">
                <div className="max-w-3xl">
                    <h1 className="max-w-[12em] font-display text-[clamp(2.55rem,4.7vw,4.35rem)] font-semibold uppercase leading-[0.9] tracking-[-0.02em]">
                        Curso de <br /> Mercado Financeiro
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">
                        Aprenda a operar no mercado financeiro do absoluto zero, desenvolvendo{" "}
                        <span className="font-semibold text-white">
                            estratégia, disciplina e gestão de risco.
                        </span>
                    </p>

                    <a
                        href="#comecar"
                        className="mt-8 inline-flex animate-cta-pulse items-center gap-3 rounded-full bg-pine px-7 py-3.5 text-sm font-bold tracking-[0.08em] text-black uppercase shadow-[0_10px_24px_rgba(31,191,106,0.35)] transition-colors hover:bg-[#3ad484] motion-reduce:animate-none"
                    >
                        Quero começar agora
                        <span aria-hidden="true">→</span>
                    </a>

                    <ul className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-2.5">
                        {diferenciais.map((item) => (
                            <li key={item.label}>
                                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-2.5 text-[13px] font-medium text-white/80 backdrop-blur-sm">
                                    <item.icon className="size-4 shrink-0 text-gold" aria-hidden="true" />
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

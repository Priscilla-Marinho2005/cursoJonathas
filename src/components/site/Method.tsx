import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LuBookOpen, LuBrain, LuChartNoAxesCombined, LuShieldCheck } from "react-icons/lu";

const pilares = [
    {
        icon: LuBookOpen,
        text: "Fundamentos do mercado financeiro.",
    },
    {
        icon: LuChartNoAxesCombined,
        text: "Estratégias operacionais.",
    },
    {
        icon: LuShieldCheck,
        text: "Gestão de risco.",
    },
    {
        icon: LuBrain,
        text: "Controle emocional.",
    },
] as const;

const surgimento =
    "transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

function useSurgiu() {
    const ref = useRef<HTMLElement>(null);
    const [surgiu, setSurgiu] = useState(false);

    useEffect(() => {
        const secao = ref.current;
        if (!secao) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setSurgiu(true);
            return;
        }

        const observador = new IntersectionObserver(
            ([entrada]) => setSurgiu(entrada.isIntersecting),
            { threshold: 0.4 },
        );

        observador.observe(secao);
        return () => observador.disconnect();
    }, []);

    return { ref, surgiu };
}

export default function Method() {
    const { ref, surgiu } = useSurgiu();

    return (
        <section
            ref={ref}
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto max-w-6xl">
                <div
                    className={`${surgimento} ${surgiu ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                >
                    <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                        Método Trader
                    </p>
                    <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                        Conheça o método que vai guiar{" "}
                        <span className="text-gold">seus primeiros passos.</span>
                    </h2>
                    <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-lg">
                        O treinamento organiza o começo em quatro pilares. Cada etapa prepara a
                        seguinte: primeiro o entendimento do mercado, depois a estratégia, o risco
                        e a disciplina para operar.
                    </p>
                </div>

                <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                    <span
                        className={`pointer-events-none absolute top-9 right-[12%] left-[12%] hidden h-px origin-left bg-linear-to-r from-gold/0 via-gold/50 to-pine/70 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block motion-reduce:scale-x-100 motion-reduce:transition-none ${
                            surgiu ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{ transitionDelay: surgiu ? "280ms" : "0ms" }}
                        aria-hidden="true"
                    />
                    {pilares.map((item, index) => {
                        const atraso: CSSProperties = {
                            transitionDelay: surgiu ? `${180 + index * 120}ms` : "0ms",
                        };

                        return (
                            <li
                                key={item.text}
                                style={atraso}
                                className={`relative flex flex-col rounded-2xl border border-white/10 bg-black px-5 py-6 ${surgimento} ${
                                    surgiu ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }`}
                            >
                                <span className="mb-6 flex items-center gap-3">
                                    <span className="grid size-10 place-items-center rounded-full border border-gold/40 bg-black font-display text-sm text-gold">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <item.icon className="size-4 text-pine" aria-hidden="true" />
                                </span>
                                <p className="text-[15px] leading-relaxed font-medium text-white/85">
                                    {item.text}
                                </p>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

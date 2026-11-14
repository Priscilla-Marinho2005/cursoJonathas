import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
    LuBookOpen,
    LuBrain,
    LuChartCandlestick,
    LuClipboardCheck,
    LuCrosshair,
    LuShieldCheck,
} from "react-icons/lu";

const conhecimentos = [
    {
        icon: LuBookOpen,
        title: "Fundamentos do mercado",
        text: "Como o mercado funciona, quais ativos existem e o que realmente move o preço.",
    },
    {
        icon: LuChartCandlestick,
        title: "Leitura de gráficos",
        text: "Candles, tendência e estrutura para ler o contexto antes de qualquer decisão.",
    },
    {
        icon: LuCrosshair,
        title: "Estratégias operacionais",
        text: "Critérios de entrada, saída e invalidação para operar com regra, não com achismo.",
    },
    {
        icon: LuShieldCheck,
        title: "Gestão de risco",
        text: "Tamanho de posição e stop para proteger o capital em cada operação.",
    },
    {
        icon: LuBrain,
        title: "Controle emocional",
        text: "Disciplina para reduzir impulso, medo e a pressa de recuperar prejuízo.",
    },
    {
        icon: LuClipboardCheck,
        title: "Plano operacional",
        text: "Uma rotina clara para analisar, executar e revisar o que você fez no mercado.",
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
            ([entrada]) => {
                if (entrada.intersectionRatio >= 0.2) setSurgiu(true);
                else if (entrada.intersectionRatio === 0) setSurgiu(false);
            },
            { threshold: [0, 0.2] },
        );

        observador.observe(secao);
        return () => observador.disconnect();
    }, []);

    return { ref, surgiu };
}

export default function Learn() {
    const { ref, surgiu } = useSurgiu();

    return (
        <section
            ref={ref}
            id="aprender"
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto max-w-6xl">
                <div
                    className={`${surgimento} ${surgiu ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                >
                    <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                        Conteúdo
                    </p>
                    <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                        O que você vai aprender
                    </h2>
                    <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                        Os conhecimentos que o treinamento desenvolve, do entendimento do mercado
                        até a execução com critério.
                    </p>
                </div>

                <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {conhecimentos.map((item, index) => {
                        const atraso: CSSProperties = {
                            transitionDelay: surgiu ? `${180 + index * 120}ms` : "0ms",
                        };

                        return (
                            <li
                                key={item.title}
                                style={atraso}
                                className={`flex flex-col rounded-2xl border border-white/10 bg-white/3 px-5 py-6 ${surgimento} ${
                                    surgiu ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }`}
                            >
                                <span className="mb-6 grid size-10 place-items-center rounded-full border border-gold/30 text-gold">
                                    <item.icon className="size-4" aria-hidden="true" />
                                </span>
                                <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                                    {item.text}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

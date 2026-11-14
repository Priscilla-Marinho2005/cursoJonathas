import { useEffect, useRef, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";

const paraVoce = [
    "Quem deseja começar no mercado financeiro.",
    "Quem busca aprender estratégias.",
    "Quem quer desenvolver disciplina operacional.",
    "Quem deseja compreender gestão de risco.",
] as const;

const naoParaVoce = [
    "Quem procura dinheiro fácil.",
    "Quem espera resultados garantidos.",
    "Quem não está disposto a estudar e praticar.",
] as const;

const surgimento =
    "transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

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

export default function Audience() {
    const { ref, surgiu } = useSurgiu();

    return (
        <section
            ref={ref}
            id="para-quem"
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto max-w-6xl">
                <div
                    className={`${surgimento} ${surgiu ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                >
                    <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                        Para quem é o curso
                    </p>
                    <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                        Esse método é para você?
                    </h2>
                </div>

                <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-2">
                    <div
                        className={`rounded-2xl border border-pine/30 bg-pine/6 px-6 py-7 ${surgimento} ${
                            surgiu ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                        style={{ transitionDelay: surgiu ? "180ms" : "0ms" }}
                    >
                        <h3 className="font-display text-2xl font-semibold tracking-wide text-pine uppercase">
                            É para você
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {paraVoce.map((item) => (
                                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pine text-black">
                                        <LuCheck className="size-3" aria-hidden="true" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        className={`rounded-2xl border border-white/10 bg-white/3 px-6 py-7 ${surgimento} ${
                            surgiu ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                        }`}
                        style={{ transitionDelay: surgiu ? "180ms" : "0ms" }}
                    >
                        <h3 className="font-display text-2xl font-semibold tracking-wide text-white/70 uppercase">
                            Não é para você
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {naoParaVoce.map((item) => (
                                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/70">
                                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/20 text-white/55">
                                        <LuX className="size-3" aria-hidden="true" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

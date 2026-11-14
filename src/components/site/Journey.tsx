const etapas = [
    {
        fase: "Base",
        title: "Fundamentos",
        text: "Entenda o mercado, os ativos e a linguagem do preço antes de pensar em operar.",
    },
    {
        fase: "Leitura",
        title: "Análise do gráfico",
        text: "Reconheça tendência, estrutura e o contexto que justifica — ou invalida — uma operação.",
    },
    {
        fase: "Método",
        title: "Estratégia",
        text: "Monte critérios claros de entrada, saída e invalidação para cada cenário.",
    },
    {
        fase: "Proteção",
        title: "Risco e disciplina",
        text: "Defina o tamanho da posição, o stop e a postura para executar sem impulso.",
    },
    {
        fase: "Prática",
        title: "Aplicação no mercado",
        text: "Leve o plano para a operação real e revise cada resultado para evoluir com consistência.",
    },
] as const;

export default function Journey() {
    return (
        <section
            id="jornada"
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto max-w-6xl">
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                    Jornada do aluno
                </p>
                <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                    Uma jornada estruturada para{" "}
                    <span className="text-gold">sua evolução.</span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                    O caminho começa nos fundamentos e termina na aplicação prática das
                    estratégias, com cada etapa preparando a seguinte.
                </p>

                <ol className="relative mx-auto mt-12 max-w-3xl lg:mt-16">
                    <span
                        className="pointer-events-none absolute top-5 bottom-5 left-5 w-px bg-linear-to-b from-gold via-white/25 to-pine"
                        aria-hidden="true"
                    />
                    {etapas.map((etapa, index) => (
                        <li key={etapa.title} className="relative flex gap-5 pb-5 last:pb-0 sm:gap-6">
                            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-black font-display text-sm text-gold">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/3 px-5 py-5">
                                <p className="text-[11px] font-semibold tracking-[0.28em] text-pine uppercase">
                                    {etapa.fase}
                                </p>
                                <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-wide">
                                    {etapa.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                                    {etapa.text}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

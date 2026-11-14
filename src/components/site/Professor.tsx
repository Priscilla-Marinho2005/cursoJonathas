/** Caminho da foto profissional, por exemplo "/jonathas.jpg" em public/. */
const fotoProfessor = "";

export default function Professor() {
    return (
        <section
            id="professor"
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
                <div className="relative mx-auto w-full max-w-sm">
                    <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(227,179,65,0.22),transparent_68%)] blur-2xl" />
                    <div className="relative aspect-3/4 overflow-hidden rounded-[1.75rem] border border-gold/25 bg-white/4 shadow-[0_0_0_1px_rgba(227,179,65,0.08)]">
                        {fotoProfessor ? (
                            <img
                                src={fotoProfessor}
                                alt="Jonathas Luz, professor do Método Trader"
                                className="size-full object-cover object-top"
                            />
                        ) : (
                            <div className="flex size-full flex-col items-center justify-end bg-[radial-gradient(circle_at_50%_30%,rgba(227,179,65,0.16),transparent_46%)] px-6 pb-8 text-center">
                                <p className="font-display text-xl tracking-wide text-white/80 uppercase">
                                    Jonathas Luz
                                </p>
                                <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                                    Espaço para a fotografia profissional
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                        Apresentação do professor
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                        Quem é Jonathas Luz?
                    </h2>
                    <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-white/72 sm:text-lg">
                        <p>
                            Jonathas Luz tem{" "}
                            <span className="font-semibold text-white">6 anos de experiência</span> no
                            mercado financeiro. No Método Trader, ele organiza o caminho de quem começa
                            do zero: fundamentos, leitura de mercado, estratégia e gestão de risco.
                        </p>
                        <p>
                            A condução é direta. O foco está em critério, disciplina e na prática de
                            operar com um plano, sem atalhos e sem promessa de resultado.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

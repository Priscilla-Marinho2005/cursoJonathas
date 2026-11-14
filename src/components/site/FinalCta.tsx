import Footer from "./Footer";

export default function FinalCta() {
    return (
        <section className="relative isolate flex min-h-dvh flex-col overflow-hidden border-t border-white/8 bg-black text-white">
            <div className="pointer-events-none absolute top-[-20%] left-1/2 h-112 w-184 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,179,65,0.34)_0%,rgba(227,179,65,0.08)_38%,transparent_70%)] blur-2xl" />
            <div className="pointer-events-none absolute right-[-8%] bottom-[-18%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.42),transparent_68%)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-10%] left-[-6%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,140,40,0.22),transparent_70%)] blur-3xl" />

            <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:px-16">
                <h2 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                    Seu primeiro passo no mercado financeiro{" "}
                    <span className="text-gold">começa aqui.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
                    Conheça o Método Trader e comece do absoluto zero, com estratégia, disciplina e
                    gestão de risco.
                </p>
                <a
                    href="#inscricao"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-pine px-7 py-3.5 text-sm font-bold tracking-[0.08em] text-black uppercase shadow-[0_10px_24px_rgba(31,191,106,0.35)] transition-colors hover:bg-[#3ad484]"
                >
                    Quero começar agora
                    <span aria-hidden="true">→</span>
                </a>
            </div>
            <Footer />
        </section>
    );
}

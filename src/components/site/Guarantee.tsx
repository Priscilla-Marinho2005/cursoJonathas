export default function Guarantee() {
    return (
        <section
            id="garantia"
            className="relative overflow-hidden border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-16"
        >
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,179,65,0.2),transparent_68%)] blur-2xl" />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                    Garantia
                </p>
                <p
                    className="mt-4 font-display text-[clamp(7.5rem,22vw,13rem)] leading-none font-semibold text-gold"
                    aria-hidden="true"
                >
                    7
                </p>
                <h2 className="max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                    dias para decidir com calma
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                    Você tem 7 dias de garantia. Se o Método Trader não fizer sentido nesse período,
                    vale o que estiver previsto nas condições da oferta.
                </p>
            </div>
        </section>
    );
}

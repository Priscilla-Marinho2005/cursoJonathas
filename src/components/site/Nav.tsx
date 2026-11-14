export default function Nav() {
    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-30 border-b border-gold/25 bg-black/55 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-6 px-6 py-2.5 sm:px-10 lg:px-16">
            <a href="#inicio" className="pointer-events-auto text-right leading-none">
                    <p className="font-display text-lg tracking-[0.22em] text-white">Método Trader</p>
                    <p className="text-sm font-semibold tracking-[0.28em] text-white/55">
                        Jonathas Luz
                    </p>
                </a>
                <nav aria-label="Acesso" className="pointer-events-auto flex items-center gap-3 text-sm">
                    <a
                        href="#login"
                        className="font-medium tracking-[0.08em] text-white/70 uppercase transition-colors hover:text-white"
                    >
                        Login
                    </a>
                    <span className="text-white/30" aria-hidden="true">
                        |
                    </span>
                    <a
                        href="#inscricao"
                        className="font-bold tracking-[0.08em] text-pine uppercase transition-colors hover:text-[#3ad484]"
                    >
                        Começar agora
                    </a>
                </nav>
            </div>
        </header>
    );
}

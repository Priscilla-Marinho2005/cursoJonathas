export default function Nav() {
    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-30 border-b border-gold/25 bg-black/55 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-10 sm:py-2.5 lg:px-16">

                {/* Logo */}
                <a
                    href="#inicio"
                    className="pointer-events-auto flex items-center gap-3 text-left leading-none"
                >
                    <img src="/logo.png" alt="" className="w-7 shrink-0" />
                    <span>
                        <p className="font-display text-base tracking-[0.16em] text-white sm:text-lg sm:tracking-[0.22em]">
                            Método Trader
                        </p>
                        <p className="text-[10px] font-semibold tracking-[0.22em] text-white/55 sm:text-sm sm:tracking-[0.28em]">
                            Jonathas Luz
                        </p>
                    </span>
                </a>

                {/* Navegação */}
                <nav
                    aria-label="Acesso"
                    className="pointer-events-auto flex shrink-0 items-center gap-2 text-xs sm:gap-3 sm:text-sm"
                >
                    <a
                        href="#login"
                        className="font-medium tracking-wider text-white/70 uppercase transition-colors hover:text-white sm:tracking-[0.08em]"
                    >
                        Login
                    </a>

                    <span className="text-white/30" aria-hidden="true">
                        |
                    </span>

                    <a
                        href="#comecar"
                        className="rounded-sm bg-pine px-2.5 py-2 font-bold tracking-[0.04em] text-white uppercase transition-colors hover:bg-[#3ad484] sm:px-4 sm:py-2.5 sm:tracking-[0.08em]"
                    >
                        Começar agora
                    </a>
                </nav>

            </div>
        </header>
    );
}
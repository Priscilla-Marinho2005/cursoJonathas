import { type FormEvent } from "react";

export default function Login() {
    function entrar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const dados = new FormData(evento.currentTarget);
        const email = String(dados.get("email") ?? "");
        sessionStorage.setItem("aluno-email", email);
        window.location.hash = "#painel";
    }

    return (
        <main className="flex h-dvh flex-col overflow-hidden bg-black text-white">
            <header className="flex shrink-0 items-center justify-between gap-4 px-6 pt-5 sm:px-10">
                <a href="#inicio" className="inline-flex items-center gap-3 leading-none">
                    <img src="/logo.png" alt="" className="w-7 shrink-0" />
                    <span>
                        <p className="font-display text-base tracking-[0.16em] sm:text-lg sm:tracking-[0.22em]">
                            Método Trader
                        </p>
                        <p className="text-[10px] font-semibold tracking-[0.22em] text-white/55 sm:text-sm sm:tracking-[0.28em]">
                            Jonathas Luz
                        </p>
                    </span>
                </a>

                <a
                    href="#inicio"
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-white/15 px-3 py-2 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase transition-colors hover:border-gold hover:text-gold"
                >
                    <span aria-hidden="true">←</span>
                    Voltar
                </a>
            </header>

            <div className="flex min-h-0 flex-1 justify-center overflow-y-auto px-6 py-4">
                <form
                    onSubmit={entrar}
                    className="my-auto w-full max-w-md rounded-2xl border border-gold/25 bg-black/70 px-6 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-8 sm:py-7"
                >
                    <p className="text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">Área do aluno</p>
                    <h1 className="mt-2 font-display text-4xl tracking-[0.08em] uppercase">Entrar</h1>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                        Acesse o curso com o e-mail e a senha da sua inscrição.
                    </p>

                    <label className="mt-5 block text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
                        E-mail
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="voce@email.com"
                            className="mt-2 w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium tracking-normal text-white normal-case outline-none transition-colors placeholder:text-white/30 focus:border-gold"
                        />
                    </label>

                    <label className="mt-5 block text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
                        Senha
                        <input
                            type="password"
                            name="senha"
                            autoComplete="current-password"
                            placeholder="Sua senha"
                            className="mt-2 w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium tracking-normal text-white normal-case outline-none transition-colors placeholder:text-white/30 focus:border-gold"
                        />
                    </label>

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-sm bg-pine px-4 py-3.5 text-sm font-bold tracking-[0.08em] text-black uppercase transition-colors hover:bg-[#3ad484]"
                    >
                        Entrar
                    </button>

                    <p className="mt-4 text-center text-sm text-white/55">
                        Ainda não tem acesso?{" "}
                        <a href="#comecar" className="font-semibold text-white transition-colors hover:text-gold">
                            Começar agora
                        </a>
                    </p>
                </form>
            </div>
        </main>
    );
}

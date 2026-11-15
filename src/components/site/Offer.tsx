import { LuCheck } from "react-icons/lu";

/** Preencha com os valores reais da oferta. Vazio aparece como espaço reservado. */
const investimento = "";
const pagamento = "";
/** Prazo real de acesso, se já estiver definido. Vazio permanece em aberto. */
const acesso = "";

const inclusos = [
    "Treinamento Método Trader, do fundamento à aplicação.",
    "Aulas práticas de estratégia, leitura de gráfico e plano operacional.",
    "Gestão de risco e controle emocional.",
    acesso
        ? `Acesso às aulas: ${acesso}.`
        : "Acesso às aulas — prazo a definir.",
    "Suporte e acompanhamento.",
] as const;

export default function Offer() {
    return (
        <section
            id="inscricao"
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                        Treinamento
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                        Método Trader
                    </h2>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
                        Curso de mercado financeiro para quem parte do absoluto zero.
                    </p>

                    <ul className="mt-8 space-y-3.5">
                        {inclusos.map((item) => (
                            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pine text-black">
                                    <LuCheck className="size-3" aria-hidden="true" />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:pl-8">
                    <p className="text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">
                        Investimento
                    </p>
                    <p className="mt-3 font-display text-5xl font-semibold tracking-wide text-gold sm:text-6xl">
                        {investimento || "R$ —"}
                    </p>
                    <p className="mt-8 text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">
                        Condições de pagamento
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                        {pagamento || "A definir"}
                    </p>

                    <a
                        href="#comecar"
                        className="mt-10 inline-flex items-center gap-3 rounded-full bg-pine px-7 py-3.5 text-sm font-bold tracking-[0.08em] text-black uppercase shadow-[0_10px_24px_rgba(31,191,106,0.35)] transition-colors hover:bg-[#3ad484]"
                    >
                        Quero garantir minha vaga
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

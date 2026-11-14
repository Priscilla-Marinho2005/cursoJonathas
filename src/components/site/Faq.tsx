import { useState } from "react";
import { LuPlus } from "react-icons/lu";

const perguntas = [
    {
        question: "Preciso ter experiência para começar?",
        answer: "Não. O Método Trader foi pensado para quem começa no mercado financeiro do absoluto zero.",
    },
    {
        question: "Como funciona o acesso ao curso?",
        answer: "Depois da inscrição, você recebe o acesso às aulas do treinamento.",
    },
    {
        question: "Por quanto tempo terei acesso?",
        answer: "O prazo de acesso ainda será informado na oferta.",
    },
    {
        question: "O curso possui suporte?",
        answer: "Sim. O treinamento inclui suporte e acompanhamento.",
    },
    {
        question: "Preciso ter muito dinheiro para começar?",
        answer: "Não há um valor mínimo de capital definido nesta página. O curso trata de gestão de risco para você operar com o que decidir destinar.",
    },
    {
        question: "O curso garante ganhos financeiros?",
        answer: "Não. O método ensina estratégia, disciplina e gestão de risco. Resultado financeiro não é garantido.",
    },
] as const;

export default function Faq() {
    const [aberto, setAberto] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto max-w-3xl">
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                    Perguntas frequentes
                </p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                    Dúvidas antes de começar
                </h2>

                <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
                    {perguntas.map((item, index) => {
                        const abertoAgora = aberto === index;

                        return (
                            <div key={item.question}>
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between gap-6 py-5 text-left cursor-pointer"
                                    aria-expanded={abertoAgora}
                                    onClick={() => setAberto(abertoAgora ? null : index)}
                                >
                                    <span className="text-base font-semibold text-white sm:text-lg">
                                        {item.question}
                                    </span>
                                    <LuPlus
                                        className={`size-4 shrink-0 text-gold transition-transform ${abertoAgora ? "rotate-45" : ""}`}
                                        aria-hidden="true"
                                    />
                                </button>
                                {abertoAgora ? (
                                    <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-white/70">
                                        {item.answer}
                                    </p>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

import { useEffect, useRef, useState } from "react";

const antes = "Você não precisa começar no mercado financeiro ";
const destaque = "sem direção.";
const frase = antes + destaque;

const dificuldades = [
    {
        numero: "01",
        antes: "Não sabe por onde ",
        destaque: "começar.",
        depois: "",
    },
    {
        numero: "02",
        antes: "Opera sem ",
        destaque: "estratégia",
        depois: " definida.",
    },
    {
        numero: "03",
        antes: "Não entende ",
        destaque: "gerenciamento de risco.",
        depois: "",
    },
    {
        numero: "04",
        antes: "Age por ",
        destaque: "impulso",
        depois: " e emoção.",
    },
] as const;

function TituloDigitando() {
    const tituloRef = useRef<HTMLHeadingElement>(null);
    const [quantidade, setQuantidade] = useState(0);
    const [digitando, setDigitando] = useState(false);

    useEffect(() => {
        const titulo = tituloRef.current;
        if (!titulo) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setQuantidade(frase.length);
            return;
        }

        const observador = new IntersectionObserver(
            ([entrada]) => {
                if (entrada.isIntersecting) {
                    setQuantidade(0);
                    setDigitando(true);
                    return;
                }

                setDigitando(false);
            },
            { threshold: 0.6 },
        );

        observador.observe(titulo);
        return () => observador.disconnect();
    }, []);

    useEffect(() => {
        if (!digitando || quantidade >= frase.length) return;

        const tempo = window.setTimeout(() => setQuantidade((atual) => atual + 1), 42);
        return () => window.clearTimeout(tempo);
    }, [digitando, quantidade]);

    return (
        <h2
            ref={tituloRef}
            aria-label={frase}
            className="mx-auto max-w-4xl text-center font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]"
        >
            {frase.split("").map((letra, indice) => {
                const apareceu = indice < quantidade;
                const dourada = indice >= antes.length;
                const cursor = indice === Math.max(quantidade - 1, 0);

                return (
                    <span
                        key={indice}
                        aria-hidden="true"
                        className={`${apareceu ? "" : "invisible"} ${apareceu && dourada ? "text-gold" : ""} ${
                            cursor ? "border-r-2 border-current animate-caret" : ""
                        }`}
                    >
                        {letra}
                    </span>
                );
            })}
        </h2>
    );
}

export default function Direction() {
    return (
        <section className="bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <TituloDigitando />

                <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                    {dificuldades.map((item) => (
                        <li
                            key={item.numero}
                            className="flex aspect-7/4 flex-col justify-between rounded-2xl border border-white/10 bg-black p-5"
                        >
                            <span className="font-display text-sm tracking-[0.22em] text-gold">
                                {item.numero}
                            </span>
                            <p className="text-[15px] leading-relaxed font-medium text-white/85">
                                {item.antes}
                                <span className="text-gold">{item.destaque}</span>
                                {item.depois}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

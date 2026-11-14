import {
    Children,
    useCallback,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

const TRANSICAO_MS = 850;

type SectionDeckProps = {
    children: ReactNode;
};

export default function SectionDeck({ children }: SectionDeckProps) {
    const slides = Children.toArray(children);
    const total = slides.length;
    const [indice, setIndice] = useState(0);
    const [altura, setAltura] = useState(() => window.innerHeight);
    const indiceRef = useRef(0);
    const travado = useRef(false);
    const soltar = useRef<number | null>(null);
    const gesto = useRef(0);
    const pendente = useRef(0);
    const raizRef = useRef<HTMLDivElement>(null);
    const toqueY = useRef<number | null>(null);
    const irParaRef = useRef<(proximo: number) => void>(() => {});

    const segurar = useCallback(() => {
        travado.current = true;
        if (soltar.current) window.clearTimeout(soltar.current);
        soltar.current = window.setTimeout(() => {
            travado.current = false;
            const direcao = pendente.current;
            pendente.current = 0;
            if (!direcao) return;

            gesto.current = direcao;
            irParaRef.current(indiceRef.current + direcao);
        }, TRANSICAO_MS);
    }, []);

    const irPara = useCallback(
        (proximo: number) => {
            const destino = Math.max(0, Math.min(total - 1, proximo));
            if (destino === indiceRef.current || travado.current) return;

            indiceRef.current = destino;
            setIndice(destino);
            segurar();
        },
        [segurar, total],
    );

    irParaRef.current = irPara;

    const avancar = useCallback((direcao: number) => {
        if (travado.current) {
            pendente.current = direcao === gesto.current ? 0 : direcao;
            return;
        }

        gesto.current = direcao;
        pendente.current = 0;
        irParaRef.current(indiceRef.current + direcao);
    }, []);

    const indiceDoHash = useCallback((hash: string) => {
        const raiz = raizRef.current;
        if (!raiz || hash.length < 2) return -1;

        const id = decodeURIComponent(hash.slice(1));
        const alvos = raiz.querySelectorAll<HTMLElement>("[data-slide]");

        for (let i = 0; i < alvos.length; i += 1) {
            if (alvos[i].querySelector(`#${CSS.escape(id)}`)) return i;
        }

        return -1;
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        const overflowHtml = html.style.overflow;
        const overflowBody = document.body.style.overflow;
        html.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        const medir = () => setAltura(raizRef.current?.clientHeight || window.innerHeight);
        medir();
        window.addEventListener("resize", medir);

        const inicial = indiceDoHash(window.location.hash);
        if (inicial > 0) {
            indiceRef.current = inicial;
            setIndice(inicial);
        }

        return () => {
            window.removeEventListener("resize", medir);
            html.style.overflow = overflowHtml;
            document.body.style.overflow = overflowBody;
        };
    }, [indiceDoHash]);

    useEffect(() => {
        const podeRolarPorDentro = (direcao: number) => {
            const slide = raizRef.current?.querySelectorAll<HTMLElement>("[data-slide]")[
                indiceRef.current
            ];
            if (!slide) return false;

            const noTopo = slide.scrollTop <= 1;
            const noFim = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 2;

            return (direcao > 0 && !noFim) || (direcao < 0 && !noTopo);
        };

        const aoRolar = (evento: WheelEvent) => {
            if (Math.abs(evento.deltaX) > Math.abs(evento.deltaY)) return;

            const direcao = evento.deltaY > 0 ? 1 : -1;
            if (podeRolarPorDentro(direcao)) return;

            evento.preventDefault();
            if (Math.abs(evento.deltaY) < 12) return;
            avancar(direcao);
        };

        const aoTeclar = (evento: KeyboardEvent) => {
            const alvo = evento.target as HTMLElement | null;
            if (alvo && (alvo.tagName === "INPUT" || alvo.tagName === "TEXTAREA" || alvo.isContentEditable)) {
                return;
            }

            const desce = ["ArrowDown", "PageDown", " "].includes(evento.key);
            const sobe = ["ArrowUp", "PageUp"].includes(evento.key);
            if (!desce && !sobe) return;

            const direcao = desce ? 1 : -1;
            if (podeRolarPorDentro(direcao)) return;

            evento.preventDefault();
            avancar(direcao);
        };

        const aoToqueInicio = (evento: TouchEvent) => {
            toqueY.current = evento.touches[0]?.clientY ?? null;
        };

        const aoToqueFim = (evento: TouchEvent) => {
            if (toqueY.current == null) return;
            const fim = evento.changedTouches[0]?.clientY;
            if (fim == null) return;

            const deslocamento = toqueY.current - fim;
            toqueY.current = null;
            if (Math.abs(deslocamento) < 48) return;

            const direcao = deslocamento > 0 ? 1 : -1;
            if (podeRolarPorDentro(direcao)) return;
            avancar(direcao);
        };

        const aoClicar = (evento: MouseEvent) => {
            const link = (evento.target as Element | null)?.closest("a[href^='#']");
            if (!link) return;

            const hash = link.getAttribute("href");
            if (!hash) return;

            const destino = indiceDoHash(hash);
            if (destino < 0) return;

            evento.preventDefault();
            travado.current = false;
            pendente.current = 0;
            irPara(destino);
            window.history.replaceState(null, "", hash);
        };

        window.addEventListener("wheel", aoRolar, { passive: false });
        window.addEventListener("keydown", aoTeclar);
        window.addEventListener("touchstart", aoToqueInicio, { passive: true });
        window.addEventListener("touchend", aoToqueFim);
        document.addEventListener("click", aoClicar);

        return () => {
            window.removeEventListener("wheel", aoRolar);
            window.removeEventListener("keydown", aoTeclar);
            window.removeEventListener("touchstart", aoToqueInicio);
            window.removeEventListener("touchend", aoToqueFim);
            document.removeEventListener("click", aoClicar);
        };
    }, [avancar, indiceDoHash, irPara]);

    return (
        <div ref={raizRef} className="relative h-dvh overflow-hidden bg-black">
            <div className="relative h-full">
                {slides.map((slide, posicao) => (
                    <div
                        key={posicao}
                        data-slide
                        inert={posicao !== indice}
                        aria-hidden={posicao !== indice}
                        className="deck-slide absolute inset-0 flex flex-col overflow-y-auto overscroll-contain"
                        style={{ transform: `translate3d(0, ${(posicao - indice) * altura}px, 0)` }}
                    >
                        <div className="my-auto w-full shrink-0">{slide}</div>
                    </div>
                ))}
            </div>

            <nav
                aria-label="Seções da página"
                className="absolute top-1/2 right-3 z-20 flex -translate-y-1/2 flex-col gap-2 sm:right-5"
            >
                {slides.map((_, posicao) => (
                    <button
                        key={posicao}
                        type="button"
                        aria-label={`Ir para a seção ${posicao + 1}`}
                        aria-current={posicao === indice ? "true" : undefined}
                        onClick={() => {
                            travado.current = false;
                            pendente.current = 0;
                            irPara(posicao);
                        }}
                        className={`size-2 rounded-full transition-all ${
                            posicao === indice
                                ? "scale-125 bg-gold"
                                : "bg-white/35 hover:bg-white/70"
                        }`}
                    />
                ))}
            </nav>
        </div>
    );
}

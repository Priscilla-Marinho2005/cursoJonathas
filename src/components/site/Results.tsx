import { LuPlay } from "react-icons/lu";

/** Preencha com o material real. Texto vazio permanece como espaço reservado. */
const videos = [
    { src: "", label: "Vídeo do aluno" },
    { src: "", label: "Vídeo do aluno" },
    { src: "", label: "Vídeo do aluno" },
    { src: "", label: "Vídeo do aluno" },
] as const;

const depoimentos = [
    { quote: "", name: "", context: "" },
    { quote: "", name: "", context: "" },
    { quote: "", name: "", context: "" },
] as const;

export default function Results() {
    return (
        <section
            id="resultados"
            className="border-t border-white/8 bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
        >
            <div className="mx-auto max-w-6xl">
                <p className="text-[11px] font-semibold tracking-[0.32em] text-gold uppercase">
                    Resultados e depoimentos
                </p>
                <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                    O método na prática.{" "}
                    <span className="text-gold">Experiências reais.</span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                    Vídeos e relatos de alunos entram aqui quando o material estiver pronto.
                </p>

                <ul className="mt-12 flex gap-4 overflow-x-auto pb-2 lg:mt-16">
                    {videos.map((video, index) => (
                        <li key={index} className="w-40 shrink-0 sm:w-69">
                            <div className="relative aspect-9/16 overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/4">
                                {video.src ? (
                                    <video
                                        className="size-full object-cover"
                                        src={video.src}
                                        controls
                                        playsInline
                                        preload="metadata"
                                    />
                                ) : (
                                    <div className="flex size-full flex-col items-center justify-center gap-4 px-4 text-center">
                                        <span className="grid size-12 place-items-center rounded-full border border-gold/40 bg-black/40 text-gold">
                                            <LuPlay className="size-4 translate-x-px" aria-hidden="true" />
                                        </span>
                                        <p className="text-[13px] leading-snug font-medium text-white/55">
                                            {video.label}
                                            <span className="mt-1 block text-[11px] tracking-[0.16em] uppercase">
                                                Espaço {index + 1}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <ul className="mt-8 grid gap-4 lg:grid-cols-3">
                    {depoimentos.map((item, index) => (
                        <li
                            key={index}
                            className="flex min-h-52 flex-col rounded-2xl border border-dashed border-white/15 bg-white/3 px-5 py-6"
                        >
                            {item.quote ? (
                                <>
                                    <p className="text-[15px] leading-relaxed text-white/85">“{item.quote}”</p>
                                    <p className="mt-auto pt-6 text-sm font-semibold text-white">{item.name}</p>
                                    {item.context ? (
                                        <p className="mt-1 text-[13px] text-white/50">{item.context}</p>
                                    ) : null}
                                </>
                            ) : (
                                <div className="flex flex-1 flex-col justify-between">
                                    <p className="font-display text-lg tracking-wide text-white/35 uppercase">
                                        Depoimento
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-white/45">
                                        Espaço reservado para um relato real de aluno.
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

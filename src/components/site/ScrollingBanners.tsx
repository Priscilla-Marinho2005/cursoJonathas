const PHRASE_COUNT = 12;

type BannerTrackProps = {
    duration: string;
};

type ScrollingBannersProps = {
    className?: string;
};

function Phrase() {
    return (
        <span className="inline-flex items-center gap-4 px-5 text-sm font-bold tracking-[0.18em] uppercase sm:gap-5 sm:px-6 sm:text-base md:tracking-[0.22em]">
            <span className="text-white">Antes do leilão</span>
            <span className="text-[#ff6b00]">+</span>
            <span className="text-[#ff6b00]">Dinheiro na mão</span>
            <span className="text-[#ff6b00]" aria-hidden="true">
                ✦
            </span>
        </span>
    );
}

function PhraseSequence() {
    return (
        <span className="flex shrink-0">
            {Array.from({ length: PHRASE_COUNT }, (_, index) => (
                <Phrase key={index} />
            ))}
        </span>
    );
}

function BannerTrack({ duration }: BannerTrackProps) {
    return (
        <div className="overflow-hidden bg-black py-2.5 sm:py-3" aria-hidden="true">
            {/*
              A sequência é renderizada duas vezes. A animação desloca
              exatamente metade da trilha (-50%), então o loop não deixa vão.
            */}
            <div
                className="flex w-max animate-marquee will-change-transform motion-reduce:animate-none"
                style={{ animationDuration: duration }}
            >
                <PhraseSequence />
                <PhraseSequence />
            </div>
        </div>
    );
}

export default function ScrollingBanners({ className = "" }: ScrollingBannersProps) {
    return (
        <section
            className={`relative overflow-hidden bg-zinc-900 py-12 sm:py-16 ${className}`}
            aria-label="Antes do leilão, dinheiro na mão"
        >
            {/* A faixa de baixo é mais lenta para criar uma leve diferença de profundidade. */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className="mx-[-12vw] rotate-[-10deg]">
                    <BannerTrack duration="26s" />
                </div>
                <div className="mx-[-12vw] rotate-[-10deg]">
                    <BannerTrack duration="36s" />
                </div>
            </div>
        </section>
    );
}

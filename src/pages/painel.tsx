import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
    LuBell,
    LuCheck,
    LuChevronDown,
    LuChevronLeft,
    LuChevronRight,
    LuGraduationCap,
    LuHeadset,
    LuHouse,
    LuInstagram,
    LuLogOut,
    LuPlay,
    LuSearch,
    LuStar,
    LuUser,
    LuX,
} from "react-icons/lu";

type AulaItem = {
    id: string;
    titulo: string;
    concluida: boolean;
};

type Modulo = {
    id: string;
    titulo: string;
    resumo: string;
    aulas: AulaItem[];
};

const modulosIniciais: Modulo[] = [
    {
        id: "boas-vindas",
        titulo: "Boas-vindas",
        resumo: "Boas-vindas",
        aulas: [
            { id: "boas-vindas", titulo: "Boas-vindas ao método", concluida: true },
            { id: "como-estudar", titulo: "Como estudar as aulas", concluida: true },
        ],
    },
    {
        id: "leitura",
        titulo: "Módulo 01 - Leitura de mercado",
        resumo: "Módulo 1 · Leitura de mercado",
        aulas: [
            { id: "preco", titulo: "O que move o preço", concluida: true },
            { id: "tendencia", titulo: "Tendência e lateralização", concluida: false },
            { id: "suporte", titulo: "Suporte e resistência", concluida: false },
            { id: "candles", titulo: "Leitura de candles", concluida: false },
            { id: "contexto", titulo: "Contexto do gráfico", concluida: false },
            { id: "horarios", titulo: "Horários do mercado", concluida: false },
        ],
    },
    {
        id: "risco",
        titulo: "Módulo 02 - Gestão de risco",
        resumo: "Módulo 2 · Gestão de risco",
        aulas: [
            { id: "risco", titulo: "Definir o risco da operação", concluida: false },
            { id: "stop", titulo: "Stop, alvo e tamanho", concluida: false },
            { id: "emocional", titulo: "Controle emocional", concluida: false },
        ],
    },
];

const curso = {
    titulo: "Curso de Mercado Financeiro - Método Trader",
};

const menu = [
    { id: "inicio", label: "Início", icon: LuHouse },
    { id: "conta", label: "Minha Conta", icon: LuUser },
    { id: "certificados", label: "Certificados", icon: LuGraduationCap },
    { id: "instagram", label: "Instagram", icon: LuInstagram },
    { id: "suporte", label: "Suporte", icon: LuHeadset },
] as const;

type Secao = (typeof menu)[number]["id"];

function nomeDoAluno() {
    const email = sessionStorage.getItem("aluno-email") ?? "";
    const base = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();
    if (!base) return "Aluno";
    return base.replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function aulasDoCurso(modulos: Modulo[]) {
    return modulos.flatMap((modulo) => modulo.aulas.map((aula) => ({ ...aula, modulo })));
}

function progressoDe(modulos: Modulo[]) {
    const aulas = aulasDoCurso(modulos);
    const concluidas = aulas.filter((aula) => aula.concluida).length;
    return Math.round((concluidas / aulas.length) * 100);
}

export default function Painel() {
    const [secao, setSecao] = useState<Secao>("inicio");
    const [busca, setBusca] = useState("");
    const [menuAberto, setMenuAberto] = useState(false);
    const [modulos, setModulos] = useState(modulosIniciais);
    const [aulaId, setAulaId] = useState<string | null>(null);
    const aluno = useMemo(() => nomeDoAluno(), []);
    const progresso = progressoDe(modulos);
    const pendente = aulasDoCurso(modulos).find((aula) => !aula.concluida);
    const cursoVisivel = curso.titulo.toLowerCase().includes(busca.trim().toLowerCase());

    function pesquisar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setAulaId(null);
        setSecao("inicio");
    }

    function sair() {
        sessionStorage.removeItem("aluno-email");
        window.location.hash = "#inicio";
    }

    function abrirCurso() {
        setSecao("inicio");
        setAulaId(pendente?.id ?? aulasDoCurso(modulos)[0]?.id ?? null);
    }

    function irParaInicio() {
        setAulaId(null);
        setSecao("inicio");
    }

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-[#0c0c0c] text-white">
            <header className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-[#101010] px-4 sm:gap-6 sm:px-6">
                <a href="#inicio" className="flex shrink-0 items-center gap-2.5 leading-none">
                    <img src="/logo.png" alt="" className="w-7" />
                    <span>
                        <p className="font-display text-sm tracking-[0.14em] uppercase sm:text-base">Método</p>
                        <p className="text-[10px] font-semibold tracking-[0.22em] text-white/55 uppercase">Trader</p>
                    </span>
                </a>

                <form onSubmit={pesquisar} className="mx-auto hidden w-full max-w-xl md:block">
                    <label className="relative block">
                        <span className="sr-only">Pesquisar cursos e aulas</span>
                        <input
                            value={busca}
                            onChange={(evento) => setBusca(evento.target.value)}
                            placeholder="Pesquisar cursos e aulas..."
                            className="w-full rounded-full border border-white/10 bg-[#1a1a1a] py-2.5 pr-11 pl-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-pine/60"
                        />
                        <button
                            type="submit"
                            aria-label="Pesquisar"
                            className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-full text-white/55 transition-colors hover:text-white"
                        >
                            <LuSearch className="size-4" />
                        </button>
                    </label>
                </form>

                <div className="ml-auto flex items-center gap-2 sm:gap-4">
                    <button
                        type="button"
                        aria-label="Notificações"
                        className="grid size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <LuBell className="size-5" />
                    </button>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setMenuAberto((aberto) => !aberto)}
                            className="flex items-center gap-2 rounded-full py-1 pr-1 pl-1 text-sm transition-colors hover:bg-white/5 sm:pr-2"
                            aria-expanded={menuAberto}
                            aria-haspopup="menu"
                        >
                            <span className="grid size-8 place-items-center rounded-full bg-white/10 text-white/80">
                                <LuUser className="size-4" />
                            </span>
                            <span className="hidden max-w-32 truncate font-medium sm:inline">{aluno}</span>
                            <LuChevronDown className="hidden size-4 text-white/50 sm:block" />
                        </button>

                        {menuAberto ? (
                            <div
                                role="menu"
                                className="absolute top-12 right-0 z-20 w-44 rounded-xl border border-white/10 bg-[#171717] p-1.5 shadow-2xl"
                            >
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={sair}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/5"
                                >
                                    <LuLogOut className="size-4" />
                                    Sair
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </header>

            <div className="flex min-h-0 flex-1">
                <aside
                    className={`flex shrink-0 flex-col border-r border-white/10 bg-[#111111] ${
                        aulaId ? "w-18" : "w-23 sm:w-57.5"
                    }`}
                >
                    <div className={`px-3 pt-6 text-center ${aulaId ? "" : "sm:px-6"}`}>
                        <span className="mx-auto grid size-9 place-items-center rounded-full border border-white/15 bg-[#1c1c1c] text-white/45">
                            <LuUser className="size-4" />
                        </span>
                        {aulaId ? null : (
                            <>
                                <p className="mt-3 hidden text-sm font-medium sm:block">{aluno}</p>
                                <p className="mt-4 hidden text-left text-[11px] font-semibold tracking-[0.16em] text-pine uppercase sm:block">
                                    Seu progresso
                                </p>
                                <div className="mt-2 hidden h-1.5 overflow-hidden rounded-full bg-white/10 sm:block">
                                    <div className="h-full rounded-full bg-pine" style={{ width: `${progresso}%` }} />
                                </div>
                            </>
                        )}
                    </div>

                    <nav aria-label="Área do aluno" className="mt-6 flex flex-col gap-1 px-2">
                        {menu.map((item) => {
                            const Icone = item.icon;
                            const ativo = !aulaId && secao === item.id;
                            if (item.id === "instagram") {
                                return (
                                    <a
                                        key={item.id}
                                        href="https://www.instagram.com/jonathasluz__/"
                                        target="_blank"
                                        rel="noreferrer"
                                        title={item.label}
                                        className="flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white sm:justify-start"
                                    >
                                        <Icone className="size-5 shrink-0" />
                                        {aulaId ? null : <span className="hidden sm:inline">{item.label}</span>}
                                    </a>
                                );
                            }
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    title={item.label}
                                    onClick={() => {
                                        if (item.id === "inicio") irParaInicio();
                                        else {
                                            setAulaId(null);
                                            setSecao(item.id);
                                        }
                                    }}
                                    className={`flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors sm:justify-start ${
                                        ativo
                                            ? "bg-pine/10 font-semibold text-pine"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <Icone className="size-5 shrink-0" />
                                    {aulaId ? null : <span className="hidden sm:inline">{item.label}</span>}
                                </button>
                            );
                        })}
                    </nav>

                    {aulaId ? null : (
                        <div className="mt-auto hidden space-y-2 px-6 py-6 text-xs text-white/40 sm:block">
                            <a href="#inicio" className="block transition-colors hover:text-white">
                                Suporte para Alunos
                            </a>
                            <a href="#inicio" className="block transition-colors hover:text-white">
                                Termos de Uso
                            </a>
                        </div>
                    )}
                </aside>

                <main className={`min-w-0 flex-1 ${aulaId ? "overflow-y-auto lg:overflow-hidden" : "overflow-y-auto"}`}>
                    {aulaId ? (
                        <Aula
                            modulos={modulos}
                            aulaId={aulaId}
                            progresso={progresso}
                            onEscolher={setAulaId}
                            onConcluir={(id) => {
                                setModulos((atual) =>
                                    atual.map((modulo) => ({
                                        ...modulo,
                                        aulas: modulo.aulas.map((aula) =>
                                            aula.id === id ? { ...aula, concluida: true } : aula,
                                        ),
                                    })),
                                );
                            }}
                            onFechar={irParaInicio}
                        />
                    ) : secao === "inicio" ? (
                        <Inicio
                            busca={busca}
                            cursoVisivel={cursoVisivel}
                            progresso={progresso}
                            resumo={pendente?.modulo.resumo ?? "Curso concluído"}
                            onAbrir={abrirCurso}
                        />
                    ) : (
                        <PainelSimples
                            titulo={menu.find((item) => item.id === secao)?.label ?? ""}
                            texto={
                                secao === "conta"
                                    ? "Aqui ficam os dados da sua inscrição e o acesso ao curso."
                                    : secao === "certificados"
                                      ? "Seu certificado aparece aqui quando você concluir o curso."
                                      : "Fale com a equipe pelo suporte da área do aluno."
                            }
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

function Inicio({
    busca,
    cursoVisivel,
    progresso,
    resumo,
    onAbrir,
}: {
    busca: string;
    cursoVisivel: boolean;
    progresso: number;
    resumo: string;
    onAbrir: () => void;
}) {
    return (
        <div className="pb-12">
            <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(31,191,106,0.35),transparent_42%),linear-gradient(105deg,#063226_0%,#0a1c18_48%,#07110f_100%)] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
                <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <h1 className="max-w-xl font-display text-3xl leading-[0.95] tracking-[0.04em] uppercase sm:text-5xl">
                            O método para operar o mercado financeiro.
                        </h1>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                            Curso completo, com aulas práticas e estratégias para acelerar seus resultados no mercado.
                        </p>
                    </div>
                    <div className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-white/25 bg-black/25 px-6 text-center text-sm font-medium tracking-wide text-white/70 sm:min-h-52">
                        Imagem de apresentação do curso
                    </div>
                </div>
            </section>

            <section className="relative z-10 -mt-8 px-4 sm:-mt-10 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-base font-semibold sm:text-lg">Continuar progresso</h2>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                aria-label="Anterior"
                                className="grid size-8 place-items-center rounded-full border border-white/10 text-white/60"
                            >
                                <LuChevronLeft className="size-4" />
                            </button>
                            <button
                                type="button"
                                aria-label="Próximo"
                                className="grid size-8 place-items-center rounded-full border border-white/10 text-white/60"
                            >
                                <LuChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>

                    <button type="button" onClick={onAbrir} className="block w-full max-w-xs text-left">
                        <div className="grid h-28 place-items-center rounded-xl bg-[linear-gradient(145deg,#10281c,#0c0c0c)] px-4 text-center">
                            <p className="font-display text-2xl tracking-[0.12em] text-white uppercase">Método Trader</p>
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-pine" style={{ width: `${progresso}%` }} />
                        </div>
                        <p className="mt-2 text-xs font-semibold tracking-[0.08em] text-white/80 uppercase">{resumo}</p>
                    </button>
                </div>
            </section>

            <section className="px-4 pt-8 sm:px-6 lg:px-8">
                <h2 className="text-lg font-semibold sm:text-xl">Seus cursos</h2>

                {cursoVisivel ? (
                    <button
                        type="button"
                        onClick={onAbrir}
                        className="mt-4 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] text-left sm:flex-row"
                    >
                        <div className="grid min-h-36 place-items-center bg-[linear-gradient(160deg,#145c38,#0c0c0c)] px-6 sm:w-64">
                            <p className="font-display text-2xl tracking-[0.14em] uppercase">Método Trader</p>
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-5">
                            <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">Disponível</p>
                            <h3 className="mt-2 text-lg font-semibold leading-snug">{curso.titulo}</h3>
                            <p className="mt-2 text-sm text-white/60">
                                Aulas em vídeo para operar com método, risco e leitura de mercado.
                            </p>
                            <span className="mt-4 w-fit rounded-sm bg-pine px-4 py-2.5 text-xs font-bold tracking-[0.08em] text-black uppercase">
                                Acessar curso
                            </span>
                        </div>
                    </button>
                ) : (
                    <p className="mt-4 text-sm text-white/55">Nenhum curso encontrado para “{busca.trim()}”.</p>
                )}
            </section>
        </div>
    );
}

function Aula({
    modulos,
    aulaId,
    progresso,
    onEscolher,
    onConcluir,
    onFechar,
}: {
    modulos: Modulo[];
    aulaId: string;
    progresso: number;
    onEscolher: (id: string) => void;
    onConcluir: (id: string) => void;
    onFechar: () => void;
}) {
    const aulas = aulasDoCurso(modulos);
    const atual = aulas.find((aula) => aula.id === aulaId) ?? aulas[0];
    const indice = aulas.findIndex((aula) => aula.id === atual.id);
    const proxima = aulas[indice + 1];
    const [abertos, setAbertos] = useState<string[]>([atual.modulo.id]);
    const [nota, setNota] = useState(0);

    useEffect(() => {
        setAbertos((lista) => (lista.includes(atual.modulo.id) ? lista : [...lista, atual.modulo.id]));
        setNota(0);
    }, [atual.id, atual.modulo.id]);

    function concluirEAvancar() {
        onConcluir(atual.id);
        if (proxima) onEscolher(proxima.id);
    }

    return (
        <div className="flex min-h-full flex-col bg-[#0c0c0c] lg:h-full lg:min-h-0 lg:flex-row">
            <section className="flex min-w-0 flex-1 flex-col">
                <div className="relative grid min-h-60 flex-1 place-items-center bg-[radial-gradient(circle_at_center,rgba(31,191,106,0.16),transparent_46%),linear-gradient(180deg,#121212,#080808)] sm:min-h-80">
                    <p className="absolute top-4 left-4 max-w-[70%] text-sm font-medium text-white/80">{curso.titulo}</p>
                    <div className="px-6 text-center">
                        <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/10 text-white">
                            <LuPlay className="ml-1 size-7" />
                        </span>
                        <p className="mt-4 text-sm font-medium tracking-wide text-white/70">Vídeo da aula</p>
                    </div>
                    {proxima ? (
                        <button
                            type="button"
                            aria-label="Próxima aula"
                            onClick={() => onEscolher(proxima.id)}
                            className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-[#c6f34d] text-black"
                        >
                            <LuChevronRight className="size-5" />
                        </button>
                    ) : null}
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">{atual.titulo}</h1>
                        <p className="mt-1 text-sm text-white/55">Jonathas Luz</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={concluirEAvancar}
                            disabled={atual.concluida && !proxima}
                            className="inline-flex items-center gap-2 rounded-full bg-[#c6f34d] px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#d4ff62] disabled:cursor-default disabled:opacity-60"
                        >
                            <LuCheck className="size-4" />
                            {atual.concluida && !proxima ? "Concluída" : "Concluir e avançar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setNota((valor) => (valor >= 5 ? 0 : valor + 1))}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2.5 text-sm text-white/80"
                            aria-label={`Avaliação ${nota} de 5`}
                        >
                            <LuStar className={`size-4 ${nota > 0 ? "fill-[#c6f34d] text-[#c6f34d]" : ""}`} />
                            {nota}/5
                        </button>
                        <button
                            type="button"
                            onClick={onFechar}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5"
                        >
                            <LuX className="size-4" />
                            Fechar conteúdo
                        </button>
                    </div>
                </div>
            </section>

            <aside className="w-full shrink-0 border-t border-white/10 bg-[#101010] lg:w-85 lg:overflow-y-auto lg:border-t-0 lg:border-l">
                <div className="sticky top-0 z-10 border-b border-white/10 bg-[#101010] px-4 py-4">
                    <h2 className="text-sm font-bold tracking-[0.04em] uppercase">{curso.titulo}</h2>
                    <div className="mt-3 flex items-center gap-3">
                        <span className="text-xs text-white/55">Progresso total</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-[#c6f34d]" style={{ width: `${progresso}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-white/80">{progresso}%</span>
                    </div>
                </div>

                <div>
                    {modulos.map((modulo) => {
                        const feitas = modulo.aulas.filter((aula) => aula.concluida).length;
                        const aberto = abertos.includes(modulo.id);
                        return (
                            <div key={modulo.id} className="border-b border-white/10">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setAbertos((lista) =>
                                            lista.includes(modulo.id)
                                                ? lista.filter((id) => id !== modulo.id)
                                                : [...lista, modulo.id],
                                        )
                                    }
                                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                                    aria-expanded={aberto}
                                >
                                    <span>
                                        <span className="block text-xs font-bold tracking-[0.06em] uppercase">
                                            {modulo.titulo}
                                        </span>
                                        <span className="mt-1 block text-[11px] text-white/45">
                                            {feitas}/{modulo.aulas.length} concluídos
                                        </span>
                                    </span>
                                    <LuChevronDown
                                        className={`size-4 shrink-0 text-white/50 transition-transform ${aberto ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {aberto ? (
                                    <ul className="space-y-1 px-2 pb-3">
                                        {modulo.aulas.map((aula) => {
                                            const selecionada = aula.id === atual.id;
                                            return (
                                                <li key={aula.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() => onEscolher(aula.id)}
                                                        className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left ${
                                                            selecionada ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/5"
                                                        }`}
                                                    >
                                                        <span className="relative grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-[linear-gradient(145deg,#163226,#0c0c0c)]">
                                                            <LuPlay className="size-3.5 text-white/80" />
                                                            {aula.concluida ? (
                                                                <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-[#c6f34d] text-black">
                                                                    <LuCheck className="size-3" />
                                                                </span>
                                                            ) : null}
                                                        </span>
                                                        <span className="text-sm leading-snug text-white/85">{aula.titulo}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </aside>
        </div>
    );
}

function PainelSimples({ titulo, texto }: { titulo: string; texto: string }) {
    return (
        <section className="px-5 py-8 sm:px-8">
            <h1 className="font-display text-4xl tracking-[0.06em] uppercase">{titulo}</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">{texto}</p>
        </section>
    );
}

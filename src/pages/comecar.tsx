import { type FormEvent, type ReactNode, useState } from "react";
import { LuBarcode, LuCheck, LuCreditCard, LuLock, LuQrCode } from "react-icons/lu";

/** Preencha com o valor real. Vazio aparece como “a definir”. */
const investimento = "";

const inclusos = [
    "Treinamento Método Trader, do fundamento à aplicação.",
    "Aulas práticas de estratégia, leitura de gráfico e plano operacional.",
    "Gestão de risco e controle emocional.",
    "Suporte e acompanhamento.",
] as const;

const paises = [
    { codigo: "+55", nome: "Brasil", bandeira: "🇧🇷" },
    { codigo: "+351", nome: "Portugal", bandeira: "🇵🇹" },
    { codigo: "+1", nome: "Estados Unidos", bandeira: "🇺🇸" },
] as const;

type Metodo = "cartao" | "cartao-pix" | "dois-cartoes" | "boleto" | "pix";

type Cartao = {
    numero: string;
    mes: string;
    ano: string;
    cvv: string;
};

type Erros = Record<string, string>;

const cartaoVazio = (): Cartao => ({ numero: "", mes: "", ano: "", cvv: "" });

const metodos: { id: Metodo; rotulo: string; icone: ReactNode }[] = [
    { id: "cartao", rotulo: "Cartão", icone: <LuCreditCard className="size-4" /> },
    {
        id: "cartao-pix",
        rotulo: "Cartão + Pix",
        icone: (
            <span className="flex items-center gap-0.5">
                <LuCreditCard className="size-3.5" />
                <LuQrCode className="size-3.5" />
            </span>
        ),
    },
    {
        id: "dois-cartoes",
        rotulo: "Dois cartões",
        icone: (
            <span className="flex items-center -space-x-1">
                <LuCreditCard className="size-3.5" />
                <LuCreditCard className="size-3.5" />
            </span>
        ),
    },
    { id: "boleto", rotulo: "Boleto", icone: <LuBarcode className="size-4" /> },
    { id: "pix", rotulo: "Pix", icone: <LuQrCode className="size-4" /> },
];

function digitos(valor: string) {
    return valor.replace(/\D/g, "");
}

function mascaraDocumento(valor: string) {
    const numeros = digitos(valor).slice(0, 14);
    if (numeros.length <= 11) {
        return numeros
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return numeros
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
}

function mascaraTelefone(valor: string) {
    const numeros = digitos(valor).slice(0, 11);
    if (numeros.length <= 10) {
        return numeros.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d{1,4})$/, "$1-$2");
    }
    return numeros.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

function mascaraCartao(valor: string) {
    return digitos(valor)
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
}

function valorOuAberto(valor: string) {
    return valor.trim() || "A definir";
}

const campo =
    "w-full rounded-md border bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400";

export default function Comecar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [documento, setDocumento] = useState("");
    const [pais, setPais] = useState("+55");
    const [telefone, setTelefone] = useState("");
    const [metodo, setMetodo] = useState<Metodo>("cartao");
    const [cartao, setCartao] = useState<Cartao>(cartaoVazio);
    const [segundoCartao, setSegundoCartao] = useState<Cartao>(cartaoVazio);
    const [parcelas, setParcelas] = useState("1");
    const [salvar, setSalvar] = useState(true);
    const [erros, setErros] = useState<Erros>({});
    const [enviado, setEnviado] = useState(false);

    const pedeCartao = metodo === "cartao" || metodo === "cartao-pix" || metodo === "dois-cartoes";
    const anoAtual = new Date().getFullYear();

    function atualizarCartao(qual: "primeiro" | "segundo", campoCartao: keyof Cartao, valor: string) {
        const aplicar = qual === "primeiro" ? setCartao : setSegundoCartao;
        aplicar((atual) => ({
            ...atual,
            [campoCartao]: campoCartao === "numero" ? mascaraCartao(valor) : valor,
        }));
    }

    function validar() {
        const proximos: Erros = {};
        if (nome.trim().split(/\s+/).length < 2) proximos.nome = "Nome inválido";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) proximos.email = "E-mail inválido";
        const doc = digitos(documento);
        if (doc.length !== 11 && doc.length !== 14) proximos.documento = "CPF/CNPJ inválido";
        if (digitos(telefone).length < 10) proximos.telefone = "Telefone inválido";

        if (pedeCartao) {
            validarCartao(cartao, "cartao", proximos);
            if (metodo === "dois-cartoes") validarCartao(segundoCartao, "cartao2", proximos);
        }

        return proximos;
    }

    function pagar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const proximos = validar();
        setErros(proximos);
        if (Object.keys(proximos).length > 0) {
            setEnviado(false);
            return;
        }
        setCartao(cartaoVazio());
        setSegundoCartao(cartaoVazio());
        setEnviado(true);
    }

    return (
        <main className="min-h-dvh bg-black text-white">
            <header className="flex items-center justify-between gap-4 px-6 pt-5 sm:px-10">
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

            <div className="mx-auto w-full max-w-xl px-4 pt-10 pb-16 sm:px-6">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">Inscrição</p>
                <h1 className="mt-2 font-display text-4xl tracking-[0.04em] uppercase sm:text-5xl">Começar agora</h1>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                    Garanta sua vaga no Método Trader. O pagamento fica nesta mesma tela.
                </p>

                <section className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-5">
                    <p className="text-[11px] font-semibold tracking-[0.22em] text-white/45 uppercase">Você está levando</p>
                    <p className="mt-2 font-display text-2xl leading-tight tracking-[0.04em] uppercase">
                        Curso de Mercado Financeiro
                        <span className="mt-1 block">Método Trader</span>
                    </p>
                    <p className="mt-2 text-sm text-white/60">por Jonathas Luz</p>
                    <p className="mt-1 text-lg font-semibold text-gold">{valorOuAberto(investimento)}</p>
                    <ul className="mt-4 space-y-2.5">
                        {inclusos.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/80">
                                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pine text-black">
                                    <LuCheck className="size-3" aria-hidden="true" />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <form
                    onSubmit={pagar}
                    noValidate
                    className="mt-8 rounded-2xl bg-zinc-50 px-4 py-5 text-zinc-900 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-5"
                >
                    <Campo rotulo="Nome completo" erro={erros.nome}>
                        <input
                            value={nome}
                            onChange={(evento) => setNome(evento.target.value)}
                            autoComplete="name"
                            placeholder="Nome e sobrenome"
                            aria-invalid={Boolean(erros.nome)}
                            className={`${campo} ${erros.nome ? "border-red-500" : "border-zinc-300 focus:border-pine"}`}
                        />
                    </Campo>

                    <Campo rotulo="E-mail" erro={erros.email}>
                        <input
                            type="email"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                            autoComplete="email"
                            placeholder="voce@email.com"
                            aria-invalid={Boolean(erros.email)}
                            className={`${campo} ${erros.email ? "border-red-500" : "border-zinc-300 focus:border-pine"}`}
                        />
                    </Campo>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Campo rotulo="CPF/CNPJ" erro={erros.documento}>
                            <input
                                value={documento}
                                onChange={(evento) => setDocumento(mascaraDocumento(evento.target.value))}
                                inputMode="numeric"
                                autoComplete="off"
                                placeholder="000.000.000-00"
                                aria-invalid={Boolean(erros.documento)}
                                className={`${campo} ${erros.documento ? "border-red-500" : "border-zinc-300 focus:border-pine"}`}
                            />
                        </Campo>
                        <Campo rotulo="Telefone" erro={erros.telefone}>
                            <div
                                className={`flex overflow-hidden rounded-md border bg-white ${erros.telefone ? "border-red-500" : "border-zinc-300 focus-within:border-pine"}`}
                            >
                                <label className="sr-only" htmlFor="pais">
                                    País
                                </label>
                                <select
                                    id="pais"
                                    value={pais}
                                    onChange={(evento) => setPais(evento.target.value)}
                                    className="bg-white px-2 text-sm text-zinc-800 outline-none"
                                >
                                    {paises.map((item) => (
                                        <option key={item.codigo} value={item.codigo}>
                                            {item.bandeira} {item.codigo}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    value={telefone}
                                    onChange={(evento) => setTelefone(mascaraTelefone(evento.target.value))}
                                    inputMode="tel"
                                    autoComplete="tel"
                                    placeholder="Telefone"
                                    aria-invalid={Boolean(erros.telefone)}
                                    className="min-w-0 flex-1 px-2 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                                />
                            </div>
                        </Campo>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Forma de pagamento">
                        {metodos.map((item) => {
                            const ativo = metodo === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={ativo}
                                    onClick={() => setMetodo(item.id)}
                                    className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 text-center text-[11px] font-semibold leading-tight ${
                                        ativo
                                            ? "border-pine bg-pine/10 text-zinc-900"
                                            : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
                                    }`}
                                >
                                    {item.icone}
                                    {item.rotulo}
                                </button>
                            );
                        })}
                    </div>

                    {pedeCartao ? (
                        <div className="mt-4 space-y-4">
                            <BlocoCartao
                                titulo={metodo === "dois-cartoes" ? "Primeiro cartão" : "Cartão"}
                                prefixo="cartao"
                                dados={cartao}
                                erros={erros}
                                anoAtual={anoAtual}
                                onChange={(campoCartao, valor) => atualizarCartao("primeiro", campoCartao, valor)}
                            />
                            {metodo === "dois-cartoes" ? (
                                <BlocoCartao
                                    titulo="Segundo cartão"
                                    prefixo="cartao2"
                                    dados={segundoCartao}
                                    erros={erros}
                                    anoAtual={anoAtual}
                                    onChange={(campoCartao, valor) => atualizarCartao("segundo", campoCartao, valor)}
                                />
                            ) : null}
                            {metodo === "cartao-pix" ? (
                                <p className="text-xs leading-relaxed text-zinc-500">
                                    Parte do valor pode ser paga no Pix. A divisão fica disponível quando o preço da oferta estiver definido.
                                </p>
                            ) : null}
                        </div>
                    ) : (
                        <p className="mt-4 rounded-md border border-zinc-200 bg-white px-3 py-3 text-sm leading-relaxed text-zinc-600">
                            {metodo === "pix"
                                ? "O código Pix aparece depois da confirmação dos seus dados."
                                : "O boleto é gerado depois da confirmação dos seus dados."}
                        </p>
                    )}

                    <label className="mt-4 block text-xs font-medium text-zinc-600">
                        Parcelas
                        <select
                            value={parcelas}
                            onChange={(evento) => setParcelas(evento.target.value)}
                            className={`${campo} mt-1 border-zinc-300 focus:border-pine`}
                        >
                            <option value="1">
                                {investimento
                                    ? `1x de ${investimento}`
                                    : "1x — valor a definir"}
                            </option>
                            {investimento
                                ? null
                                : [3, 6, 12].map((vezes) => (
                                      <option key={vezes} value={String(vezes)}>
                                          {vezes}x — valor a definir
                                      </option>
                                  ))}
                        </select>
                    </label>

                    <label className="mt-4 flex items-start gap-2 text-sm text-zinc-700">
                        <input
                            type="checkbox"
                            checked={salvar}
                            onChange={(evento) => setSalvar(evento.target.checked)}
                            className="mt-0.5 accent-pine"
                        />
                        Salvar dados para as próximas compras
                    </label>
                    <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
                        <LuLock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                        Protegemos seus dados de pagamento com criptografia para sua segurança.
                    </p>

                    <div className="mt-5 rounded-lg border border-zinc-300 bg-white px-3 py-3">
                        <div className="flex items-start gap-3">
                            <img src="/logo.png" alt="" className="mt-0.5 w-10 shrink-0 rounded-sm bg-black p-1" />
                            <p className="text-sm leading-snug text-zinc-900">
                                <span className="block font-semibold">Curso de</span>
                                <span className="block font-semibold">Mercado Financeiro - Método Trader</span>
                                <span className="mt-1 block text-zinc-500">por: Jonathas Luz</span>
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-5 w-full rounded-md bg-pine py-3.5 text-sm font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#3ad484]"
                    >
                        Pagar agora
                    </button>

                    {enviado ? (
                        <p className="mt-4 text-center text-sm text-zinc-700" role="status">
                            {`Dados conferidos. A cobrança ainda será conectada e nenhum pagamento foi realizado.${
                                salvar && pedeCartao
                                    ? " Os dados do cartão não ficam salvos neste navegador."
                                    : ""
                            }`}
                        </p>
                    ) : null}
                </form>
            </div>
        </main>
    );
}

function Campo({
    rotulo,
    erro,
    children,
    alinhado = false,
}: {
    rotulo: string;
    erro?: string;
    children: ReactNode;
    alinhado?: boolean;
}) {
    return (
        <label className={`${alinhado ? "" : "mt-3 first:mt-0"} block text-xs font-medium text-zinc-600`}>
            <span className={`mb-1 flex items-center justify-between gap-2 ${alinhado ? "min-h-8" : ""}`}>
                {rotulo}
                {erro ? <span className="font-semibold text-red-600">{erro}</span> : null}
            </span>
            {children}
        </label>
    );
}

function validarCartao(dados: Cartao, prefixo: string, erros: Erros) {
    if (digitos(dados.numero).length < 13) erros[`${prefixo}-numero`] = "Número do cartão inválido";
    if (!dados.mes) erros[`${prefixo}-mes`] = "Mês inválido";
    if (!dados.ano) erros[`${prefixo}-ano`] = "Ano inválido";
    if (digitos(dados.cvv).length < 3) erros[`${prefixo}-cvv`] = "Código inválido";
}

function BlocoCartao({
    titulo,
    prefixo,
    dados,
    erros,
    anoAtual,
    onChange,
}: {
    titulo: string;
    prefixo: string;
    dados: Cartao;
    erros: Erros;
    anoAtual: number;
    onChange: (campoCartao: keyof Cartao, valor: string) => void;
}) {
    const erroNumero = erros[`${prefixo}-numero`];
    return (
        <fieldset>
            <legend className="text-xs font-semibold tracking-[0.08em] text-zinc-500 uppercase">{titulo}</legend>
            <Campo rotulo="Número do cartão" erro={erroNumero}>
                <input
                    value={dados.numero}
                    onChange={(evento) => onChange("numero", evento.target.value)}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    aria-invalid={Boolean(erroNumero)}
                    className={`${campo} ${erroNumero ? "border-red-500" : "border-zinc-300 focus:border-pine"}`}
                />
            </Campo>
            <div className="mt-3 grid grid-cols-3 items-end gap-2">
                <SelectCartao
                    rotulo="Mês"
                    valor={dados.mes}
                    erro={erros[`${prefixo}-mes`]}
                    onChange={(valor) => onChange("mes", valor)}
                >
                    <option value="">Mês</option>
                    {Array.from({ length: 12 }, (_, indice) => {
                        const mes = String(indice + 1).padStart(2, "0");
                        return (
                            <option key={mes} value={mes}>
                                {mes}
                            </option>
                        );
                    })}
                </SelectCartao>
                <SelectCartao
                    rotulo="Ano"
                    valor={dados.ano}
                    erro={erros[`${prefixo}-ano`]}
                    onChange={(valor) => onChange("ano", valor)}
                >
                    <option value="">Ano</option>
                    {Array.from({ length: 13 }, (_, indice) => {
                        const ano = String(anoAtual + indice);
                        return (
                            <option key={ano} value={ano}>
                                {ano}
                            </option>
                        );
                    })}
                </SelectCartao>
                <Campo rotulo="Cód. segurança" erro={erros[`${prefixo}-cvv`]} alinhado>
                    <input
                        value={dados.cvv}
                        onChange={(evento) => onChange("cvv", digitos(evento.target.value).slice(0, 4))}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="CVV"
                        aria-invalid={Boolean(erros[`${prefixo}-cvv`])}
                        className={`${campo} h-11 ${erros[`${prefixo}-cvv`] ? "border-red-500" : "border-zinc-300 focus:border-pine"}`}
                    />
                </Campo>
            </div>
        </fieldset>
    );
}

function SelectCartao({
    rotulo,
    valor,
    erro,
    onChange,
    children,
}: {
    rotulo: string;
    valor: string;
    erro?: string;
    onChange: (valor: string) => void;
    children: ReactNode;
}) {
    return (
        <Campo rotulo={rotulo} erro={erro} alinhado>
            <select
                value={valor}
                onChange={(evento) => onChange(evento.target.value)}
                aria-invalid={Boolean(erro)}
                className={`${campo} h-11 ${erro ? "border-red-500" : "border-zinc-300 focus:border-pine"}`}
            >
                {children}
            </select>
        </Campo>
    );
}

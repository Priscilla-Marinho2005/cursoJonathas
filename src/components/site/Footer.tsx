const instagram = "https://www.instagram.com/jonathasluz__/";
const whatsapp = "https://wa.me/5518198498446";
const email = "";

function endereco(valor: string, montar: (valor: string) => string) {
    const texto = valor.trim();
    if (!texto) return "";
    if (texto.startsWith("http") || texto.startsWith("mailto:")) return texto;
    return montar(texto);
}

const contatos = [
    {
        nome: "Instagram",
        href: endereco(instagram, (valor) => `https://instagram.com/${valor.replace(/^@/, "")}`),
    },
    {
        nome: "WhatsApp",
        href: endereco(whatsapp, (valor) => `https://wa.me/${valor.replace(/\D/g, "")}`),
    },
    {
        nome: "E-mail",
        href: endereco(email, (valor) => `mailto:${valor}`),
    },
] as const;

export default function Footer() {
    const ano = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 px-6 py-5 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center lg:flex-row lg:text-left">
                <p className="font-display text-sm tracking-[0.18em] whitespace-nowrap uppercase">
                    Método Trader
                    <span className="text-gold"> · </span>
                    <span className="font-sans text-xs font-medium tracking-[0.08em] text-white/55">
                        Jonathas Luz
                    </span>
                </p>

                <ul className="flex items-center justify-center gap-7 cursor-pointer">
                    {contatos.map((contato) => (
                        <li key={contato.nome}>
                            {contato.href ? (
                                <a
                                    href={contato.href}
                                    className="text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase transition-colors hover:text-gold"
                                    {...(contato.href.startsWith("http")
                                        ? { target: "_blank", rel: "noreferrer" }
                                        : {})}
                                >
                                    {contato.nome}
                                </a>
                            ) : (
                                <span className="text-[11px] font-semibold tracking-[0.16em] text-white/45 uppercase">
                                    {contato.nome}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                <p className="text-xs tracking-wide whitespace-nowrap text-white/45">
                    © {ano} Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

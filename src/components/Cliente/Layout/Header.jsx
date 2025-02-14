import { ShoppingCart, Clock } from "lucide-react";
import { useCarrinho } from "../../../contexts/CarrinhoContext";

const Header = ({
  setCarrinhoAberto,
  estaAberto,
  configuracoes,
  irParaHome,
}) => {
  const { getTotalItens } = useCarrinho();

  const proximoDiaAberto = () => {
    const hoje = new Date();
    for (let i = 1; i <= 7; i++) {
      const proximoDia = new Date(hoje);
      proximoDia.setDate(hoje.getDate() + i);
      const diaDaSemana = proximoDia.toLocaleDateString("pt-BR", {
        weekday: "long",
      });
      if (configuracoes.horarios[diaDaSemana]?.aberto) {
        return `${diaDaSemana} às ${configuracoes.horarios[diaDaSemana].abertura}`;
      }
    }
    return null;
  };

  const mensagemFechado = () => {
    const hoje = new Date();
    const diaDaSemana = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
    const horarioConfig = configuracoes.horarios[diaDaSemana];

    if (!horarioConfig) {
      return "Fechado";
    }

    const { abertura, fechamento, aberto } = horarioConfig;
    const horarioAtual = hoje.getHours() * 60 + hoje.getMinutes();
    const horarioAbertura =
      parseInt(abertura.split(":")[0]) * 60 + parseInt(abertura.split(":")[1]);
    const horarioFechamento =
      parseInt(fechamento.split(":")[0]) * 60 +
      parseInt(fechamento.split(":")[1]);

    if (aberto) {
      if (horarioAtual < horarioAbertura || horarioAtual >= horarioFechamento) {
        return `Fechado - Abriremos às ${abertura}`;
      }
      return "Aberto agora";
    } else {
      const proximoDia = proximoDiaAberto();
      return proximoDia
        ? `Fechado - Abriremos ${proximoDia}`
        : "Fechado - Não abriremos amanhã";
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-content">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={irParaHome}
          >
            <img
              src="http://localhost:3000/assets/images/carro-de-entrega.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold">Prato Digital</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="btn btn-circle btn-ghost relative"
              onClick={() => setCarrinhoAberto(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItens() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItens()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status do Restaurante */}
      <div
        className={`py-2 px-4 text-center ${
          estaAberto ? "bg-success" : "bg-error"
        } text-white`}
      >
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            {estaAberto
              ? "Aberto agora"
              : configuracoes?.horarios
              ? mensagemFechado()
              : "Fechado"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import TabletFrame from "./TabletFrame";
import Carrinho from "../Carrinho";

const ClienteLayout = ({ children }) => {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [configuracoes, setConfiguracoes] = useState(null);
  const [estaAberto, setEstaAberto] = useState(false);
  const [mensagemFechado, setMensagemFechado] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const buscarConfiguracoes = async () => {
      try {
        const resposta = await axios.get(
          "http://localhost:5000/api/configuracoes"
        );
        setConfiguracoes(resposta.data);
        console.log("Configurações carregadas:", resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar configurações:", erro);
      }
    };

    buscarConfiguracoes();
  }, []);

  useEffect(() => {
    if (!configuracoes || !configuracoes.horarios) return;

    const hoje = new Date();
    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const diaAtual = diasDaSemana[hoje.getDay()];

    const horarioDeHoje = configuracoes.horarios[diaAtual];
    if (!horarioDeHoje) return;

    const verificarHorario = () => {
      const agora = new Date();
      const hora = agora.getHours();
      const minuto = agora.getMinutes();
      const horaAtual = hora * 60 + minuto;

      if (horarioDeHoje.abertura && horarioDeHoje.fechamento) {
        const [horaAbertura, minutoAbertura] = horarioDeHoje.abertura
          .split(":")
          .map(Number);
        const [horaFechamento, minutoFechamento] = horarioDeHoje.fechamento
          .split(":")
          .map(Number);
        const horarioAbertura = horaAbertura * 60 + minutoAbertura;
        const horarioFechamento = horaFechamento * 60 + minutoFechamento;

        if (horarioDeHoje.aberto) {
          setEstaAberto(
            horaAtual >= horarioAbertura && horaAtual < horarioFechamento
          );
        } else {
          setEstaAberto(false);
          setMensagemFechado(
            `Fechado - Abriremos amanhã às ${configuracoes.horarios[diaAtual]?.abertura}`
          );
        }
      }
    };

    verificarHorario();
    const intervalo = setInterval(verificarHorario, 60000); // A cada minuto

    return () => clearInterval(intervalo);
  }, [configuracoes]);

  const irParaHome = () => {
    navigate("/");
  };

  const LayoutContent = () => (
    <div className="flex flex-col h-full">
      <Header
        setCarrinhoAberto={setCarrinhoAberto}
        estaAberto={estaAberto}
        mensagemFechado={mensagemFechado}
        configuracoes={configuracoes}
        irParaHome={irParaHome}
      />
      <main className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
      <Footer />
      <Carrinho
        aberto={carrinhoAberto}
        fecharCarrinho={() => setCarrinhoAberto(false)}
      />
    </div>
  );

  return (
    <>
      {/* Versão Mobile */}
      <div className="md:hidden h-screen">
        <LayoutContent />
      </div>

      {/* Versão Desktop com Frame de Tablet */}
      <div className="hidden md:block h-screen">
        <TabletFrame>
          <LayoutContent />
        </TabletFrame>
      </div>
    </>
  );
};

export default ClienteLayout;

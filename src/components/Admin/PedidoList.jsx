import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import PedidoCard from "./PedidoCard";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

const PedidoList = () => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const itensPorPagina = 10;

  const buscarPedidos = useCallback(async () => {
    const jwtSecret = localStorage.getItem("jwtSecret") || token;
    if (!jwtSecret) return;

    try {
      const url = termoBusca
        ? `http://localhost:5000/api/pedidos/buscar?termo=${termoBusca}&pagina=${pagina}&limite=${itensPorPagina}&status=${filtroStatus}`
        : `http://localhost:5000/api/pedidos?pagina=${pagina}&limite=${itensPorPagina}&status=${filtroStatus}`;
      const resposta = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwtSecret}`,
        },
      });
      const data = resposta.data;
      if (Array.isArray(data)) {
        setPedidos(data);
        setTotalPaginas(Math.ceil(data.total / itensPorPagina));
      } else if (data && Array.isArray(data.pedidos)) {
        setPedidos(data.pedidos);
        setTotalPaginas(Math.ceil(data.total / itensPorPagina));
      } else {
        setPedidos([]);
        setTotalPaginas(1);
      }
      setCarregando(false);
    } catch (erro) {
      setCarregando(false);
      toast({
        title: "Erro ao carregar pedidos",
        description: "Não foi possível carregar os pedidos.",
        variant: "destructive",
        className: "bg-red-500 text-white border-none",
      });
    }
  }, [pagina, termoBusca, filtroStatus, token, toast]);

  useEffect(() => {
    buscarPedidos();
  }, [buscarPedidos]);

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSearch = (termo) => {
    setTermoBusca(termo);
    setPagina(1); // Resetar para a primeira página em uma nova busca
  };

  const handleStatusChange = (e) => {
    setFiltroStatus(e.target.value);
    setPagina(1); // Resetar para a primeira página em um novo filtro
  };

  const handleStatusUpdate = async (pedidoId, novoStatus) => {
    const jwtSecret = localStorage.getItem("jwtSecret") || token;
    try {
      await axios.put(
        `http://localhost:5000/api/pedidos/${pedidoId}`,
        { status: novoStatus },
        {
          headers: {
            Authorization: `Bearer ${jwtSecret}`,
          },
        }
      );
      toast({
        title: "Status atualizado",
        description: "Status do pedido atualizado com sucesso.",
        className: "bg-green-500 text-white border-none",
      });
      buscarPedidos();
    } catch (erro) {
      toast({
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status do pedido.",
        variant: "destructive",
        className: "bg-red-500 text-white border-none",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Gerenciamento de Pedidos</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <SearchBar onSearch={handleSearch} />
          <select
            value={filtroStatus}
            onChange={handleStatusChange}
            className="p-2 border rounded-md"
          >
            <option value="todos">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em Andamento</option>
            <option value="saiu para entrega">Saiu para Entrega</option>
            <option value="concluído">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          Nenhum pedido encontrado.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pedidos.map((pedido) => (
              <PedidoCard
                key={pedido._id}
                pedido={pedido}
                onStatusChange={handleStatusUpdate}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={() => setPagina(Math.max(1, pagina - 1))}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="mx-2">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
              disabled={pagina === totalPaginas}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default PedidoList;

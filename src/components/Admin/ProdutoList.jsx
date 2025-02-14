import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "./SearchBar";
import { useToast } from "../ui/use-toast";

const ProdutoList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const itensPorPagina = 10;

  const buscarProdutos = useCallback(async () => {
    setCarregando(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/produtos?pagina=${pagina}&limite=${itensPorPagina}`
      );
      const data = response.data;
      if (data && data.produtos) {
        setProdutos(data.produtos);
        setProdutosFiltrados(data.produtos);
        setTotalPaginas(data.totalPaginas);
      } else {
        setProdutos([]);
        setProdutosFiltrados([]);
        setTotalPaginas(1);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar produtos",
        variant: "destructive",
      });
    } finally {
      setCarregando(false);
    }
  }, [pagina, toast]);

  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);

  const handleSearch = useCallback(
    (searchTerm) => {
      const filtered = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProdutosFiltrados(filtered);
    },
    [produtos]
  );

  const toggleDisponibilidade = async (produto) => {
    try {
      const novoStatus = !produto.disponivel;
      await axios.patch(`http://localhost:5000/api/produtos/${produto._id}`, {
        disponivel: novoStatus,
      });
      setProdutos((prevProdutos) =>
        prevProdutos.map((p) =>
          p._id === produto._id ? { ...p, disponivel: novoStatus } : p
        )
      );
      setProdutosFiltrados((prevProdutos) =>
        prevProdutos.map((p) =>
          p._id === produto._id ? { ...p, disponivel: novoStatus } : p
        )
      );
      toast({
        title: "Sucesso",
        description: `Produto ${produto.nome} ${
          novoStatus ? "disponível" : "indisponível"
        }.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade:", error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar disponibilidade do produto",
        variant: "destructive",
      });
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:5000/api/produtos/${id}`);
        setProdutos((prevProdutos) => prevProdutos.filter((p) => p._id !== id));
        setProdutosFiltrados((prevProdutos) =>
          prevProdutos.filter((p) => p._id !== id)
        );
        toast({
          title: "Sucesso",
          description: "Produto excluído com sucesso",
          variant: "success",
        });
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        toast({
          title: "Erro",
          description: "Erro ao excluir produto",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditar = (id) => {
    navigate(`/admin/produtos/editar/${id}`);
  };

  const handleAdicionar = () => {
    navigate("/admin/produtos/adicionar");
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Produtos</h2>
          <button
            onClick={handleAdicionar}
            className="w-full sm:w-auto py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-center"
          >
            ＋ Adicionar Produto
          </button>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} placeholder="Buscar produtos..." />
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Produto</th>
                  <th className="p-4 text-left">Preço</th>
                  <th className="p-4 text-left hidden sm:table-cell">
                    Categoria
                  </th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((produto) => (
                  <tr key={produto._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={produto.imagem || "/placeholder.svg"}
                          alt={produto.nome}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{produto.nome}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {produto.descricao}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      {produto.categoria?.nome}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleDisponibilidade(produto)}
                        className={`w-full py-1 px-3 rounded-full text-sm font-medium ${
                          produto.disponivel
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {produto.disponivel
                          ? "👁️ Disponível"
                          : "🚫 Indisponível"}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditar(produto._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleExcluir(produto._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Total: {produtos.length} produtos
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagina(Math.max(1, pagina - 1))}
              disabled={pagina === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-sm">
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
        </div>
      </div>
    </>
  );
};

export default ProdutoList;

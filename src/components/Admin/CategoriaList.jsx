import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "../ui/use-toast";

const CategoriaList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const itensPorPagina = 10;

  const buscarCategorias = useCallback(async () => {
    setCarregando(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/categorias?pagina=${pagina}&limite=${itensPorPagina}`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setCategorias(data);
        setTotalPaginas(Math.ceil(data.length / itensPorPagina));
      } else if (data && Array.isArray(data.categorias)) {
        setCategorias(data.categorias);
        setTotalPaginas(Math.ceil(data.categorias.length / itensPorPagina));
      } else {
        setCategorias([]);
        setTotalPaginas(1);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar categorias",
        variant: "destructive",
      });
    } finally {
      setCarregando(false);
    }
  }, [pagina, toast]);

  useEffect(() => {
    buscarCategorias();
  }, [buscarCategorias]);

  const toggleAtiva = async (categoria) => {
    try {
      const novoStatus = !categoria.ativa;
      await axios.patch(
        `http://localhost:5000/api/categorias/${categoria._id}`,
        {
          ativa: novoStatus,
        }
      );
      setCategorias((prevCategorias) =>
        prevCategorias.map((c) =>
          c._id === categoria._id ? { ...c, ativa: novoStatus } : c
        )
      );
      toast({
        title: "Sucesso",
        description: `Categoria ${categoria.nome} ${
          novoStatus ? "ativada" : "desativada"
        }.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Erro ao atualizar status da categoria:", error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar status da categoria",
        variant: "destructive",
      });
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categorias/${id}`);
        setCategorias((prevCategorias) =>
          prevCategorias.filter((c) => c._id !== id)
        );
        toast({
          title: "Sucesso",
          description: "Categoria excluída com sucesso",
          variant: "success",
        });
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        toast({
          title: "Erro",
          description: "Erro ao excluir categoria",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditar = (id) => {
    navigate(`/admin/categorias/editar/${id}`);
  };

  const handleAdicionar = () => {
    navigate("/admin/categorias/adicionar");
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Categorias</h2>
        <button
          onClick={handleAdicionar}
          className="w-full sm:w-auto py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-center"
        >
          ＋ Adicionar Categoria
        </button>
      </div>

      {categorias.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhuma categoria encontrada</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left hidden sm:table-cell">
                  Descrição
                </th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr
                  key={categoria._id}
                  className={`border-t hover:bg-gray-50 ${
                    !categoria.ativa ? "opacity-50" : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={categoria.imagem || "/placeholder.svg"}
                        alt={categoria.nome}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <p className="font-medium">{categoria.nome}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {categoria.descricao}
                    </p>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleAtiva(categoria)}
                      className={`w-full py-1 px-3 rounded-full text-sm font-medium ${
                        categoria.ativa
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {categoria.ativa ? "👁️ Ativa" : "🚫 Inativa"}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditar(categoria._id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleExcluir(categoria._id)}
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
          Total: {categorias.length} categorias
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
  );
};

export default CategoriaList;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";

const ProdutoForm = () => {
  const { toast } = useToast();
  const { id } = useParams(); // Pega o id do produto da URL
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    imagem: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const resposta = await axios.get(
          "http://localhost:5000/api/categorias"
        );
        setCategorias(resposta.data || []);
      } catch (erro) {
        setErro("Erro ao carregar categorias.");
      }
    };

    fetchCategorias();

    if (id) {
      const fetchProduto = async () => {
        try {
          const resposta = await axios.get(
            `http://localhost:5000/api/produtos/${id}`
          );
          setProduto(resposta.data);
        } catch (erro) {
          setErro("Erro ao carregar produto.");
        }
      };

      fetchProduto();
    }
  }, [id]);

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/produtos/${id}`, produto);
        toast({
          title: "Produto atualizado",
          description: `Produto ${produto.nome} atualizado com sucesso.`,
          className: "bg-green-500 text-white border-none",
        });
      } else {
        await axios.post("http://localhost:5000/api/produtos", produto);
        toast({
          title: "Produto adicionado",
          description: `Produto ${produto.nome} adicionado com sucesso.`,
          className: "bg-green-500 text-white border-none",
        });
      }
      navigate("/admin/produtos");
    } catch (erro) {
      toast({
        title: "Erro ao salvar produto",
        description: `Não foi possível salvar o produto ${produto.nome}. Tente novamente.`,
        variant: "destructive",
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {id ? "Editar Produto" : "Adicionar Produto"}
        </h2>
        <button
          onClick={() => navigate("/admin/produtos")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Voltar
        </button>
      </div>
      {erro && (
        <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">{erro}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="preco"
            className="block text-sm font-medium text-gray-700"
          >
            Preço
          </label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="imagem"
            className="block text-sm font-medium text-gray-700"
          >
            URL da Imagem
          </label>
          <input
            type="url"
            id="imagem"
            name="imagem"
            value={produto.imagem}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={carregando}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {carregando
              ? "Salvando..."
              : id
              ? "Salvar Alterações"
              : "Adicionar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProdutoForm;

import { useState } from "react";
import CartaoProjeto from "../components/CartaoProjeto";
import { projetosPessoais, projetosCursos } from "../utils/data";

const Projetos = () => {
  const [mostrarPessoais, setMostrarPessoais] = useState(true);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Meus Projetos
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setMostrarPessoais(true)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              mostrarPessoais
                ? "bg-gray-900 text-white dark:bg-gray-700"
                : "text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Projetos Pessoais
          </button>
          <button
            onClick={() => setMostrarPessoais(false)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              !mostrarPessoais
                ? "bg-gray-900 text-white dark:bg-gray-700"
                : "text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Projetos Cursos
          </button>
        </div>
      </div>

      {mostrarPessoais ? (
        <section>
          <h2 className="flex justify-center text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Pessoais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projetosPessoais.map((projeto) => (
              <CartaoProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-12">
          <h2 className="flex justify-center text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Cursos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projetosCursos.map((projeto) => (
              <CartaoProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Projetos;

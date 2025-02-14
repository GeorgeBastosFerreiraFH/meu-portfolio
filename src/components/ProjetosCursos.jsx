import CartaoProjeto from "./CartaoProjeto";
import { projetosCursos } from "../utils/data";


const ProjetosCursos = () => {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Projetos de Cursos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetosCursos.map((projeto) => (
          <CartaoProjeto key={projeto.id} projeto={projeto} />
        ))}
      </div>
    </section>
  );
};

export default ProjetosCursos;

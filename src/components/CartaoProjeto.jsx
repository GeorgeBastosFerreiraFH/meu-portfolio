import { ExternalLink, Github, Star } from "lucide-react";
import { useState } from "react";

const CartaoProjeto = ({ projeto }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const maxWords = 20;
  const words = projeto.descricao.split(" ");
  const shortDescription =
    words.slice(0, maxWords).join(" ") + (words.length > maxWords ? "..." : "");

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg 
                    hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={projeto.imagem || "/placeholder.svg"}
          alt={projeto.titulo}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          {projeto.destaque && (
            <div className="bg-yellow-500/90 text-white px-2 py-1 rounded-full text-sm flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Destaque
            </div>
          )}
        </div>
      </div>

      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {projeto.titulo}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {expanded ? projeto.descricao : shortDescription}
          {words.length > maxWords && (
            <button onClick={toggleExpand} className="text-blue-500 ml-2">
              {expanded ? "Veja menos" : "Veja mais"}
            </button>
          )}
        </p>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {projeto.tecnologias.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 
                       text-blue-800 dark:text-blue-100 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="flex justify-between items-center border-t 
                      border-gray-100 dark:border-gray-700 pt-4"
        >
          <a
            href={projeto.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 
                   dark:hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href={projeto.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:text-blue-700 
                   dark:hover:text-blue-400 transition-colors bg-transparent hover:bg-primary hover:text-white px-4 py-2 rounded"
          >
            Ver projeto <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartaoProjeto;

const TechStack = () => {
  const technologies = [
    {
      categoria: "Frontend",
      techs: [
        { nome: "React", icone: "⚛️" },
        { nome: "Bootstrap 5", icone: "В" },
        { nome: "Javascript", icone: "JS" },
        { nome: "Tailwind", icone: "≈" },
      ],
    },
    {
      categoria: "Backend",
      techs: [
        { nome: "Node.js", icone: "🟢" },
        { nome: "Express", icone: "🚂" },
        { nome: "MongoDB", icone: "🍃" },
        { nome: "PostgreSQL", icone: "🐘" },
      ],
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
        Stack Tecnológica
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {technologies.map((category) => (
          <div
            key={category.categoria}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full sm:w-64"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category.categoria}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {category.techs.map((tech) => (
                <div
                  key={tech.nome}
                  className="flex items-center space-x-2 text-gray-600 
                             dark:text-gray-400"
                >
                  <span className="text-xl">{tech.icone}</span>
                  <span className="text-sm">{tech.nome}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;

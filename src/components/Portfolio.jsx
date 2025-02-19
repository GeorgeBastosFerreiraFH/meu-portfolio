import ProjectCard from "./CartaoProjeto";

const Portfolio = () => {
  return (
    <div className="container mx-auto px-4">
      <section id="sobre" className="py-10">
        <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
        <p>
          Aqui você pode adicionar informações sobre você, sua experiência e
          habilidades.
        </p>
      </section>

      <section id="projetos" className="py-10">
        <h2 className="text-3xl font-bold mb-4">Meus Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      <section id="cursos" className="py-10">
        <h2 className="text-3xl font-bold mb-4">Cursos</h2>
        <p>
          Aqui você pode listar os cursos que você completou ou está fazendo.
        </p>
      </section>

      <section id="certificados" className="py-10">
        <h2 className="text-3xl font-bold mb-4">Certificados</h2>
        <p>Aqui você pode exibir seus certificados ou conquistas.</p>
      </section>
    </div>
  );
};

export default Portfolio;

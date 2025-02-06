import { projetos } from "../utils/data";
import HeroSection from "../components/home/HeroSection";
import ProjectCard from "../components/home/ProjectCard";
import TechStack from "../components/home/TechStack";
import ContactSection from "../components/home/ContactSection";

const Inicio = () => {
  const projetosDestaque = projetos
    .filter((projeto) => projeto.destaque)
    .slice(0, 3);

  return (
    <div>
      <HeroSection />

      <section
        id="projetos"
        className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Projetos em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetosDestaque.map((projeto) => (
            <ProjectCard key={projeto.id} projeto={projeto} />
          ))}
        </div>
      </section>

      <TechStack />

      <ContactSection />
    </div>
  );
};

export default Inicio;

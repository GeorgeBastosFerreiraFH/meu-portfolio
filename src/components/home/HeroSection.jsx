import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Desenvolvedor Full Stack
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Transformando ideias em aplicações web modernas e escaláveis.
            Especializado em React, Node.js e arquitetura de software.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#projetos"
              className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Ver Projetos <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </a>

            <a
              href="#contato"
              className="w-full sm:w-auto px-6 py-3 bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-lg border border-gray-900 dark:border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Contato <Mail className="inline-block ml-2 w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="http://github.com/georgeBastosFerreiraFH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 
                       dark:hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="http://www.linkedin.com/in/ge-be88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 
                       dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/+5585981216480"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 
                       dark:hover:text-white transition-colors"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

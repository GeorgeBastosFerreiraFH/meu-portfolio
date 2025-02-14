import {
  Code,
  Briefcase,
  Heart,
  Mail,
  Phone,
  Linkedin,
  Github,
} from "lucide-react";

const SobreMim = () => {
  const habilidades = [
    {
      categoria: "Frontend",
      items: [
        "HTML",
        "CSS",
        "React",
        "Javascript",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      categoria: "Backend",
      items: ["Node.js", "Express", "Python", "MongoDB"],
    },
    { categoria: "Ferramentas", items: ["Git", "VS Code", "Figma"] },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Sobre Mim
          </h1>

          <div className="prose space-y-4 dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">
              Sou um desenvolvedor autodidata com 3 anos de estudo em
              programação, apaixonado por tecnologia e por criar soluções que
              fazem a diferença. Apesar de não ter experiência formal na área,
              já desenvolvi projetos pessoais que demonstram minha capacidade de
              aprendizado rápido, dedicação e comprometimento.
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              Sou destemido, resiliente e estou sempre disposto a superar
              desafios para entregar o melhor resultado possível. Como pai de
              cinco filhos, tenho uma motivação única: construir um futuro
              sólido e oferecer uma vida melhor para minha família. Essa
              motivação se traduz em minha busca incessante por crescimento
              pessoal e profissional, aprendendo e aplicando tecnologias como
              HTML5, CSS3, JavaScript, React, Python, Node.js, Tailwind e
              Bootstrap.
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              Busco oportunidades na área de desenvolvimento onde possa
              contribuir com minha energia, determinação e vontade de crescer,
              além de agregar valor aos projetos e ao time com quem trabalho.
              Estou aberto a novos desafios e pronto para dar o meu melhor!
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Experiência Profissional
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Desenvolvedor Full Stack
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Em busca de experiência profissional na área
                    </p>
                  </div>
                </div>
                {/* Adicione mais experiências aqui */}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-primary" />
              Habilidades
            </h2>

            <div className="space-y-6">
              {habilidades.map((categoria) => (
                <div key={categoria.categoria}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {categoria.categoria}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categoria.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 
                                 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                Interesses
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Desenvolvimento Web</li>
                <li>Backend</li>
                <li>Novas Tecnologias</li>
                <li>Open Source</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SobreMim;

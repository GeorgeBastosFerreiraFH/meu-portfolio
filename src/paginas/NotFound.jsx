import React, { useState, useEffect } from "react";
import { Terminal, Code2, Database, Layers } from "lucide-react";

const NotFound = () => {
  const [typedText, setTypedText] = useState("");
  const [counter, setCounter] = useState(0);
  const fullText = "404_NOT_FOUND";

  useEffect(() => {
    if (counter < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + fullText[counter]);
        setCounter((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const techStack = [
    { icon: <Code2 className="w-6 h-6" />, label: "Frontend" },
    { icon: <Database className="w-6 h-6" />, label: "Backend" },
    { icon: <Layers className="w-6 h-6" />, label: "Full Stack" },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden relative">
      {/* Terminal Window */}
      <div className="max-w-3xl w-full mx-4 bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-700 p-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center">
            <Terminal className="w-5 h-5 text-gray-400 inline-block" />
            <span className="ml-2 text-gray-400 text-sm">
              developer_terminal
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono">
          {/* Animated Text */}
          <div className="text-green-400 mb-4">
            $ <span className="typing-cursor">{typedText}</span>
            <span className="animate-pulse">_</span>
          </div>

          {/* Error Message */}
          <div className="text-red-400 text-5xl md:text-7xl font-bold mb-6 glitch-text">
            Error 404
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-4 mb-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition-colors duration-300"
              >
                {tech.icon}
                <span>{tech.label}</span>
              </div>
            ))}
          </div>

          {/* Error Details */}
          <div className="text-gray-400 mb-6">
            <p className="mb-2"> Processo: Localizar Página</p>
            <p className="mb-2"> Status: Falha</p>
            <p> Mensagem: Página não encontrada no servidor</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Voltar para Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-blue-500 opacity-20 dark:opacity-40 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;

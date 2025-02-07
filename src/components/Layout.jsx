import { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import AlternadorTema from "./AlternadorTema";
import Inicio from "../paginas/Inicio";
import SobreMim from "../paginas/SobreMim";
import Certificados from "../paginas/Certificados";
import Projetos from "../paginas/Projetos";
import { Github, Linkedin, Phone, Menu, X } from "lucide-react";

const Layout = () => {
  const localizacao = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <div className="relative min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="sm:hidden text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-2 mr-2"
              >
                {menuAberto ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold hidden sm:inline">
                  Meu Portfólio
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    localizacao.pathname === "/"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Início
                </Link>
                <Link
                  to="/projetos"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    localizacao.pathname === "/projetos"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Projetos
                </Link>
                <Link
                  to="/certificados"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    localizacao.pathname === "/certificados"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Certificados
                </Link>
                <Link
                  to="/sobre"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    localizacao.pathname === "/sobre"
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Sobre Mim
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="http://github.com/georgeBastosFerreiraFH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-2"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="http://www.linkedin.com/in/ge-be88"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-2"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/+5585981216480"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-2"
              >
                <Phone className="w-6 h-6" />
              </a>
              <AlternadorTema />
            </div>
          </div>
        </div>
      </nav>

      {menuAberto && (
        <div className="sm:hidden fixed inset-0 z-40 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
          <div className="pt-20 px-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Meu Portfólio
            </h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={fecharMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/projetos"
                  onClick={fecharMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  to="/certificados"
                  onClick={fecharMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Certificados
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  onClick={fecharMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Sobre Mim
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <main className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/certificados" element={<Certificados />} />
          <Route path="/sobre" element={<SobreMim />} />
        </Routes>
      </main>
    </div>
  );
};

export default Layout;

"use client";

import { Mail, MessageSquare, Send, Phone } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Mensagem enviada com sucesso!");
        setFormData({ nome: "", email: "", mensagem: "" });
      } else {
        alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar mensagem.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="contato" className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Vamos Conversar?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Estou sempre interessado em novos projetos e oportunidades de
            colaboração.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Informações de Contato
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 text-gray-900 dark:text-white" />
                <a href="mailto:seu-email@exemplo.com">ge-be@live.com</a>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-gray-900 dark:text-white" />
                <a href="https://wa.me/+5585981216480">+55 (85) 98121-6480</a>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <MessageSquare className="w-5 h-5 text-gray-900 dark:text-white" />
                <span>Disponível para freelance</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                         dark:border-gray-700 bg-white dark:bg-gray-800 
                         text-gray-900 dark:text-white focus:ring-2 
                         focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                         dark:border-gray-700 bg-white dark:bg-gray-800 
                         text-gray-900 dark:text-white focus:ring-2 
                         focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                         dark:border-gray-700 bg-white dark:bg-gray-800 
                         text-gray-900 dark:text-white focus:ring-2 
                         focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 
                       bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                       rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 
                       transition-colors"
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
              <Send className="ml-2 w-4 h-4" />
            </button>

            {success && (
              <p className="text-green-500">Mensagem enviada com sucesso!</p>
            )}
            {error && <p className="text-red-500">Erro ao enviar mensagem.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

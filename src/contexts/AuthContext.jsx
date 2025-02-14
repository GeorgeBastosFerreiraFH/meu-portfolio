// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const location = useLocation();

  axios.defaults.withCredentials = true;

  const verificarSessao = async () => {
    try {
      console.log("Verificando sessão...");
      const resposta = await axios.get(
        "http://localhost:5000/api/auth/verificar-sessao",
        { withCredentials: true }
      );
      console.log("Sessão verificada:", resposta.data);
      setUsuario(resposta.data.usuario);
    } catch (erro) {
      if (erro.response && erro.response.status === 401) {
        console.log("Usuário não autenticado");
      } else {
        console.error("Erro ao verificar sessão:", erro);
      }
      setUsuario(null);
    }
    setCarregando(false);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      verificarSessao();
    } else {
      setCarregando(false);
    }
  }, [location.pathname]);

  const login = async (email, senha) => {
    try {
      console.log("Tentando fazer login com:", email, senha);
      const resposta = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, senha },
        { withCredentials: true }
      );
      setUsuario(resposta.data.usuario);
      return true;
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log("Fazendo logout...");
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout realizado com sucesso.");
      setUsuario(null);
    } catch (erro) {
      console.error("Erro ao fazer logout:", erro);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

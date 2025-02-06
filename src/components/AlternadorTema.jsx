"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const AlternadorTema = () => {
  const [tema, setTema] = useState(localStorage.getItem("tema") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((temaAtual) => (temaAtual === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={alternarTema}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      aria-label="Alternar tema"
    >
      {tema === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default AlternadorTema;

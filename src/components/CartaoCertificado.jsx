import { FileText } from "lucide-react";
import { useState } from "react";
const CartaoCertificado = ({ certificado }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <img
            src={certificado.icone || "/placeholder.svg"}
            alt=""
            className="w-12 h-12 mr-4"
          />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {certificado.titulo}
          </h3>
        </div>
      </div>
      <div className="p-6 pt-0">
        <a
          href={certificado.urlCertificado}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:text-blue-700 transition-colors"
        >
          <FileText className="w-5 h-5 mr-2" />
          Certificado
        </a>
      </div>
    </div>
  );
};

export default CartaoCertificado;

import CartaoCertificado from "../components/CartaoCertificado";
import { dadosCertificados } from "../utils/data";

const Certificados = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Meus Certificados
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dadosCertificados.map((certificado, indice) => (
          <CartaoCertificado key={indice} certificado={certificado} />
        ))}
      </div>
    </main>
  );
};

export default Certificados;

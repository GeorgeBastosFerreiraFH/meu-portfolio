import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import SobreMim from "./paginas/SobreMim";
import Certificados from "./paginas/Certificados";
import Projetos from "./paginas/Projetos";
import Layout from "./components/Layout";
import NotFound from "./paginas/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/certificados" element={<Certificados />} />
          <Route path="/sobre" element={<SobreMim />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

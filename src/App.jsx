import { BrowserRouter as Roteador } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Roteador>
      <Layout />
    </Roteador>
  );
}

export default App;

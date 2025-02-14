import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import ClienteRoutes from "./pages/Cliente";
import AdminRoutes from "./pages/Admin";
import Login from "./components/Admin/Login";

function App() {
  return (
    <Router>
      <CarrinhoProvider>
        <Routes>
          <Route path="/*" element={<ClienteRoutes />} />
          <Route
            path="/admin/*"
            element={
              <AuthProvider>
                <Routes>
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<AdminRoutes />} />
                </Routes>
              </AuthProvider>
            }
          />
        </Routes>
      </CarrinhoProvider>
    </Router>
  );
}

export default App;

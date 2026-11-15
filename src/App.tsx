import { useEffect, useState } from "react";
import Comecar from "./pages/comecar";
import Home from "./pages/index";
import Login from "./pages/login";
import Painel from "./pages/painel";

function App() {
  const [rota, setRota] = useState(() => window.location.hash);

  useEffect(() => {
    const atualizar = () => setRota(window.location.hash);
    window.addEventListener("hashchange", atualizar);
    return () => window.removeEventListener("hashchange", atualizar);
  }, []);

  if (rota === "#login") return <Login />;
  if (rota === "#painel") return <Painel />;
  if (rota === "#comecar") return <Comecar />;
  return <Home />;
}

export default App

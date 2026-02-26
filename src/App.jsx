import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/accueil";
import Classes from "./pages/classes";
import { Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link className="site-title" to="/">DofusHub</Link>
          <Link className="logo-header" to="/classes">
            <img src="/assets/logo_header/menu_classes.png" alt="Classes" />
          </Link>
        </nav>
      </header>
      
      {/* Conteneur principal pour centrer les pages */}
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/classes" element={<Classes/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
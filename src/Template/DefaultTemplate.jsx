import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/css/AboutUs.css";
import { useMain } from "../contexts/MainContext";
import LetterGlitch from "../components/LetterGlitch";
import Lanyard from "../components/Lanyard";
import TargetAimBotCursor from "../components/TargetAimBotCursor";
import ColorsSplashCursor from "../components/ColorsSplashCursor";

export default function DefaultTemplate() {
  const { activeEffect, setActiveEffect } = useMain();
  console.log("L'effetto attivo nel template è:", activeEffect);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* --- EASTER EGGS GLOBALI --- */}

      {/* Caso 1: Glitch */}
      {activeEffect === "glitch" && (
        <div className="glitch-container">
          <LetterGlitch />
        </div>
      )}

      {/* Caso 2: Lanyard */}
      {activeEffect === "lanyard" && (
        <div className="lanyard-overlay">
          <Lanyard />
          <button
            onClick={() => setActiveEffect(null)}
            className="btn-close-effect"
          >
            CHIUDI EFFETTO 3D
          </button>
        </div>
      )}

      {/* Caso 3: Target Cursor */}
      {activeEffect === "target" && (
        <TargetAimBotCursor targetSelector="a, button, .cursor-target, .card, .btn, .nav-link, input, .team-row, .buttonCart" />
      )}

      {/* Caso 4: Splash Cursor */}
      {activeEffect === "splash" && <ColorsSplashCursor />}

      {/* bottone per disabilitare cursori/animazioni */}
      {(activeEffect === "target" || activeEffect === "splash") && (
        <button
          onClick={() => {
            setActiveEffect(null);
            document.body.style.cursor = "auto";
          }}
          className="btn-close-effect"
        >
          RESETTA CURSORE
        </button>
      )}

      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

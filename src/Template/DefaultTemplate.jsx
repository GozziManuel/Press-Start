import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/css/AboutUs.css";
import { useMain } from "../contexts/MainContext";
import LetterGlitch from "../components/LetterGlitch";
import Lanyard from "../components/Lanyard";
import TargetAimBotCursor from "../components/TargetAimBotCursor";
import ColorsSplashCursor from "../components/ColorsSplashCursor";
import DoomMode from "../components/DoomMode";

//audio doom
import closeGameAudio from "../assets/doomModeStaff/the-doom-slayer-ending.mp3";

export default function DefaultTemplate() {
  const { activeEffect, setActiveEffect } = useMain();
  console.log("L'effetto attivo nel template è:", activeEffect);

  const handleExitDoom = () => {
    // blocca tutti gli audio
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach((a) => a.pause());

    // The Doom Slayer Ending finally
    const exitSound = new Audio(closeGameAudio);
    exitSound.play();

    // 3. Chiudiamo l'effetto
    setActiveEffect(null);
  };
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
      {/* Caso Speciale: Doom Mode */}
      {activeEffect === "doom-mode" && (
        <div className="doom-main-container">
          <DoomMode />
          <button onClick={handleExitDoom} className="btn-doom-exit">
            ESCI DAL GIOCO
          </button>
        </div>
      )}

      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

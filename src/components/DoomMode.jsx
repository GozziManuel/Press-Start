import { useState, useEffect } from "react";
import "../assets/doomModeStaff/doomMode.css";

import armatoPronto from "../assets/doomModeStaff/armato-epronto.gif";

import animazioneSparo2 from "../assets/doomModeStaff/animazione-sparo2.gif";
import enemyImg from "../assets/doomModeStaff/enemy-doom.png";

export default function DoomMode() {
  const [gameStarted, setGameStarted] = useState(false);
  const [introActive, setIntroActive] = useState(true);
  const [enemies, setEnemies] = useState([]);
  const [isShooting, setIsShooting] = useState(false);
  const [holes, setHoles] = useState([]);

  // GESTIONE INTRODUZIONE
  useEffect(() => {
    // Mostra il fucile che si arma --> regolata in base alla durata della gif
    const introTimer = setTimeout(() => {
      setIntroActive(false);
      setGameStarted(true);
    }, 750);

    return () => clearTimeout(introTimer);
  }, []);

  // GENERAZIONE NEMICI --> solo dopo l'intro
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      const newEnemy = {
        id: Date.now(),
        x: Math.random() * 80 + 5 + "%",
        y: Math.random() * 70 + 5 + "%",
      };
      setEnemies((prev) => [...prev, newEnemy]);
    }, 3500);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // LOGICA DELLO SPARO
  const handleShoot = (id, x, y) => {
    if (isShooting) return;

    setIsShooting(true);

    // Tempo animazione sparo
    setTimeout(() => {
      setEnemies((prev) => prev.filter((e) => e.id !== id));
      setHoles((prev) => [...prev, { x, y, id: Math.random() }]);
      setIsShooting(false);
    }, 1800);
  };

  return (
    <div className="doom-overlay">
      {/* Fori dei proiettili */}
      {holes.map((h) => (
        <div
          key={h.id}
          className="bullet-hole"
          style={{ left: h.x, top: h.y }}
        />
      ))}

      {/* Nemici */}
      {gameStarted &&
        enemies.map((e) => (
          <div
            key={e.id}
            className="enemy"
            style={{ left: e.x, top: e.y }}
            onClick={() => handleShoot(e.id, e.x, e.y)}
          >
            <img src={enemyImg} alt="enemy" className="enemy-sprite" />
            <div className="projectile"></div>
          </div>
        ))}

      {/* GESTIONE GIF FUCILI */}
      <div className="doom-shotgun">
        {/* Intro: solo all'inizio */}
        {introActive && <img src={armatoPronto} alt="intro-ready" />}

        {/* Sparo: solo quando clicchi sul nemico */}
        {isShooting && (
          <img src={animazioneSparo2} alt="shooting" key={Date.now()} />
        )}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import "../assets/doomModeStaff/doomMode.css";

import armatoPronto from "../assets/doomModeStaff/armato-epronto.gif";

import animazioneSparo2 from "../assets/doomModeStaff/animazione-sparo2.gif";
import enemyImg from "../assets/doomModeStaff/enemy-doom.png";

// Import Asset Audio
import doomGateAudio from "../assets/doomModeStaff/doom-gate.mp3";
import enemyPistol from "../assets/doomModeStaff/enemy-pistol-sound.wav";
import playerShotgun from "../assets/doomModeStaff/doom-shotgun-audio.mp3";
import enemyDeath from "../assets/doomModeStaff/enemy-death-sound.wav";

export default function DoomMode() {
  const [gameStarted, setGameStarted] = useState(false);
  const [introActive, setIntroActive] = useState(true);
  const [enemies, setEnemies] = useState([]);
  const [isShooting, setIsShooting] = useState(false);
  const [holes, setHoles] = useState([]);

  //note --> il problema della perdita di precisione e sincronia non è dovuto al codice React, ma a come i browser gestiscono la cache delle GIF. Quando React smonta e rimonta le gif, il browser riconosce che l'URL è lo stesso. Invece di far ripartire la GIF dal frame 0, spesso cerca di ottimizzare le risorse riprendendo l'animazione da dove si era interrotta nel suo ciclo interno, oppure subisce dei micro-lag di decodifica che si accumulano a ogni click.
  // utilizzo del Cache Busting --> inganna il browser facendogli credere che ogni sparo sia un'immagine completamente nuova, costringendolo a riprodurre la GIF dal primissimo frame ogni singola volta in perfetta sincronia con il setTimeout.
  const [shootTimestamp, setShootTimestamp] = useState(Date.now());

  // GESTIONE MUSICA DI SOTTOFONDO --> per poterla spegnere
  const bgMusicRef = useRef(new Audio(doomGateAudio));

  // Gestione suoni istantanei (spari, morti) che possono sovrapporsi
  const playSfx = (path, volume = 0.5) => {
    const sfx = new Audio(path);
    sfx.volume = volume;
    sfx.play();
  };

  // GESTIONE INTRODUZIONE E MUSICA
  useEffect(() => {
    // Mostra il fucile che si arma --> regolata in base alla durata della gif --> fungerà da timer per l'intro
    const introTimer = setTimeout(() => {
      setIntroActive(false);
      setGameStarted(true);

      // Finità l'intro, parte la musica di sottofondo in loop
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.3;
      bgMusicRef.current
        .play()
        .catch((e) => console.log("Musica bloccata perchè!?:", e));
    }, 750);

    // Cleanup quando il componente viene smontato
    return () => {
      clearTimeout(introTimer);
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    };
  }, []);

  // GENERAZIONE NEMICI E AUDIO SPARO--> solo dopo l'intro
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      const newEnemy = {
        id: Date.now(),
        x: Math.random() * 80 + 5 + "%",
        y: Math.random() * 70 + 5 + "%",
      };
      setEnemies((prev) => [...prev, newEnemy]);
      // Suono sparo nemico (pistola)
      playSfx(enemyPistol, 0.4);
    }, 3500);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // LOGICA DELLO SPARO E AUDIO MORTE NEMICO
  const handleShoot = (id, x, y) => {
    if (isShooting) return;

    // Aggiora il timestamp nel momento esatto del click
    setShootTimestamp(Date.now());
    setIsShooting(true);

    // audio sparo utente immediato
    playSfx(playerShotgun, 0.6);

    // timing morte nemico
    setTimeout(() => {
      // Audio morte nemico appena prima che sparisca
      playSfx(enemyDeath, 0.5);
      setEnemies((prev) => prev.filter((e) => e.id !== id));
      setHoles((prev) => [...prev, { x, y, id: Math.random() }]);
    }, 550);

    // 2. Il fucile finisce il rinculo e torna pronto (1800ms) --> prima per evitare incastri
    setTimeout(() => {
      setIsShooting(false);
    }, 1750);
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

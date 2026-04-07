import "../assets/css/footer.css";
import { useMain } from "../contexts/MainContext";

// audio easter egg
import easterEgg from "../assets/doomModeStaff/the-doom-slayer-surprise.mp3";
import introFiga from "../assets/doomModeStaff/shotgun-metal-slug.mp3";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const { setActiveEffect } = useMain();
  // ANimated pacman IMG
  const pacmanRef = useRef(null);

  // 2. Monitoriamo se è visibile (once: true lo fa scattare solo la prima volta)
  const isInView = useInView(pacmanRef, { once: true, amount: 0.5 });

  // DOom easter egg
  // conterrà l'istanza dell'audio in corso
  const hoverAudioRef = useRef(null);

  // Suono hover (The Doom Slayer Surprise)
  const handleMouseEnter = () => {
    // se l'audio esiste già ed è in riproduzione, non fare nulla --> non l'ho capita e non funziona credo
    if (hoverAudioRef.current && !hoverAudioRef.current.paused) {
      return;
    }
    // altrimenti crea l'audio e avvialo
    const hoverSound = new Audio(easterEgg);
    hoverSound.volume = 0.4;
    // IMPORTANTE: l'istanza  va salvata nel REF prima di fare play
    hoverAudioRef.current = hoverSound;

    hoverSound.play().catch(() => {}); // catch per evitare errori se l'utente non ha interagito
  };

  // Suono al click (Metal Slug Shotgun)
  const handleStartGame = () => {
    // se si clicca prima che l'audio easterEgg sia finito ferma l'audio
    if (hoverAudioRef.current) {
      hoverAudioRef.current.pause();
      hoverAudioRef.current.currentTime = 0; // reset della traccia --> con questo risolto bug di 💩
    }

    const startSound = new Audio(introFiga);
    startSound.play();
    setActiveEffect("doom-mode");
  };

  return (
    <footer>
      <div style={{ overflowX: "hidden" }}>
        <motion.img
          ref={pacmanRef}
          src="/Mr-Pacman.png"
          alt="Pac-Man"
          style={{ height: "200px", translate: "50%" }}
          initial={{ x: "-100%", opacity: 0 }} // Parte da fuori sinistra
          animate={isInView ? { x: "5vw", opacity: 1 } : {}} // Se è visibile, corre verso il centro
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <hr className="separator" />
      <div className="footer row pb-0 me-0 container-manual">
        <div className="byte-bounce col-sm-12 col-md-5 mb-5">
          <h4 className="star-crush gr-viola">Press Start</h4>
          <p className="m-0 text fs-5">
            Un progetto dedicato agli appassionati di retro gaming, dove é
            possibile scoprire e acquistare i grandi classici che hanno fatto la
            storia. Uniamo nostalgia e design moderno per offrire un'esperienza
            semplice, coinvolgente e autentica.
          </p>
        </div>
        <div className="col-md-5 col-sm-12">
          <h3 className="star-crush gr-viola">Contact Us</h3>
          <p className="text byte-bounce fs-5">
            Hai domande, richieste o vuoi semplicemente metterti in contatto con
            noi? Il nostro team é sempre pronto ad aiutarti.
          </p>
          <p className="text byte-bounce fs-4" id="email">
            support@pressstart.com
          </p>
        </div>
        <div
          className="footer-bottom-row"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <span
            onMouseEnter={handleMouseEnter}
            onClick={handleStartGame}
            style={{
              cursor: "default", // Nessun feedback visivo
              userSelect: "none", // Impedisce la selezione blu
              display: "inline-block", // Rende l'area grande quanto il testo
              padding: "5px 10px", // Definisce l'area esatta di "trigger"
              fontSize: "0.9rem", // Se vuoi renderlo ancora più discreto
              color: "inherit", // Si mimetizza con il resto del testo
            }}
          >
            Press Start &copy;
          </span>
        </div>
      </div>
    </footer>
  );
}

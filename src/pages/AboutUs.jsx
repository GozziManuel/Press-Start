import { NavLink } from "react-router";
import "../assets/css/AboutUs.css";

import { useState } from "react";
import LetterGlitch from "../components/LetterGlitch";
import Lanyard from "../components/Lanyard";
import TargetAimBotCursor from "../components/TargetAimBotCursor";
import ColorsSplashCursor from "../components/ColorsSplashCursor";

const team = [
  {
    name: "Jasmin Hegic",
    img: "/kirby2.png",
    gif: "/kirby.gif",
  },
  {
    name: "Manuel Gozzi",
    img: "/donkeyKong.png",
    gif: "/donkey-kong.gif",
  },
  {
    name: "Sirio Ghiringhelli",
    img: "/crashBandicoot.png",
    gif: "/crash-bandicoot.gif",
  },
  {
    name: "Michele Brignola",
    img: "/frog.png",
    gif: "/frog-chrono.gif",
  },
];
export default function AboutUs() {
  // "stato" che ci dice quale effetto è attivo. All'inizio è null
  const [activeEffect, setActiveEffect] = useState(null);

  // Funzione che decide che cosa attivare in base a cosa verrà cliccato
  const handleMemberClick = (id) => {
    console.log("Stai cliccando o no:", id);
    // reset del cursore per sicurezza
    document.body.style.cursor = "auto";

    if (id === 0) {
      setActiveEffect("glitch");
      setTimeout(() => setActiveEffect(null), 60000);
    } else if (id === 1) {
      setActiveEffect("lanyard");
    } else if (id === 2) {
      setActiveEffect("target");
    } else if (id === 3) {
      setActiveEffect("splash");
    }
  };

  return (
    <>
      {/* caso n^1 */}
      {activeEffect === "glitch" && (
        <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
          <LetterGlitch />
        </div>
      )}

      {/* caso n^2 */}
      {activeEffect === "lanyard" && (
        <div className="lanyard-overlay">
          <Lanyard />
          {/* Bottone per chiudere l'effetto 3D */}
          <button
            onClick={() => setActiveEffect(null)}
            className="btn-close-effect"
          >
            CHIUDI EFFETTO 3D
          </button>
        </div>
      )}
      {/* Caso 3 */}
      {activeEffect === "target" && (
        <TargetAimBotCursor targetSelector=".cursor-target" />
      )}

      {/* Caso 4 */}
      {activeEffect === "splash" && <ColorsSplashCursor />}

      {/* Bottone di emergenza --> per togliere i cursori speciali */}
      {(activeEffect === "target" || activeEffect === "splash") && (
        <button
          onClick={() => {
            setActiveEffect(null);
            document.body.style.cursor = "auto"; // sicurezza--> non rimanere senza mouse
          }}
          className="btn-reset-cursor"
        >
          Resetta Cursore
        </button>
      )}

      <div className="py-3 byte-bounce gr-viola container-manual">
        <section className="hero pb-5">
          <h1 className="star-crush">
            Press Start e torna nell'epoca d'oro del gaming
          </h1>
          <p className="fs-4 text">
            Rivivi i grandi classici, scopri titoli senza tempo e immergiti in
            un'esperienza retro con un tocco moderno.
          </p>

          <div className="hero-buttons">
            <NavLink to={"/"} className="button primary text">
              Inizia a giocare
            </NavLink>
            <NavLink className="button secondary text" to={"/Products"}>
              Scopri i giochi
            </NavLink>
          </div>
        </section>
      </div>
      <hr className="separator mt-0 mb-5" />
      <div className="container-manual team-wrapper mb-5">
        {/* Titolo */}
        <h3 className="star-crush gr-viola title-left">Sito realizzato da:</h3>

        <ul className="team-list-vertical">
          {team.map((member, id) => (
            <li
              key={id}
              className={`team-row byte-bounce ${activeEffect === "target" ? "cursor-target" : ""}`} // Classe per il mirino
              onClick={() => handleMemberClick(id)}
            >
              <div className="member-info-container">
                <span className="arrow-purple">{">"}</span>
                <span className="member-name">{member.name}</span>

                <div className="avatar-small">
                  <img src={member.img} alt={member.name} />
                </div>

                {/* GIF a destra */}
                {member.gif && (
                  <div className="gif-preview-container">
                    <img src={member.gif} alt="anim" className="size-gif" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

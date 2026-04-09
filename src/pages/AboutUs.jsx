import { NavLink } from "react-router";
import "../assets/css/AboutUs.css";

import { useMain } from "../contexts/MainContext";

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
  const { triggerEffect, activeEffect, setActiveEffect } = useMain();

  const handleMemberClick = (id) => {
    if (id === 0) triggerEffect("glitch");
    else if (id === 1) setActiveEffect("lanyard");
    else if (id === 2) setActiveEffect("target");
    else if (id === 3) setActiveEffect("splash");
  };

  return (
    <>
      <div className="py-3 byte-bounce container-manual">
        <section className="hero pb-5">
          <h1 className="star-crush" style={{ color: "var(--viola)" }}>
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
                <span
                  className="member-name"
                  style={{ color: "var(--text-primary)" }}
                >
                  {member.name}
                </span>

                <div className="avatar-small">
                  <img src={member.img} alt={member.name} />
                </div>

                {/* GIF a destra */}
                {member.gif && (
                  <div className="gif-preview-container d-sm-none d-md-block">
                    <img
                      src={member.gif}
                      alt="anim"
                      className="size-gif d-sm-none d-md-block"
                    />
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

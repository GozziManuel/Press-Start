const names = ["Jasmin", "Manuel Gozzi", "Sirio", "Michele Brignola"];
import { NavLink } from "react-router";
import "../assets/css/AboutUs.css";
export default function AboutUs() {
  return (
    <>
      <div className="py-3 byte-bounce gr-viola container-manual">
        <section class="hero pb-5">
          <h1 className="star-crush">
            Press Start e torna nell’epoca d’oro del gaming
          </h1>
          <p className="fs-4 text">
            Rivivi i grandi classici, scopri titoli senza tempo e immergiti in
            un’esperienza retro con un tocco moderno.
          </p>

          <div class="hero-buttons">
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
      <div className="text-center container-manual about">
        <h3 className="star-crush gr-viola">Perché siamo qui</h3>
        <p className="fs-5 text byte-bounce">
          “Nato dalla nostra passione per i videogiochi degli anni ’80 e ’90, il
          progetto vuole riportare il fascino dei pixel e delle esperienze
          autentiche in un mondo sempre piu' moderno.”
        </p>
      </div>

      <hr className="separator my-5" />
      <div className="container-manual team text-center mb-5">
        <h3 style={{ fontSize: "30px" }} className="star-crush gr-viola">
          Sito fatto da:
        </h3>
        <ul style={{ fontSize: "30px" }}>
          {names.map((name, id) => (
            <li key={id} className="byte-bounce text">
              - {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const names = ["Jasmin", "Manuel Gozzi", "Sirio", "Michele Brignola"];
import { NavLink } from "react-router";
import "../assets/css/hero.css";
export default function AboutUs() {
  return (
    <div className="py-3 byte-bounce gr-viola container-manual">
      <section class="hero">
        <h1 className="star-crush">
          Press Start e torna nell’epoca d’oro del gaming
        </h1>
        <p className="fs-4 text">
          Rivivi i grandi classici, scopri titoli senza tempo e immergiti in
          un’esperienza retro con un tocco moderno.
        </p>

        <div class="hero-buttons">
          <NavLink to={"/"} className="btn primary text">
            Inizia a giocare
          </NavLink>
          <NavLink className="btn secondary text" to={"/Products"}>
            Scopri i giochi
          </NavLink>
        </div>
      </section>
      <h3 className="star-crush">Perché siamo qui</h3>
      <p className="fs-5 text">
        “Nato dalla passione per i videogiochi degli anni ’80 e ’90, il progetto
        vuole riportare il fascino dei pixel e delle esperienze autentiche in un
        mondo sempre più moderno.”
      </p>
      <p style={{ fontSize: "30px" }}>Sito fatto da:</p>
      <ul style={{ fontSize: "30px" }}>
        {names.map((name, id) => (
          <li key={id}>- {name}</li>
        ))}
      </ul>
    </div>
  );
}

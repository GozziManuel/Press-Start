import { useEffect } from "react";
import "../assets/css/thankyoupage.css";
import { Link } from "react-router";

export default function ThankYouPage() {
  useEffect(() => {
    // Funziona così:
    // Al caricamento: non fa nulla (lascia il token vivo per la Guardia)

    return () => {
      localStorage.removeItem("order_access");
    };
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5 "
      style={{ width: "100%" }}
    >
      <div className="thank-container ">
        <div className="check-icon">✔</div>

        <h1 className="thank-title text fs-1 star-crush">Grazie!</h1>

        <p className="thank-text  text fs-4 byte-bounce">
          Grazie per aver acquistato un gioco su Press Start.
        </p>

        <p className="thank-text text fs-5 byte-bounce mb-5">
          Il tuo ordine sara' inviato a breve.
        </p>

        <Link className="thank-btn fs-5 byte-bounce" to={"/products"}>
          Torna ai giochi
        </Link>
      </div>
    </div>
  );
}

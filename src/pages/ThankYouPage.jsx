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
    <div className="thank-page-wrapper">
      <div className="thank-container">
        {/* Angoli */}
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>

        <h1 className="thank-title star-crush" data-text="MISSIONE COMPLETATA">
          MISSION ACCOMPLISHED
        </h1>

        <div className="stats-box byte-bounce">
          <p className="thank-text">
            <span className="label">ORDER ID:</span>
            <span className="value">#1234</span>
          </p>
          <p className="thank-text">
            <span className="label">PURCHASE DATE:</span>
            <span className="value">10/04/2026</span>
          </p>
          <p className="thank-text">
            <span className="label">TOTAL AMOUNT:</span>
            <span className="value">70.01</span>
          </p>
          <p className="thank-text">
            <span className="label">STATUS:</span>
            <span className="value">ORDINE ELABORATO</span>
          </p>
          <p className="thank-text">
            <span className="label">REWARD:</span>
            <span className="value">20p POTERE D'ACQUISTO</span>
          </p>
        </div>

        {/* AVATAR */}
        <div className="dev-team-section">
          <p className="team-label byte-bounce">
            Thank you for your purchase! It truly supports our dev team's work.
            We hope you enjoyed using our site as much as we enjoyed coding it.
          </p>
          <div className="dev-team-display">
            <div className="dev-avatar">
              <img
                src="/kirby-greetings2.gif"
                alt="Developer 1"
                className="kirby-greetings-avatar"
              />
            </div>
            <div className="dev-avatar">
              <img
                src="/donkey-kong2.gif"
                alt="Developer 2"
                className="donkey-kong-avatar"
              />
            </div>
            <div className="dev-avatar">
              <img
                src="/crash-bandicoot-greetings2.gif"
                alt="Developer 2"
                className="crash-bandicoot-avatar"
              />
            </div>
            <div className="dev-avatar">
              <img
                src="/frog-greetings.gif"
                alt="Developer 2"
                className="frog-greetings-avatar"
              />
            </div>
          </div>
        </div>

        <div className="btn-wrapper">
          <Link className="thank-btn byte-bounce" to={"/products"}>
            FEEL FREE TO KEEP EXPLORING
          </Link>
        </div>
      </div>
    </div>
  );
}

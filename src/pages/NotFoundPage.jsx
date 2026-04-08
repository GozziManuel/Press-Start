import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import GhostCursor from "../components/GhostCursor";
import "../assets/css/notFound.css";

const rescue1Time = 11000;
const rescue2Time = 5000;

export default function NotFoundPage() {
  const containerRef = useRef(null);

  // gestione animazioni
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // mopuse mask
  useEffect(() => {
    // se l'animazione è finita
    if (isAnimating) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      // Calcolo della posizione rispetto al container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [isAnimating]);

  // Logica da eseguire solo la prima volta intro big-boss
  useEffect(() => {
    // controllo se l'utente ha già visto l'intro nel localStorage
    const hasSeenIntro = localStorage.getItem("pressStart_404_intro_seen");

    if (!hasSeenIntro) {
      // se non ha mai visto l'intro
      setIsAnimating(true);
      setCurrentVideoIndex(1); // la prima Video

      // Timer 1 --> dopo la durata della Video 1, passa alla Video 2
      const timer1 = setTimeout(() => {
        setCurrentVideoIndex(2);
      }, rescue1Time);

      // Timer 2 --> dopo la durata di Video 1 + Video 2 --> finisce l'animazione
      const timer2 = setTimeout(() => {
        setIsAnimating(false);
        setCurrentVideoIndex(0);
        // salvataggio nel localStorage che l'intro è stata vista
        localStorage.setItem("pressStart_404_intro_seen", "true");
      }, rescue1Time + rescue2Time);

      // pulizia dei timer se l'utente cambia pagina prima della fine
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // l'utente ha già visto l'intro --> non fare nulla
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="not-found-container position-relative d-flex align-items-center justify-content-center overflow-hidden"
    >
      {isAnimating ? (
        /* SCENA A: Video Intro a tutto schermo */
        <div className="intro-gif-overlay">
          {currentVideoIndex === 1 && (
            <video
              src="/big-boss-rescue1.mp4"
              autoPlay
              playsInline
              className="fullscreen-video"
            />
          )}
          {currentVideoIndex === 2 && (
            <video
              src="/big-boss-rescue2.mp4"
              autoPlay
              playsInline
              className="fullscreen-video"
            />
          )}
        </div>
      ) : (
        /* SCENA B: La pagina 404 standard */
        <>
          <GhostCursor
            // Visuals
            color="#B19EEF"
            brightness={2}
            edgeIntensity={0}
            // Trail and motion
            trailLength={50}
            inertia={0.5}
            // Post-processing
            grainIntensity={0.05}
            bloomStrength={0.1}
            bloomRadius={1}
            bloomThreshold={0.025}
            // Fade-out behavior
            fadeDelayMs={1000}
            fadeDurationMs={1500}
          />

          {/* Contenuto rivelato dalla lente CSS */}
          <div className="reveal-mask">
            <div className="text-center p-4 content-to-reveal">
              <h1 className="glitch-text-404">404</h1>
              <h2
                className="mb-4 text-uppercase tracking-widest"
                style={{ fontFamily: "star-crush, sans-serif" }}
              >
                Out-Of-Bound Glitcher
              </h2>
              <p className="spiegone mb-5 opacity-75">
                Ti sei spinto troppo oltre i confini della mappa.
                <br />
                Hai ancora la possibilità di ricominciare
              </p>

              <Link to="/" className="btn-restart-game">
                RESTART GAME
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import GhostCursor from "../components/GhostCursor";
import "../assets/css/notFound.css";

export default function NotFoundPage() {
  const containerRef = useRef(null);

  // gestione animazione
  const [isAnimating, setIsAnimating] = useState(false);

  // mouse mask
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
    }
  }, []);

  // Funzione chiamata quando finisce il video intro
  const finishIntro = () => {
    setIsAnimating(false);
    localStorage.setItem("pressStart_404_intro_seen", "true");
  };

  // Funzione che in caso di link diretto alla 404 previene l'incartamento del video e lo esegue in modalità muted
  const handleVideoReady = (e) => {
    const videoElement = e.target;
    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // se entra qui, significa che il browser ha bloccato l'autoplay unmuted.
        console.warn(
          "Autoplay con audio bloccato. Forzato il mute per eseguire lo stesso il video.",
          error,
        );
        videoElement.muted = true;
        videoElement.play();
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="not-found-container position-relative d-flex align-items-center justify-content-center overflow-hidden"
    >
      {isAnimating ? (
        /* First time --> video intro */
        <div className="intro-video-overlay">
          <video
            src="/real-boss.mp4"
            autoPlay
            playsInline
            className="fullscreen-video"
            onEnded={finishIntro} // per evitare desincronizzazioni dovute ad un pc lento se si utilizza setTimeout
            onCanPlay={handleVideoReady}
          />
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

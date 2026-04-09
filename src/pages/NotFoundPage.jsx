import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import GhostCursor from "../components/GhostCursor";
import "../assets/css/notFound.css";

export default function NotFoundPage() {
  const containerRef = useRef(null);
  const [userTriggered, setUserTriggered] = useState(false);

  // Funzione per leggere il localStorage immediatamente. Questo evita che la pagina 404 appaia per un istante prima del video.
  const [isAnimating, setIsAnimating] = useState(() => {
    return localStorage.getItem("pressStart_404_intro_seen") !== "true";
  });

  const userAudioHelper = ["/sn1.mp3", "/sn2.mp3"];

  // LOGICA AUDIO RANDOM
  useEffect(() => {
    // se l'intro è attiva, esce. L'audio partirà quando isAnimating diventerà false.
    if (isAnimating) return;

    const randomIndex = Math.floor(Math.random() * userAudioHelper.length);
    const audio = new Audio(userAudioHelper[randomIndex]);
    audio.volume = 0.4;

    // Funzione che attiva  il timer una volta che l'intro è terminata
    const audioTimer = setTimeout(() => {
      audio.play().catch((err) => {
        console.warn(
          "Audio 404 bloccato (normale senza interazione utente):",
          err,
        );
      });
    }, 2000); // <--- 2000ms di delay

    // Cleanup function
    return () => {
      clearTimeout(audioTimer); // annulla il timer se l'utente se ne va prima dei 2 secondi
      audio.pause();
      audio.src = "";
    };
  }, [isAnimating]); // riesegue quando finisce il video o se l'utente entra e l'intro è già stata vista

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

  // Funzione che avvisa quando finisce il video intro
  const finishIntro = () => {
    setIsAnimating(false);
    localStorage.setItem("pressStart_404_intro_seen", "true");
  };

  // Funzione che in caso di link diretto alla 404 previene l'incartamento del video e lo esegue in modalità muted
  const handleVideoCrash = (e) => {
    const videoElement = e.target;
    videoElement.muted = false;
    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // se entra qui, significa che il browser ha bloccato l'autoplay
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
        <div className="intro-video-overlay bg-black">
          {!userTriggered ? (
            /* CODEC */
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <div className="boss-warning-box">
                <h2
                  className="text-mgs-green mb-2"
                  style={{ fontFamily: "star-crush, sans-serif" }}
                >
                  [ ERROR: SIGNAL DETECTED ]
                </h2>
                <p
                  className="text-mgs-green opacity-75 mb-4"
                  style={{ fontSize: "0.9rem" }}
                >
                  LOCALIZZAZIONE: OUT OF BOUNDS
                  <br />
                  STATO-MISSIONE: RILEVATO DA UNITÀ "SNAKE" ...shadowing/tailing
                </p>

                <div className="mb-4">
                  <span className="text-white bg-danger px-2 py-1 small fw-bold">
                    PURSUE FLEEING HOSTILE
                  </span>
                </div>

                <h4
                  className="text-white mb-5"
                  style={{ letterSpacing: "1px" }}
                >
                  Boss: "I found you! Let's go back..."
                </h4>

                <button
                  className="btn-mgs-transmission"
                  onClick={() => setUserTriggered(true)}
                >
                  Good Game
                </button>
              </div>
            </div>
          ) : (
            /* Video Video Intro */
            <video
              src="/real-boss.mp4"
              autoPlay
              playsInline
              className="fullscreen-video"
              onEnded={finishIntro}
              onCanPlay={handleVideoCrash}
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

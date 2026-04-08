import { useEffect } from "react";

export default function ThankYouPage() {
  useEffect(() => {
    // Funziona così:
    // Al caricamento: non fa nulla (lascia il token vivo per la Guardia)

    return () => {
      localStorage.removeItem("order_access");
    };
  }, []);
  return (
    <div className="container-manual">
      <div className="d-flex justify-content-center">
        <div className="card p-4 byte-bounce">
          <h2 className="star-crush gr-viola">Grazie!</h2>
          <p className="text fs-text">
            Grazie per aver scelto di acquistare un gioco da questo sito.
          </p>
          <p className="text fs-text">Il tuo ordine sarà inviato a breve.</p>
        </div>
      </div>
    </div>
  );
}

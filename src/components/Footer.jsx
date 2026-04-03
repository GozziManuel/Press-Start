import "../assets/css/footer.css";

export default function Footer() {
  return (
    <footer>
      <img
        src="/Mr-Pacman.png"
        alt="Pac-Man"
        style={{ height: "200px", translate: "50%" }}
      />
      <hr className="separator" />
      <div className="footer row pb-0 me-0 container-manual">
        <div className="byte-bounce col-sm-12 col-md-5 mb-5">
          <h4 className="star-crush gr-viola">Press Start</h4>
          <p className="m-0 text fs-5">
            Un progetto dedicato agli appassionati di retro gaming, dove é
            possibile scoprire e acquistare i grandi classici che hanno fatto la
            storia. Uniamo nostalgia e design moderno per offrire un'esperienza
            semplice, coinvolgente e autentica.
          </p>
        </div>
        <div className="col-md-5 col-sm-12">
          <h3 className="star-crush gr-viola">Contact Us</h3>
          <p className="text byte-bounce fs-5">
            Hai domande, richieste o vuoi semplicemente metterti in contatto con
            noi? Il nostro team é sempre pronto ad aiutarti.
          </p>
          <p className="text byte-bounce fs-4" id="email">
            support@pressstart.com
          </p>
        </div>
        <p className="text-center text">Press Start &copy;</p>
      </div>
    </footer>
  );
}

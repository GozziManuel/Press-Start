import "../assets/css/footer.css";

export default function Footer() {
  return (
    <>
      <hr className="separator" />
      <div className="footer row pb-0 me-0 container-manual">
        <div className="byte-bounce gr-viola col-sm-12 col-md-5 mb-5">
          <h4 className="star-crush">Retro Games</h4>
          <p className="m-0 text ">
            Un progetto dedicato agli appassionati di retro gaming, dove è
            possibile scoprire e acquistare i grandi classici che hanno fatto la
            storia. Uniamo nostalgia e design moderno per offrire un’esperienza
            semplice, coinvolgente e autentica.
          </p>
        </div>
        <div className="col-md-5 gr-viola col-sm-12">
          <h3 className="star-crush">Contact Us</h3>
          <p></p>
        </div>
      </div>
      <hr className="separator" />
      <p className=" text-center text">
        &copy; <span className="gr-viola">Retro Games</span>
      </p>
    </>
  );
}

import { Link, Navigate, useNavigate } from "react-router";
import { useMain } from "../contexts/MainContext";
import "../assets/css/checkout.css";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
const initData = {
  user_name: "",
  user_surname: "",
  user_email: "",
  shipping_city: "",
  shipping_address: "",
  shipping_postal_code: "",
  shipping_country: "",
  total_price: "",
  coupon: false,
  coupon_id: null,
  loot: {},
};

export default function Checkout() {
  const navigate = useNavigate();
  const {
    finLoot,
    isCoupon,
    totaleLoot,
    setIsCoupon,
    setFinLoot,
    setTotaleLoot,
    setLoot,
  } = useMain();
  // LOADER
  const [isLoading, setIsLoading] = useState(false);

  // OTHER STATES
  const [inputValidation, setInputValidation] = useState(false);
  const [dataSend, setDataSend] = useState(initData);
  const daPagare = isCoupon.result.valid
    ? parseFloat(totaleLoot) - isCoupon.result.discount
    : parseFloat(totaleLoot);

  const handleDataSend = (e) => {
    const { name, value } = e.target;
    const textOnlyFields = [
      "user_name",
      "user_surname",
      "shipping_city",
      "shipping_country",
    ];
    if (textOnlyFields.includes(name)) {
      const allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
      const lastChar = value.slice(-1);

      if (lastChar !== "" && !allowed.includes(lastChar)) {
        setInputValidation(true);
        return;
      } else if (allowed.includes(lastChar)) {
        setInputValidation(false);
      }
    }
    setDataSend({ ...dataSend, [name]: value });
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:3000/checkout", dataSend)
      .then((res) => {
        // Generiamo un token finto nel front-end
        localStorage.setItem("order_access", "true"); // Reset e navigazione
        navigate("/greetings", { replace: true });
        localStorage.removeItem("loot");
        setLoot([]);
        setIsCoupon({ result: { valid: false } });
        setFinLoot([]);
        // setTotaleLoot(0.0);
        setDataSend(initData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setDataSend({
      ...dataSend,
      coupon: isCoupon.result.valid,
      coupon_id: isCoupon.result.coupon_id,
      total_price: parseFloat(daPagare),
      loot: finLoot,
    });
  }, []);
  useEffect(() => {
    if (!finLoot || isNaN(daPagare) || daPagare === 0) {
      navigate("/loot");
    }
  }, [finLoot]);

  return (
    <div className="container-manual mt-4 labelfinder">
      <form onSubmit={handleDataSubmit}>
        {/* I tuoi dati */}
        <h2 className="star-crush gr-viola">I tuoi dati</h2>
        <div className="card-form">
          <div className="row">
            <div className="field col-sm-12 col-md-6">
              <label htmlFor="nome-checkout">Nome</label>
              <input
                name="user_name"
                onChange={handleDataSend}
                type="text"
                id="username-checkout"
                value={dataSend.user_name}
                required
              />
            </div>
            <div className="field col-sm-12 col-md-6">
              <label htmlFor="cognome-checkout">Cognome</label>
              <input
                name="user_surname"
                onChange={handleDataSend}
                type="text"
                required
                id="cognome-checkout"
                value={dataSend.user_surname}
              />
            </div>
            <div className="field full ">
              <label htmlFor="email-checkout">Il tuo indirizzo email</label>
              <input
                name="user_email"
                onChange={handleDataSend}
                type="email"
                required
                id="email-checkout"
                value={dataSend.user_email}
              />
            </div>
            <div className="field  col-sm-12 col-md-6">
              <label htmlFor="nazione-checkout">Nazione</label>
              <input
                name="shipping_country"
                onChange={handleDataSend}
                type="text"
                required
                id="nazione-checkout"
                value={dataSend.shipping_country}
              />
            </div>
            <div className="field  col-sm-12 col-md-6">
              <label htmlFor="citta-checkout">Citta</label>
              <input
                name="shipping_city"
                onChange={handleDataSend}
                type="text"
                required
                id="citta-checkout"
                value={dataSend.shipping_city}
              />
            </div>
            <div className="field  col-sm-12 col-md-6">
              <label htmlFor="indirizzo-checkout">
                Via/Piazza e numero civico
              </label>
              <input
                name="shipping_address"
                onChange={handleDataSend}
                type="text"
                required
                id="indirizzo-checkout"
                value={dataSend.shipping_address}
              />
            </div>
            <div className="field  col-sm-12 col-md-6">
              <label htmlFor="cap-checkout">C.A.P</label>
              <input
                name="shipping_postal_code"
                onChange={handleDataSend}
                type="text"
                required
                id="cap-checkout"
                value={dataSend.shipping_postal_code}
              />
            </div>
          </div>
        </div>

        {/* INPUT VALIDATION */}
        {inputValidation && (
          <div className="d-flex justify-content-center">
            <div
              className="validationContainer mb-3 py-3"
              style={{ maxWidth: "18rem;" }}
            >
              <div
                className="card-header  byte-bounce fs-5 px-3 text-center"
                style={{ color: "var(--danger-text)" }}
              >
                E' necessario mettere caratteri adeguati nel campo: solo
                caratteri alfabetici
              </div>
            </div>
          </div>
        )}

        {/* Il tuo ordine */}
        <div className="smoothIn">
          <h2 className="star-crush gr-viola">Il tuo ordine</h2>

          <div>
            {finLoot.map((el, id) => {
              return (
                <div
                  style={{ color: "var(--text-primary)" }}
                  className="fs-4"
                  key={id}
                >
                  <span className="byte-bounce ">
                    {el.name} x {el.quantity}{" "}
                  </span>
                  <span>{el.total.toFixed(2)} &euro;</span>
                </div>
              );
            })}
            {isCoupon.result.valid && (
              <div>
                <span className="byte-bounce text fs-4">Sconto</span>
                <span className="text  fs-4">
                  {" "}
                  {isCoupon.result.discount} &euro;
                </span>
              </div>
            )}
            <div style={{ color: "var(--text-primary)" }}>
              <span className="byte-bounce fs-3 gr-viola">
                Totale da pagare{" "}
              </span>
              <span className="fs-3">{daPagare.toFixed(2)} &euro; </span>
            </div>
            <hr className="separator my-4" />

            <h2 className="star-crush gr-viola">Pagamento</h2>
            <div className="card-form">
              <div className="field full">
                <label>Intestatario</label>
                <input placeholder="Mario Rossi" />
              </div>
              <div className="field full">
                <label>Numero carta</label>
                <input placeholder="1234 5678 9012 3456" maxLength={19} />
              </div>
              <div className="field">
                <label>Scadenza</label>
                <input placeholder="MM/AA" maxLength={5} />
              </div>
              <div className="field">
                <label>CVV</label>
                <input placeholder="•••" maxLength={3} type="password" />
              </div>
            </div>

            <button className="btn-pay star-crush" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Elaborazione...
                </>
              ) : (
                "Effettua Ordine"
              )}
            </button>

            <p className="secure-note">
              <i className="bi bi-lock-fill" /> Pagamento sicuro
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

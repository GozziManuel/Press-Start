import { Link } from "react-router";
import { useMain } from "../contexts/MainContext";
import "../assets/css/checkout.css";
import { useEffect, useState } from "react";
import axios from "axios";
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
  const {
    finLoot,
    isCoupon,
    totaleLoot,
    setIsCoupon,
    setFinLoot,
    setTotaleLoot,
    setLoot,
  } = useMain();
  const [dataSend, setDataSend] = useState(initData);
  const daPagare = isCoupon.result.valid
    ? (parseFloat(totaleLoot) - isCoupon.result.discount).toFixed(2)
    : parseFloat(totaleLoot).toFixed(2);

  const handleDataSend = (e) => {
    const { name, value } = e.target;
    setDataSend({ ...dataSend, [name]: value });
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    console.log(dataSend);
    axios.post("http://localhost:3000/checkout", dataSend).then((res) => {
      localStorage.removeItem("loot");
      setLoot(() => {
        return JSON.parse(localStorage.getItem("loot")) || [];
      });
    });
    setIsCoupon({
      result: {
        valid: false,
      },
    });
    setDataSend(initData);
    setFinLoot([]);
    setTotaleLoot(null);
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

  return (
    <div className="container-manual mt-4">
      <form onSubmit={handleDataSubmit}>
        {/* I tuoi dati */}
        <div>
          <h2>I tuoi dati</h2>
          <label htmlFor="nome-checkout">Nome</label>
          <input
            name="user_name"
            onChange={handleDataSend}
            type="text"
            id="username-checkout"
            value={dataSend.user_name}
            required
          />
          <label htmlFor="cognome-checkout">Cognome</label>
          <input
            name="user_surname"
            onChange={handleDataSend}
            type="text"
            required
            id="cognome-checkout"
            value={dataSend.user_surname}
          />
          <label htmlFor="email-checkout">Il tuo indirizzo email</label>
          <input
            name="user_email"
            onChange={handleDataSend}
            type="email"
            required
            id="email-checkout"
            value={dataSend.user_email}
          />
          <label htmlFor="nazione-checkout">Nazione</label>
          <input
            name="shipping_country"
            onChange={handleDataSend}
            type="text"
            required
            id="nazione-checkout"
            value={dataSend.shipping_country}
          />
          <label htmlFor="citta-checkout">Citta</label>
          <input
            name="shipping_city"
            onChange={handleDataSend}
            type="text"
            required
            id="citta-checkout"
            value={dataSend.shipping_city}
          />
          <label htmlFor="indirizzo-checkout">Via/Piazza e numero civico</label>
          <input
            name="shipping_address"
            onChange={handleDataSend}
            type="text"
            required
            id="indirizzo-checkout"
            value={dataSend.shipping_address}
          />
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
        {/* Il tuo ordine */}
        <div>
          <h2>Il tuo ordine</h2>
          <div>
            <span>Prodotto</span>
            <span>Totale</span>
          </div>
          <div>
            {finLoot.map((el) => {
              return (
                <div>
                  <span>
                    {el.name} x {el.quantity}
                  </span>
                  <span>&euro;{el.total.toFixed(2)}</span>
                </div>
              );
            })}
            {isCoupon.result.valid && (
              <div>
                <span>Sconto</span>
                <span>&euro;{isCoupon.result.discount}</span>
              </div>
            )}
            <div>
              <span>Totale da pagare</span>
              <span>&euro;{daPagare}</span>
            </div>
            <hr className="separator" />

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

            <button className="btn-pay star-crush">Effettua Ordine</button>

            <p className="secure-note">
              <i className="bi bi-lock-fill" /> Pagamento sicuro
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

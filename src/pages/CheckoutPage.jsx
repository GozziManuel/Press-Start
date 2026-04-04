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
  const { loot, finLoot, isCoupon, totaleLoot } = useMain();
  const [dataSend, setDataSend] = useState(initData);
  const totale = loot?.reduce((acc, i) => acc + i.price * i.qty, 0) ?? 0;
  const daPagare = isCoupon.valid ? totaleLoot - isCoupon.discount : totaleLoot;

  const handleDataSend = (e) => {
    const { name, value } = e.target;
    setDataSend({ ...dataSend, [name]: value });
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/checkout", dataSend).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    setDataSend({
      ...dataSend,
      coupon: isCoupon.valid,
      coupon_id: isCoupon.coupon_id,
      total_price: daPagare,
      loot: finLoot,
    });
  }, []);

  //     user_name,
  //     user_surname,
  //     user_email,
  //     shipping_city,
  //     shipping_address,
  //     shipping_postal_code,
  //     shipping_country,
  //     total_price,
  //     coupon,
  //     coupon_id,
  //     loot,

  return (
    <div className="checkout-wrapper">
      {/* <div className="checkout-box">
        <h2 className="star-crush gr-viola">Riepilogo</h2>
        <ul className="summary-list">
          {loot?.map((item) => (
            <li key={item.id}>
              <span>
                {item.title} <small>x{item.qty}</small>
              </span>
              <span>€{(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="summary-total">
          <span className="star-crush">Totale</span>
          <span className="star-crush gr-viola">€{totale.toFixed(2)}</span>
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

        <button className="btn-pay star-crush">
          Paga €{totale.toFixed(2)}
        </button>

        <p className="secure-note">
          <i className="bi bi-lock-fill" /> Pagamento sicuro
        </p>
      </div> */}
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
          />
          <label htmlFor="cognome-checkout">Cognome</label>
          <input
            name="user_surname"
            onChange={handleDataSend}
            type="text"
            id="cognome-checkout"
          />
          <label htmlFor="email-checkout">Il tuo indirizzo email</label>
          <input
            name="user_email"
            onChange={handleDataSend}
            type="email"
            id="email-checkout"
          />
          <label htmlFor="nazione-checkout">Nazione</label>
          <input
            name="shipping_country"
            onChange={handleDataSend}
            type="text"
            id="nazione-checkout"
          />
          <label htmlFor="citta-checkout">Citta</label>
          <input
            name="shipping_city"
            onChange={handleDataSend}
            type="text"
            id="citta-checkout"
          />
          <label htmlFor="indirizzo-checkout">Via/Piazza e numero civico</label>
          <input
            name="shipping_address"
            onChange={handleDataSend}
            type="text"
            id="indirizzo-checkout"
          />
          <label htmlFor="cap-checkout">C.A.P</label>
          <input
            name="shipping_postal_code"
            onChange={handleDataSend}
            type="text"
            id="cap-checkout"
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
                  <span>&euro;{el.total}</span>
                </div>
              );
            })}
            {isCoupon.valid && (
              <div>
                <span>Sconto</span>
                <span>&euro;{isCoupon.discount}</span>
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

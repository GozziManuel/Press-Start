import { Link } from "react-router";
import { useMain } from "../contexts/MainContext";
import "../assets/css/checkout.css";

export default function Checkout() {
  const { loot, finLoot, isCoupon, totaleLoot } = useMain();

  const totale = loot?.reduce((acc, i) => acc + i.price * i.qty, 0) ?? 0;

  const daPagare = isCoupon.valid ? totaleLoot - isCoupon.discount : totaleLoot;

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
      <form>
        {/* I tuoi dati */}
        <div>
          <h2>I tuoi dati</h2>
          <label htmlFor="nome-checkout">Nome</label>
          <input type="text" id="username-checkout" />
          <label htmlFor="cognome-checkout">Cognome</label>
          <input type="text" id="cognome-checkout" />
          <label htmlFor="email-checkout">Il tuo indirizzo email</label>
          <input type="email" id="email-checkout" />
          <label htmlFor="indirizzo-checkout">Via/Piazza e numero civico</label>
          <label htmlFor="nazione-checkout">Nazione</label>
          <input type="text" id="nazione-checkout" />
          <input type="text" id="indirizzo-checkout" />
          <label htmlFor="citta-checkout">Citta</label>
          <input type="text" id="citta-checkout" />
          <label htmlFor="cap-checkout">C.A.P</label>
          <input type="text" id="cap-checkout" />
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

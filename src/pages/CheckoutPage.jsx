import { Link } from "react-router";
import { useMain } from "../contexts/MainContext";
import "../assets/css/checkout.css";

export default function Checkout() {
  const { loot } = useMain();

  const totale = loot?.reduce((acc, i) => acc + i.price * i.qty, 0) ?? 0;

  return (
    <div className="checkout-wrapper">
      <div className="checkout-box">

        {/* Riepilogo */}
        <h2 className="star-crush gr-viola">Riepilogo</h2>
        <ul className="summary-list">
          {loot?.map((item) => (
            <li key={item.id}>
              <span>{item.title} <small>x{item.qty}</small></span>
              <span>€{(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="summary-total">
          <span className="star-crush">Totale</span>
          <span className="star-crush gr-viola">€{totale.toFixed(2)}</span>
        </div>

        <hr className="separator" />

        {/* Form carta */}
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

      </div>
    </div>
  );
}
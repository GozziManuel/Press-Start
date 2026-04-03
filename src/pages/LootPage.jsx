import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMain } from "../contexts/MainContext";
import axios from "axios";

export default function LootPage() {
  const { loot, addItem, removeItem, setLoot } = useMain();
  const [finLoot, setFinLoot] = useState([]);
  const [isCoupon, setIsCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  //null foto prodotto prezzo quantita totale
  const tmp = loot.reduce((ac, ce) => {
    const { name, image, price, discount_value, expedition_price, id } = ce;
    ac[name] = ac[name] || {};
    ac[name].name = name;
    ac[name].quantity = (ac[name].quantity || 0) + 1;
    ac[name].price = price;
    ac[name].image = image;
    ac[name].total = price * ac[name].quantity;
    ac[name].discount_value = discount_value;
    ac[name].expedition_price = expedition_price;
    ac[name].id = id;
    console.log(price * ac[name].quantity);
    return ac;
  }, {});

  const totaleLoot = Object.values(tmp).reduce((ac, ce) => {
    return (ac += ce.total);
  }, 0);

  const handleQuantity = (e, elem) => {
    const { value } = e.target;
    finLoot.forEach((el) => {
      if (elem.name === el.name) {
        if (value > el.quantity) {
          addItem(elem);
        }
        if (value < el.quantity) {
          removeItem(elem);
        }
      }
    });
  };

  const handleRemove = (e, elem) => {
    const tmp = loot.filter((el) => {
      return el.id != elem.id;
    });
    setLoot(tmp);
  };

  useEffect(() => {
    setFinLoot(Object.values(tmp));
  }, [loot]);

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const handleIsCoupon = () => {
    const forged = {
      code: coupon,
    };
    axios.post("http://localhost:3000/coupon", forged).then((res) => {
      setIsCoupon(res.data.result);
    });
  };

  return (
    <div className="container-manual py-5">
      <div className="d-flex">
        <h2 className="fw-bold mb-4 text">My Loot</h2>
        <img
          src="/mario-coin.gif"
          alt="coin"
          className="mx-4"
          style={{ width: "50px" }}
        />
      </div>

      <div className="row g-4 align-items-start">
        {/* Colonna sinistra: prodotti + coupon */}
        <div className="col-lg-8">
          {/* Header colonne */}
          <div className="row text-muted fw-semibold border-bottom pb-2 mb-2 d-none d-md-flex">
            <div className="col-1"></div>
            <div className="col-2"></div>
            <div className="col-3 text">Prodotto</div>
            <div className="col-2 text">Prezzo</div>
            <div className="col-2 text">Quantità</div>
            <div className="col-2 text">Totale</div>
          </div>

          {/* Righe prodotti */}
          {finLoot.map((el, i) => (
            <div key={i} className="row align-items-center border-bottom py-3">
              <div className="col-1">
                <button
                  className="btn btn-sm btn-outline-danger rounded-circle"
                  style={{ width: 30, height: 30, padding: 0, lineHeight: 1 }}
                  onClick={(e) => handleRemove(e, el)}
                >
                  ✕
                </button>
              </div>
              <div className="col-2">
                <img
                  className="loot-img rounded"
                  src={el.image}
                  alt={el.name}
                  style={{ width: 64, height: 64, objectFit: "cover" }}
                />
              </div>
              <div className="col-3 fw-semibold text">{el.name}</div>
              <div className="col-2 text">{el.price} &euro;</div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: 80 }}
                  name="totale"
                  min="1"
                  onChange={(e) => handleQuantity(e, el)}
                  value={el.quantity}
                />
              </div>
              <div className="col-2 fw-semibold text">
                {el.total.toFixed(2)} &euro;
              </div>
            </div>
          ))}

          {/* Coupon */}
          <div className="border rounded p-3 mt-4">
            <p className="mb-2 fw-semibold text">Hai un codice sconto?</p>
            <div className="input-group" style={{ maxWidth: 420 }}>
              <input
                type="text"
                className="form-control"
                placeholder="Inseriscilo qui"
                name="coupon"
                value={coupon}
                onChange={handleCoupon}
              />
              <button
                onClick={handleIsCoupon}
                className="btn btn-outline-primary"
                disabled={coupon === ""}
              >
                Applica codice promozionale
              </button>
            </div>
          </div>
        </div>

        {/* Colonna destra: riepilogo */}
        <div className="col-lg-4">
          <div className="border rounded p-4">
            <h5 className="fw-bold text mb-3">Totale del tuo Loot</h5>
            <hr />
            {!isCoupon.valid && (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text">Totale</span>
                <span className="fs-5 fw-bold text">
                  {totaleLoot.toFixed(2)} &euro;
                </span>
              </div>
            )}
            {isCoupon.valid && (
              <div className="">
                <div>
                  <span className="text">Totale</span>
                  <span className="fs-5 fw-bold text">{totaleLoot}</span>
                </div>
                <div>
                  <span>Sconto</span>
                  <span>{isCoupon.discount}</span>
                </div>
                <div>
                  <span>Totale da pagare</span>
                  <span>{totaleLoot - isCoupon.discount}</span>
                </div>
              </div>
            )}
            <div className="d-grid gap-2">
              <Link to={"/checkout"}>
                <button className="button primary transparent text">
                  Vai alla cassa
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

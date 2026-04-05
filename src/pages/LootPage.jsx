import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMain } from "../contexts/MainContext";
import axios from "axios";
import "../assets/css/lootpage.css";

export default function LootPage() {
  const {
    loot,
    addItem,
    removeItem,
    setLoot,
    isCoupon,
    setIsCoupon,
    finLoot,
    setFinLoot,
    totaleLoot,
    setTotaleLoot,
  } = useMain();
  // const [finLoot, setFinLoot] = useState([]);
  // const [isCoupon, setIsCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  //null foto prodotto prezzo quantita totale
  const tmp = loot.reduce((ac, ce) => {
    const { name, image, price, discount_value, expedition_price, id } = ce;
    ac[name] = ac[name] || {};
    ac[name].name = name;
    ac[name].quantity = (ac[name].quantity || 0) + 1;
    ac[name].price = parseFloat(price); // prezzo originale
    ac[name].finalPrice = parseFloat(price) - (discount_value || 0);
    ac[name].total = ac[name].finalPrice * ac[name].quantity;
    ac[name].image = image;
    ac[name].discount_value = discount_value;
    ac[name].expedition_price = expedition_price;
    ac[name].id = id;

    return ac;
  }, {});

  useEffect(() => {
    const total = Object.values(tmp).reduce((ac, ce) => {
      return ac + ce.total;
    }, 0);

    setTotaleLoot(total);
  }, [loot]);

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

  useEffect(() => {
    if (finLoot.length === 0)
      setIsCoupon({
        result: { valid: false },
      });
  }, [finLoot]);

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const handleIsCoupon = () => {
    const forged = {
      code: coupon,
    };
    axios.post("http://localhost:3000/coupon", forged).then((res) => {
      setIsCoupon(res.data);
    });
  };
  console.log(totaleLoot);

  return (
    <div className="container-manual py-5">
      <div className="d-flex mb-5 align-items-center">
        <h2 className="fw-bold star-crush gr-viola">My Loot</h2>
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
          <div className="row fs-4 text-muted  pb-2 mb-2 d-none d-md-flex byte-bounce bordercard">
            <div className="col-1"></div>
            <div className="col-2"></div>
            <div className="col-3 text ps-0">Prodotto</div>
            <div className="col-2 text ps-0">Prezzo</div>
            <div className="col-2 text ps-0">Quantita'</div>
            <div className="col-2 text " style={{ color: "var(--viola)" }}>
              Totale
            </div>
          </div>

          {/* Righe prodotti */}
          {finLoot.map((el, i) => (
            <div key={i} className="row align-items-center bordercard py-3">
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
              <div className="col-3 fs-5 text byte-bounce px-0">{el.name}</div>
              <div className="col-2 text">
                {el.discount_value > 0 && (
                  <span
                    style={{ textDecoration: "line-through", marginRight: 5 }}
                  >
                    {el.price.toFixed(2)} &euro; <br />
                  </span>
                )}
                <span className="discountCheckout">
                  {el.finalPrice.toFixed(2)} &euro;
                </span>
              </div>
              <div className="col-2 p-0">
                <input
                  type="number"
                  className="form-control"
                  style={{ maxWidth: 70 }}
                  name="totale"
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
          <div
            className="  p-3 mt-4  fs-3"
            style={{ border: "1px solid var(--text-primary)" }}
          >
            <p
              className="mb-2 fw-semibold text star-crush"
              style={{ color: "var(--light-blue" }}
            >
              Hai un codice sconto?
            </p>
            <div className="input-group" style={{ maxWidth: 420 }}>
              <input
                type="text"
                className="form-control coupon-input"
                placeholder="Inseriscilo qui"
                name="coupon"
                value={coupon}
                onChange={handleCoupon}
              />
              <button
                onClick={handleIsCoupon}
                className="btn btn-outline-primary coupon-btn byte-bounce"
                disabled={coupon === "" || finLoot.length === 0}
              >
                Applica codice promozionale
              </button>
            </div>
          </div>
        </div>

        {/* Colonna destra: riepilogo */}
        <div className="col-lg-4">
          <div
            className=" p-4"
            style={{ border: "1px solid var(--text-primary)" }}
          >
            <h5 className="fw-bold text pb-3 bordercard">
              Totale del tuo Loot
            </h5>
            {!isCoupon.result.valid && (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text">Totale</span>
                <span className="fs-5 fw-bold text">
                  {" "}
                  {(
                    (totaleLoot || 0) - (isCoupon?.result?.discount || 0)
                  ).toFixed(2)}{" "}
                  &euro;
                </span>
              </div>
            )}
            {isCoupon.result.valid && (
              <div className="">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text">Totale</span>
                  <span className="fs-5 fw-bold text">
                    {totaleLoot.toFixed(2)} &euro;
                  </span>
                </div>
                <div>
                  <span
                    className="byte-bounce fs-3 "
                    style={{ color: "var(--viola)" }}
                  >
                    Sconto:{" "}
                  </span>
                  <span
                    className="fs-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {isCoupon.result.discount} &euro;
                  </span>
                </div>
                <div className="mb-4">
                  <span
                    className="byte-bounce fs-3 "
                    style={{ color: "var(--light-blue)" }}
                  >
                    Totale da pagare:{" "}
                  </span>
                  <span
                    className="fs-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {(totaleLoot - isCoupon.result.discount).toFixed(2)} &euro;
                  </span>
                </div>
              </div>
            )}
            <div className="d-grid gap-2">
              <Link to={"/checkout"}>
                <button
                  className="button primary transparent text byte-bounce fs-5 checkoutbutton"
                  disabled={totaleLoot === 0}
                >
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

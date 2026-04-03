import { useEffect, useState } from "react";
import { useMain } from "../contexts/MainContext";
export default function LootPage() {
  const { loot, addItem, removeItem, setLoot } = useMain();
  const [finLoot, setFinLoot] = useState([]);
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
    return ac;
  }, {});

  const totaleLoot = Object.values(tmp).reduce((ac, ce) => {
    return (ac += ce.total);
  }, 0);

  useEffect(() => {
    setFinLoot(Object.values(tmp));
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

  return (
    <>
      <h2>My Loot</h2>
      <button>Vai alla cassa</button>
      <table>
        <thead>
          <tr>
            <td></td>
            <td></td>
            <th>Prodotto</th>
            <th>Prezzo</th>
            <th>Quantità</th>
            <th>Totale</th>
          </tr>
          {finLoot.map((el, i) => {
            return (
              <tr key={i}>
                <td onClick={(e) => handleRemove(e, el)}>X</td>
                <td>
                  <img className="loot-img" src={el.image} alt={el.name} />
                </td>
                <td>{el.name}</td>
                <td>{el.price}</td>
                <td>
                  <input
                    type="number"
                    name="totale"
                    onChange={(e) => handleQuantity(e, el)}
                    value={el.quantity}
                  />
                </td>
                <td>{el.total}</td>
              </tr>
            );
          })}
        </thead>
      </table>
      <div>Hai un codice sconto?</div>
      <input type="text" placeholder="Inseriscilo qui" />
      <button>Applica codice promozionale</button>
      <span>Aggiorna carrello</span>
      <div>
        <h2>Totale del tuo Loot</h2>
        <span>{totaleLoot}</span>
      </div>
    </>
  );
}

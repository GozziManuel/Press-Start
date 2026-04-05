import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MainContext = createContext();

export function MainProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productDetailed, setProductDetailed] = useState({});
  const [activeEffect, setActiveEffect] = useState(null);

  // --- FUNZIONE PER GESTIRE I TRIGGERS ---
  const triggerEffect = (effect) => {
    // ogni volta che cambia effetto, resetta il cursore standard
    document.body.style.cursor = "auto";

    setActiveEffect(effect);

    // il glitch si spegne da solo dopo 60 secondi
    if (effect === "glitch") {
      setTimeout(() => {
        setActiveEffect(null);
      }, 60000);
    }
  };

  const fetchData = () => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      setProducts(res.data.result);
    });
  };
  const fetchDataDetailed = (slug) => {
    axios.get(`http://localhost:3000/products/` + slug).then((res) => {
      console.log(res.data.result);
      setProductDetailed(res.data.result);
    });
  };

  const [loot, setLoot] = useState(() => {
    return JSON.parse(localStorage.getItem("loot")) || [];
  });

  useEffect(() => {
    localStorage.setItem("loot", JSON.stringify(loot));
  }, [loot]);

  const addItem = (prod) => {
    setLoot([...loot, prod]);
  };

  const removeItem = (prods) => {
    const index = loot.findLastIndex((el) => el.id === prods.id);
    setLoot([...loot.slice(0, index), ...loot.slice(index + 1)]);
  };

  const values = {
    fetchData,
    addItem,
    loot,
    removeItem,
    setLoot,
    products,
    fetchDataDetailed,
    productDetailed,
    setProductDetailed,
    activeEffect,
    triggerEffect,
    setActiveEffect,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
}

export function useMain() {
  return useContext(MainContext);
}

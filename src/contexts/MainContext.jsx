import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MainContext = createContext();

export function MainProvider({ children }) {
  const [products, setProducts] = useState([]);
  const fetchData = () => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      setProducts(res.data.result);
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

  const values = { products, fetchData, addItem, loot, removeItem, setLoot };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
}

export function useMain() {
  return useContext(MainContext);
}

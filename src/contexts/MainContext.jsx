import { createContext, useContext, useState } from "react";
import axios from "axios";

const MainContext = createContext();

export function MainProvider({ children }) {
  const [select, setSelect] = useState("all");

  const [products, setProducts] = useState([]);

  const fetchData = () => {
    axios.get(`http://localhost:3000/search/order?by=${select}`).then((res) => {
      setProducts(res.data.result);
    });
  };

  const values = { products, fetchData, setSelect, select };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
}

export function useMain() {
  return useContext(MainContext);
}

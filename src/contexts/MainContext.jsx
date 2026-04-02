import axios from "axios";
import { createContext, useContext, useState } from "react";

const MainContext = createContext();
function MainProvider({ children }) {
  const [select, setSelect] = useState("");
  const [products, setProducts] = useState([]);
  const fetchData = () => {
    if (select === "") {
      axios.get("http://localhost:3000/search/order?by=all").then((res) => {
        setProducts(res.data.result);
      });
    } else
      axios
        .get(`http://localhost:3000/search/order?by=${select}`)
        .then((res) => {
          setProducts(res.data.result);
        });
  };
  const values = { products, fetchData, setSelect, select };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
}

function useMain() {
  return useContext(MainContext);
}

export { MainProvider, useMain };

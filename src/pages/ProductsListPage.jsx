import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:3000/products").then((res) => {
      console.log(res.data.result);
      setProducts(res.data.result);
    });
  };

  useEffect(fetchData, []);

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <p className="text fs-1">Lista Giochi:</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
        {products.map((data, id) => (
          <div className="col" key={id}>
            <GameCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

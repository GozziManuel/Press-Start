import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import "../assets/css/searchBar.css";
export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const fetchData = () => {
    axios.get("http://localhost:3000/products").then((res) => {
      console.log(res.data.result);
      setProducts(res.data.result);
    });
  };

  useEffect(fetchData, []);
  const productList = products.filter((products) =>
    `${products.name}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <div className="d-flex justify-content-between align-items-center">
        <p className="text fs-1 ">Lista Giochi:</p>
        <div
          className="d-flex me-3 justify-content-center align-items-center"
          style={{ gap: "10px" }}
        >
          <p style={{ fontSize: "30px" }} className="mb-0">
            Search game:
          </p>
          <input
            type="text"
            className="search-bar"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
        {productList.map((data, id) => (
          <div className="col" key={id}>
            <GameCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

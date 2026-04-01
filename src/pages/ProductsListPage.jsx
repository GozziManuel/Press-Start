import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import "../assets/css/searchBar.css";
import options from "../data/data.js";
export default function ProductsListPage() {
  // States
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
  useEffect(fetchData, [select]);
  const productList = products.filter((products) =>
    `${products.name}`.trim().toLowerCase().includes(search.toLowerCase()),
  );

  console.log("Search term:", search);
  console.log(
    "All products:",
    products.map((p) => p.name),
  );
  console.log(
    "Filtered products:",
    productList.length,
    productList.map((p) => p.name),
  );

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <div className="d-flex align-items-center justify-content-between row">
        <div className="col-md-4 col-sm-12">
          <p className="text fs-1 mb-3">Lista Giochi:</p>
        </div>
        <div
          className="d-flex align-items-center col-md-4 col-sm-12 mb-3 "
          style={{ gap: "10px" }}
        >
          <p style={{ fontSize: "25px" }} className="mb-0">
            Search game:
          </p>
          <input
            type="text"
            className="search-bar"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-3 col-sm-12 d-flex mb-3" style={{ gap: "10px" }}>
          <p style={{ fontSize: "25px" }} className="mb-0">
            Filter By
          </p>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "100px" }}
            onChange={handleSelect}
          >
            {options.map((el, id) => (
              <option value={el.value} key={id}>
                {el.nome}
              </option>
            ))}
          </select>
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

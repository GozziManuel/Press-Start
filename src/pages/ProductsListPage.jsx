import { useEffect, useState } from "react";
import { useMain } from "../contexts/MainContext.jsx";
import axios from "axios";
import GameCard from "../components/GameCard";
import options from "../data/data.js";

import "../assets/css/searchBar.css";
import { useSearchParams } from "react-router";

export default function ProductsListPage() {
  const { products, fetchData, setSelect, select } = useMain();
  // States

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ search: value });
    }
  };

  const productList = products.filter((products) =>
    `${products.name}`.trim().toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchData();
  }, [select]);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <div className="align-items-center justify-content-between row row-cols-1 row-cols-md-3">
        {/* Label */}
        <div className="col">
          <p className="text fs-1 mb-3">Lista Giochi:</p>
        </div>
        {/* Search Bar */}
        <div className="col">
          <input
            type="text"
            className="search-bar w-100"
            placeholder="Cerca gioco..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        {/* Select */}
        <div className="col d-flex align-items-center justify-content-end gap-3">
          <p className="text fs-text mb-0">Filter By</p>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "100px" }}
            onChange={handleSelect}
          >
            {options.map((el) => (
              <option value={el.value} key={el.value}>
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

import { useEffect, useState } from "react";
import { useMain } from "../contexts/MainContext.jsx";
import axios from "axios";
import GameCard from "../components/GameCard";
import options from "../data/data.js";

import "../assets/css/searchBar.css";

export default function ProductsListPage() {
  const { products, fetchData, setSelect, select } = useMain();
  // States
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(true);

  const handleCheckValue = (e) => {
    setChecked(e.target.checked);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const productList = products.filter((products) =>
    `${products.name}`.trim().toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(fetchData, [select]);
  console.log(productList);

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
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="form-check"
          //
          checked={checked}
          onChange={handleCheckValue}
        />
        <label
          className="form-check-label"
          style={{ color: "var(--light-blue)" }}
        >
          Grid mode
        </label>
      </div>

      <div
        className={`row g-4 gx-5 ${
          checked
            ? "row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-3"
            : "row-cols-1"
        }`}
      >
        {productList.map((data, id) => (
          <div className="col" key={id}>
            <GameCard data={data} checked={checked} />
          </div>
        ))}
      </div>
    </div>
  );
}

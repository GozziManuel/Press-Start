import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import GameCard from "../components/GameCard";
// CSS
import "../assets/css/searchBar.css";
import {
  selectOptions,
  AdvancedConsoleOptions,
  AdvancedGenreOptions,
  AdvancedPublisherOptions,
} from "../assets/data/dataList.js";

export default function ProductsListPage() {
  // Context
  const [searchParams, setSearchParams] = useSearchParams();

  // States
  const [checked, setChecked] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [productList, setProductList] = useState([]);

  const search = searchParams.get("search") || "";
  const select = searchParams.get("select") || "all";
  const consolle = searchParams.get("consolle") || "";
  const publisher = searchParams.get("publisher") || "";
  const genre = searchParams.get("genre") || "";

  // Handle Functions
  const handleCheckValue = (e) => {
    setChecked(e.target.checked);
  };

  // Handle for select
  const handleSelect = (e) => {
    urlSetter("select", e.target.value);
  };
  // Handle for Advanced Select
  const handleConsoleSelect = (e) => {
    urlSetter("consolle", e.target.value);
  };
  const handleGenreSelect = (e) => {
    urlSetter("genre", e.target.value);
  };
  const handlePublisherSelect = (e) => {
    urlSetter("publisher", e.target.value);
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    urlSetter("search", value);
  };

  const handleResetFilters = () => {
    setSearchParams((el) => {
      const params = new URLSearchParams(el);
      params.delete("genre");
      params.delete("publisher");
      params.delete("consolle");
      params.delete("select");
      return params;
    });
  };

  // Fetch
  const fetchAdvanced = () => {
    const obj = {
      order: select,
      genre: genre,
      publisher: publisher,
      consolle: consolle,
      search: search,
    };
    axios.post("http://localhost:3000/products/advanced", obj).then((res) => {
      setProductList(res.data.products);
    });
  };

  function urlSetter(key, value) {
    const param = new URLSearchParams(searchParams);
    param.set(key, value);
    setSearchParams(param);
  }

  // useEffects
  useEffect(() => {
    fetchAdvanced();
  }, [searchParams]);

  useEffect(() => {
    if (!search) {
      setSearchParams((el) => {
        const para = new URLSearchParams(el);
        para.delete("search");
        return para;
      });
    }
  }, [search]);

  useEffect(() => {
    if (select === "all") {
      setSearchParams((el) => {
        const para = new URLSearchParams(el);
        para.delete("select");
        return para;
      });
    }
  }, [select]);

  return (
    <div className="container-manual py-3 byte-bounce">
      <div className="align-items-center justify-content-between row row-cols-1 row-cols-md-3">
        {/* Label */}
        <div className="col">
          <p className="text fs-1 mb-3">Lista Giochi:</p>
        </div>
        {/* Search Bar */}
        <div className="col text-center SearchContainer">
          <input
            type="text"
            className="search-bar w-100"
            placeholder="Cerca gioco..."
            value={search}
            onChange={handleSearch}
          />
          <a
            className="fs-5 mb-3 gr-viola advancedResearch nav-link "
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            style={{ cursor: "pointer" }}>
            Ricerca Avanzata
          </a>
        </div>
        {/* Select */}
        <div className="col d-flex align-items-center justify-content-end gap-3">
          <p className="text fs-text mb-0">Filter By</p>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "100px" }}
            value={select}
            onChange={handleSelect}>
            {selectOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Search */}
      {showAdvancedSearch && (
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Filtro Avanzato</h4>
          <div className="row row-cols-1 row-cols-md-3">
            {/* Genere */}
            <div>
              <label className="text fs-text">Genere</label>

              <select
                className="form-select"
                aria-label="Default select example"
                value={genre}
                onChange={handleGenreSelect}>
                {" "}
                <option value={""}>Scegli un genere</option>
                {AdvancedGenreOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.nome}
                  </option>
                ))}
              </select>
            </div>
            {/* Publisher */}
            <div>
              <label className="text fs-text">Publisher</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={publisher}
                onChange={handlePublisherSelect}>
                {" "}
                <option value={""}>Scegli un publisher</option>
                {AdvancedPublisherOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.nome}
                  </option>
                ))}
              </select>
            </div>
            {/* Platform */}
            <div>
              <label className="text fs-text">Platform</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={consolle}
                onChange={handleConsoleSelect}>
                {" "}
                <option value={""}>Scegli una piattaforma</option>
                {AdvancedConsoleOptions.map((option, id) => (
                  <option value={option.value} key={id}>
                    {option.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="btn btn-primary mt-2 fs-text"
            onClick={handleResetFilters}>
            Reset Filtri
          </button>
        </div>
      )}
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="form-check"
          checked={checked}
          onChange={handleCheckValue}
        />
        <label
          className="form-check-label"
          style={{ color: "var(--light-blue)" }}>
          Grid mode
        </label>
      </div>

      <div
        className={`row g-4 gx-5 ${
          checked
            ? "row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
            : "row-cols-1"
        }`}>
        {productList.length === 0 ? (
          <h1 className="text-center  gr-viola" style={{ width: "100%" }}>
            Nessun risultato! Magari lo aggiungeremo presto
            <i className="bi bi-emoji-smile-fill"></i>
          </h1>
        ) : (
          productList.map((data, id) => (
            <div className="col card-animate" key={id}>
              <GameCard data={data} checked={checked} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

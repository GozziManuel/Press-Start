import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useMain } from "../contexts/MainContext.jsx";
import axios from "axios";
import GameCard from "../components/GameCard";
// CSS
import "../assets/css/searchBar.css";

export default function ProductsListPage() {
  // Context
  const { products } = useMain();

  // States
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [listedProducts, setListedProducts] = useState(products);
  const [select, setSelect] = useState("all");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    genre: "",
    publisher: "",
    platform: "",
  });

  // Opzioni per il Select
  const selectOptions = [
    { value: "all", nome: "All" },
    { value: "name", nome: "Name" },
    { value: "price", nome: "Price" },
    { value: "discount_value", nome: "Discounted" },
    { value: "created_at", nome: "Last" },
  ];

  // Fetch Selected Data
  const fetchSelectData = () => {
    axios.get(`http://localhost:3000/search/order?by=${select}`).then((res) => {
      setListedProducts(res.data.result);
    });
  };

  // Handle Functions
  const handleAdvancedFilter = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters((prev) => ({ ...prev, [name]: value }));
  };

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

  // Filter for Product List
  const productList = listedProducts.filter((product) => {
    const matchesSearch = product.name
      .trim()
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre = advancedFilters.genre
      ? product.genre
          ?.toLowerCase()
          .includes(advancedFilters.genre.toLowerCase())
      : true;

    const matchesPublisher = advancedFilters.publisher
      ? product.publisher
          ?.toLowerCase()
          .includes(advancedFilters.publisher.toLowerCase())
      : true;

    const matchesPlatform = advancedFilters.platform
      ? product.platform
          ?.toLowerCase()
          .includes(advancedFilters.platform.toLowerCase())
      : true;

    return matchesSearch && matchesGenre && matchesPublisher && matchesPlatform;
  });

  // useEffects
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);
  // Sincronizza listedProducts quando products del context cambia
  useEffect(() => {
    setListedProducts(products);
  }, [products]);
  // Quando select cambia, chiama fetchSelectData
  useEffect(() => {
    fetchSelectData();
  }, [select]);

  return (
    <div className="container-manual py-3 byte-bounce">
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
          <a
            className="fs-5 mb-3 gr-viola"
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
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
              <input
                name="genre"
                value={advancedFilters.genre}
                type="text"
                placeholder="Inserire Genere"
                className="mb-3 w-100"
                onChange={handleAdvancedFilter}
              />
            </div>
            {/* Publisher */}
            <div>
              <label className="text fs-text">Publisher</label>
              <input
                name="publisher"
                value={advancedFilters.publisher}
                type="text"
                placeholder="Inserire Publisher"
                className="mb-3 w-100"
                onChange={handleAdvancedFilter}
              />
            </div>
            {/* Platform */}
            <div>
              <label className="text fs-text">Platform</label>
              <input
                name="platform"
                value={advancedFilters.platform}
                type="text"
                placeholder="Inserire Platform"
                className="mb-3 w-100"
                onChange={handleAdvancedFilter}
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-2 fs-text"
            onClick={() =>
              setAdvancedFilters({ genre: "", publisher: "", platform: "" })
            }>
            Reset Filtri
          </button>
        </div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
        {productList.map((data) => (
          <div className="col" key={data.id}>
            <GameCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

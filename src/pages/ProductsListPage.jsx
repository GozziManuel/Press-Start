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
  const [searchParams, setSearchParams] = useSearchParams();

  // States
  const [checked, setChecked] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  // const [listedProducts, setListedProducts] = useState([]);
  const [select, setSelect] = useState("all");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cloneProductList, setCloneProductList] = useState([]);
  // Stati per l'advanced search
  const [advancedConsoleSelect, setadvancedConsoleSelect] = useState("");
  const [advancedPublisherSelect, setadvancedPublisherSelect] = useState("");
  const [advancedGenreSelect, setadvancedGenreSelect] = useState("");

  // Opzioni per il Select
  const selectOptions = [
    { value: "all", nome: "All" },
    { value: "name", nome: "Name" },
    { value: "price", nome: "Price" },
    { value: "discount_value", nome: "Discounted" },
    { value: "created_at", nome: "Last" },
  ];
  const AdvancedConsoleOptions = [
    { value: "NES", nome: "NES" },
    { value: "SNES", nome: "SNES" },
    { value: "Nintendo 64", nome: "Nintendo 64" },
    { value: "Sega Mega Drive", nome: "Sega Mega Drive" },
    { value: "PlayStation 1", nome: "PlayStation 1" },
    { value: "Sega Saturn", nome: "Sega Saturn" },
    { value: "Arcade", nome: "Arcade" },
  ];
  const AdvancedPublisherOptions = [
    { value: "Nintendo", nome: "Nintendo" },
    { value: "Sega", nome: "Sega" },
    { value: "Sony", nome: "Sony" },
    { value: "Vari", nome: "Vari" },
  ];
  const AdvancedGenreOptions = [
    { value: "Shooter", nome: "Shooter" },
    { value: "Survival Horror", nome: "Survival Horror" },
    { value: "Racing", nome: "Racing" },
    { value: "Puzzle", nome: "Puzzle" },
    { value: "Fighting", nome: "Fighting" },
    { value: "Action-Adventure", nome: "Action-Adventure" },
    { value: "RPG", nome: "RPG" },
    { value: "Platform", nome: "Platform" },
  ];

  // Fetch Selected Data
  const fetchSelectData = () => {
    if (select === "all") {
      axios.get(`http://localhost:3000/products`).then((res) => {
        setCloneProductList(res.data.result.products);
        setProductList(res.data.result.products);
      });
    } else {
      axios
        .get(`http://localhost:3000/search/order?by=${select}`)
        .then((res) => {
          setCloneProductList(res.data.result);
          setProductList(res.data.result);
        });
    }
  };

  // Handle Functions
  const handleCheckValue = (e) => {
    setChecked(e.target.checked);
  };

  // Handle for select
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  // Handle for Advanced Select
  const handleConsoleSelect = (e) => {
    setadvancedConsoleSelect(e.target.value);
  };
  const handleGenreSelect = (e) => {
    setadvancedGenreSelect(e.target.value);
  };
  const handlePublisherSelect = (e) => {
    setadvancedPublisherSelect(e.target.value);
  };
  const handleResetFilters = () => {
    setadvancedGenreSelect("");
    setadvancedPublisherSelect("");
    setadvancedConsoleSelect("");
  };

  const fetchAdvanced = () => {
    const obj = {
      order: select,
      genre: advancedGenreSelect,
      publisher: advancedPublisherSelect,
      consolle: advancedConsoleSelect,
    };

    axios.post("http://localhost:3000/products/advanced", obj).then((res) => {
      setProductList(res.data.products);
      setCloneProductList(res.data.products);
    });
  };

  useEffect(fetchAdvanced, [
    advancedConsoleSelect,
    advancedPublisherSelect,
    advancedGenreSelect,
    select,
  ]);

  // Search bar
  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setSearch(value);
  //   if (value.trim() === "") {
  //     setSearchParams({});
  //   } else {
  //     setSearchParams({ search: value });
  //   }
  // };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setCloneProductList(productList); // reset
      setSearchParams({});
    } else {
      const filtered = productList.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase()),
      );

      setCloneProductList(filtered);
      setSearchParams({ search: value });
    }
  };

  // Filter for Product List
  // const productList = Array.isArray(listedProducts)
  //   ? listedProducts.filter((product) => {
  //       const matchesSearch = product.name
  //         .trim()
  //         .toLowerCase()
  //         .includes(search.toLowerCase());

  //       const matchesGenre = advancedGenreSelect
  //         ? product.genres?.includes(advancedGenreSelect)
  //         : true;

  //       const matchesPlatform = advancedConsoleSelect
  //         ? product.platforms?.includes(advancedConsoleSelect)
  //         : true;

  //       const matchesPublisher = advancedPublisherSelect
  //         ? product.companies?.includes(advancedPublisherSelect)
  //         : true;

  //       return (
  //         matchesSearch && matchesGenre && matchesPlatform && matchesPublisher
  //       );
  //     })
  //   : [];
  // Sincronizza listedProducts quando products del context cambia

  // useEffect(() => {
  //   if (products?.products) {
  //     setProductList(products.products);
  //     setListedProducts(products.products);
  //   }
  // }, [products]);

  // useEffects
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Quando select cambia, chiama fetchSelectData
  useEffect(() => {
    if (
      !advancedConsoleSelect &&
      !advancedPublisherSelect &&
      !advancedGenreSelect
    )
      fetchSelectData();
  }, [select]);

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearch(query);

    if (query.trim() === "") {
      setCloneProductList(productList);
    } else {
      const filtered = productList.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
      setCloneProductList(filtered);
    }
  }, [searchParams, productList]);

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
            style={{ cursor: "pointer" }}
          >
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
            onChange={handleSelect}
          >
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
                value={advancedGenreSelect}
                onChange={handleGenreSelect}
              >
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
                value={advancedPublisherSelect}
                onChange={handlePublisherSelect}
              >
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
                value={advancedConsoleSelect}
                onChange={handleConsoleSelect}
              >
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
            onClick={handleResetFilters}
          >
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
          style={{ color: "var(--light-blue)" }}
        >
          Grid mode
        </label>
      </div>

      <div
        className={`row g-4 gx-5 ${
          checked
            ? "row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
            : "row-cols-1"
        }`}
      >
        {cloneProductList.length === 0 ? (
          <h1 className="text-center  gr-viola" style={{ width: "100%" }}>
            Nessun risultato! Magari lo aggiungeremo presto{" "}
            <i className="bi bi-emoji-smile-fill"></i>
          </h1>
        ) : (
          cloneProductList.map((data, id) => (
            <div className="col card-animate" key={id}>
              <GameCard data={data} checked={checked} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import GameCard from "../components/GameCard";

export default function HomePage() {
  const [famoustProducts, setFamousProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const fetchData = () => {
    axios.get(`http://localhost:3000/products/famous`).then((res) => {
      setFamousProducts(res.data.result.slice(0, 6));
    });
    axios.get(`http://localhost:3000/products/recent`).then((res) => {
      setRecentProducts(res.data.result.slice(0, 6));
    });
  };

  useEffect(fetchData, []);

  return (
    <>
      <div className="hero-full-width">
        {/* contenitore per lo sfondo */}
        <div className="container-manual py-5">
          <div className="row align-items-center min-vh-75">
            {/* SINISTRA */}
            <div className="col-lg-6 hero-text-box">
              <h1 className="star-crush glowing gr-viola display-1 mb-3">
                COMPRA E GIOCA GIOCHI RETRO.
              </h1>
              <p className="byte-bounce text fs-2 mb-5">
                La più grande collezione di classici 8-bit e 16-bit. <br />
                Recupera i titoli che hanno fatto la storia del gaming.
              </p>
              <NavLink to="/Products" className="btn-gaming star-crush">
                EXPLORE NOW
              </NavLink>
            </div>

            {/* DESTRA */}
            <div className="col-lg-6 d-none d-lg-block text-center position-relative hero-graphic-container">
              {/* LA GIF ANIMATA (Sfondo del portale) */}
              <img
                src="/Pvzw9p.gif"
                className="hero-gif-portal"
                alt="Energy Portal"
              />
              {/* Logo PlayStation */}
              <img
                src="/playstation-dark-blue.png"
                className="icon-deco ps-icon"
                alt="PS Logo"
              />

              {/* Logo Nintendo */}
              <img
                src="/nintendo-orange.png"
                className="icon-deco nintendo-icon"
                alt="Nintendo Logo"
              />
              {/* Logo Sega */}
              <img
                src="/sega-red.png"
                className="icon-deco sega-icon"
                alt="Nintendo Logo"
              />
              <img
                src="/arcadeggg2-removebg.png"
                className="icon-deco arcade-icon"
                alt="Arcade Logo"
              />
              <img
                src="/controller-2.png"
                alt="Hero Icon"
                className="img-fluid hero-main-img"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="separator" />
      <div className="py-3 byte-bounce gr-viola container-manual">
        <p style={{ fontSize: "30px" }} className="star-crush">
          I Più Venduti:
        </p>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
          {famoustProducts.map((data, id) => (
            <div className="col" key={id}>
              <GameCard data={data} />
            </div>
          ))}
        </div>
        <NavLink to={"/Products "} className="fs-3 w-0 seeMore">
          See More...
        </NavLink>
      </div>
      <div className="py-3 byte-bounce gr-viola container-manual">
        <p style={{ fontSize: "30px" }} className="star-crush">
          Ultimi Aggiunti:
        </p>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
          {recentProducts.map((data, id) => (
            <div className="col" key={id}>
              <GameCard data={data} />
            </div>
          ))}
        </div>
        <NavLink to={"/Products "} className="fs-3 w-0 seeMore">
          See More...
        </NavLink>
      </div>
    </>
  );
}

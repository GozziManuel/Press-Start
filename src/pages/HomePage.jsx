import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import GameCard from "../components/GameCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      setProducts(res.data.result.slice(0, 6));
    });
  };

  useEffect(fetchData, []);

  return (
    <>
      <div className="py-3 star-crush container-manual">
        <div>
          <p className="glowing gr-viola" style={{ fontSize: "60px" }}>
            Compra e Gioca Giochi Retro.
          </p>
        </div>
        <p
          style={{ fontSize: "30px", maxWidth: "650px" }}
          className="byte-bounce text"
          id="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          reiciendis similique fugit doloremque qui, eos vero ipsam dignissimos
          eveniet aspernatur, minima cumque atque soluta. Ad laborum alias sint
          dolores nobis.
        </p>
      </div>
      <hr className="separator" />
      <div className="py-3 byte-bounce gr-viola container-manual">
        <p style={{ fontSize: "30px" }} className="star-crush">
          I Più Venduti:
        </p>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
          {products.map((data, id) => (
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
          {products.map((data, id) => (
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

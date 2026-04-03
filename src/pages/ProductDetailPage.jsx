import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useMain } from "../contexts/MainContext";

export default function ProductDetailPage() {
  // Stati
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const { addItem } = useMain();

  // Fetch Data
  const fetchSlugData = () => {
    axios.get(`http://localhost:3000/products/` + slug).then((res) => {
      setProduct(res.data.result);
    });
  };

  // Handlers
  const handleCarrelloBtn = () => {
    addItem(product);
  };

  // useEffects
  useEffect(fetchSlugData, []);

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      {/* Product Name */}
      <div className="d-flex justify-content-between">
        <h1 className="star-crush">{product.name}</h1>
      </div>
      {/* Product Detail */}
      <div className="row row-cols-1 row-cols-md-2">
        <div>
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: "600px" }}
          />
          {/* Cost */}
          <p className="text fs-title">
            {product.price}
            <span style={{ fontFamily: "pixel-sans" }}>&euro;</span>
          </p>
          {/* Aggiungi al Carrello Button */}
          <button
            className="btn btn-primary fs-text"
            onClick={handleCarrelloBtn}
          >
            Aggiungi al Carrello
          </button>
        </div>
        <div>
          {/* Descrizione */}
          <div id="description">
            <h3>Short Description</h3>
            <p className="text fs-text">{product.description}</p>
          </div>
          {/* Generi */}
          <div id="generes">
            <h3>Genres</h3>
            <p className="text fs-text">{product.genres}</p>
          </div>
          {/* Piattaforme */}
          <div id="platforms">
            <h3>Platforms</h3>
            {product?.platforms?.map((el, id) => (
              <p className="text fs-text" key={id}>
                {el.name}
              </p>
            ))}
          </div>
          {/* Studio */}
          <div id="studio">
            <h3>Developer</h3>
            <p className="text fs-text">{product.studio_name}</p>
          </div>
          {/* Compagnia */}
          <div id="company">
            <h3>Publisher</h3>
            {product?.platforms?.map((el, id) => (
              <p className="text fs-text" key={id}>
                {el.company}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div>
        <h2 className="mt-4">Reviews</h2>
        {product?.reviews?.map((el, id) => (
          <p key={id}>WIP</p>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});

  console.log(slug);

  const fetchData = () => {
    axios.get(`http://localhost:3000/products/` + slug).then((res) => {
      console.log(res.data.result);

      setProduct(res.data.result);
    });
  };

  useEffect(fetchData, []);

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <div className="d-flex justify-content-between">
        <h1 className="star-crush">{product.name}</h1>
      </div>
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
            <span style={{ fontFamily: "star-crush" }}>&euro;</span>
          </p>
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
            {product?.platforms?.map((el) => (
              <p className="text fs-text">{el.name}</p>
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
            {product?.platforms?.map((el) => (
              <p className="text fs-text">{el.company}</p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-4">Reviews</h2>
        {product?.reviews?.map((el) => (
          <></>
        ))}
      </div>
    </div>
  );
}

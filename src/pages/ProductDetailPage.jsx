import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../assets/css/productDetaile.css";

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
        <p className="m-0 studioName">{product.studio_name}</p>
      </div>
      <div className="d-flex row">
        <div className="col-sm-4 col-12 col-lg-3">
          <img
            src={product.image}
            alt={product.image}
            className="DetaileImage"
          />
          <p
            style={{
              color: "var(--text-primary)",
              fontSize: "40px",
              margin: "0",
            }}
          >
            {product.price}{" "}
            <span style={{ fontFamily: "star-crush" }}>&euro;</span>
          </p>
        </div>
        <div className="col-sm-8 col-12 col-lg-9">
          <h3>Short Description</h3>
          <p className="productDescription">{product.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <h3>Genres</h3>
              <p style={{ fontSize: "20px", color: "var(--text-primary)" }}>
                {product.genres}
              </p>
            </div>

            {product?.platforms?.map((el) => (
              <div>
                <h3>Platforms</h3>
                <p style={{ fontSize: "20px", color: "var(--text-primary)" }}>
                  {el.name}
                </p>
                <div>
                  <h3>Platform Company</h3>
                  <p style={{ fontSize: "20px", color: "var(--text-primary)" }}>
                    {el.company}
                  </p>
                </div>
              </div>
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

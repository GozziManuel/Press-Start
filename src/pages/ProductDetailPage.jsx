import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMain } from "../contexts/MainContext";
import "../assets/css/gameCard.css";
import "../assets/css/detailed.css";
import axios from "axios";
import { getGameGif } from "../utils/gameUtilities";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [added, setAdded] = useState(false);
  const [button, setButton] = useState(false);

  const { fetchDataDetailed, productDetailed, addItem } = useMain();
  const { slug } = useParams();

  useEffect(() => {
    fetchDataDetailed(slug);
    window.scrollTo(0, 0);
  }, [slug]);

  const priceNumber = parseFloat(productDetailed?.price);
  const discountNumber = parseFloat(productDetailed?.discount_value);
  const discountedPrice = priceNumber - discountNumber;
  const hasDiscount = discountNumber > 0;

  const discountProduct = () => {
    if (!hasDiscount) {
      return (
        <>
          <p className="text fs-title">
            {productDetailed.price}{" "}
            <span style={{ fontFamily: "pixel-sans" }}>&euro;</span>
          </p>
        </>
      );
    } else {
      return (
        <>
          <div className="text fs-title d-flex">
            <span className="text-decoration-line-through">
              {productDetailed.price}{" "}
            </span>
            {""}
            <span style={{ fontFamily: "pixel-sans" }}>&euro;</span>
            <p className=" m-0 discountPrice ms-2">
              {discountedPrice.toFixed(2)}
              <span style={{ fontFamily: "pixel-sans" }}>&euro;! </span>
            </p>
          </div>
        </>
      );
    }
  };

  // Fetch Data
  const fetchSlugData = () => {
    axios
      .get(`http://localhost:3000/products/` + slug)
      .then((res) => {
        setProduct(res.data.result);
      })
      .catch((err) => {
        if (!err.response.data.success) navigate("/*");
      });
  };

  // Handlers
  const handleCarrelloBtn = () => {
    addItem(product);
    setAdded(true);
    setButton(true);

    setTimeout(() => {
      setAdded(false);
      setButton(false);
    }, 2000);
  };

  // useEffects
  useEffect(fetchSlugData, []);

  return (
    <div
      className="container-manual py-3 byte-bounce"
      style={{ color: "var(--light-blue)" }}
    >
      {/* Product Name */}
      <div className="d-flex justify-content-between detailed-title">
        <h1 style={{ color: "var(--viola)" }} className="star-crush">
          {productDetailed.name}
        </h1>
      </div>
      {/* Product Detail */}
      <div className="row row-cols-1 row-cols-md-3">
        <div>
          {/* Image */}
          <img
            src={productDetailed.image}
            alt={productDetailed.name}
            style={{ maxHeight: "600px" }}
            className="detailed-img"
          />
          {/* Cost */}
          {discountProduct()}
          {/* Aggiungi al Carrello Button */}
          <button
            className={`buttonCart fs-text mt-5 ${added ? "added" : ""}`}
            onClick={handleCarrelloBtn}
            disabled={button}
          >
            {added ? "Aggiunto!" : "Aggiungi al carrello"}
          </button>
        </div>
        {/* --- GIF --- */}
        <div className="d-flex flex-column descriptionProduct align-items-center">
          <h3>Gameplay Preview</h3>
          <img
            src={getGameGif(slug)}
            alt="gameplay-gif"
            className="img-fluid border border-white"
            style={{ borderRadius: "8px", boxShadow: "0 0 15px var(--viola)" }}
          />
        </div>
        <div>
          {/* Descrizione */}
          <div id="description">
            <h3>Short Description</h3>
            <p className="text fs-text">{productDetailed.description}</p>
          </div>
          {/* Generi */}
          <div id="generes">
            <h3>Genres</h3>
            <p className="text fs-text">{productDetailed.genres}</p>
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
            <p className="text fs-text">{productDetailed.studio_name}</p>
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

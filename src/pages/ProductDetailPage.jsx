import { useEffect } from "react";
import { useParams } from "react-router";
import { useMain } from "../contexts/MainContext";
import "../assets/css/gameCard.css";

export default function ProductDetailPage() {
  const { fetchDataDetailed, productDetailed } = useMain();
  const { slug } = useParams();

  useEffect(() => {
    fetchDataDetailed(slug);
  }, [slug]);

  const priceNumber = parseInt(productDetailed?.price);
  const discountNumber = parseInt(productDetailed?.discount_value);
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

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <div className="d-flex justify-content-between">
        <h1 className="star-crush">{productDetailed.name}</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-2">
        <div>
          {/* Image */}
          <img
            src={productDetailed.image}
            alt={productDetailed.name}
            style={{ maxHeight: "600px" }}
          />
          {/* Cost */}
          {discountProduct()}
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
            {productDetailed?.platforms?.map((el) => (
              <p className="text fs-text">{el.name}</p>
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
            {productDetailed?.platforms?.map((el) => (
              <p className="text fs-text">{el.company}</p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-4">Reviews</h2>
        {productDetailed?.reviews?.map((el) => (
          <></>
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router";
import "../assets/css/gameCard.css";

export default function GameCard({ data, checked }) {
  const priceNumber = parseFloat(data?.price);
  const discountNumber = parseFloat(data?.discount_value);
  const discountedPrice = priceNumber - discountNumber;

  if (isNaN(priceNumber)) {
    return <div className="card h-100 p-3 text-center">Caricamento...</div>;
  }

  const hasDiscount = discountNumber > 0;
  const discountProduct = () => {
    if (!hasDiscount) {
      return (
        <p style={{ fontSize: "45px" }} className="m-0">
          {data.price}
          <span style={{ fontFamily: "pixel-sans" }}>&euro;</span>
        </p>
      );
    } else {
      return (
        <>
          <div style={{ fontSize: "40px" }} className="m-0 d-flex">
            <span className="text-decoration-line-through">{data.price}</span>
            <span style={{ fontFamily: "pixel-sans" }}>&euro;</span>
            <p style={{ fontSize: "40px" }} className=" m-0 discountPrice">
              {discountedPrice.toFixed(2)}
              <span style={{ fontFamily: "pixel-sans" }}>&euro;! </span>
            </p>
          </div>
        </>
      );
    }
  };
  return (
    <Link to={"/products/" + data.slug}>
      <div
        className={
          checked === true ? "card h-100" : "card h-100 d-flex flex-row"
        }>
        <div>
          <img src={data.image} className="card-img-top cardImage" alt="img" />
        </div>
        <div className="card-body">
          <h5
            className={!checked ? "card-title fs-1" : "card-title"}
            style={{ fontSize: "35px" }}>
            {data.name}
          </h5>
          <hr
            className="my-0 "
            style={{ border: "solid 2px var(--light-blue)" }}
          />
          {!checked && (
            <div className="row row-cols-1 row-cols-sm-2">
              <div className="col">
                <p className="fs-3">
                  <span style={{ color: "var(--light-blue)" }}>Studio: </span>
                  {data.studio_name}
                </p>
                <p className="fs-3">
                  <span style={{ color: "var(--light-blue)" }}>
                    Publisher:{" "}
                  </span>
                  {data.companies_list}
                </p>
              </div>
              <div className="col">
                <p className="fs-3">
                  <span style={{ color: "var(--light-blue)" }}>
                    Piattaforme:{" "}
                  </span>
                  {data.platforms_list}
                </p>
                <p className="fs-3">
                  <span style={{ color: "var(--light-blue)" }}>Genere: </span>
                  {data.genre_name}
                </p>
              </div>
            </div>
          )}
          <div>{discountProduct()}</div>
        </div>
      </div>
    </Link>
  );
}

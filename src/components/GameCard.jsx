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
        <>
          <p style={{ fontSize: "30px" }} className="m-0">
            {data.price} {""}
            <span style={{ fontFamily: "pixel-sans" }}>&euro;</span>
          </p>
        </>
      );
    } else {
      return (
        <>
          <div style={{ fontSize: "30px" }} className="m-0 d-flex">
            <span className="text-decoration-line-through">{data.price} </span>
            {""}
            <span style={{ fontFamily: "pixel-sans" }}>&euro;</span>
            <p style={{ fontSize: "30px" }} className=" m-0 discountPrice">
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
        }
      >
        <div>
          <img src={data.image} className="card-img-top cardImage" alt="img" />
        </div>
        <div className="card-body">
          <h5
            className={!checked ? "card-title fs-1" : "card-title "}
            style={{ fontSize: "25px" }}
          >
            {data.name}
          </h5>
          <hr
            className="my-0 "
            style={{ border: "solid 2px var(--light-blue)" }}
          />
          {!checked && (
            <div>
              <div className="d-flex row ">
                <p className="fs-3  col-12 col-sm-6">
                  <span style={{ color: "var(--viola)" }}>Studio:</span>{" "}
                  {data.studio_name}
                </p>
                <p className="fs-3 col-12 col-sm-6 text-end">
                  <span style={{ color: "var(--light-blue)" }}>Company:</span>{" "}
                  {data.companies_list}
                </p>
              </div>
              <p className="fs-3">
                <span style={{ color: "var(--light-blue)" }}>Genre:</span>{" "}
                {data.genre_name}
              </p>
            </div>
          )}
          <div>{discountProduct()}</div>
        </div>
      </div>
    </Link>
  );
}

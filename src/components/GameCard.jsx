import { Link } from "react-router";
import "../assets/css/gameCard.css";

export default function GameCard({ data }) {
  const priceNumber = parseInt(data?.price);
  const discountNumber = parseInt(data?.discount_value);
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
      <div className="card h-100" style={{}}>
        <div className="">
          <img
            src={data.image}
            className="card-img-top cardImage"
            alt="img"
            style={{ height: "60vh" }}
          ></img>
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "25px" }}>
            {data.name}
          </h5>
          <hr
            className="my-0 "
            style={{ border: "solid 2px var(--light-blue)" }}
          />
          {discountProduct()}
        </div>
      </div>
    </Link>
  );
}

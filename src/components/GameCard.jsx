import { Link } from "react-router";
import "../assets/css/gameCard.css";

export default function GameCard({ data }) {
  return (
    <Link to={"/Products/" + data.slug}>
      <div className="card h-100" style={{}}>
        <img
          src={data.image}
          className="card-img-top cardImage"
          alt="img"
          style={{ height: "35vh" }}
        ></img>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "30px" }}>
            {data.name}
          </h5>
          <hr className="my-0" />
          <p style={{ fontSize: "30px" }}>
            {data.price} {""}
            <span style={{ fontFamily: "star-crush" }}>&euro;</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

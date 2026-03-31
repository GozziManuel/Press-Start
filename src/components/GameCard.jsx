import { Link } from "react-router";
import "../assets/css/games.css";

export default function GameCard({ data }) {
  return (
    <Link to={"/Products/" + data.id}>
      <div className="card h-100">
        <img
          src={data.image}
          className="card-img-top"
          alt="img"
          style={{ height: "300px" }}
        ></img>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "30px" }}>
            {data.name}
          </h5>
          <p style={{ fontSize: "30px" }}>{data.price}&#8364;</p>
        </div>
      </div>
    </Link>
  );
}

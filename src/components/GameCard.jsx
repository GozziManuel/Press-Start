import { Link } from "react-router";

export default function GameCard({ data }) {
  return (
    <Link to={"/products/" + data.id}>
      <div className="card h-100">
        <img
          src={data.image}
          className="card-img-top"
          alt="img"
          style={{ minHeight: "120px" }}></img>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "50px" }}>
            {data.name}
          </h5>
          <p style={{ fontSize: "30px" }}>{data.price}</p>
        </div>
      </div>
    </Link>
  );
}

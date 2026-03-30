import { Link } from "react-router";

export default function GameCard({data}) {
  return (
    <div className="card h-100">
      <img src="img" className="card-img-top" alt="img" style={{minHeight:"100px"}}></img>
      <div className="card-body">
        <h5 className="card-title" style={{fontSize:"50px"}}>{data.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Link to={"/"} className="btn btn-primary floating">
          Go somewhere
        </Link>
      </div>
    </div>
  );
}

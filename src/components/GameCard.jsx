import { Link } from "react-router";

export default function GameCard() {
  return (
    <div className="card">
      <img src="img" className="card-img-top" alt="img"></img>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Link to={"/"} className="btn btn-primary">
          Go somewhere
        </Link>
      </div>
    </div>
  );
}

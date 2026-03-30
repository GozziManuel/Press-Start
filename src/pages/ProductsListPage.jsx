import { fakeData } from "../data/fakeData";
import GameCard from "../components/GameCard";

export default function ProductsListPage() {
  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <p className="text fs-1">Lista Giochi:</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
        {fakeData.map((data, id) => (
          <div className="col" key={id}>
            <GameCard data={data} />
          </div>
        ))}
        {fakeData.map((data, id) => (
          <div className="col" key={id}>
            <GameCard data={data} />
          </div>
        ))}
        {fakeData.map((data, id) => (
          <div className="col" key={id}>
            <GameCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

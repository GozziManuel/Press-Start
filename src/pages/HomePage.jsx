import GameCard from "../components/GameCard";

export default function HomePage() {
  const fakeData = [
    { id: 1, name: "doom" },
    { id: 2, name: "mario" },
    { id: 3, name: "sonic" },
    { id: 4, name: "final fantasy" },
    { id: 5, name: "pokemon" },
    { id: 6, name: "metal slug" },
  ];

  return (
    <>
      <div className="py-3 byte-bounce gr-viola">
        <p className="glowing" style={{ fontSize: "60px" }}>
          Compra e Gioca Giochi Retro.
        </p>
        <p style={{ fontSize: "30px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          reiciendis similique fugit doloremque qui, eos vero ipsam dignissimos
          eveniet aspernatur, minima cumque atque soluta. Ad laborum alias sint
          dolores nobis.
        </p>
      </div>
      <hr className="separator" />
      <div className="py-3 byte-bounce gr-viola">
        <p style={{ fontSize: "30px" }}>Lista Giochi:</p>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-3">
          {fakeData.map((data, id) => (
            <div className="col" key={id}>
              <GameCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

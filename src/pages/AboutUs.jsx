const names = ["Jasmin", "Manuel Gozzi", "Sirio", "Michele Brignola"];

export default function AboutUs() {
  return (
    <div className="py-3 byte-bounce gr-viola">
      <p style={{ fontSize: "30px" }}>Sito fatto da:</p>
      <ul style={{ fontSize: "30px" }}>
        {names.map((name, id) => (
          <li key={id}>- {name}</li>
        ))}
      </ul>
    </div>
  );
}

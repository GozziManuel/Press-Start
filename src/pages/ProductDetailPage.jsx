import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function ProductDetailPage() {
  const { id } = useParams();

  const fetchData = () => {
    axios.get(`http://localhost:3000/products/` + id).then((res) => {
      setProducts(res.data.result.slice(0, 6));
    });
  };

  useEffect(fetchData, []);

  return (
    <div className="container py-3 byte-bounce gr-viola">
      <p style={{ fontSize: "60px" }}>Detail Page</p>
    </div>
  );
}

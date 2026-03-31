import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../assets/css/productDetaile.css";

export default function ProductDetailPage() {
  const { slug } = useParams();

  const fetchData = () => {
    axios.get(`http://localhost:3000/products/` + slug).then((res) => {
      console.log();

      console.log(res.data.result);
    });
  };

  useEffect(fetchData, []);

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <h1></h1>
      <p style={{ fontSize: "60px" }}>Detail Page</p>
    </div>
  );
}

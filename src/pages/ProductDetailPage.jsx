import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../assets/css/productDetaile.css";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState({})
  
  console.log(slug)

  const fetchData = () => {
    axios.get(`http://localhost:3000/products/` + slug).then((res) => {
      setProduct(res.data.result)
      console.log(res.data.result)
    });
  };

  useEffect(fetchData, []);

  return (
    <div className="container-manual py-3 byte-bounce gr-viola">
      <h1></h1>
      <p style={{ fontSize: "60px" }}>{product.name}</p>
    </div>
  );
}

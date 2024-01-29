import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Category from "../components/Category";

export default function HomePage() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/home")
      .then((res) => {
        let products = res.data.products;
        setProduct(products);
      })
      .catch((er) => console.log(er));
  }, []);

  return (
    <div>
      <Navbar />
      <Category />
      <div className="container">
        <div className="row">
          {product.map((value, index) => (
            <div className="col" key={index}>
              <div className="card-product">
                <div className="image">
                  <img
                    src={`http://localhost:9000/product/${value.image_1}`}
                    alt=""
                  />
                </div>
                <div className="span">
                  <span>{value.name}</span>
                  <br />
                  <span className="prix">{value.price} Ar</span>
                  <br />
                </div>
                <button className="voir">
                  <Link className="color" to={`/singleProduct/${value.id}`}>
                    Voir
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

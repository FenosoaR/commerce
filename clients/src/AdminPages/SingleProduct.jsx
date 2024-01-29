import NavAdmin from "../components/NavAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const ProductId = params.id;

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/oneProduct/" + ProductId)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((er) => console.log(er));
  }, [ProductId]);

  return (
    <div>
      <NavAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <span>Prix : {product.price} Ar</span> <br />
            <span>Produit en stock : {product.stock} </span> <br />
            <span>Couleur disponible : {product.color} </span>
            <div className="row">
              <div className="col">
                <div className="product_photo">
                  <img
                    src={`http://localhost:9000/product/${product.image_1}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col">
                <div className="product_photo">
                  <img
                    src={`http://localhost:9000/product/${product.image_2}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col">
                <div className="product_photo">
                  <img
                    src={`http://localhost:9000/product/${product.image_3}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

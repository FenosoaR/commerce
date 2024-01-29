import NavAdmin from "../components/NavAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function ProductByCategory() {
  const [sousCat, setSousCat] = useState({});
  const[category , setCategory] = useState(null)
  const [product, setProduct] = useState(
    <tr>
      <td>Loading...</td>
    </tr>
  );
  const params = useParams();
  let SousCategoryId = params.SousCategoryId;

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/productByCategory/" + SousCategoryId)
      .then((res) => {
        setSousCat(res.data.souscategory);
        setCategory(res.data.souscategory.Category.name);
        let products = res.data.products;

        let htmlProducts = products.map((value, index) => {
          return (
            <tr key={value.id}>
              <td>{value.name}</td>
              <td>
                <Link
                  to={`/admin/updateProduct/${value.SousCategoryId}/${value.id}`}
                  className="btn btn-success"
                >
                  <i className="fa fa-edit"></i>
                </Link>
              </td>
            </tr>
          );
        });
        setProduct(htmlProducts);
      })
      .catch((er) => console.log(er));
  }, [SousCategoryId]);

  return (
    <div>
      <NavAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
          
            <h3 style={{ marginTop: "20px" }}>
              Liste des produits {category} : {sousCat.name}
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>{product}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

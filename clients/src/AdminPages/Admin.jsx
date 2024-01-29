import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

export default function Admin() {
  const [category, setCategory] = useState(
    <tr>
      <td></td>
      <td>loading...</td>
      <td></td>
    </tr>
  );
  const [product, setProduct] = useState(
    <tr>
      <td></td>
      <td>loading...</td>
      <td></td>
    </tr>
  );
  let [success, setSuccess] = useState(null);
  let [refresh, setRefresh] = useState(false);

  useEffect(() => {

    function handleDeleteCategory(CategoryId) {
      axios
        .delete("http://localhost:9000/api/admin/removeCategory/" + CategoryId)
        .then((res) => {
          setSuccess(res.data.message)
          setRefresh(true);
        })
        .catch((er) => console.log(er));
    }

    function handleDelete(ProductId) {
      axios
        .delete("http://localhost:9000/api/admin/removeProduct/" + ProductId)
        .then((res) => {
          setSuccess(res.data.message);
          setRefresh(true);
        })
        .catch((er) => console.log(er));
    }

    

    axios
      .get("http://localhost:9000/api/admin")
      .then((res) => {
        let products = res.data.products;
        let categories = res.data.categories;

        let htmlCategory = categories.map((value, index) => {
          return (
            <tr key={value.id}>
              <td>{value.name}</td>
              <td>
                <button
                  id={value.id}
                  className="btn btn-danger"
                  onClick={() => handleDeleteCategory(value.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          );
        });

        let htmlProducts = products.map((value, index) => {
          return (
            <tr key={value.id}>
              <td>{value.name}</td>
              <td>{value.price} Ar</td>
              <td>
                <button
                  id={value.id}
                  className="btn btn-danger"
                  onClick={() => handleDelete(value.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <Link
                  to={`/admin/singleProduct/${value.id}`}
                  className="btn btn-primary"
                  style={{ marginLeft: "15px" }}
                >
                  <i className="fa fa-eye"></i>
                </Link>
              </td>
            </tr>
          );
        });
        setCategory(htmlCategory);
        setProduct(htmlProducts);
        setRefresh(false);
      })
      .catch((er) => console.log(er));
  }, [refresh]);

  return (
    <div>
      <NavAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row">
              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}
              <div className="col-lg-4">
                <h4 style={{ marginTop: "10px" }}>
                  Liste de tous les categories
                </h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Categories</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{category}</tbody>
                </table>
              </div>
              <div className="col-lg-5">
                <h4 style={{ marginTop: "10px" }}>
                  Liste de tous les produits
                </h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Price</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{product}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

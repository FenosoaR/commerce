import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

export default function UpdateProduct() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const params = useParams();
  const ProductId = params.id;
  const SousCategoryId = params.SousCategoryId;
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/oneProduct/" + ProductId)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((er) => console.log(er));
  }, [ProductId]);

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function fileChange(e) {
    setImages(e.target.files);
  }
  console.log(images);

  function handleSubmit(event) {
    event.preventDefault();

    const formdata = new FormData();

    formdata.append("name", product.name);
    formdata.append("desc", product.desc);
    formdata.append("price", product.price);

    for (let index = 0; index < images.length; index++) {
      formdata.append("files", images[index]);
    }

    axios
      .patch(
        `http://localhost:9000/api/admin/updateProduct/${SousCategoryId}/${ProductId}`,
        formdata
      )
      .then((res) => {
        console.log(res.data);
        navigate("/admin");
      })
      .catch((er) => console.log(er));
  }

  return (
    <div>
      <NavAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Produit : </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={product.name || ""}
                  onChange={handleChange}
                />
                <input
                  type="hidden"
                  name="CategoryId"
                  className="form-control"
                  readOnly
                  value={product.CategoryId || ""}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="desc">Description : </label>
                <input
                  type="text"
                  name="desc"
                  className="form-control"
                  id="desc"
                  value={product.desc || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price">Price: </label>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  id="price"
                  value={product.price || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="files">Image : </label>
                <input
                  type="file"
                  name="files"
                  className="form-control"
                  id="files"
                  multiple
                  onChange={fileChange}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="form-control btn btn-primary">
                  Modifier{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

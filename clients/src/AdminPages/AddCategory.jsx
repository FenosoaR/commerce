import NavAdmin from "../components/NavAdmin";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

let init = {
  name: "",
};

export default function AddCategory() {

  const [state, setState] = useState(init);
  const [success, setSuccess] = useState(null);

  const [sousCat, setSousCat] = useState({
    name: "",
    CategoryId: "",
  });

  const [choixcategories, setChoixCategories] = useState([]);

  const handleChangeSousCat = useCallback(
    (e) => {
      setSousCat({
        ...sousCat,
        [e.target.name]: e.target.value,
      });
    },
    [sousCat]
  );


  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/allCategory")
      .then((res) => {
        let categories = res.data.categories;

        let selectCategories = categories.map((value, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                value={value.id}
                name="CategoryId"
                id={`category-${value.id}`}
                className="check-input"
                onChange={handleChangeSousCat}
              />
              <label htmlFor={`category-${value.id}`} id="">
                {" "}
                {value.name}{" "}
              </label>
            </div>
          );
        });
        setChoixCategories(selectCategories);
      })
      .catch((er) => console.log(er));
  }, [handleChangeSousCat]);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:9000/api/admin/addCategory", state)
      .then((res) => {
        setSuccess(res.data.message);
      })
      .catch((er) => console.log(er));
  }

  function handleSousCategory(e) {
    e.preventDefault();

    axios
      .post("http://localhost:9000/api/admin/addSousCategory", sousCat)
      .then((res) => {
        setSuccess(res.data.message)
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
            <h2 style={{marginTop : '10px'}}>Categories et Sous Categories</h2>
            {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}
            <div className="row">      
              <div className="col-lg-5">
                <form action="" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name">Categorie : </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary form-control"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <form action="" onSubmit={handleSousCategory}>
                  <div className="mb-3">
                    <label htmlFor="name">Sous Categorie : </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      onChange={handleChangeSousCat}
                    />
                  </div>
                  <div className="mb-3">{choixcategories}</div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary form-control"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [sousCat, setSousCat] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/home")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data.categories);
      })
      .catch((er) => console.log(er));
  }, []);
  const sousCatpop = document.querySelector(".sous-cat");
  function handleMouse(id) {
    if (sousCatpop) {
      axios
        .get("http://localhost:9000/api/home/souscategory/" + id)
        .then((res) => {
          setSousCat(res.data.sousCategories);
          sousCatpop.style.display = "block";
        })
        .catch((er) => console.log(er));
    }
  }

  function cliqueSousCat() {
    sousCatpop.style.display = "none";
  }

  return (
    <div className="container-fluid">
      <div className="row content">
        <div className="col-lg-12">
          <ul className="ul">
            <li className="li">
              <Link to={"/"} style={{ fontSize: "13px", color: "black" , textDecoration : 'none' }}>
                TOUS LES PRODUITS
              </Link>
            </li>
            {category.map((value, index) => (
              <li
                className="li"
                key={value.id}
                onMouseEnter={() => handleMouse(value.id)}
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-lg-12">
          <div className="sous-cat" onClick={cliqueSousCat}>
            <ul className="ul sousUl">
              {sousCat.map((value, index) => (
                <li key={value.id}>
                  <Link to={`/${value.id}`} className="category">
                    {value.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

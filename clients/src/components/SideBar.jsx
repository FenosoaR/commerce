import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [category , setCategory] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin")
      .then((res) => {
        setCategory(res.data.categories)
      })
      .catch((er) => console.log(er));
  }, []);

  
  return (
    <div className="sidebar">
      <ul>
        <li>
          <i className="fa fa-plus"></i>
          <Link className="cat" to={"/admin/addCategory"}>
            Ajouter Categorie
          </Link>
          /
          <Link className="cat" to={"/admin/addProduct"}>
            Ajouter Produit
          </Link>
        </li>
        <hr />
        <li>
          <i className="fa fa-dashboard"></i>
          <Link className="cat" to={"/admin"}>
            Dashboard
          </Link>
        </li>
        <hr />
        <li>
          <i className="fa fa-list"></i>
          <Link className="cat" to={"/admin/commande"}>
            Commandes
          </Link>
        </li>
        <hr />
        <li>
          <i className="fa fa-users"></i>
          <Link className="cat" to={"/admin/clients"}>
            Clients
          </Link>
        </li>
        <hr />
        <li>Categories : </li>
        {category.map((value, index)=>(         
          <div key={value.id}>
            <li className="li" >{value.name} :</li>
            {value.SousCategories.map((souscategory) =>(
                <ul key={souscategory.id}>
                  <li>
                    <Link className="cat" to={`/admin/productByCategory/${souscategory.id}`}>{souscategory.name}</Link>
                    </li>
                </ul>
            ))}
          </div>
           
             
            ))}
      </ul>
    </div>
  );
}

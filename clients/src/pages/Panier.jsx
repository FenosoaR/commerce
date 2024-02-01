import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import io from "socket.io-client";

export default function Panier() {
  const [panier, setPanier] = useState(
    <tr>
      <td></td>
      <td>Votre panier est vide</td>
      <td></td>
    </tr>
  );
  const [error, setError] = useState(null);
  const token = localStorage.getItem("ssid");

  const [refresh, setRefresh] = useState(false);
  const [total, setTotal] = useState(0);

  let UserId = localStorage.getItem("userId");
  const socket = io("http://localhost:9000");

  useEffect(() => {
    let localStoragePanier = localStorage.getItem("panier");

    if (localStoragePanier) {
      let tabPanier = JSON.parse(localStoragePanier);

      function handleDelete(e, index) {
        if (tabPanier && tabPanier.length > 0) {
          tabPanier.splice(index, 1);
        }

        localStorage.setItem("panier", JSON.stringify(tabPanier));
        setRefresh(true);
      }

      let htmlPanier = tabPanier.map((value, index) => {
        return (
          <tr key={index}>
            <td>
              <img
                src={`http://localhost:9000/product/${value.image_1}`}
                alt=""
              />
              <h5 className="name">{value.name}</h5>
            </td>
            <td>{value.price}</td>
            <td>{value.quantite}</td>
            <td>{value.quantite * value.price} Ar</td>
            <td>
              <button
                id={index}
                className="trash"
                onClick={(e) => handleDelete(e, index)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        );
      });
      setPanier(htmlPanier);
      setRefresh(false);

      let total = 0;
      tabPanier.map((value, index) => {
        return (total = total + value.quantite * value.price);
      });

      setTotal(total);
    }
  }, [token, refresh, UserId]);

  const [state, setState] = useState({
    addresse_livraison: "",
    date_livraison: "",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }


  function handleCommande(e) {
    e.preventDefault();

    let localStoragePanier = localStorage.getItem("panier");

   
      if (!localStoragePanier) {
        if (!token) {
          setError("Vous devriez vous connecter");
        
        } else {
          setError("Votre panier est vide");
        
        }
      } else {
        let tabPanier = JSON.parse(localStoragePanier);

        if (!tabPanier.length) {
          setError("Votre panier est vide");
        
        }
        for (let index = 0; index < tabPanier.length; index++) {
          tabPanier[index].addresse_livraison = state.addresse_livraison;
          tabPanier[index].date_livraison = state.date_livraison;
        }
        for (let index = 0; index < tabPanier.length; index++) {
          axios
            .post(
              "http://localhost:9000/api/product/addCommande/" +
                tabPanier[index].ProductId,
              tabPanier[index],
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              socket.emit("new_commande", tabPanier);

              if (tabPanier && tabPanier.length > 0) {
                tabPanier.splice(tabPanier, 1);
              }
              localStorage.setItem("panier", JSON.stringify(tabPanier));
              setRefresh(true);
            })
            .catch((er) => console.log(er));
        }
      }
    
  }

 

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row cart">
          <div className="col-lg-10 offset-lg-1">
          {error && <div className="alert error">{error}</div>}
            <table className="table">
              <thead>
                <tr>
                  <th>Mon panier</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Total</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>{panier}</tbody>
            </table>
            <div className="totalPanier">
              <span>Total : {total} Ar</span>
              <br />
              <form action="" onSubmit={handleCommande}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="addresse_livraison"
                    placeholder="Addresse de livraison"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">Entrer date de livraison : </label>
                  <input
                    type="date"
                    name="date_livraison"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-panier" id="button-panier">
                  Valider l'achat
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

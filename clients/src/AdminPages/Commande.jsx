import axios from "axios";
import { useState, useEffect } from "react";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

export default function Commande() {
  const [commande, setCommande] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/commande")
      .then((res) => {
        setCommande(res.data.commande);
      })
      .catch((er) => console.log(er));
  }, []);

  function formatDate(date) {
    const options = { day: "numeric", month: "long" };
    return new Date(date).toLocaleDateString("fr-FR", options);
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
            <h3 style={{ marginTop: "20px" }}>Liste de tous commandes</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Produit</th>
                  <th>Date de commande</th>
                  <th>Date de livraison</th>
                  <th>Addresse</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {commande.map((value, index) => (
                  <tr key={index}>
                    <td>{value.User.username}</td>
                    <td>{value.Product.name}</td>
                    <td>{formatDate(value.createdAt)}</td>
                    <td>{formatDate(value.date_livraison)}</td>
                    <td>{value.addresse_livraison}</td>
                    <td>{value.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

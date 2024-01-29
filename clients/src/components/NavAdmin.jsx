import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavAdmin() {
  const token = localStorage.getItem("ssid");
  const username = localStorage.getItem("username");
  const [affichage, setAffichage] = useState();
  const [notif, setNotif] = useState([]);
  let navigate = useNavigate();

  const logout = useCallback(() => {
   
        localStorage.removeItem("ssid");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        navigate("/login");
     
  }, [navigate]);

  useEffect(() => {
    if (token) {
      setAffichage(
        <>
          <button className="btn logout" onClick={logout}>
            Se deconnecter
          </button>
        </>
      );
    }
  }, [token, username, logout]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/commande")
      .then((res) => {
        setNotif(res.data.notif);
      })
      .catch((er) => console.log(er));
  }, []);

  const popNotif = document.querySelector(".notif");

  function clickBell() {
    if (popNotif.style.display === "none") {
      popNotif.style.display = "block";
    } else {
      popNotif.style.display = "none";
    }
  }

  return (
    <div>
      <div className="nav-admin">
      <span className="etsenadmin">Admin.Etsena</span>

        {affichage}
        <i className="fa fa-bell-o notification" onClick={clickBell}></i>

        <div className="notif">
          {notif.map((value, index) => (
            <div key={index} className='notif-commande'>
              <span>{value.User.username} a fait un commande</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

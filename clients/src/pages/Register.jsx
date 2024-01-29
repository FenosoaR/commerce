import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();

  let init = {
    username: "",
    password: "",
    confirmation: "",
    email: "",
  };

  const [state, setState] = useState(init);
  const [error , setError] = useState(null)

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:9000/api/auth/register", state)
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => setError(error.response.data.message));
  }
  return (
    <div className="bg-auth">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title">Bienvenue sur etsena.</h1>
          </div>
          <div className="col-lg-6">
            <form
              action=""
              onSubmit={handleSubmit}
              className="auth"
              style={{ marginTop: "20px" }}
            >
              <h2>Inscrivez-vous!!</h2>
            
               {error && (
                <div className="alert alert-danger" role={alert}>
                    {error}
                </div>
               )}
            
              
              <div className="mb-3">
                <label htmlFor="username" style={{ marginBottom: "10px" }}>
                  Utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Entrer votre nom d'utlisateur"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" style={{ marginBottom: "10px" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Entrer votre email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" style={{ marginBottom: "10px" }}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Entrer votre mot de passe"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmation" style={{ marginBottom: "10px" }}>
                  Confirmation
                </label>
                <input
                  type="password"
                  id="confirmation"
                  name="confirmation"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Confirmer votre mot de passe"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="form-control btn">
                  S'inscrire
                </button>
              </div>
              <div className="inscrire">
                <span>Vous avez pas de compte ? </span> <br />
                <Link style={{ color: "black" }} to={`/login`}>
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

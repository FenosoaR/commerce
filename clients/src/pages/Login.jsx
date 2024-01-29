import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error , setError] = useState(null)

  let navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:9000/api/auth/login", state)
      .then((res) => {
        let user = res.data.user;
        let token = res.data.jwToken;

        if (user.type === "Admin") {
          navigate("/admin");
          localStorage.setItem("ssid", token);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("username", user.username);
        } else {
          console.log(res.data);
          navigate("/");
          localStorage.setItem("ssid", token);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("username", user.username);
        }
      })
      .catch((er) =>setError(er.response.data.message));
  }

  return (
    <div className="bg-auth">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title">Bienvenue sur etsena.</h1>
          </div>
          <div className="col-lg-6">
            <form action="" onSubmit={handleSubmit} className="auth">
              <h2>Veuillez-vous connecter!!</h2>
              {error && (
                <div className="alert alert-danger" role={alert}>
                    {error}
                </div>
               )}
              <div className="mb-3">
                <label htmlFor="email" style={{ marginBottom: "10px" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Entrer votre email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" style={{ marginBottom: "10px" }}>
                  {" "}
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Entrer votre mot de passe"
                  required
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="form-control btn ">
                  Se connecter
                </button>
              </div>
              <div className="inscrire">
                <span>Vous n'avez pas de compte ? </span> <br />
                <Link style={{ color: "black" }} to={`/register`}>
                  S'inscrire
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

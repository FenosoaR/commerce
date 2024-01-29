import { Link, useLocation } from "react-router-dom";
import Category from "../components/Category";
import Navbar from "../components/Navbar";

export default function SearchResult(){

    const location = useLocation();
    const searchProduct = location.state ? location.state.searchProduct : [];

    // const { searchProduct } = useParams();

//   // Si searchProduct est une chaîne JSON, vous devrez le convertir en objet JavaScript
//     const parsedSearchProduct = JSON.parse(searchProduct || "[]");

    return(
        <div>
      <Navbar />
      <Category />
      <div className="container">
        <div className="row">
          {searchProduct.map((value, index) => (
            <div className="col" key={index}>
              <div className="card-product">
                <div className="image">
                  <img
                    src={`http://localhost:9000/product/${value.image_1}`}
                    alt=""
                  />
                </div>
                <div className="span">
                  <span>{value.name}</span>
                  <br />
                  <span className="prix">{value.price} Ar</span>
                  <br />
                </div>
                <button className="voir">
                  <Link className="color" to={`/singleProduct/${value.id}`}>
                    Voir
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}
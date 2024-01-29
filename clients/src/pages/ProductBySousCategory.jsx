import Category from "../components/Category";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";

export default function ProductBySousCategory(){
    const [product , setProduct] = useState([])
    const params = useParams()
    let SousCategoryId = params.SousCategoryId

    useEffect(() => {
      axios.get('http://localhost:9000/api/home/'+SousCategoryId)
      .then((res) =>{
        setProduct(res.data.products)
      })  
      .catch((er) => console.log(er))
      }, [SousCategoryId]);
    return(
        <div>
          <Navbar/>
          <Category/>
          <div className="container">
        <div className="row">
          {product.map((value, index) => (
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
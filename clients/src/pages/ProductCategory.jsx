import axios from "axios";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


export default function ProductCategory(){

    const params = useParams()
    const CategoryId = params.CategoryId
    const [category , setCategory] = useState([])
    const [product , setProduct] = useState([])

    useEffect(() => {

        axios.get('http://localhost:9000/api/home')
        .then((res)=>{
            let categories = res.data.categories
            setCategory(categories)
        })
        .catch((er) => console.log(er) )
       
    }, []);   

    useEffect(() => {

        axios.get('http://localhost:9000/api/home/'+CategoryId)
        .then((res)  =>{
            // console.log(res.data.products)
            setProduct(res.data.products)
        })
        .catch((er) => console.log(er) )

    },[CategoryId])

    return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <ul className="ul">
                            <li className="li"><Link to={'/'}>Tous les produits</Link></li>
                            {category.map((value , index) => (
                                <li className="li" key={value.id}>
                                    <Link to={`/${value.id}`}>{value.name}</Link>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="col-lg-12">
                        <div className="row">
                                {product.map((value , index) =>(
                                    <div className="col" key={index}>
                                            <div className="card-product">
                                                <div className="image">
                                                    <img src={`http://localhost:9000/product/${value.image_1}`} alt=""/>
                                                </div>
                                                    <span>{value.name}</span><br />
                                                    <span>{value.price} Ar</span><br />
                                                    <Link className="voir" to={`/singleProduct/${value.id}`}>Voir</Link>
                                            </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
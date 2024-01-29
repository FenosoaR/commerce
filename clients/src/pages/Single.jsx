import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Single() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [imagesIndex, setImagesIndex] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const ProductId = params.id;

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/product/singleProduct/" + ProductId)
      .then((res) => {
        setProduct(res.data.product);

        let tabImages = [];

        tabImages.push(
          res.data.product.image_1,
          res.data.product.image_2,
          res.data.product.image_3
        );

        setImages(tabImages);

        setPanier((prevPanier) => ({
          ...prevPanier,
          name: res.data.product.name,
          price: res.data.product.price,
          size: res.data.product.size,
          color: res.data.product.color,
          image_1: res.data.product.image_1,
        }));
      })
      .catch((er) => console.log(er));
  }, [ProductId]);

  let UserId = localStorage.getItem("userId");

  const [panier, setPanier] = useState({
    size: "",
    quantite: "",
    ProductId: ProductId,
    UserId: UserId,
    name: "",
    price: "",
    color: "",
    image_1: "",
  });

  function handleChange(e) {
    setPanier({
      ...panier,
      [e.target.name]: e.target.value,
    });
  }

  const popUp = document.querySelector(".pop-up");
  const ok = document.getElementById("ok");

  function handleSubmit(e) {
    e.preventDefault();

    let token = localStorage.getItem("ssid");

    if (!token) {
      navigate("/");
    }

    let stockagePanier = [];

    const panierDansLocalStorage = localStorage.getItem("panier");

    if (panierDansLocalStorage) {
      stockagePanier = JSON.parse(panierDansLocalStorage);
    }

    stockagePanier.push(panier);
    localStorage.setItem("panier", JSON.stringify(stockagePanier));

    popUp.style.display = "block";
  }

  if (ok) {
    ok.addEventListener("click", function (e) {
      popUp.style.display = "none";
    });
  }

  //verifiena ilay index anle sary
  // si iindex anle image mipoitra mitovy amle sary farany :

  // function nextImage(){
  //     setImagesIndex((prevIndex)=>{
  //         if(prevIndex === images.length - 1){
  //             return 0
  //         }else{
  //             return prevIndex + 1
  //         }
  //     })
  // }
  const showNextImage = () => {
    setImagesIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPrevImage = () => {
    setImagesIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="images">
              <img
                src={`http://localhost:9000/product/${product.image_1}`}
                alt=""
              />
            </div>
            <div className="images">
              <img
                src={`http://localhost:9000/product/${product.image_2}`}
                alt=""
              />
            </div>
            <div className="images">
              <img
                src={`http://localhost:9000/product/${product.image_3}`}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="image-container">
              {images.map((value, index) => (
                <div className="single-image" key={index}>
                  <img
                    src={`http://localhost:9000/product/${value}`}
                    alt=""
                    style={{
                      display: index === imagesIndex ? "block" : "none",
                    }}
                  />
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={showPrevImage}
                disabled={imagesIndex <= 0}
                className="prev"
              >
                <i className="fa fa-arrow-left"></i>
              </button>
              <button
                onClick={showNextImage}
                disabled={imagesIndex >= images.length - 1}
                className="next"
              >
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="text">
              <h2>{product.name}</h2>
              <p>{product.desc}.</p>
              <span>Color : {product.color}</span>
              <hr />
              <span>Taille : {product.size}</span>
              <hr />
              <span>Price : {product.price} Ar</span>
              <hr />
            </div>
            <div className="form">
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="quantite">Quantite : </label>
                  <input
                    type="number"
                    name="quantite"
                    id="quantite"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn form-control" id="panier">
                    Ajouter au panier
                  </button>
                </div>
              </form>
            </div>

            <div className="pop-up">
              <h2>{product.name}</h2>
              <span>est ajouté au panier</span>
              <br />
              <button id="ok">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

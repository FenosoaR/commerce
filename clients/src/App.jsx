import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/main.css";
import "./font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./js/main.js";
import Admin from "./AdminPages/Admin";
import ProductByCategory from "./AdminPages/ProductByCategory";
import AddCategory from "./AdminPages/AddCategory";
import AddProduct from "./AdminPages/AddProduct";
import SingleProduct from "./AdminPages/SingleProduct";
import UpdateProduct from "./AdminPages/UpdateProduct";
import HomePage from "./pages/HomePage";
import Single from "./pages/Single";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Panier from "./pages/Panier";
import io from "socket.io-client";
import { useEffect } from "react";
import Commande from "./AdminPages/Commande";
import Client from "./AdminPages/Client";
import ProductBySousCategory from "./pages/ProductBySousCategory";
import SearchResult from "./pages/SearchResult";

export default function App() {
  const UserId = localStorage.getItem("userId");

  useEffect(() => {
    const socket = io("http://localhost:9000");

    const notification = document.querySelector(".notification");
    const popNotif = document.querySelector(".notif");

    socket.on("connect", () => {
      console.log("connecté au serveur");

      socket.emit("room", UserId);

      socket.on("new_commande", (client) => {
        console.log("okokokok");

        notification.style.color = "red";

        const span = document.createElement("span");

        span.textContent = `${client.username} a fait une commande`;

        popNotif.appendChild(span);
      });
    });
  }, [UserId]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />}></Route>
        <Route
          path="/admin/productByCategory/:SousCategoryId"
          element={<ProductByCategory />}
        ></Route>
        <Route path="/admin/addCategory" element={<AddCategory />}></Route>
        <Route path="/admin/addProduct" element={<AddProduct />}></Route>
        <Route
          path="/admin/singleProduct/:id"
          element={<SingleProduct />}
        ></Route>
        <Route
          path="/admin/updateProduct/:SousCategoryId/:id"
          element={<UpdateProduct />}
        ></Route>
        <Route path="/admin/commande" element={<Commande />}></Route>
        <Route path="/admin/clients" element={<Client />}></Route>
        
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/:SousCategoryId" element={<ProductBySousCategory />}></Route>
        <Route path="/singleProduct/:id" element={<Single />}></Route>
        <Route path="/panier" element={<Panier />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/search-results" element={<SearchResult />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

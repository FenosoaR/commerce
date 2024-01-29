import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search(){
    const [search, setSearch] = useState();

    let navigate = useNavigate()
  
    function handleChange(e) {
      setSearch(([e.target.name] = e.target.value));
    }
    function handleSubmit(e) {
      e.preventDefault();
  
      axios
        .get(`http://localhost:9000/api/product/search/?search=${search}`)
        .then((res) => {
          // console.log(res.data)       
          setSearch("");
          navigate("/search-results", { state: { searchProduct: res.data.products || [] } });
        })
        .catch((er) => {
          console.log(er);
        });
    }
  
    return(
        <form action="" onSubmit={handleSubmit} className='form-search'>
        <input
          type="text"
          className="form-control"
          placeholder="Recherche..."
          name="search"
          onChange={handleChange}
        />
        <button className="btn">
          <i className="fa fa-search"></i>
        </button>
      </form>
    )
}
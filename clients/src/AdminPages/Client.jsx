import axios from "axios";
import { useState , useEffect} from "react";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

export default function Client(){

    const [clients , setClients] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9000/api/admin/clients")
        .then((res)=>{
            // console.log(res.data.clients)
            setClients(res.data.clients)
        })
        .catch((er) => console.log(er))
    }, []);

    return(
        <div>
            <NavAdmin/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <SideBar/>
                    </div>
                    <div className="col-lg-9">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Clients</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                      
                        <tbody>
                            {clients.map((value , index)  => (
                                <tr key={index}>
                                    <td>{value.username}</td>
                                    <td>{value.email}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
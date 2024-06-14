import React, { useEffect, useState } from "react";
import "../../styles/User.css";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../../assets/loader2.gif";

function User() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${backendUrl}api/getAll`)
      .then((res) => {
        setUserdata(res.data.userData);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error occurred", {
          position: "top-center",
        });
        console.log(err);
        setLoading(false);
      });
  }, []);

  function deleteData(userId) {
    setUserdata((prevUser) => prevUser.filter((user) => user._id !== userId));
    toast.success("Quote deleted successfully", { position: "top-center" });
    axios.delete(`${backendUrl}api/delete/${userId}`).catch((err) => {
      console.log(err.response.data);
      toast.error("Error occurred", {
        position: "top-center",
      });
    });
  }

  return (
    <div>
      {loading ? (
        <div className="loader">
          <img src={loader} alt="Loading" />
          <p style={{ textAlign: "center", marginTop: "-10px" }}>
            Collecting Quotes from
            <br /> Around the Globe 🌍
          </p>
        </div>
      ) : (
        <div className="userTable">
          <div className="table-header">
            <h3 className="app-name">
              Quote<span>Fusion</span>
            </h3>
            <NavLink to={"/add"} className="addButton">
              Add Quote
            </NavLink>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Quote</th>
                <th>User Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td className="quote">"{user.quote}"</td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  <td className="actionButtons">
                    <button onClick={() => deleteData(user._id)}>Delete</button>
                    <NavLink to={`/edit/${user._id}`} id="editButton">
                      Edit
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default User;

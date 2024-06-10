import React, { useEffect, useState } from "react";
import "../../styles/User.css";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function User() {
  const [userdata, setUserdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://mern-backend-grm4.onrender.com/api/getAll")
      .then((res) => {
        setUserdata(res.data.userData);
      })
      .catch((err) => {
        toast.error("Error occurred", {
          position: "top-center",
        });
        console.log(err);
      });
  }, []);

  function deleteData(userId) {
    setUserdata((prevUser) =>
      prevUser.filter((user) => user._id !== userId)
    );
    toast.success("Data deleted successfully", { position: "top-center" });
    axios
      .delete(`https://mern-backend-grm4.onrender.com/api/delete/${userId}`)
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Error occurred", {
          position: "top-center",
        });
      });
  }
  return (
    <div className="userTable">
      <NavLink to={"/add"} className="addButto">
        Add User
      </NavLink>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.email}</td>
                <td className="actionButtons">
                  <button onClick={() => deleteData(user._id)}>Delete</button>
                  <NavLink to={`/edit/${user._id}`} id="editButton">
                    Edit
                  </NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default User;

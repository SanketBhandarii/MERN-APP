import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/Add.css";
import axios from "axios";
import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let fname = useRef();
  let lname = useRef();
  let email = useRef();
  let password = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      fname: fname.current.value,
      lname: lname.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    fname.current.value = "";
    lname.current.value = "";
    email.current.value = "";
    password.current.value = "";
    toast.success("User data saved successfully", { position: "top-center" });
    await axios
      .post(`${backendUrl}api/create`, newUser)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Error occurred", {
          position: "top-center",
        });
      });
  }

  return (
    <div className="addUser">
      <NavLink to={"/"}>Back</NavLink>
      <form method="POST" onSubmit={handleSubmit}>
        <h3>Add New User</h3>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
            ref={fname}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
            ref={lname}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            ref={email}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            ref={password}
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddUser;

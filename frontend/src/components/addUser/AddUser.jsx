import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/Add.css";
import axios from "axios";
import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let quote = useRef();
  let fname = useRef();
  let lname = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      quote: quote.current.value,
      fname: fname.current.value,   
      lname: lname.current.value,
    };
   
    quote.current.value = "";
    fname.current.value = "";
    lname.current.value = "";
    toast.success("Quote shared successfully!", { position: "top-center" });
    await axios
      .post(`${backendUrl}api/create`, newUser)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("An error occurred", {
          position: "top-center",
        });
      });
  }

  return (
    <div className="addUser">
      <NavLink to={"/"} className="backButton">
      <i class="fa-solid fa-circle-left"></i>
      </NavLink>
      <form method="POST" onSubmit={handleSubmit}>
        <h3>Share Your Wisdom</h3>
        <div className="inputGroup">
          <label htmlFor="quote">Your Insightful Quote</label>
          <input
            type="text"
            id="quote"
            name="quote"
            autoComplete="off"
            placeholder="E.g., 'Your patience is your power'"
            ref={quote}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="Enter your first name"
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
            placeholder="Enter your last name"
            ref={lname}
            required
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Share Now</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddUser;

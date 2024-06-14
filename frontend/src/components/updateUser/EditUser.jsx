import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../styles/Add.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useRef } from "react";

function EditUser() {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let quote = useRef();
  let fname = useRef();
  let lname = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backendUrl}api/getone/${id}`)
      .then((res) => {
        quote.current.value = res.data.userData.quote;
        fname.current.value = res.data.userData.fname;
        lname.current.value = res.data.userData.lname;
      })
      .catch((err) => {
        toast.error("Error occurred", {
          position: "top-center",
        });
        console.log(err);
      });
  }, []);

  async function update(event) {
    event.preventDefault();
    const newUser = {
      quote: quote.current.value,
      fname: fname.current.value,
      lname: lname.current.value,
    };
    quote.current.value = "";
    fname.current.value = "";
    lname.current.value = "";
    toast.success("Quote successfully updated", { position: "top-center" });
    await axios
      .put(`https://mern-backend-grm4.onrender.com/api/update/${id}`, newUser)
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
      <NavLink to={"/"}>
        <i class="fa-solid fa-circle-left"></i>
      </NavLink>
      <form action="" onSubmit={update}>
        <h3>Edit your quote</h3>
        <div className="inputGroup">
          <label htmlFor="quote">Your Insightful Quote</label>
          <input
            type="text"
            id="quote"
            name="quote"
            autoComplete="off"
            placeholder="E.g., 'Your inspiring quote here'"
            ref={quote}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="quote">First Name</label>
          <input
            type="text"
            id="quote"
            name="quote"
            autoComplete="off"
            placeholder="Enter your first name"
            ref={fname}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">Last Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="Enter your last name"
            ref={lname}
            required
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Edit & Share</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditUser;

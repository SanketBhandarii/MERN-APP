import { NavLink, useParams } from "react-router-dom";
import "../../styles/Add.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useRef } from "react";

function EditUser() {
  const { id } = useParams();

  let fname = useRef();
  let lname = useRef();
  let email = useRef();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`https://mern-backend-grm4.onrender.com/api/getone/${id}`)
        .then((res) => {
          fname.current.value = res.data.userData.fname;
          lname.current.value = res.data.userData.lname;
          email.current.value = res.data.userData.email;
        })
        .catch((err) => {
          toast.error("Error occurred", {
            position: "top-center",
          });
        });
    }
    fetchData();
  }, []);

  async function update(event) {
    event.preventDefault();
    const newUser = {
      fname: fname.current.value,
      lname: lname.current.value,
      email: email.current.value,
    };
    await axios
      .put(`https://mern-backend-grm4.onrender.com/api/update/${id}`, newUser)
      .then((res) => {
        fname.current.value = "";
        lname.current.value = "";
        email.current.value = "";
        toast.success(res.data.msg, { position: "top-center" });
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
      <form action="" onSubmit={update}>
        <h3>Update User</h3>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
            ref={fname}
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
          />
        </div>
        <div className="inputGroup">
          <button>Update User</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditUser;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Nav = () => {
    const [name, setName] = useState("");
    const getName =async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/v1/jobs', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setName(response.data.name);
    }
    useEffect(() =>{
        getName();
    }, [])
  return (
    <>
      <div className="nav">
        <div className="heading">
          <h1>JOBS-API</h1>
        </div>
        <div className="user">
          <h2>Hi,{name} </h2>
        </div>
      </div>
      <Outlet/>
    </>
  );
};

export default Nav;

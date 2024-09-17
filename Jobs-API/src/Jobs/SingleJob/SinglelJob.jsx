import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleJob.css";
const SinglelJob = () => {
  const [singleJob, setSingleJob] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();
  const getSingleJob = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/v1/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleJob(response.data.job);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleJob();
  }, []);
  const updateJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/v1/jobs/${id}`,
        {
          company,
          position,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleJob(response.data.job);
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteJob = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found. User might not be authenticated.");
        return;
      }
      
      const response = await axios.delete(`http://localhost:5000/api/v1/jobs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })

      navigate("/jobs");

      console.log(response);
    } catch (error) {
      console.log(error);
     
    }
  };
  if (!singleJob) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="single">
        <div className="single-heading">
          <h1>Update Single Job</h1>
          <span></span>
        </div>
        <h4>Id: {singleJob._id}</h4>
        <h4>Company: {singleJob.company}</h4>
        <h4>Position: {singleJob.position}</h4>
        <form method="patch" onSubmit={updateJob}>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Enter Company"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            name="position"
            id="position"
            placeholder="Enter positon"
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <select name="status" id="status" value={status} className="styled-select"  onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>  
            <option value="Interview">Interview</option>
          </select>
          <button className="update-btn">Update</button>
        </form>
        <form action="">
          <button className="delete-btn" onClick={deleteJob}>
            Delete Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default SinglelJob;

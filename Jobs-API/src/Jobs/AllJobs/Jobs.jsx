import React, { useEffect, useState } from "react";
import "./Jobs.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
const Jobs = () => {
  const navigate = useNavigate();

  const [create, setCreate] = useState(false);
  const [token, setToken] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobs, setJobs] = useState([]);
  const getAllJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found, user not authenticated");
        navigate("/login");
        return;
      }
      const response = await axios.get("http://localhost:5000/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(token);

      setJobs(response.data.job);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 ||
          error.response.status === 403 ||
          error.response.status === 429)
      ) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login"); //
      }
    }
  };
  useEffect(() => {
    getAllJobs();
  }, []);

  const createJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/jobs",
        {
          company: company,
          position: position,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreate(false);

      setJobs([...jobs, response.data.job]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllJobs = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="your_jobs">
        <div className="create">
          <button className="create-btn" onClick={() => setCreate(true)}>
            Create Job
          </button>
          <button className=" del-btn" onClick={() => deleteAllJobs()}>
            Delete All
          </button>
          {create && (
            <form action="" onSubmit={createJob}>
              <label htmlFor="company">Company: </label>
              <input
                type="text"
                name="company"
                id="company"
                required
                onChange={(e) => setCompany(e.target.value)}
              />
              <label htmlFor="position">Position: </label>
              <input
                type="text"
                name="position"
                id="position"
                required
                onChange={(e) => setPosition(e.target.value)}
              />
              <button>Create</button>
            </form>
          )}
        </div>

        <h1 style={{ textAlign: "center", fontSize: "40px" }}>{jobs<1 ? 'No Jobs' : 'Your Jobs'}</h1>
        <span></span>
        <div className="your-jobs">
          {jobs.map((item) => {
            const { company, position, _id, status } = item;
            return (
              <div className="job" key={_id}>
                <h2>
                  Company: <small>{company}</small>
                </h2>
                <h4>Position: {position}</h4>
                <div className="bottom">
                  <Link to={`/jobs/${_id}`}>
                    <FaEdit className="edit-icon" />{" "}
                  </Link>

                  <small style={{ display: "block", color: "#333" }}>
                    {status}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Jobs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./JobForm.css";

const JobForm = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    experience: "",
    technologies: ""
  });

  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/jobs/${id}`)
        .then((res) => {
          setJob({
            ...res.data,
            technologies: Array.isArray(res.data.technologies)
              ? res.data.technologies.join(", ")
              : res.data.technologies || ""
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      ...job,
      technologies: job.technologies.split(",").map((t) => t.trim())
    };

    const method = id ? axios.put : axios.post;
    const url = id
      ? `http://localhost:8080/api/jobs/${id}`
      : `http://localhost:8080/api/jobs`;

    method(url, jobData)
      .then(() => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/"); 
        }, 2000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="job-form-container">
      <h2>{id ? "Edit Job Post" : "Create Job Post"}</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <label>Job Title*</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Frontend Developer"
          value={job.title}
          onChange={handleChange}
          required
        />

        <label>Company*</label>
        <input
          type="text"
          name="company"
          placeholder="e.g. Google"
          value={job.company}
          onChange={handleChange}
          required
        />

        <label>Location*</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. Mumbai"
          value={job.location}
          onChange={handleChange}
          required
        />

        <label>Job Description*</label>
        <textarea
          name="description"
          placeholder="Describe the job role and responsibilities"
          value={job.description}
          onChange={handleChange}
          required
        />

        <label>Experience Required (years)*</label>
        <input
          type="number"
          name="experience"
          placeholder="e.g. 2"
          value={job.experience}
          onChange={handleChange}
          required
        />

        <label>Technologies* (comma separated)</label>
        <input
          type="text"
          name="technologies"
          placeholder="e.g. React, Node.js, MongoDB"
          value={job.technologies}
          onChange={handleChange}
          required
        />

        <button type="submit">{id ? "Update" : "Submit"}</button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Job Created Successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobForm;

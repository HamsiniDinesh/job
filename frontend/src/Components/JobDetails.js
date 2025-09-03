import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./JobDetails.css"; 

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 3000); 
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details-container">
      <div className="job-card">
        <h2 className="job-title">{job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Experience:</strong> {job.experience} years</p>

        <div className="tags">
  {job.technologies &&
    job.technologies.map((tech, i) => (
      <span key={i} className="tag">{tech}</span>
    ))}
</div>


        
        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>

       
        {applied && (
          <p className="success-message">
            Applied successfully for <strong>{job.title}</strong>
          </p>
        )}

        
        <Link to="/jobs" className="back-link">
          Back to Jobs
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  
  const filterJobs = (term) => {
    if (!term.trim()) {
      setFilteredJobs(jobs);
    } else {
      const results = jobs.filter((job) =>
  job.title.toLowerCase().startsWith(term.toLowerCase())
);
      setFilteredJobs(results);
    }
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value); 
  };

  const handleSearch = () => {
    filterJobs(search); 
  };


  useEffect(() => {
    filterJobs(search);
  }, [search]);

  
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="job-list-container">
      <h1 className="job-title">Job Posts</h1>

      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search jobs ..."
          value={search}
          onChange={handleInputChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>

      
      <div className="job-cards">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <Link
              to={`/jobs/${job.id}`} 
              key={job.id}
              className="job-card"
            >
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p className="experience">
                <strong>Experience:</strong> {job.experience} years
              </p>
              <div className="tags">
  {job.technologies &&
    job.technologies.map((tech, i) => (
      <span key={i} className="tag">{tech}</span>
    ))}
</div>

            </Link>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>

      
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobList;

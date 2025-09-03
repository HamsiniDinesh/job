import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
  const [searchTerm] = useState("");
  
  

  return (
    <div className="homepage-container">
           <div className="homepage-content">
        
        <div className="text-section">
          <h1>
            Find the Right Job <span className="highlight">OR</span> Hire the Best Talent
          </h1>
          <p>
            Welcome to <strong>JobSphere</strong> — Your one-stop solution for job searching and recruitment.
            Browse curated job listings, post openings, and connect with the right people.
            Designed for ease, speed, and professionalism.
          </p>

         
          <div className="button-group">
            <Link to="/jobs" className="btn-expl">Explore Jobs</Link>
            <Link to="/create-job" className="btn-post">Post a Job</Link>
          </div>
        </div>

       </div>
 
    </div>
  );
}

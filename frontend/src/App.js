import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

import JobList from "./Components/JobList";
import JobForm from "./Components/JobForm";
import JobDetails from "./Components/JobDetails";
import Navbar from "./Pages/Navbar"; 
import Footer from "./Pages/Footer";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/create-job" element={<JobForm />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

      </Routes>
       <Footer />
    </Router>
  );
}

export default App;

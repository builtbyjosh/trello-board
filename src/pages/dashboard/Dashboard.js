import React from "react";
import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";

const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  console.log("PROJECTS: ", documents);
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
};

export default Dashboard;

import React from "react";
import "./Project.css";
import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import ProjectSummary from "./ProjectSummary";

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);
  console.log("DOCUMENT: ", document);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
    </div>
  );
};

export default Project;

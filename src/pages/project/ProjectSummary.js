import React from "react";
import Avatar from "../../components/Avatar";

const ProjectSummary = ({ project }) => {
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project Due By: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        {project.assignedUsersList.map((user) => (
          <div key={user.id}>
            <Avatar src={user.photoURL} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSummary;
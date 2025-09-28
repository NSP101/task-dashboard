import React from "react";

function TaskCard({ task, onEdit, onDelete, onComplete, formatDate }) {
  const priorityColor = {
    Low: "#d1e7dd",
    Medium: "#fff3cd",
    High: "#f8d7da"
  };

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: priorityColor[task.priority] || "#fff",
        border: "1px solid #ccc",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        marginBottom: "10px"
      }}
    >
      <h4>{task.title}</h4>
      <p style={{ margin: "5px 0" }}>{task.description}</p>
      <small>
        Category: {task.category} | Priority: {task.priority} <br />
        Created: {formatDate(task.createdAt)}
        {task.completedAt && <> | Completed: {formatDate(task.completedAt)}</>}
      </small>
      <div style={{ marginTop: "5px", display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {task.status !== "Done" && <button onClick={() => onComplete(task)} style={{ cursor: "pointer" }}>Mark as Done</button>}
        <button onClick={() => onEdit(task)} style={{ cursor: "pointer" }}>Edit</button>
        <button onClick={() => onDelete(task.id)} style={{ cursor: "pointer" }}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;

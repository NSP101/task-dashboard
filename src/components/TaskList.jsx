import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

function TaskList({ tasks, status, onEdit, onDelete, onComplete, formatDate }) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            minWidth: "250px",
            minHeight: "400px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f4f4f4",
            flex: 1
          }}
        >
          <h3 style={{ textAlign: "center" }}>{status}</h3>
          {tasks.length === 0 && <p style={{ textAlign: "center", color: "#888" }}>No tasks</p>}
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{ ...provided.draggableProps.style }}
                >
                  <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} formatDate={formatDate} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;

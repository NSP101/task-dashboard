import React, { useState, useEffect, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    { id: "1", title: "Finish Project Proposal", description: "Write the proposal for Xtend project", category: "Work", priority: "High", status: "Todo", createdAt: Date.now() },
    { id: "2", title: "Buy Groceries", description: "Milk, Eggs, Vegetables", category: "Personal", priority: "Medium", status: "Todo", createdAt: Date.now() },
    { id: "3", title: "Study React", description: "Complete Hooks tutorial", category: "Study", priority: "Low", status: "In Progress", createdAt: Date.now() },
    { id: "4", title: "Team Meeting", description: "Discuss dashboard progress", category: "Work", priority: "High", status: "Done", createdAt: Date.now(), completedAt: Date.now() },
    { id: "5", title: "Read Book", description: "Read 30 pages of novel", category: "Personal", priority: "Low", status: "In Progress", createdAt: Date.now() },
    { id: "6", title: "Submit Assignment", description: "Submit math assignment", category: "Study", priority: "Medium", status: "Todo", createdAt: Date.now() },
    { id: "7", title: "Plan Trip", description: "Plan weekend trip with friends", category: "Personal", priority: "Medium", status: "Done", createdAt: Date.now(), completedAt: Date.now() },
  ]);

  const [newTask, setNewTask] = useState({ title: "", description: "", category: "Work", priority: "Low", status: "Todo" });
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const titleInputRef = useRef();
  const statuses = ["Todo", "In Progress", "Done"];

  // Keyboard shortcut Ctrl+N
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        titleInputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Add Task
  const handleAddTask = () => {
    if (!newTask.title) {
      toast.error("Title required!");
      return;
    }
    const task = { ...newTask, id: Date.now().toString(), createdAt: Date.now() };
    setTasks([...tasks, task]);
    toast.success("Task added!");
    setNewTask({ title: "", description: "", category: "Work", priority: "Low", status: "Todo" });
  };

  // Edit Task
  const handleEditTask = (task) => {
    const title = prompt("Edit title", task.title);
    if (title) {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, title } : t));
      toast.info("Task updated!");
    }
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.warn("Task deleted!");
  };

  // Mark Task as Done
  const handleCompleteTask = (task) => {
    setTasks(tasks.map(t =>
      t.id === task.id ? { ...t, status: "Done", completedAt: Date.now() } : t
    ));
    toast.success("Task completed!");
  };

  // Drag and Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const newTasks = Array.from(tasks);
    const [moved] = newTasks.splice(source.index, 1);
    moved.status = destination.droppableId;

    // Set completedAt if moved to Done
    if (destination.droppableId === "Done") moved.completedAt = Date.now();
    else moved.completedAt = undefined;

    newTasks.splice(destination.index, 0, moved);
    setTasks(newTasks);
  };

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  // Filtered Tasks
  const filteredTasks = tasks.filter(t =>
    (filterCategory === "All" || t.category === filterCategory) &&
    (filterPriority === "All" || t.priority === filterPriority) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Task Management Dashboard</h1>

      {/* Filters & Search */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", justifyContent: "center" }}>
        <input
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ padding: "10px", fontSize: "16px", borderRadius: "5px" }}>
          <option>All</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: "10px", fontSize: "16px", borderRadius: "5px" }}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Add Task */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "30px" }}>
        <input
          ref={titleInputRef}
          placeholder="Title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          style={{ padding: "10px", fontSize: "16px", width: "200px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          placeholder="Description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          style={{ padding: "10px", fontSize: "16px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <select value={newTask.category} onChange={e => setNewTask({ ...newTask, category: e.target.value })} style={{ padding: "10px", fontSize: "16px", borderRadius: "5px" }}>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>
        <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} style={{ padding: "10px", fontSize: "16px", borderRadius: "5px" }}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          onClick={handleAddTask}
          style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "5px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Add Task
        </button>
      </div>

      {/* Drag and Drop Lists */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {statuses.map(status => (
            <TaskList
              key={status}
              tasks={filteredTasks.filter(t => t.status === status)}
              status={status}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
              formatDate={formatDate}
            />
          ))}
        </div>
      </DragDropContext>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </div>
  );
}

export default App;

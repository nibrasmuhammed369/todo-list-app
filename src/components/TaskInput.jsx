import "./TaskInput.css";

export default function TaskInput({ taskName, setTaskName, addTask }) {
  return (
    <div className="task-container">
      <input
        type="text"
        className="input-box"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button className="add-button" onClick={addTask}>
        Add Task
      </button>
    </div>
  );
}

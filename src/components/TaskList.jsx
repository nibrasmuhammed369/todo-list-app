import "./TaskList.css";
import { DeleteButton } from "../App";

export default function TaskList({
  tasks,
  toggleCompleted,
  deleteTask,
  filter,
}) {
  if (tasks.length === 0) {
    let emptyMassage = "No tasks yet. Add one above! ";

    if (filter === "active") {
      emptyMassage = "No Active Task.";
    }
    if (filter === "completed") {
      emptyMassage = "No task is completed ";
    }
    return <p>{emptyMassage}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((tasks) => (
        <li key={tasks.id} className="task-item">
          <input
            type="checkbox"
            checked={tasks.completed}
            onChange={() => toggleCompleted(tasks.id)}
          />

          <span
            className="task-text"
            style={{
              textDecoration: tasks.completed ? "line-through" : "none",
            }}
          >
            {tasks.text}
          </span>

          <DeleteButton onDelete={() => deleteTask(tasks.id)} />
        </li>
      ))}
    </ul>
  );
}

import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

export function DeleteButton({ onDelete }) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <span className="inline-confirm-group">
        <button onClick={onDelete} className="btn-sure">
          sure?
        </button>
        <button onClick={() => setIsConfirming(false)} className="btn-no">
          no
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setIsConfirming(true)} className="btn-delete">
      delete
    </button>
  );
}

function App() {
  const [isLoggedIn , setIsLoggedIn] =useState(() => {
   return localStorage.getItem("isLoggedIn") === "true";
  });
  const [currentUser , setCurrentUser ] = useState(() => {
    return localStorage.getItem("currentUser") || "" ;
  });
  const [taskName, setTaskName] = useState("");
  const [tasks, settasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [filter, setfilter] = useState("all");
  const [error, seterror] = useState("");

  const addTask = () => {
    if (taskName.trim() === "") {
      seterror("Task cannot be empty");
      return;
    }
    seterror("");

    const newTask = {
      id: Date.now(),
      text: taskName,
      completed: false,
    };

    settasks([...tasks, newTask]);
    setTaskName("");
  };

  const toggleCompleted = (id) => {
    const updatetasks = tasks.map((tasks) =>
      tasks.id === id ? { ...tasks, completed: !tasks.completed } : tasks,
    );
    settasks(updatetasks);
  };

  const deleteTask = (id) => {
    const updatetasks = tasks.filter((tasks) => tasks.id !== id);

    settasks(updatetasks);
  };

  const filteredTasks = tasks.filter((tasks) => {
    if (filter == "active") {
      return !tasks.completed;
    } else if (filter == "completed") {
      return tasks.completed;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem("isLoggedIn" , "true");
    localStorage.setItem("currentUser" , username);
  };
  const handleLogout = ()=> {
    setIsLoggedIn(false);
    setCurrentUser("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  };

  if(!isLoggedIn){
    return <Login onLogin={handleLogin}></Login>;
  }

  return (
    <>
      <div className="logout-bar">
        <span className="welcome-text">Welcome, {currentUser}!</span>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-container">
        <div className="option-container">
          <FilterBar currentFilter={filter} setCurrentFilter={setfilter} />
        </div>

        <div className="todo-container">
          <TaskInput
            taskName={taskName}
            setTaskName={setTaskName}
            addTask={addTask}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <TaskList
            tasks={filteredTasks}
            toggleCompleted={toggleCompleted}
            deleteTask={deleteTask}
            filter={filter}
          />
        </div>
      </div>
    </>
  );
}
export default App;

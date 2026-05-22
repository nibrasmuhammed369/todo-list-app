import "./FilterBar.css";

export default function FilterBar({ currentFilter, setCurrentFilter }) {
  return (
    <div className="filter-wrapper">
      {/* Filter Heading */}
      <h3 className="filter-heading">Filter Tasks</h3>

      <div className="filter-options">
        {/* Option: All */}
        <label
          className={`filter-item ${currentFilter === "all" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="todo-filter"
            value="all"
            checked={currentFilter === "all"}
            onChange={() => setCurrentFilter("all")}
          />
          <span>All</span>
        </label>

        {/* Option: Active */}
        <label
          className={`filter-item ${currentFilter === "active" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="todo-filter"
            value="active"
            checked={currentFilter === "active"}
            onChange={() => setCurrentFilter("active")}
          />
          <span>Active</span>
        </label>

        {/* Option: Completed */}
        <label
          className={`filter-item ${currentFilter === "completed" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="todo-filter"
            value="completed"
            checked={currentFilter === "completed"}
            onChange={() => setCurrentFilter("completed")}
          />
          <span>Completed</span>
        </label>
      </div>
    </div>
  );
}

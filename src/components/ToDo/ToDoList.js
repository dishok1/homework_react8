import React from "react";

function ToDoList({ todos, onRemove, onToggle }) {
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id} style={{ listStyle: "none", marginBottom: 8 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              checked={!!t.completed}
              onChange={() => onToggle(t.id)}
            />
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                opacity: t.completed ? 0.6 : 1,
                color: "#333",
              }}
            >
              {t.name}
            </span>
          </label>

          <button onClick={() => onRemove(t.id)} style={{ marginLeft: 12 }}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;

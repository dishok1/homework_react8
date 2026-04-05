import React from "react";

function ToDoItem({ todo, onRemove }) {
  return (
    <li style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
      <span style={{ color: "#333" }}>{todo.name}</span>
      <button onClick={() => onRemove(todo.id)} style={{ marginLeft: 8 }}>
        Delete
      </button>
    </li>
  );
}

export default ToDoItem;

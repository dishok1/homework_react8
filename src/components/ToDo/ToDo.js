import React, { useState } from "react";
import { initialTodo } from "./initialTodo";
import ToDoList from "./ToDoList";
import Select from "./Select";
import "./ToDoStyle.css";

function ToDo() {
  const MIN_LENGTH = 2;   
  const MAX_LENGTH = 15;  

  const [todos, setTodos] = useState(
    (initialTodo || []).map((t) => ({ completed: false, ...t })),
  );
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [error, setError] = useState(""); 

  const validate = (rawValue) => {
    const value = String(rawValue).trim();

    if (!value) return "Введіть текст туду.";
    if (value.length < MIN_LENGTH) {
      return `Мінімальна довжина: ${MIN_LENGTH} символів.`;
    }
    if (value.length > MAX_LENGTH) {
      return `Максимальна довжина: ${MAX_LENGTH} символів.`;
    }

    return "";
  };

  const addTodo = () => {
    const value = String(input).trim();
    const validationError = validate(value);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const maxId = todos.length ? Math.max(...todos.map((t) => Number(t.id))) : 0;
    const newTodo = { id: String(maxId + 1), name: value, completed: false };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const onInputChange = (e) => {
    const next = e.target.value;
    setInput(next);

    
    if (!next.trim()) {
      setError("");
      return;
    }
    const validationError = validate(next);
    setError(validationError);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const filteredTodos =
    filter === "active"
      ? todos.filter((t) => !t.completed)
      : filter === "completed"
        ? todos.filter((t) => t.completed)
        : todos;

  return (
    <div className="todo-container">
      <input
        className="input-group"
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />

      <button onClick={addTodo} style={{ marginLeft: "10px" }}>
        Додати текст
      </button>

      {error ? (
        <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>
      ) : null}

      <div style={{ marginTop: 12 }}>
        <Select value={filter} onChange={setFilter} />
      </div>

      <h2>{filteredTodos.length}</h2>

      <ToDoList todos={filteredTodos} onRemove={removeTodo} onToggle={toggleTodo} />
    </div>
  );
}

export default ToDo;
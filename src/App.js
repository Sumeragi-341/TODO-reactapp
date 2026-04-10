import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔹 ローカル保存読み込み
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // 🔹 ローカル保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input === "") return;

    setTasks([...tasks, { text: input, done: false, due: dueDate }]);
    setInput("");
    setDueDate("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const newText = prompt("新しいタスクを入力", tasks[index].text);
    if (!newText) return;

    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };

  // 🔹 フィルター処理
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  return (
    <div className="container">
  <h1>TODOアプリ</h1>

  <div className="input-area">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="タスクを入力"
    />
    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />
    <button onClick={addTask}>追加</button>
  </div>

  <div className="filters">
  <button
    className={filter === "all" ? "active" : ""}
    onClick={() => setFilter("all")}
  >
    全て
  </button>

  <button
    className={filter === "active" ? "active" : ""}
    onClick={() => setFilter("active")}
  >
    未完了
  </button>

  <button
    className={filter === "completed" ? "active" : ""}
    onClick={() => setFilter("completed")}
  >
    完了
  </button>
  </div>

  <ul>
    {filteredTasks.map((task, index) => (
      <li key={index} className="task">
        <span className={task.done ? "done" : ""}>
          {task.text} ({task.due || "期限なし"})
        </span>

        <div>
        <button className="primary" onClick={addTask}>追加</button>

        <button className="complete" onClick={() => toggleTask(index)}>✔</button>
        <button className="edit" onClick={() => editTask(index)}>編集</button>
        <button className="delete" onClick={() => deleteTask(index)}>削除</button>
        </div>
      </li>
    ))}
    </ul>
  </div>
  );
}

export default App;
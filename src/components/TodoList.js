import React, { useEffect, useState } from "react";
import { CheckSquare, Trash2 } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

export default function TodoList() {
  const user = useAuthStore((state) => state.user);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask, done: false };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-indigo-600">📋 To-Do List</h2>
          <p className="text-sm text-gray-600">{user?.name || "Student"}</p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-gray-700">
            Completed: <span className="font-medium">{completed}</span> /{" "}
            {tasks.length}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={addTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-indigo-50 px-4 py-2 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleDone(task.id)}
                className={`w-5 h-5 rounded-full border-2 ${
                  task.done
                    ? "bg-green-500 border-green-500"
                    : "border-indigo-400"
                }`}
              />
              <span
                className={`text-sm ${
                  task.done ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const submitTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center flex flex-col h-screen justify-center ">
        <h1 className="text-3xl mb-48 ">TODO LIST</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            className={`pr-24 pl-5 py-3 outline-none rounded-full ${
              todo.completed && "line-through"
            }`}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Activity"
            value={todo}
            required
          />
          <button
            type="submit"
            className="mx-10 px-8 py-3 bg-red-400 rounded-full"
          >
            Add Todo
          </button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-center">
            {todoEditing === todo.id ? (
              <input
                type="text"
                required
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
                className="bg-white pr-24 pl-5 rounded-full py-3 mr-5 mt-10 outline-none"
              />
            ) : (
              <p className="bg-white px-16 rounded-full py-3 mr-10 mt-10">
                {todo.text}
              </p>
            )}
            <div className="flex items-center mt-10 space-x-5">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-400 px-6 py-3 rounded-full "
              >
                Delete Todo
              </button>
              <input
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
                className="h-5 w-5"
              />
              {todoEditing === todo.id ? (
                <button
                  className="bg-red-400 px-6 py-3 rounded-full "
                  onClick={() => submitTodo(todo.id)}
                >
                  Submit Todo
                </button>
              ) : (
                <button
                  className="bg-red-400 px-6 py-3 rounded-full"
                  onClick={() => setTodoEditing(todo.id)}
                >
                  Edit Todo
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

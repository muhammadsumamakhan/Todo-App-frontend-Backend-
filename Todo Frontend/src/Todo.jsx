import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Todo = () => {
  const input = useRef();
  const [todos, setTodos] = useState([]);

  // Add a new Todo
  const AddTodo = async (e) => {
    e.preventDefault();
    const todoInput = input.current.value;
    try {
      const response = await axios.post('http://localhost:3000/todo', {
        title: todoInput,
      });
      setTodos([...todos, response.data]);
      input.current.value = "";
    } catch (error) {
      console.error("Error adding todo:", error.message);
      alert("Failed to add todo. Please try again.");
    }
  };

  // Fetch All Todos
  useEffect(() => {
    async function getAllTodo() {
      try {
        const response = await axios.get('http://localhost:3000/allTodos');
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    }
    getAllTodo();
  }, []);

  // Edit Todo
  const editTodo = async (id) => {
    const updateTitle = prompt("Enter update todo here?");
    if (updateTitle) {
      try {
        const response = await axios.put(`http://localhost:3000/todo/${id}`, {
          title: updateTitle,
        });
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      } catch (error) {
        console.error("Error editing todo:", error.message);
        alert("Failed to edit todo. Please try again.");
      }
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      alert("Failed to delete todo. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Todo List</h2>
      <form onSubmit={AddTodo} className="flex mb-6">
        <input
          type="text"
          placeholder="Enter your todo"
          ref={input}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
      <ul>
        {todos.length > 0 ? (
          todos.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-3 border-b border-gray-200">
              <span className="text-gray-700">{item.title}</span>
              <div>
                <button
                  onClick={() => editTodo(item.id)}
                  className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-600 text-center mt-4">No todos found</p>
        )}
      </ul>
    </div>
  );
};

export default Todo;

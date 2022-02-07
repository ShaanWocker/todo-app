import Header from './components/Header';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';

function App() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todos, setTodos] = useState([]);

  let API_URL;

  if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:5000/todos/';
  } else {
    API_URL = 'https://todo-app-backend-4.herokuapp.com/todos';
  }

  // Get data from json data
  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer);
    };

    getTodos();
  }, []);

  // Fetch Todos from json server
  const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
  };

  // Add Todo
  const addTodoFunction = async (newTodo) => {
    // DB
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    const data = await res.json();

    // UI
    setTodos([...todos, data]);
  };

  // Delete Todo
  const deleteTodoFunction = async (id) => {
    // DB
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    // UI
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='App'>
      <Header title='Todo List' />

      <TodoList
        todos={todos}
        setTodos={setTodos}
        addTodoFunction={addTodoFunction}
        deleteTodoFunction={deleteTodoFunction}
        showAddTodo={showAddTodo}
        setShowAddTodo={setShowAddTodo}
      />
    </div>
  );
}

export default App;

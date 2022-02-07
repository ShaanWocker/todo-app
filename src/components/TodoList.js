import { useState } from 'react';
import Todo from './Todo';

const TodoList = ({
  todos,
  setTodos,
  addTodoFunction,
  deleteTodoFunction,
  showAddTodo,
  setShowAddTodo,
}) => {
  //Input Text State
  const [inputText, setInputText] = useState('');

  //Day State
  const [inputDay, setInputDay] = useState('');

  //Checkbox State
  const [checkbox, setCheckbox] = useState(false);

  // Add Todo
  const addTodo = () => {
    const newTodo = {
      //id: Math.floor(Math.random() * 1000) + 1,
      text: inputText,
      day: inputDay,
      reminder: checkbox,
    };

    addTodoFunction(newTodo);
  };

  // Reminder
  const onSelectReminder = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, reminder: !todo.reminder } : todo
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText === '') {
      alert('Please add something first..');
      return;
    }

    // console.log({ inputText, inputDay, checkbox });
    addTodo();

    setInputText('');
    setInputDay('');
    setCheckbox(false);
  };

  return (
    <div className='container'>
      <h3>Add a todo to your list</h3>
      <button
        className={`btn mb-3 ${showAddTodo ? 'bg-warning' : 'bg-success'}`}
        onClick={() => setShowAddTodo(!showAddTodo)}
      >
        {showAddTodo ? 'Close' : 'Add'}
      </button>

      {showAddTodo && (
        <>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Add Todos'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Add Date/Time'
              value={inputDay}
              onChange={(e) => setInputDay(e.target.value)}
            />
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              checked={checkbox}
              type='checkbox'
              value={checkbox}
              id='flexCheckDefault'
              onChange={(e) => setCheckbox(e.currentTarget.checked)}
            />
            <label className='form-check-label'>Mark as important</label>
          </div>

          <br />
          <button
            className='btn btn-block bg-dark text-light'
            type='submit'
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </>
      )}

      <p>
        <br />
      </p>

      {todos?.length > 0 ? (
        <div className='container'>
          <h3>Your Todo-List</h3>
          <hr />
          <>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodoFunction(todo.id)}
                onToggle={onSelectReminder}
              />
            ))}
          </>
        </div>
      ) : (
        <h5>Nothing to display, please add a new todo to your list..</h5>
      )}
    </div>
  );
};

export default TodoList;

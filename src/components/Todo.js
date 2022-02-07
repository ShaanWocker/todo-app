import { BsFillTrashFill } from 'react-icons/bs';

const Todo = ({ todo, onDelete, onToggle }) => {
  return (
    <div
      className={`todo ${todo.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(todo.id)}
    >
      <h5 className='todo-h1'>
        {todo.text}
        <BsFillTrashFill
          onClick={onDelete}
          style={{ cursor: 'pointer' }}
          onToggle={onToggle}
        />
      </h5>
      <p>{todo.day}</p>
    </div>
  );
};

export default Todo;

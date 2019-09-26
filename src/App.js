import React, { useState } from 'react';

function Todo({todo, index, completeTodo, deleteTodo}) {
  return <div style={{textDecoration: todo.isComplete ? 'line-through' : ''}}>
  {todo.text}
  <div>
    <button onClick={() => completeTodo(index)}>Complete</button>
    <button onClick={() => deleteTodo(index)}>x</button>
  </div>
  </div>;
}

function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  const handlerSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handlerSubmit}>
      <input
        type='text'
        value={value}
        placeholder='Add Todo...'
        onChange={e => (setValue(e.target.value))}
      />
    </form>
  )
}

export default function App() {

  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isComplete: false
    },
    {
      text: 'Learn about Hooks',
      isComplete: false
    }
  ]);

  const addTodo = text => {
    const newTodo = [...todos, {text}];
    setTodos(newTodo);
  }

  const completeTodo = index => {
    const newTodo = [...todos];
    newTodo[index].isComplete = true;
    setTodos(newTodo);
  }

  const deleteTodo = index => {
    const newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
      ))}
      <TodoForm addTodo={addTodo} />
    </div>
  );
}
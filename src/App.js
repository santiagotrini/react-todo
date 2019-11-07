import React, { useState } from 'react';
import './App.css';

// componente principal (la App)
function App() {

  // state con hooks
  // el argumento de useState es el estado inicial
  const [todos, setTodos] = useState([
    { 
      text: 'Pasear al perro', 
      isCompleted: false
    },
    { 
      text: 'Lavar la ropa', 
      isCompleted: false
    },
    { 
      text: 'Hacer las compras', 
      isCompleted: false
    }
  ]);
  
  // funciones que modifican el estado de la App
  // agregar una tarea 
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  // borrar una tarea
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  // completar una tarea (modificar isCompleted)
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  // lo que se muestra (renderiza) como JSX
  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo // aca uso otro componente que esta definido mas abajo
            key={index} 
            index={index} 
            todo={todo} 
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          /> // este componente no tiene estado, asi que recibe su estado de App como props 
          
            
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

// componente que representa una tarea (Todo)
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className='todo' style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Completado</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

// componente que representa el formulario de agregar tarea (TodoForm)
// tiene estado (el valor del input)
function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        className='input'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default App;

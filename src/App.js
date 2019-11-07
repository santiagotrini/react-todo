import React, { useState } from 'react';  // importo React y useState (hook)
import './App.css';  // un CSS para darle un poco de onda

// componente principal (la App)
function App() {

  // state con hooks
  // el argumento de useState es el estado inicial
  // el estado es el array de tareas, cada tarea es un objeto
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
  // hay que llamar setTodos con el nuevo estado al final de cada funcion
  // agregar una tarea
  // uso spread y destructuring para armar el array del nuevo estado
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  // borrar una tarea
  // splice(index, 1) borra un elemento de un array a partir de index
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
  // son dos divs anidados, el div de adentro contiene la lista de tareas y el formulario
  // que son los otros dos componentes (Todo y TodoForm)
  // uso la funcion map de arrays para crear una lista de componentes
  // el otro componente (formulario) despues de la lista de tareas
  // le paso la funcion addTodo() como props
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
// recibe props de App, un objeto todo (una tarea), el indice de map y dos funciones
// uso inline style para tachar las tareas con el operador ternario
// los dos botones usan las funciones que recibe de App
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
// tiene estado (el valor del input del formulario)
function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  // listener para cuando submiteamos el formulario (presionando enter porque no hay boton)
  const handleSubmit = e => {
    e.preventDefault();  // para no enviar el form y refrescar la pagina
    if (!value) return;  // si no hay valor en el input no agrega nada
    addTodo(value);      // cambiamos el estado de App
    setValue('');        // hacemos clear del input
  };
  // un form re simple con un solo input
  // el onChange listener actualiza el estado de este componente (TodoForm)
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

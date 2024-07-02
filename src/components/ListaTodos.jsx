import FormularioTodo from "./FormularioTodo"
import Todo from "./Todo"
import { useState, useEffect } from 'react'

const ListaTodos = () => {

  const metodo = () => {
    console.log("Hola")
  }

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('tareasTodo')) || []
  )

  const saveLocalTodos = (save) => {
    localStorage.setItem('tareasTodo', JSON.stringify(save))
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const construirTodo = (todo) => {
    if(todo === '') return
    const newTodo = {
      id: new Date().getTime(),
      text: todo, 
      completada: false
    }
    setTodos([ newTodo, ...todos ])
  }

  const completarTarea = id => {
    const tareasActualizadas = todos.map(todo => {
      if (todo.id === id) {
        todo.completada = !todo.completada;
      }
      return todo;
    });
    setTodos(tareasActualizadas);
  }

  const updateTodo = (id, updatedText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.text = updatedText;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    saveLocalTodos(todos)
  }, [todos])

  return (
    <div>
      <FormularioTodo construirTodo={construirTodo} />
      <div className='Lista de tareas'>
        {todos.map((todo) => (
          <Todo 
            todo={todo} 
            key={todo.id} 
            completada={todo.completada} 
            completarTarea={completarTarea} 
            onDelete={handleDelete} 
            updateTodo={updateTodo}
            />
        ))}
      </div>
    </div>
  )
}

export default ListaTodos
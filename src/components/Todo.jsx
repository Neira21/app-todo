import { useState } from "react"
import PropTypes from 'prop-types'


const Todo = ({todo, onDelete, completada, completarTarea, updateTodo }) => {
  
  Todo.propTypes = {
    todo: PropTypes.shape({
      completada: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    completarTarea: PropTypes.func.isRequired,
    completada: PropTypes.bool.isRequired,
    updateTodo: PropTypes.func,
  };

  const [newTodo, setNewTodo] = useState(todo.text)
  const [edit, setEdit] = useState(false)

  const handleChangeInput = (e) =>{
    setNewTodo(e.target.value)
  }

  const handleEdit = () => {
    console.log("nuevo", todo)
    setEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateTodo(todo.id, newTodo);
    setEdit(false);
  };


  return (
    <div className="todoContainer">
      {edit 
        ?
          <div>
            <form onSubmit={handleSave}>
              <input type="text" 
                value={newTodo} 
                className="formularioTodo-input" 
                onChange={handleChangeInput}
                /> 
              <button className="boton boton-editar">Guardar</button>
            </form>
            
          </div>
        : <div className="containerElement">
            <div
              onClick={() => completarTarea(todo.id)}
              className={completada ? 'todo completada' : 'todo'}
            >
              <p>{todo.text} {!todo.completada && '👈' }</p>
            </div>
            <div className="botones">
              <button className="boton boton-editar" onClick={handleEdit}> Editar </button>
              <button className="boton boton-borrar" onClick={()=>onDelete(todo.id)} > Borrar </button>
            </div>
          </div>
      }
    </div>
  )
}

export default Todo
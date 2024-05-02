import React from 'react'
import './TodoSection.css'
const TodoSection = ({todo, handleCompleted,completedTodos,todos}) => {
  return (
    <div className='todo'>
        <div className="todoCircle">
        </div>
        
        <p className={`todoTitle ${completedTodos.includes(todo)?'striked':''}`} onClick={()=>handleCompleted(todo)}>{todo}</p>
      
    </div>
  )
}

export default TodoSection

import React, { useState,useEffect, act } from 'react'
import './Todo.css'



const Todo = () => {
const [text,setText] = useState('')
const [todos,setTodos]  = useState([])
const [completedTodos,setCompletedTodos] = useState([])
const [activeTodos,setActiveTodos] = useState([])
const [arrayToDisplay,setArrayToDispay] = useState()
const [mode,setMode]= useState('light')

useEffect(()=>{
   setActiveTodos(todos.filter(todo=> !completedTodos.includes(todo)))
   setArrayToDispay([...todos])

},[todos,completedTodos])
  
   
   const handleSubmit =(e)=>{
    e.preventDefault();
    setTodos([...todos,text])
    setText('')
   }

   const handleDelete=(i)=>{
    setTodos(todos.filter((_,index)=>{
        return index !==i


   }))
   }
const handleCompletedTodos = (t)=>{
    if(completedTodos.includes(t)){
        setCompletedTodos(completedTodos.filter(todo=>todo !== t))
    }else{
        setCompletedTodos([...completedTodos,t])
    }

    console.log(completedTodos)
    console.log(activeTodos)
}
   
const clearCompletedTodos =()=>{
    setTodos(todos.filter(todo=>!completedTodos.includes(todo)))
    setCompletedTodos([])
}
 
console.log(arrayToDisplay)
  const toggleMode = ()=>{
    if(mode === 'light'){
        setMode('dark')
    }else if(mode === 'dark'){
        setMode('light')
    }

  }
  return (
    <div className={`container ${mode === 'light'?'lightMode':'darkMode'}`}>
         <h3 className='modeBtn' onClick={toggleMode}>changemode {mode}</h3>
        <form onSubmit={handleSubmit}>
        <input type="text"  value={text} onChange={(e)=>setText(e.target.value)}/>
        </form>
        {arrayToDisplay?.map((todo,index)=>{
            
             return<div className='container' key={index} style={{background:'green',margin:'12px',display:'flex',justifyContent:'space-between',height:'60px'}} >
                <div style={{height:'22px',width:'22px',background:'black'}}  onClick={()=>handleCompletedTodos(todo)}><div className={completedTodos.includes(todo)?'showcheck':'hidecheck'}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></div></div>
                <div style={{background:'grey'}}  className={completedTodos.includes(todo)?'striked':''} onClick={()=>handleCompletedTodos(todo)}>{todo}</div>
                <p className={`hide`} onClick={()=>handleDelete(index)}>x</p>
            </div>
})}

       <div className="footer">
        <h3>{activeTodos.length} items left</h3>
        <p onClick={()=>setArrayToDispay([...todos])}>All</p>
        <p onClick={()=>setArrayToDispay([...activeTodos])}>Active</p>
        <p onClick={()=>setArrayToDispay([...completedTodos])}>Completed</p>
        <p onClick={clearCompletedTodos}>clear completed</p>
        </div> 

        <div className='border'>
        <h2>completed  todos</h2>
            {completedTodos.map(item=>{
            return<div>{item}</div>
            })}</div>
        <div className='border'>
            <h2>active todos</h2>
            {activeTodos.map(item=>{
            return<div>{item}</div>
            })}</div>
        
    </div>
  )
}

export default Todo

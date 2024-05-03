import React, { act, useEffect, useState } from 'react'
import './TodoApp.css'
import TodoSection from './TodoSection';


const TodoApp = ()=>{

    const [text,setText ] = useState('')
    const [todos,setTodos]  = useState([])
    const [completedTodos,setCompletedTodos] = useState([])
    const [activeTodos , setActiveTodos ] = useState([])
    const [displayTodo,setdisplayTodo ] = useState([...todos])
    const [mode , setMode ] = useState('dark')



    useEffect(()=>{
        setActiveTodos(todos.filter(todo=> !completedTodos.includes(todo)))
        setdisplayTodo([...todos])
        console.log(activeTodos)
},[completedTodos,todos])


    const handleSubmit =(e)=>{
        e.preventDefault()
        if(text !== ''){
        setTodos([...todos,text])
        }else{
            return
        }
        setText('')
    }
    const handleCompleted = (todo)=>{
        if(completedTodos.includes(todo)){
            setCompletedTodos(completedTodos.filter(todos=> todos !== todo))
        }else{
            setCompletedTodos([...completedTodos,todo])
        }

    }
    const handleClear  = ()=>{
        setCompletedTodos([])
        setTodos(todos.filter(todo=>!completedTodos.includes(todo)))
    }
    const handleDelete =(t)=>{
        setTodos(todos.filter(todo=> todo !== t))
        setActiveTodos(activeTodos.filter(todo=>todo !== t))
        setCompletedTodos(completedTodos.filter(todo=>todo !== t))

    }
    const toggleMode  = ()=>{

        setMode(mode === 'dark'?'light':'dark')
        console.log(mode)

    }
    return (
        <div className={`body ${mode === 'light'?'bodyLight':''}`}> 
    <div className={`todoContainer ${mode === 'light'?'bgLight':''}`}>
        <div className="header">
            <div className="title"><p>TODO</p></div>
            <div className="modeToggleBtn" onClick={toggleMode}>{mode === 'dark'?<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>}</div>

        </div>
        <div className="levelTwoContainer">
            <form onSubmit={handleSubmit}>
            <div className="inputfield">
            <div className='placeHolderCirlce'></div>
            <input type="text" className={mode==='light'?'inputLight':''}  placeholder='Create a new todo...' value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            
            </form>

           <div className="todoSection">
            <div className={`todosList ${mode === 'light'?'todosListLight':''}`}>
                {displayTodo.map((todo,index)=>{
                    return <div className='todo' id={mode === 'light'?'todoLight':''}>
                    <div className={`todoCircle ${completedTodos.includes(todo)?'checked':''}`}>
                        <p className={`tick ${completedTodos.includes(todo)?'showTick':'hideTick'}`} onClick={()=>handleCompleted(todo)}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></p>
                    </div>
                    
                    <div className='todoTitleContainer'><p className={`todoTitle ${completedTodos.includes(todo)?'striked':''} `} id={mode === 'light'?'todoTitleLight':''} onClick={()=>handleCompleted(todo)}>{todo}</p></div>

                    <div className="cross" ><div onClick={()=>handleDelete(todo)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path  fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></div></div>
                  
                </div>
})}
            </div>
           
           <div className={`footter ${mode==='light'?'footterLight':''}`}>
                <div className="itemsLeft"><p>{`${activeTodos.length} ${activeTodos.length>1?'Items':'Item'} left`}</p></div>
               <div className="footerNavsDesktop">
               <div className="footerNavs">
                    <p onClick={()=>setdisplayTodo([...todos])}>All</p>
                    <p onClick={()=>setdisplayTodo([...activeTodos])}>Active</p>
                    <p onClick={()=>setdisplayTodo([...completedTodos])}>Completed</p>
                </div>
               </div>
                <div className="clearBtn">
                    <p onClick={handleClear}>Clear Completed</p>
                </div>

            </div>
            <div className="footerNavsMobile hideNav" id={mode === 'light'?'footerNavsMobileLight':''}>
            <div className="footerNavs">
                    <p onClick={()=>setdisplayTodo([...todos])}>All</p>
                    <p onClick={()=>setdisplayTodo([...activeTodos])}>Active</p>
                    <p onClick={()=>setdisplayTodo([...completedTodos])}>Completed</p>
                </div>

            </div>
            
           </div>
           
            
        </div>
        
    </div>
    </div>
    )
}

export default TodoApp;
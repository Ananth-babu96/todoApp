import React, { useEffect, useState } from "react";
import "./TodoApp.scss";

import sun from "../data/images/icon-sun.svg";
import moon from "../data/images/icon-moon.svg";
import cross from "../data/images/icon-cross.svg";
const TodoApp = () => {
   const [todos, setTodo] = useState([]);
   const [completed, setCompleted] = useState([]);
   const [active, setActive] = useState([]);
   const [currentList, setCurrentList] = useState([todos]);
   const [text, setText] = useState("");
   const [index, setIndex] = useState(0);
   const [mode, setMode] = useState("dark");

   useEffect(() => {
      const newArr = todos.filter(
         (obj1) => !completed.some((obj2) => obj2.id === obj1.id)
      );

      setActive(newArr);
   }, [todos, completed]);
   useEffect(() => {
      setCurrentList(todos);
   }, [todos, active, completed]);
   const addTodo = (e) => {
      e.preventDefault();

      if (text !== "") {
         setTodo([...todos, { id: index, todo: text }]);
         setIndex((prev) => prev + 1);
         setText("");
      } else return;
   };
   const addCompleted = (todo) => {
      const find_item = completed.find((item) => item.id === todo.id);

      if (find_item) setCompleted(completed.filter((item) => item !== todo));
      else setCompleted([...completed, todo]);
   };
   const deleteTodo = (todoo, index) => {
      setTodo(todos.filter((todo) => todo.id !== todoo.id));
   };

   const clearCompleted = () => {
      setTodo(
         todos.filter((obj1) => !completed.some((obj2) => obj2.id === obj1.id))
      );
      setCompleted([]);
   };

   const toggleMode = () => {
      setMode(mode === "dark" ? "light" : "dark");
      console.log(mode);
   };
   return (
      <section className={`todo-app ${mode === "light" ? "light-mode" : ""}`}>
         <div
            className={`todo-app__bg ${
               mode === "light" ? "light-mode-bg" : ""
            }`}
         ></div>
         <main
            className={`todo-app__main ${
               mode === "light" ? "light-mode-main" : ""
            }`}
         >
            <div className="todo-app__main--title">
               <h1>TODO</h1>
               <div className="icon" onClick={toggleMode}>
                  <img src={mode === "dark" ? sun : moon} alt="" />
               </div>
            </div>
            <form className="todo-app__main--input" onSubmit={addTodo}>
               <div className="circle"></div>
               <input
                  type="text"
                  name=""
                  id=""
                  value={text}
                  onChange={(e) => setText(e.target.value)}
               />
            </form>
            <div className="todo-app__main--list">
               {currentList.map((todo, index) => {
                  return (
                     <div
                        className={`todo ${
                           completed.find((item) => item.id === todo.id)
                              ? "completed"
                              : ""
                        }`}
                        key={index}
                        onClick={() => addCompleted(todo)}
                     >
                        <div className="circle"></div>
                        <p>{todo.todo}</p>
                        <div
                           className="cross"
                           onClick={() => deleteTodo(todo, index)}
                        >
                           <img src={cross} alt="" />
                        </div>
                     </div>
                  );
               })}
               <div className="list-details">
                  <div className="left">
                     <p>{active.length} items left</p>
                  </div>
                  <div className="middle">
                     <p onClick={() => setCurrentList(todos)}>All</p>
                     <p onClick={() => setCurrentList(active)}>Active</p>
                     <p onClick={() => setCurrentList(completed)}>Completed</p>
                  </div>
                  <div className="right">
                     <p onClick={clearCompleted}>Clear Completed</p>
                  </div>
               </div>
            </div>
            <div className="middle-bottom">
               <p onClick={() => setCurrentList(todos)}>All</p>
               <p onClick={() => setCurrentList(active)}>Active</p>
               <p onClick={() => setCurrentList(completed)}>Completed</p>
            </div>
         </main>
      </section>
   );
};

export default TodoApp;

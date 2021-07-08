import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todosApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storeTodos) setTodos(storeTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
      const newTodos = [...todos]
      const todo = newTodos.find( todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(preTodos => {
      return [...preTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Completly</button>
      <div>{todos.filter(todo => !todo.complete).length} left</div>
    </>
  );
}

export default App;

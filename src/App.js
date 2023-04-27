import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [del, setDel] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle]=useState("")
  const [date, setDate]=useState("")
  const [category, setCategory]=useState("")
  console.log(title, date, category)
  useEffect(() => {
    fetch("http://localhost:3000/todolist")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTodo(data);
      });
  }, [del]);

  const deleteItem = () => {
    setDel((del) => !del);
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/todolist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    deleteItem();
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/todolist',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title, 
        date,
        category
      })
    })
    deleteItem()
  }

  return (
    <div className="App">
      <div className="flex items-center justify-between w-1/2 m-auto">
        <h1 className="text-3xl pt-10">Todo App</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-3 rounded"
        >
          Add Todo
        </button>
      </div>
      {open ? (
        <div className="w-2/3 m-auto mt-10 mb-10">
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" />
            <label>Category</label>

            <input onChange={(e)=>setCategory(e.target.value)} type="text" placeholder="Category" />
            <label>Date of todo</label>

            <input onChange={(e)=>setDate(e.target.value)} type="text" placeholder="Date" />
            <input
              className="bg-blue-600 text-white rounded p-3"
              type="submit"
            />
          </form>
        </div>
      ) : null}
      {todo.map((todo) => (
        <div className="flex justify-center">
          <div className="border w-1/2 m-6 flex h-24 justify-between py-6">
            <h1>{todo.title}</h1>
            <h2>{todo.category}</h2>
            <p>{todo.date}</p>
            <button
              className="bg-blue-700 text-white p-3 rounded hover:bg-blue-400"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

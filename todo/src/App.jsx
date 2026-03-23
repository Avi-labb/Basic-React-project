


import React, { useEffect, useState } from 'react'

const App = () => {
  const [task, settask] = useState(' ')
  const [mode, setmode] = useState(false)
  const [todos, settodos] = useState([])
  const [date, setdate] = useState('')
  const [edit, setedit] = useState(null)
  const [search, setsearch] = useState("")

  const [filter, setfilter] = useState("all")
  const Addtodo = (e) => {
    e.preventDefault()
    if (task.trim() === "") return
    if (todos.some(todo => todo.content === task)) {
      settask('')
      return alert('task already exist')
    }
    if (edit !== null) {
      const updateTodo = todos.map((todo) =>
        todo.id === edit ? { ...todo, content: task } : todo
      )

      settodos(updateTodo)
      setedit(null)
      settask("")
      return
    }


    const newTodo = {
      id: todos.length + 1,
      content: task,
      checked: false
    }
    settodos([...todos, newTodo])
    settask('')

  }
//   setLocalStorage(task)
  const Deletehandle = (id) => {
    settodos(todos.filter(todos => todos.id !== id))

  }

  const filteredTodos = todos.filter((todo) => {

    const matchSearch=todo.content
      .toLowerCase()
      .includes(search.toLowerCase())


    if (filter === "completed") return todo.checked && matchSearch
    if (filter === "pending") return !todo.checked && matchSearch
    return matchSearch
  })

  const EditHandler = (id) => {
    const data = todos.find((todo) => todo.id === id)
    settask(data.content)
    setedit(id)

  }


  const completehandler = (id) => {
    const updatetodo = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )
    settodos(updatetodo)

  }

  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date()
      const TodaysDate = now.toLocaleDateString()
      const Timing = now.toLocaleTimeString()
      setdate(`${TodaysDate}-${Timing}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center  bg-zinc-100 p-15'>
      <div className='w-full text-black max-w-[550px] rounded-2xl bg-white/90 p-8 backdrop-blur-md shadow-xl'>


        <div className='flex font-bold mb-4 font-serif gap-5 text-center justify-between text-2xl '>
          <h1>My Tasks</h1>
          <div>
            <h1 className='text-sm font-normal'>{date}</h1>
          </div>
          <div className=''>
            <div
              onClick={() => setmode((prev) => !prev)}
              className=' bg-zinc-300 w-18  h-9 rounded-xl flex items-center justify-start px-2'>
              <div

                className={`${mode ? "bg-green-500 translate-x-8" : "bg-red-500 translate-x-0"}  rounded-full h-6 w-6 flex items-center justify-center transition-all duration-500 `}><span className='text-white text-[8px]'>{mode ? "On" : "OFF"}</span></div>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-2 items-center mt-3 mb-2'>
          <input type="text"
            onChange={(e)=>setsearch(e.target.value)}
            className=' w-full border border-border rounded-lg py-2  px-4 outline-none '
            placeholder='🔎 Search task..'
          />
          {mode && <form
            className='flex w-full gap-2  '>
            <input
              value={task}
              onChange={(e) => settask(e.target.value)}
              className=' w-full border border-border rounded-lg py-2 outline-none px-4 '
              type="text" placeholder='Enter task...' />
            <button
              onClick={Addtodo}
              className=' bg-black text-white rounded-lg py-2 px-5 cursor-pointer'
            >Add</button>
          </form>}
        </div>

        <div className='flex mt-4 gap-5 justify-center'><button
          onClick={() => setfilter("all")}
          className={`${filter === "all" ? "bg-blue-500" : "bg-zinc-500"} text-white rounded-lg py-2 px-5`}
        >
          ALL
        </button>

          <button
            onClick={() => setfilter("completed")}
            className={`${filter === "completed" ? "bg-green-500" : "bg-zinc-500"} text-white rounded-lg py-2 px-5`}
          >
            Completed
          </button>

          <button
            onClick={() => setfilter("pending")}
            className={`${filter === "pending" ? "bg-red-500" : "bg-zinc-500"} text-white rounded-lg py-2 px-5`}
          >
            Pending
          </button>
        </div>
        <hr className='mt-4' />
        <div className='mt-4'>
          <ul className='flex flex-col gap-2'>
            
            {filteredTodos.length === 0 ? (<p className='text-center text-lg text-serif text-red-300'>There is no task Available</p>) :
              (filteredTodos.map((todo, idx) => {

                return <li key={idx} className='border border-zinc-400 rounded-md px-2 py-2 flex items-center justify-between'>
                  <div
                    onClick={() => completehandler(todo.id)}
                    className='flex items-center justify-center gap-5' >
                    <input
                    checked={todo.checked}
                      type="checkbox"
                      readOnly
                      name="" id="" />
                    <h1 className={`text-lg text-zinc-700 font-semibold ${todo.checked ? "line-through" : ""}`}>{todo.content}</h1></div>
                  <div className='flex gap-3 '>
                    <button
                      onClick={() => EditHandler(todo.id)}
                      className='text-sm font-semibold text-blue-500 px-2 cursor-pointer py-1 border rounded-lg border-blue-300'>Edit</button>
                    <button
                      onClick={() => Deletehandle(todo.id)}
                      className='text-sm font-semibold text-red-500  cursor-pointer border rounded-lg px-2 py-1 border-red-300'>Delete</button>
                  </div>
                </li>


              })
              )}

          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
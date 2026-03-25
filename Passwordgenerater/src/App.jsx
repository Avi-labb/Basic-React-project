import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length,setlength]=useState(8)
  const [numallow,setnum]=useState(false)
  const [charallo,setchar]=useState(false)
  const [password,setpassword]=useState("")

  const passref= useRef(null)


  const passgenerator=useCallback(()=>{
   let pass=""
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallow) str+="0123456789"
    if(charallo) str+="@#$&*"

    for (let i=1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1)

      pass+=str.charAt(char)
    }
      setpassword(pass)

  },[length,numallow,charallo,setpassword])


  const copyclipboard = useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passgenerator()
  },[length,numallow,charallo,passgenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-5 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3 bg-amber-50'
        placeholder='password'
        readOnly
        ref={passref}
        />
        <button onClick={copyclipboard} className='shrink-0 outlline-none bg-blue-700 text-white px-3 py-0.5 '>Copy</button>
      </div>

      <div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numallow}
          id='numberInput'
          onChange={()=>setnum((prev)=>!prev)}
          />
          <label>Numbers</label>
          </div>
          <div className='flex item-center gap-x-2'>
            <input
            type='checkbox'
            defaultChecked={charallo}
            onChange={()=>setchar((prev)=>!prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

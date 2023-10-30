import React from 'react'
import {Link} from "react-router-dom"

export default function SingnUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='p-3 text-3xl text-center font-semibold text-white'>Sign Up</h1>
      <form className='flex flex-col gap-4' >
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-950 p-3 rounded-lg hover:opacity-80 text-white'>Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className='text-white'>Have an account?</p>
        <Link to={"/sign-in"}>
            <span className='text-red-700 font font-bold'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

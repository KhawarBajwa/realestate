import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { signInFailure, signInSuccess} from "../redux/user/userSlice.js"
import OAuth from "../components/OAuth.jsx";

export default function SingnIn() {
  const [formData, setFormData] = useState({});
  const { error } = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return;
      } 
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="p-3 text-3xl text-center font-semibold text-white">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-950 p-3 rounded-lg hover:opacity-80 text-white">
          Sign In
        </button>
        <OAuth/>
      </form>
      
      <div className="flex gap-2 mt-5">
        <p className="text-white">Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-red-700 font font-bold">Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-700 font font-bold'>{error}</p>}
    </div>
  );
}

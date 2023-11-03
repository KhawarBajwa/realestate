import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SingnUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setError(data.message)
        return;
      } 
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setError(error.message)
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="p-3 text-3xl text-center font-semibold text-white">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
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
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-white">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-red-700 font font-bold">Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-700 font font-bold'>{error}</p>}
    </div>
  );
}

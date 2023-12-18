import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7 text-white'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <img src={currentUser.avatar} alt="" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
      <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg'/>
      <input type="text" placeholder='email' id='email' className='border p-3 rounded-lg'/>
      <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg'/>
      <button className="bg-slate-950 hover:opacity-80 rounded-lg text-white p-3">Update</button>
      <button className="bg-red-700 hover:opacity-80 rounded-lg text-white p-3">Create Listing</button>
    </form>
    <div className="flex justify-between mt-3">
      <span className="text-red-700 font font-bold cursor-pointer">Delete Account</span>
      <span className="text-red-700 font font-bold cursor-pointer">Logout</span>
    </div>
    </div>
  )
}

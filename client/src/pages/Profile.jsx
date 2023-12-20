import { useSelector } from "react-redux";
import {useEffect, useRef, useState} from "react"
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from "firebase/storage"
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null)
  const [file , setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
 

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload=(file)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable( storageRef, file)
    
    uploadTask.on('state_changed', (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress))
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>{
          setFormData({...formData, avatar : downloadURL})
        }
      )
    }
    )
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-white">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e)=>{
          setFile(e.target.files[0])
        }} type="file" ref={fileRef} hidden accept="images/*"/>
        <img
          onClick={()=>{
            fileRef.current.click()
          }}
          src={formData.avatar || currentUser.avatar}
          alt=""
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          
        />
        <p className="self-center">
          {fileUploadError ? (
          <span className="text-white"> Error Image Upload </span>
          ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-white">
            {`Uploading ${filePerc}%`}
          </span>
          ) : filePerc === 100 ? (
            <span className="text-white"> Successfully Uploaded!</span> 
          ) : (
            " "
          )
        }
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-950 hover:opacity-80 rounded-lg text-white p-3">
          Update
        </button>
        <button className="bg-red-700 hover:opacity-80 rounded-lg text-white p-3">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 font font-bold cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 font font-bold cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
}

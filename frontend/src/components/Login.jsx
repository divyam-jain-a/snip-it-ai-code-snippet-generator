import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import img from '../img/snipIt.png';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/auth/login", { email, password }).then(response => {
            // console.log(response)
            if (response.data.status) {
                window.localStorage.setItem("id", response.data.id);
                navigate('/snippet');
            }
            else alert("Try again")
        }).catch(err => {
            alert(err)
            console.log(err);
        })
    }
    return (
        <div className="min-h-screen bg-gray-200 flex justify-center items-center">
            <div className='bg-customgreen h-screen w-1/2'></div>
            <div className='bg-black h-screen w-1/2'></div>
            <div className=" bg-customblack border-2 border-[#3e3e3e] p-8 rounded-xl text-white shadow-md w-96 absolute">
                <div className="flex items-center justify-center mb-8">
                    <img src={img} alt="Description of your image" className="w-auto h-12 mr-1" />
                    <h1 className="text-2xl font-bold tracking-wide text-customwhite font-sans">SNIP.AI</h1>
                </div>
                <form onSubmit={submitHandler}>
                    <input type="email"
                        className="w-full h-full mb-2 bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-customgreen cursor-pointer transition focus:outline-none focus:shadow-outline"
                        onChange={(e) => setEmail(e.target.value)} placeholder='Enter e-mail' required /><br />
                    <input type="password"
                        className="w-full h-full mb-4 bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-customgreen cursor-pointer transition focus:outline-none focus:shadow-outline"
                        onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' required /><br />
                    <button type='submit'
                        className="bg-customgreen w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    >Login</button>
                    <p className='text-sm mt-2'>Don't have account? <Link className=' text-customgreen font-medium' to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
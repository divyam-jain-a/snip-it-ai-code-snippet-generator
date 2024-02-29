import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../img/snipIt.png';
import snips from '../img/file.png';
import logout from '../img/exit.png';
import login from '../img/user-interface.png';
import home from '../img/homee.png';


const NavBar = (props) => {
    const [islogged, setIslogged] = useState(false);
    const [onSnippetPage, setOnSnippetPage] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:5000/auth/verify').then(res => {
            if (res.data.status) {
                setIslogged(true)
                setOnSnippetPage(props.status);
            }
        })
    }, [])

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const logoutHandler = () => {
        axios.get('http://localhost:5000/auth/logout').then(res => {
            if (res.data.status) {
                navigate('/login');
            }
        }).catch(err => {
            alert(err)
            console.log(err);
        })
    }

    return (
        <nav className=" bg-black shadow-md text-white p-5 flex justify-between items-center">
            <div className="flex items-center ml-10">
                <img src={img} alt="Description of your image" className="w-auto h-12 mr-2 mt-1" />
                <h1 className="text-xl font-extrabold tracking-wide text-customwhite font-sans">SNIP<a className='text-customgreen'>.AI</a></h1>
            </div>
            <div className="flex items-center">{
                islogged && <>
                    {onSnippetPage &&
                        <button className="flex justify-center px-3 py-2 mr-4 bg-black border-2 border-[#3e3e3ebe] rounded-lg text-customgreen font-semibold text-base hover:border-customgreen cursor-pointer transition">
                            <img className='w-auto h-4 mt-1 mr-2' src={snips} />
                            <Link to="/all-snippets">
                                Snippets</Link></button>
                    }
                    {!onSnippetPage &&
                        <button className="flex justify-center px-3 py-2 mr-4 bg-black border-2 border-[#3e3e3ebe] rounded-lg text-customgreen font-semibold text-base hover:border-customgreen cursor-pointer transition">
                            <img className='w-auto h-4 mt-1 mr-2' src={home} />
                            <Link to="/snippet">
                                Home</Link></button>
                    }
                    <button className="flex justify-center px-4 py-2 mr-4 bg-black border-2 border-[#3e3e3ebe] rounded-lg text-customgreen font-semibold text-base hover:border-customgreen cursor-pointer transition" onClick={logoutHandler}>
                        <img className='w-auto h-4 mt-1 mr-2' src={logout} />
                        <p>Logout</p></button>
                </>
            }
                {!islogged && <button className="flex justify-center px-4 py-2 mr-4  bg-black border-[#3e3e3e5f] border-2 rounded-lg text-customgreen font-semibold text-base hover:border-customgreen cursor-pointer transition">
                    <img className='w-auto h-6 mr-2' src={login} />
                    <Link to="/login">Login</Link></button>}
            </div>
        </nav>
    )
}

export default NavBar
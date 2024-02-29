import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NavBar from './NavBar';
import LoadingsScreen from './LoadingsScreen';
import tick from '../img/basic-tick.png';
import copy from '../img/copy.png';

const AllSnippets = () => {
    const [snippets, setSnippets] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [islogged, setIslogged] = useState(false);
    const userId = window.localStorage.getItem("id");

    useEffect(() => {
        const fetchSnippets = async () => {
            setLoading(true);
            setTimeout(async () => {
                try {
                    console.log(window.localStorage.getItem("id"));
                    const response = await axios.get(`http://localhost:5000/snippet/all-snippets/${userId}`);
                    setSnippets(response.data);
                    console.log(response.data)
                } catch (err) {
                    alert(err);
                    console.log(err);
                }
                setLoading(false);
            }, 1500);


        }
        fetchSnippets();
    }, [userId]);

    useEffect(() => {
        axios.get('http://localhost:5000/auth/verify').then(res => {
            if (res.data.status) {
                setIslogged(true)
            }
        })
    }, [])
    return (
        <>
            <div className='h-auto min-h-screen w-screen bg-black'>
                {loading && <LoadingsScreen />}
                <NavBar status={false} />
                {islogged &&
                    <div className='flex flex-col justify-center items-center text-2xl font-bold text-customwhite shadow-white'><h3 className='w-screen pt-4 pb-4 mt-0.5 bg-customblack flex justify-center border-2 border-[#3e3e3e5f] tracking-widest font-black'>
                        <p>SNIPPETS
                            <a className='border-2 border-[#3e3e3e5f] p-1.5 rounded-lg text-xl ml-4 font-bold font-mono tracking-wider'>{snippets.length}</a></p> </h3>
                        <div className='flex flex-wrap justify-center items-center overflow-y-auto w-5/6 '>
                            {snippets.slice().reverse().map((s) => (
                                <>
                                    <div className="w-2/3 mr-2 pb-10 pt-5 pl-10 pr-10 mt-8 text-white px-6 py-3 text-base overflow-auto">
                                        <div className='flex flex-row justify-between items-center mb-2'>
                                            <h3 className='text-xl font-bold mb-2'>{s.title}: {s.language}</h3>
                                            <CopyToClipboard text={s.snippet} onCopy={(result) => {
                                                setCopySuccess(result);
                                                setTimeout(() => {
                                                    setCopySuccess(false);
                                                }, 1000);
                                            }}>
                                                <button className="h-8 p-2 bg-black border-[#3e3e3e5f] border rounded-lg text-customgreen font-semibold text-base hover:border-customgreen cursor-pointer transition">
                                                    {copySuccess === s.snippet ? <img className=' h-full bg-black  text-customgreen font-semibold text-base' src={tick} /> :
                                                        <img className='h-full bg-black  text-customgreen font-semibold text-base' src={copy} />}</button>
                                            </CopyToClipboard>
                                        </div>

                                        <pre className="p-4 rounded-lg text-sm font-normal overflow-auto bg-customblack border-2 border-[#3e3e3e5f] text-customwhite px-6 py-3">
                                            <code>{s.snippet}</code>
                                        </pre>

                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                }
                {!islogged &&
                    <div className=' mt-20 flex justify-center'>
                        <pre className="bg-[#292929]  border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base cursor-pointer transition overflow-auto">
                            <code>// Please login or create an account;</code>
                        </pre>
                    </div>
                }
            </div>
        </>
    )
}

export default AllSnippets
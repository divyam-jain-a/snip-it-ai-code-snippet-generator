import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NavBar from './NavBar';
import tick from '../img/basic-tick.png';
import copy from '../img/copy.png';

const AllSnippets = () => {
    const [snippets, setSnippets] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);
    const userId = window.localStorage.getItem("id");

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                console.log(window.localStorage.getItem("id"));
                const response = await axios.get(`http://localhost:5000/snippet/all-snippets/${userId}`);
                setSnippets(response.data);
                console.log(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchSnippets();
    }, [userId]);

    return (
        <>
            <div className='h-auto min-h-screen w-screen bg-customblack'>
                <NavBar />
                <div className='flex flex-col justify-center items-center ml-4 mt-6 text-2xl font-bold text-customwhite shadow-white'><h3 className='drop-shadow-[3px_4px_var(--tw-shadow-color)] shadow-black'>All Snippets ({snippets.length})</h3>
                    <div className='flex flex-wrap justify-center items-center overflow-y-auto w-5/6 '>
                        {snippets.slice().reverse().map((s) => (
                            <>
                                <div className="w-2/3 mr-2 pb-10 pt-5 pl-10 pr-10 shadow-md mt-8 bg-black border-2 border-[#3e3e3e] rounded-2xl text-white px-6 py-3 text-base overflow-auto">
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

                                    <pre className="p-4 rounded-2xl text-sm font-normal overflow-auto bg-customblack border-2 border-[#3e3e3e5f] text-customwhite px-6 py-3">
                                        <code>{s.snippet}</code>
                                    </pre>

                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllSnippets
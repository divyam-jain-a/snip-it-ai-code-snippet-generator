import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NavBar from './NavBar';
import enter1 from '../img/next1.png';
import enter2 from '../img/next2.png';
import tick from '../img/basic-tick.png';
import copy from '../img/copy.png';

const Snippet = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyC47Erq2umFB5ssXwgjIND_S0U5cjeJK04');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const [islogged, setIslogged] = useState(false);
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("");
    const [aiResponse, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [welcomeText, setWelcomeText] = useState(true);
    const [displayText, setDisplayText] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [index, setIndex] = useState(0);
    const [copySuccess, setCopySuccess] = useState(false);
    const [snippet, setSnippet] = useState({
        title: "",
        language: "",
        answer: "",
        userId: window.localStorage.getItem("id"),
    });

    useEffect(() => {
        axios.get('http://localhost:5000/auth/verify').then(res => {
            if (res.data.status) {
                setIslogged(true)
            }
        })
    }, [])


    useEffect(() => {
        const interval = setInterval(() => {
            if (index <= aiResponse.length) {
                setDisplayText(aiResponse.substring(0, index));
                setIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(interval);
            }
        }, 5);

        return () => clearInterval(interval);
    }, [index, aiResponse]);

    axios.defaults.withCredentials = true;

    const aiRun = async () => {
        console.log(window.localStorage.getItem("id"));
        const prompt = `You are a technical expert and only answer technical questions related to code.
         Write me a code snippet of: ${search} in ${language} language in minimum lines
          and if the question is not technical and cannot have snippet give answer accordingly`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        axios.post('http://localhost:5000/snippet/add-snippet', { ...snippet, answer: text }).then(response => {
            console.log(response.data);

        }).catch(err => console.log(err))
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setSnippet({ ...snippet, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await aiRun();
        setWelcomeText(false);
        setIsLoading(false);
        e.target.reset();
    }
    return (
        <div className='h-screen w-screen bg-customblack'>
            <NavBar status={true} />
            <div className="h-5/6 mt-4 flex flex-col justify-center items-center">
                <div className="h-full w-3/4">
                    {/* Text Div */}
                    <div className=" h-5/6 flex flex-col justify-center items-center">
                        <div className='h-5/6 w-2/3 pr-1 overflow-auto'>
                            {isLoading && (
                                <div className="flex justify-center">
                                    <div className=" animate-ping duration-1000 h-3 w-3 mt-1 rounded-full bg-customgreen"></div>
                                </div>
                            )}
                            {!isLoading &&
                                <pre className="bg-[#292929]  border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base cursor-pointer transition overflow-auto">
                                    {!welcomeText &&
                                        <CopyToClipboard text={aiResponse} onCopy={(result) => {
                                            setCopySuccess(result);
                                            setTimeout(() => {
                                                setCopySuccess(false);
                                            }, 1000);
                                        }}>
                                            <div className="flex justify-end">
                                                <button className="h-8 p-2 absolute bg-[#181818] border-[#3e3e3e] border-2 rounded-lg text-customgreen font-semibold text-base hover:border-customgreen cursor-pointer transition">
                                                    {copySuccess === aiResponse ? <img className=' h-full bg-[#181818]  text-customgreen font-semibold text-base' src={tick} /> :
                                                        <img className='h-full bg-[#181818] text-customgreen font-semibold text-base' src={copy} />}</button>
                                            </div>
                                        </CopyToClipboard>
                                    }
                                    <code>{welcomeText && <>// Hey Coder, let's get started !!</>}{displayText}</code>
                                </pre>
                            }
                        </div>
                    </div>
                    {islogged &&
                        <form onSubmit={submitHandler} className="flex flex-row justify-center h-1/6 p-6 ml-8">
                            <div className="mr-2 w-3/4">
                                <input
                                    type="text" name='search' onChange={(e) => { setSearch(e.target.value); handleChange(e) }} placeholder='Enter your text here' required
                                    className="w-full h-full bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-customgreen cursor-pointer transition focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mr-2 w-1/12">
                                <input
                                    type="text" name='language' onChange={(e) => { setLanguage(e.target.value); handleChange(e) }} placeholder='Language' required
                                    className="w-full h-full bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-2 py-3 text-base hover:border-customgreen cursor-pointer transition focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <button type="submit" className=" w-12 h-12 mt-1 p-1 rounded-full cursor-pointer"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <img
                                    src={isHovered ? enter2 : enter1}
                                    className="transition duration-300 opacity-100 inset-0"
                                />
                            </button>
                        </form>
                    }
                    {!islogged &&
                        <div className='flex justify-center'>
                            <pre className="bg-[#292929]  border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base cursor-pointer transition overflow-auto">
                                <code>// Please login or create an account;</code>
                            </pre>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Snippet
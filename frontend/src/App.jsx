import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './components/SignUp';
import Login from './components/Login';
import Snippet from './components/Snippet';
import AllSnippets from './components/AllSnippets';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/snippet' element={<Snippet />}></Route>
          <Route path='/all-snippets' element={<AllSnippets />}></Route>
          {/* <Route path='/dashboard' element={<DashBoard />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TriviaQuiz from './TriviaQuiz'
import Intro from './Pages/Intro'
import Gk from './Pages/Gk'
import Sports from './Pages/Sports'
import Cpp from './Pages/Cpp'
import Java from './Pages/Java'
import Css from './Pages/Css'
import { Route,Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Intro/>}/>
      <Route path="/gk" element={<Gk/>}/>
      <Route path="/sports" element={<Sports/>}/>
      <Route path="/cpp" element={<Cpp/>}/>
      <Route path="/css" element={<Css/>}/>
      <Route path="/java" element={<Java/>}/>
    </Routes>
    </>
  )
}

export default App



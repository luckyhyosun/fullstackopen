import Home from './components/Home'
import Blogs from './components/Blogs'
import Login from './components/Login'

import {
  Routes,
  Route,
  Link,
} from "react-router-dom"

function App() {
  const padding = {
    padding: 5
  }

  return (
    <>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/login">login</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

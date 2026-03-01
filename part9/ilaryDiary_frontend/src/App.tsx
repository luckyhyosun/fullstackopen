import { useEffect } from "react";
import axios from "axios";


function App() {
  useEffect(() => {
    axios.get('/ping').then(response => {
      console.log(response.data);
    })
  }, [])

  return (
    <>
      <p>hello</p>
    </>
  )
}

export default App

import { useEffect } from "react";
import axios from "axios";


function App() {
  useEffect(() => {
    axios.get('/api/diaries').then(response => {
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

import { useEffect, useState } from 'react'
import "./app.css";

// components
import Login from './components/Login'
import Main from './components/Main';

// custom hooks
import useFetch from './hooks/useFetch'


const App = () => {
  //get rooms
  // const rooms = useFetch("", {
      
  // });

  // token
  const [token, setToken] = useState<string |null>(null);

  return (
    <div className="App">
      {!token && <Login setToken={setToken} />}
      {token && <Main token={token} setToken={setToken} />}
    </div>
  )
}

export default App

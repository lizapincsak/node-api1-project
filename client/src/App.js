import './App.css';
import {useState, useEffect} from 'react'

function url(path){
  return process.env.NODE_ENV === "development" 
  ? `http://localhost:1234${path}` : path
}

function App() {
  const [data, setData] = useState("Hi")
  useEffect(()=>{
    fetch(url("/api/"))
    .then(res=>res.json())
    .then(apiData => setData(apiData.data))
  },[])
  return (
    <div className="App">
      <header className="App-header">
        {data}
      </header>
    </div>
  );
}

export default App;

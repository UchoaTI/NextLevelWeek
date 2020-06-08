import React, {useState} from 'react';
import './App.css';

import Header from './Header'

function App() {
  const [counter, setCounter] = useState(0);

  function handleButtonClick(){
    setCounter(counter + 1);
  }
  
  return (
    <div>
      <Header title="hello world"/>
      
      <h1>{counter}</h1>
      <button type="button" onClick={handleButtonClick}>aumentar</button>
    </div>
  );
}
export default App;

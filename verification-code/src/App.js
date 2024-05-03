
import './App.css';
import { useState } from 'react'
import { VerifyCode } from './components/VerifyCode';

function App() {
  const [val, setVal] = useState('')
  const [showOtp, setShowOtp] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
   
    const regex = /[^0-9]/g
   
    if(val.length < 10 || regex.test(val)){
      alert('invalid number')
      return;
    }
     setShowOtp(true)
  }

  const submitOtp = (val) => {
     console.log(val)
  }
 
  return (
    <div className="App">
     <input type="text" onChange={(e) => setVal(e.target.value)} />
     <button onClick={(e) => handleClick(e)}>Submit</button>
     {showOtp && <VerifyCode length={4} submitOtp={submitOtp} />}
    </div>
  );
}

export default App;


import { useRef, useState, useEffect } from 'react'

export const VerifyCode = ({ length, submitOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(" "))
  const inputRef = useRef([])

  useEffect(() => {
    //focus to first input field when page loads
    if (inputRef.current[0]) {
      inputRef.current[0].focus()
    }
  }, [])

  const handleChange = (e, index) => {
    const val = e.target.value
    if (isNaN(val)) return
    const newOtp = [...otp]

    newOtp[index] = val.substring(val.length - 1)
    setOtp(newOtp)
    const combinedOtp = newOtp.join("")

    //submit when OTP fields are entered
    if (combinedOtp.length === length) {
      submitOtp(combinedOtp)
    }
   //auto focus to next field
    if (val && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRef.current[index - 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
  };

  return (
    <div>
      {otp.map((val, index) => {
        return (
          <input type="text" className="list"
            key={index}
            ref={(input) => (inputRef.current[index] = input)}
            value={val}
            onChange={(e) => handleChange(e, index)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        )
      })}
    </div>
  )
}
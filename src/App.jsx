import { useCallback, useEffect, useState, useRef } from "react"
function App() {
  const [password, setPassword] = useState('')
  const [length, setlength] = useState(8)
  const [isNumber, setIsNumber] = useState(false)
  const [isCharacter, setIsCharacter] = useState(false)

  const passRef = useRef(null)

  let generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isNumber) str += "1234567890"
    if (isCharacter) str += "!@#$%^&*()_-.,`~{}[];"
    for(let i=1; i<=length; i++){
      let charindex = Math.floor(Math.random() * str.length + 1)
      let char = str.charAt(charindex)
      pass += char
    }
    setPassword(pass)
  },[length, isNumber, isCharacter, setPassword])

  useEffect(() =>{
    generatePassword()
  },[length, isNumber, isCharacter])

  let copyPasswordToClipboard = useCallback(() =>{
    passRef.current?.select()
    console.log(passRef)
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
    <>
    <div className="w-full h-screen py-8 bg-amber-50 flex align-middle justify-center">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-700 text-white my-auto">
        <h1 className="text-4xl text-center my-3 text-white">Password Generator</h1>
        <div>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text" className="outline-none w-full py-1 px-3 bg-white text-black"
            value={password}
            readOnly
            ref={passRef}
            />
            <input type="button" value="Copy" className="outline-none bg-blue-600 px-3 py-0.5"
            onClick={copyPasswordToClipboard}
            />
          </div>

          <div className="flex justify-evenly text-sm gap-1 ">
            <div className="flex flex-center gap-x-1">
              <input type="range" id="length"
              value={length}
              max={14}
              onChange={(e) => {setlength(e.target.value)}} />
              <label htmlFor="length">Length({length})</label>
            </div>

            <div className="flex flex-center gap-1">
              <input type="checkbox" id="char"
              value={isCharacter}
              onChange={(e) => {setIsCharacter((prev) => !prev)}} />
              <label htmlFor="char">Character</label>
            </div>

            <div className="flex flex-center gap-1">
              <input type="checkbox" id="num"
              value={isNumber}
              onChange={(e) => {setIsNumber((prev) => !prev)}}/>
              <label htmlFor="num">Numbers</label>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App

import "./App.css";
import { useEffect, useState } from "react";
import Password from "./Components/Password";

function App() {
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerCase = "abcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  let symbols = "@#$%&!";
  let [length, setLength] = useState(8);
  let [lower, setLower] = useState(true);
  let [upper, setUpper] = useState(true);
  let [number, setNumber] = useState(true);
  let [symbol, setSymbol] = useState(true);
  let [finalPassword, setFinalPassword] = useState("s2K&34NlO%2E");
  let [displayCopied, setDisplay] = useState("hidden");
  let [displayError, setError] = useState("hidden");
  let [passwordArray, setPasswordArray] = useState([]);

  let generatePassword = () => {
    setFinalPassword("");

    let characterSets = [];

    if (upper) {
      characterSets.push(upperCase);
    }
    if (lower) {
      characterSets.push(lowerCase);
    }
    if (number) {
      characterSets.push(numbers);
    }
    if (symbol) {
      characterSets.push(symbols);
    }

    if (characterSets.length === 0) {
      // alert("Select atleast one checkbox to generate the password");
      setError("Select atleast one checkbox to generate the password");
      setTimeout(()=>{setError("hidden")},3000);
      return;
    }

    let checkIncluded = characterSets.map(() => false);

    while (checkIncluded.includes(false)) {
      let randomSetIndex = Math.floor(Math.random() * characterSets.length);
      if (!checkIncluded[randomSetIndex]) {
        let selectedArray = characterSets[randomSetIndex];
        let charIndex = Math.floor(Math.random() * selectedArray.length);
        setFinalPassword((prevPassword) => {
          let updatedPassword = prevPassword + selectedArray[charIndex];
          return updatedPassword;
        });

        checkIncluded[randomSetIndex] = true;
      }
    }

    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * characterSets.length);
      let selectedSet = characterSets[randomNumber];
      let anotherRandomNumber = Math.floor(Math.random() * selectedSet.length);
      setFinalPassword((prevPassword) => {
        let updatedPassword = prevPassword + selectedSet[anotherRandomNumber];
        return updatedPassword;
      });
    }
    setPasswordArray((prev)=>{
      const updatedList = [...prev, finalPassword];
      localStorage.setItem("passwordList", JSON.stringify(updatedList));
      return updatedList;
    });

  };

  useEffect(()=>{
    const storedPasswords = JSON.parse(localStorage.getItem("passwordList")) || [];
    console.log(storedPasswords);
    setPasswordArray(storedPasswords);
  }, []);

  function copied(password) {
    navigator.clipboard.writeText(password);
    // alert('Copied to clipboard');
    if (password !== "") {
      setDisplay("shown");
      setTimeout(() => {
        setDisplay("hidden");
      }, 1500);
    }
  }

  return (
    <>
    <div className="App">
      <div className="container" id={displayCopied}>
        <div className="stack" style={{ "--stacks": 3 }}>
          <span style={{ "--index": 0 }}>
            PASSWORD COPIED <i class="fa-solid fa-check"></i>
          </span>
          <span style={{ "--index": 1 }}>
            PASSWORD COPIED <i class="fa-solid fa-check"></i>
          </span>
          <span style={{ "--index": 2 }}>
            PASSWORD COPIED <i class="fa-solid fa-check"></i>
          </span>
        </div>
      </div>

      <div className="container again" id={displayError}>
        <div className="stack" style={{ "--stacks": 3 }}>
          <span style={{ "--index": 0 }}>
          Select atleast one checkbox to generate the password
          </span>
          <span style={{ "--index": 1 }}>
          Select atleast one checkbox to generate the password
          </span>
          <span style={{ "--index": 2 }}>
          Select atleast one checkbox to generate the password
          </span>
        </div>
      </div>

      <h1 className="heading">PASSWORD GENERATOR</h1>
      <div className="passwordContainer">
        <p className="password">{finalPassword}</p>
        <div className="icons">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={generatePassword}
          >
            <path
              d="M20.3752 13.387V11.9902C20.3752 7.36219 16.6139 3.60938 11.9752 3.60938C10.7132 3.60783 9.46724 3.89093 8.32989 4.43761C7.19253 4.98429 6.19314 5.78047 5.4061 6.76688M3.60001 10.6106V12.0075C3.60001 16.6406 7.35938 20.3906 12 20.3906C13.2583 20.3888 14.5004 20.1063 15.6357 19.5636C16.7709 19.0209 17.7708 18.2318 18.5625 17.2538"
              stroke="#00F0FF"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M1.5 12L3.5625 9.9375L5.71875 12M22.5 12L20.4375 14.0625L18.2812 12"
              stroke="#00F0FF"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={copied}
          >
            <path
              d="M21.375 22.5H6.375C6.07663 22.5 5.79048 22.3815 5.5795 22.1705C5.36853 21.9595 5.25 21.6734 5.25 21.375V6C5.25 5.80109 5.32902 5.61032 5.46967 5.46967C5.61032 5.32902 5.80109 5.25 6 5.25H21.375C21.6734 5.25 21.9595 5.36853 22.1705 5.5795C22.3815 5.79048 22.5 6.07663 22.5 6.375V21.375C22.5 21.6734 22.3815 21.9595 22.1705 22.1705C21.9595 22.3815 21.6734 22.5 21.375 22.5Z"
              fill="#00F0FF"
            />
            <path
              d="M5.25 3.75H18.75V2.625C18.75 2.32663 18.6315 2.04048 18.4205 1.8295C18.2095 1.61853 17.9234 1.5 17.625 1.5H2.8125C2.4644 1.5 2.13056 1.63828 1.88442 1.88442C1.63828 2.13056 1.5 2.4644 1.5 2.8125V17.625C1.5 17.9234 1.61853 18.2095 1.8295 18.4205C2.04048 18.6315 2.32663 18.75 2.625 18.75H3.75V5.25C3.75 4.85218 3.90804 4.47064 4.18934 4.18934C4.47064 3.90804 4.85218 3.75 5.25 3.75Z"
              fill="#00F0FF"
            />
          </svg>
        </div>
      </div>
      <div className="buttons">
        <button className="copy" onClick={()=>{copied(finalPassword)}}>
          <span>COPY PASSWORD_</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5625 5.25L19.3125 12L12.5625 18.75M18.375 12H4.6875"
              stroke="#000000"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
          <span className="r25">R25</span>
          <div className="bl"></div>
        </button>
        <button className="generator" onClick={generatePassword}>
          <span>GENERATE PASSWORD_</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3752 13.387V11.9902C20.3752 7.36219 16.6139 3.60938 11.9752 3.60938C10.7132 3.60783 9.46724 3.89093 8.32989 4.43761C7.19253 4.98429 6.19314 5.78047 5.4061 6.76688M3.60001 10.6106V12.0075C3.60001 16.6406 7.35938 20.3906 12 20.3906C13.2583 20.3888 14.5004 20.1063 15.6357 19.5636C16.7709 19.0209 17.7708 18.2318 18.5625 17.2538"
              stroke="#000"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M1.5 12L3.5625 9.9375L5.71875 12M22.5 12L20.4375 14.0625L18.2812 12"
              stroke="#000"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
          <span className="r25">R25</span>
          <div className="bl"></div>
        </button>
      </div>

      <div className="passwordLength">
        <p>Password Length: </p>
        <input
          type="range"
          name="length"
          id="length"
          min="8"
          max="50"
          steps="1"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label htmlFor="length">{length}</label>
      </div>
      <div className="checkboxContainer">
        <div className="upperCase">
          <input
            type="checkbox"
            name="upper"
            id="upper"
            checked={upper}
            onChange={() => {
              setUpper(!upper);
            }}
          />
          <label htmlFor="upper" className="label">
            Uppercase Letters
          </label>
        </div>
        <div className="lowerCase">
          <input
            type="checkbox"
            name="lower"
            id="lower"
            checked={lower}
            onChange={() => {
              setLower(!lower);
            }}
          />
          <label htmlFor="lower" className="label">
            Lowercase Letters
          </label>
        </div>
        <div className="numbers">
          <input
            type="checkbox"
            name="number"
            id="number"
            checked={number}
            onChange={() => {
              setNumber(!number);
            }}
          />
          <label htmlFor="number" className="label">
            Numbers
          </label>
        </div>
        <div className="symbols">
          <input
            type="checkbox"
            name="specialCharacters"
            id="specialCharacters"
            checked={symbol}
            onChange={() => {
              setSymbol(!symbol);
            }}
          />
          <label htmlFor="specialCharacters" className="label">
            Symbols
          </label>
        </div>
      </div>
    </div>

    <div className="historyContainer">
      <p className="historyHeading">Password History</p>
      <div className="passwordList">
        {
          (passwordArray.length === 0) ? <p>No Passwords Yet</p> : passwordArray.map((currPassword)=> <Password copied={copied} pass={currPassword} />)
        }
      </div>
    </div>
    </>
  );
}

export default App;

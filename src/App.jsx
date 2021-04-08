import React, { useState, useEffect } from "react";
import Game from './components/Game/Game';

const App = () => {
  const [options, setOptions] = useState(null);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const json = localStorage.getItem('gamehighscore')
    const savedScore = JSON.parse(json)
    if (savedScore) {
      setHighScore(savedScore)
    }
  }, [])

  const handleResetGame = () => {
    const prevOptions = options
    Promise.resolve(setOptions(null)).then(
      () => {
        console.log({
          prevOptions
        });
        setOptions(prevOptions)
      }
    )
  }

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
    }
  }, [])

  const onUnload = () => {
    localStorage.clear();
  }

  return (
    <div>
      <div className="container">
        <h1>Memory</h1>
        <div>High Score: {highScore.toFixed(1)}</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(12)}>Easy</button>
              <button onClick={() => setOptions(18)}>Medium</button>
              <button onClick={() => setOptions(24)}>Hard</button>
            </>
          ) : (
            <>
              <button
                onClick={handleResetGame}
              >
                Reset
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <Game
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h2>Choose a difficulty for start!</h2>
      )}
    </div>
  )
}

export default App

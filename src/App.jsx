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
        setOptions(prevOptions)
      }
    )
  }

  useEffect(() => {
    window.addEventListener("beforeunload", clearScoreFromLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearScoreFromLocalStorage);
    }
  }, [])

  const clearScoreFromLocalStorage = () => {
    localStorage.clear();
  }

  const goToMainMenu = () => {
    setOptions(null);
  }

  const chooseGameLevel = (cardsQuantity) => {
    setOptions(cardsQuantity);
  }

  return (
    <div>
      <div className="container">
        <h1>Memory</h1>
        <div>High Score: {highScore.toFixed(1)}</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => chooseGameLevel(12)}>Easy</button>
              <button onClick={() => chooseGameLevel(18)}>Medium</button>
              <button onClick={() => chooseGameLevel(24)}>Hard</button>
            </>
          ) : (
            <>
              <button
                onClick={handleResetGame}
              >
                Reset
              </button>
              <button onClick={goToMainMenu}>Main Menu</button>
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

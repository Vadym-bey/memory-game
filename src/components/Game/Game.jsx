import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { message } from 'antd';
import { colors } from '../../constants/gameConstants';

const Game = ({ options, setOptions, highScore, setHighScore }) => {
  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  useEffect(() => {
    let newGame = []
    for (let i = 0; i < options / 2; i++) {
      const baseCardStructure = {
        colorId: i,
        color: colors[i],
        flipped: false,
      }
      const firstOption = baseCardStructure;
      const secondOption = baseCardStructure;
      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5)
    setGame(shuffledGame)
  }, [options])

  useEffect(() => {
    const finished = !game.some(card => !card.flipped)
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length
        let multiplier

        switch(options) {
          case 12:
            multiplier = 5;
            break;
          case 18:
            multiplier = 2.5
            break;
          case 24:
            multiplier = 1;
            break;
          default:
            console.log('');
        }
  
        const pointsLost = multiplier * (0.66 * flippedCount - bestPossible)
  
        let score
        if (pointsLost < 100) {
          score = 100 - pointsLost
        } else {
          score = 0
        }
  
        if (score > highScore) {
          setHighScore(score)
          const transformScore = JSON.stringify(score);
          localStorage.setItem('gamehighscore', transformScore);
        }
  
        const resultsMessage = message.info(`You Win!, SCORE: ${score.toFixed(1)}`);
        if (resultsMessage) {
          const gameLength = game.length
          Promise.resolve(setOptions(null)).then(
            () => {
              setOptions(gameLength)
            }
          )
        } else {
          setOptions(null)
        }
      }, 500)
    }  }, [game])

  if (flippedIndexes.length === 2) {
    const flippedFirstCard = flippedIndexes[0];
    const flippedSecondCard = flippedIndexes[1];
    const flippedCards = [...flippedIndexes];
    const compareCards = game[flippedFirstCard].colorId === game[flippedSecondCard].colorId
  
    if (compareCards) {
      const newGame = [...game]
      newGame[flippedFirstCard].flipped = true
      newGame[flippedSecondCard].flipped = true
      setGame(newGame)
  
      flippedCards.push(false)
      setFlippedIndexes(flippedCards)
    } else {
      flippedCards.push(true)
      setFlippedIndexes(flippedCards)
    }
  }

  const onCardClick = (id, setFlipped) => {
    const flippedCards = [...flippedIndexes]
    if (!game[id].flipped && flippedCount % 3 === 0) {
      setFlipped(state => !state)
      setFlippedCount(flippedCount + 1)
      flippedCards.push(id)
      setFlippedIndexes(flippedCards)
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      setFlipped(state => !state)
      setFlippedCount(flippedCount + 1)
      flippedCards.push(id)
      setFlippedIndexes(flippedCards)
    }
  }

  const renderCard = () => {
    if (game.length === 0) {
      return null;
    }

    const card = game.map((card, index) => (
      <div className="card" key={index}>
        <Card
          onCardClick={onCardClick}
          id={index}
          color={card.color}
          flippedCount={flippedCount}
          setFlippedCount={setFlippedCount}
          flippedIndexes={flippedIndexes}
          setFlippedIndexes={setFlippedIndexes}
        />
      </div>
    ));

    return card;
  }

    return game.length !== 0 && (
      <div id="cards">
        {renderCard()}
      </div>
    )
  }

export default Game;

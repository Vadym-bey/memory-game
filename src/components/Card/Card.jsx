import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from "react-spring";
import logo from '../../assets/logo.png';

const Card = ({
  id,
  color,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
  onCardClick
}) => {
  const [flipped, setFlipped] = useState(false)
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        setFlipped(state => !state)
        setFlippedCount(flippedCount + 1)
        setFlippedIndexes([])
      }, 1000)
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1)
      setFlippedIndexes([])
    }
  }, [flippedIndexes])

  return (
    <div onClick={() => onCardClick(id, setFlipped)}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
          backgroundImage: `url(${logo})`,
        }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          background: color,
        }}
      />

    </div>
  )
}

export default Card;

import React, { useState } from "react";
import Coin from "./Coin";
import "./CoinContainer.css";
import { choice } from "./helpers";

/** CoinContainer: holds state about #flips/#heads/#tails, and current coin. */

function CoinContainer(props) {
  const [coin, setCoin] = useState(null);
  const [headCount, setHeadCount] = useState(0);
  const [tailCount, setTailCount] = useState(0);
  const handleClick = () => {
    const newCoin = choice(props.coins);
    setCoin(newCoin);
    if (newCoin.side === "head") {
      setHeadCount(oldCount => oldCount + 1);
    } else {
      setTailCount(oldCount => oldCount + 1);
    }
  };

  const currCoin = coin ? (
    <Coin side={coin.side} imgSrc={coin.imgSrc} />
  ) : null;

  return (
    <div className="CoinContainer">
      <h2>Let's flip a coin</h2>
      {currCoin}
      {/* <Coin side={coin.side} imgSrc={coin.imgSrc} /> */}
      <button onClick={handleClick}>Flip Me!</button>
      <p>
        Out of {headCount + tailCount} flips, there have been {headCount} heads
        and {tailCount} tails.
      </p>
    </div>
  );
}

CoinContainer.defaultProps = {
  coins: [
    {
      side: "head",
      imgSrc: "https://tinyurl.com/react-coin-heads-jpg"
    },
    {
      side: "tail",
      // imgSrc: "https://tinyurl.com/react-coin-tails-jpg"
      imgSrc: "https://media.istockphoto.com/id/476142091/photo/quarter-dollar-us-coin-isolated-on-white.jpg?s=612x612&w=0&k=20&c=wNzr7m0Z3dhlf8_O1G3EFNz8u2tALVobVs4K4XfFN5c="
    }
  ]
};

export default CoinContainer;

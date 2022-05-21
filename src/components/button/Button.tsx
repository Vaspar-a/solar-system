import React, { useContext } from "react";
import { PlayContextType } from "../../@types";
import { PlayContext } from "../../context/PlayContext";
import PlayPause from "../../icons/PlayPause";
import './button.css';

function Button(): JSX.Element {
  const { play, setPlay } = useContext<PlayContextType | null>(PlayContext) as PlayContextType;
  
  const handleOnClickButton = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    setPlay(!play);
  };

  return (
    <button className="play-button" onClick={handleOnClickButton}>
      <PlayPause className='play-icon' />
      {play ? " Pause" : " Play"}
    </button>
  );
}

export default Button;

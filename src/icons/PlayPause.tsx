import React from "react";

interface PlayPauseIconProps {
  className: string;
};

function PlayPause({ className }: PlayPauseIconProps): JSX.Element {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" className={className}>
      <path d="M0 0V14L8 7L0 0ZM10 14H13V0H10V14ZM15 0V14H18V0" />
    </svg>
  );
}

export default PlayPause;

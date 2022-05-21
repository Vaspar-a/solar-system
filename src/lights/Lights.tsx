import React from "react";
import { Vector3 } from "three";

interface LightsProps {
  position: Vector3;
}

function Lights({ position }: LightsProps): JSX.Element {
  return (
    <>
      <directionalLight position={position} intensity={0.5} />
      <pointLight position={position} intensity={0.02} />
    </>
  );
}

export default Lights;

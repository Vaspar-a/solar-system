import React, { useRef, useContext } from "react";
import { Box3, Object3D, Vector3 } from "three";
import { PlayContextType } from "./@types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PlayContext } from "./context/PlayContext";
import SpinningMesh from "./mesh/SpinningMesh";
import Lights from "./lights/Lights";
import Button from "./components/button/Button";
import { planets } from "./planets";
import "./App.css";

function App(): JSX.Element {
  const cameraPosition: Vector3 = [0, 0, 500] as unknown as Vector3;
  const cameraRef = useRef<any>(null);
  const controlRef = useRef<any>(null);
  const { play, setPlay } = useContext<PlayContextType | null>(PlayContext) as PlayContextType;

  function zoomCameraToSelection(
    mesh: Object3D<Event>,
    fitRatio = 1.2,
    camera = cameraRef.current,
    controls = controlRef.current
  ) {
    if (camera && controls) {

      const box = new Box3();
  
      box.setFromObject(mesh);
  
      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
  
      const maxSize = Math.max(size.x, size.y, size.z);
      const fitHeightDistance =
        maxSize / (2 * Math.atan((Math.PI * (camera.fov as number)) / 360));
      const fitWidthDistance = fitHeightDistance / (camera.aspect as number);
      const distance = fitRatio * Math.max(fitHeightDistance, fitWidthDistance);
  
      const direction = controls.target
        .clone()
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distance);
  
      controls.maxDistance = distance * 10;
      controls.target.copy(center);
  
      camera.near = distance / 20;
      camera.far = distance * 5000;
      camera.position?.copy(controls.target).sub(direction);
      camera.updateProjectionMatrix();
  
      controls.update();
    }
  }

  const getPlanets: JSX.Element[] = planets.map((planet) => {
    return (
      <SpinningMesh
        key={`${planet.name}`}
        play={play}
        setPlay={setPlay}
        zoomCameraToSelection={zoomCameraToSelection}
        {...planet}
      />
    );
  });

  return (
    <>
      <Button />
      <div className="canvas-container">
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            ref={cameraRef}
          >
            <Lights position={cameraPosition} />
          </PerspectiveCamera>
          {getPlanets}
          <OrbitControls ref={controlRef} />
        </Canvas>
      </div>
    </>
  );
}

export default App;

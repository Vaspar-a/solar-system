import { Text } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { TextureLoader, Box3, Object3D } from "three";
import { SpinningMeshType } from "../@types";
import Ring from "./Ring";

const getMeshBoundingBox = function (mesh: Object3D<Event>): Box3 {
  const boundingBox = new Box3();
  boundingBox.setFromObject(mesh);
  return boundingBox;
};

function SpinningMesh({
  position,
  groupPosition,
  scaleFactor,
  mapImagePath,
  transparent,
  hasRing,
  rings,
  hasMoon,
  moons,
  name,
  rotationFactor,
  revolutionFactor,
  play,
  setPlay,
  zoomCameraToSelection,
}: SpinningMeshType) {
  const meshRef = useRef<any>();
  const textRef = useRef<any>();
  const groupRef = useRef<any>();
  const sizeScale = 1 * scaleFactor;
  let extraMesh = <></>;
  const distZScaleFactor = 100 / 30;
  position.setY(position.y * distZScaleFactor);
  const textureLoader = new TextureLoader();
  const mapImageURL = `${process.env.PUBLIC_URL}/assets/images/${mapImagePath}`;
  const mapImage = textureLoader.load(mapImageURL);
  const fontPath = `${process.env.PUBLIC_URL}/assets/fonts/Noto_Sans/NotoSans-Regular.ttf`;
  let textPosition = position.copy(position);

  if (hasRing) {
    extraMesh = (
      <>
        {rings?.map((ring) => (
          <Ring
            {...ring}
            key={ring.name}
            position={position}
            rotationFactor={rotationFactor}
          />
        ))}
      </>
    );
  } else if (hasMoon) {
    extraMesh = (
      <>
        {moons?.map((moon) => (
          <SpinningMesh
            {...moon}
            key={moon.name}
            play={play}
            setPlay={setPlay}
            zoomCameraToSelection={zoomCameraToSelection}
          />
        ))}
      </>
    );
  }

  const handleOnClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (name === "space") {
      return;
    }
    setPlay(false);
    zoomCameraToSelection(meshRef.current, 2);
  };

  useFrame(() => {
    meshRef.current.rotation.y += 0.005 * rotationFactor;
    if (play) {
      groupRef.current.rotation.y += 0.002 * revolutionFactor;
    }
  });

  useEffect(() => {
    const { max, min } = getMeshBoundingBox(meshRef.current);

    if (name === "sun") {
      textRef.current.position.set(1.3 * max.x, max.y / 4, min.z);
    } else if (name === "moon") {
      textRef.current.position.set(max.x + 10, min.y - 10, min.z);
    } else {
      textRef.current.position.set(max.x + 10, max.y + 10, min.z);
    }
  }, [name]);

  return (
    <group ref={groupRef} position={groupPosition} onClick={handleOnClick}>
      <mesh
        ref={meshRef}
        position={position}
        scale={[sizeScale, sizeScale, sizeScale]}
      >
        <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
        <meshStandardMaterial attach="material" map={mapImage} side={2} transparent={transparent} />
      </mesh>
      {extraMesh}
      <Text
        ref={textRef}
        color={"#FFFA00"}
        anchorX="center"
        anchorY="middle"
        font={fontPath}
        fontSize={5}
        letterSpacing={-0.05}
        lineHeight={1}
        position={textPosition}
      >
        {name === 'clouds' ? '' : name }
      </Text>
    </group>
  );
}

export default SpinningMesh;

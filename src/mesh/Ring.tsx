import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { TextureLoader, Vector3 } from "three";
import { RingType } from "../@types";

function Ring({
  position,
  mapImagePath,
  alphaImagePath,
  rotationFactor,
  innerRadius,
  outerRadius,
  rotationX,
  rotationY,
  transparent
}: RingType) {
  const meshRef = useRef<any>();
  const imageURL = `${process.env.PUBLIC_URL}/assets/images/${mapImagePath}`;
  const alphaImageURL = `${process.env.PUBLIC_URL}/assets/images/${alphaImagePath}`;
  const textureLoader = new TextureLoader();
  const mapImage = textureLoader.load(imageURL);
  const alphaMapImage = alphaImagePath ? textureLoader.load(alphaImageURL) : null;

  useEffect(() => {
    meshRef.current.rotation.x = rotationX;
    meshRef.current.rotation.y = rotationY;
  }, [rotationX, rotationY]);

  useFrame(() => {
    meshRef.current.rotation.z += (0.0005 * (rotationFactor as number));
  });

  return (
    <mesh
      ref={meshRef}
      position={position as unknown as Vector3}
    >
      <ringBufferGeometry attach="geometry" args={[innerRadius, outerRadius, 64, 64]} />
      <meshStandardMaterial attach="material" map={mapImage} side={2} alphaMap={alphaMapImage} transparent={transparent} />
    </mesh>
  );
}

export default Ring;

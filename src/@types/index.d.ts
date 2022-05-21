import { LightNode, Object3DNode } from "@react-three/fiber";
import { Color, Object3D, Vector, Vector2, Vector3 } from "three";

export interface PlayContextType {
    play: boolean;
    setPlay: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface RingType {
    name: string;
    position?: Vector3;
  mapImagePath: string;
  alphaImagePath?: string;
  rotationFactor?: number;
  innerRadius: number;
  outerRadius: number;
  rotationX?: number;
  rotationY?: number;
  transparent?: boolean;
};

export interface MoonType {
  name: string;
  position: Vector3;
groupPosition: Vector3;
scaleFactor: number;
mapImagePath: string;
rotationFactor: number;
revolutionFactor: number;
transparent?: boolean;
};

export interface PlanetType {
  name: string;
  mapImagePath: string;
  scaleFactor: number;
  position: Vector3;
  groupPosition: Vector3;
  rotationFactor: number;
  revolutionFactor: number;
  specMapImagePath?: string;
  normalMapImagePath?: string;
  transparent?: boolean;
  hasRing?: boolean;
  hasMoon?: boolean;
  rings?: RingType[];
moons?: MoonType[];
normalScale?: Vector2;
specular?: Color;
}

export interface zoomCameraToSelectionFunctionType {
  zoomCameraToSelection: (any, number, any?, any?) => void;
}

export type SpinningMeshType = PlanetType & PlayContextType & zoomCameraToSelectionFunctionType;
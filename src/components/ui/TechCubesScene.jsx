import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  RiReactjsLine,
  RiJavascriptLine,
  RiHtml5Line,
  RiCss3Line,
  RiGitBranchLine,
  RiNextjsLine,
  RiCodeSSlashLine,
  RiNodejsLine,
} from "react-icons/ri";
import {
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiVite,
  SiSass,
} from "react-icons/si";

const CUBES = [
  { icon: RiReactjsLine, color: "#61dafb", size: 0.55 },
  { icon: SiTypescript, color: "#3178c6", size: 0.42 },
  { icon: RiJavascriptLine, color: "#f7df1e", size: 0.35 },
  { icon: RiHtml5Line, color: "#e34f26", size: 0.42 },
  { icon: RiCss3Line, color: "#1572b6", size: 0.5 },
  { icon: SiRedux, color: "#764abc", size: 0.35 },
  { icon: RiNextjsLine, color: "#888888", size: 0.42 },
  { icon: SiTailwindcss, color: "#06b6d4", size: 0.5 },
  { icon: SiVite, color: "#bd34fe", size: 0.35 },
  { icon: RiGitBranchLine, color: "#f05032", size: 0.42 },
  { icon: SiSass, color: "#cc6699", size: 0.35 },
  { icon: RiNodejsLine, color: "#339933", size: 0.5 },
  { icon: RiCodeSSlashLine, color: "#38bdf8", size: 0.42 },
];

function getThemeColors() {
  const isDark =
    document.documentElement.getAttribute("data-theme") === "dark";
  return {
    front: isDark ? "#1e1b2e" : "#ffffff",
    side: isDark ? "#2a2540" : "#e0d8f5",
    top: isDark ? "#302a48" : "#ece6ff",
    bottom: isDark ? "#1a1828" : "#c8bce8",
    border: isDark ? "#4a4070" : "#bfb3e0",
  };
}

function CubeFace({ position, rotation, size, color, borderColor, icon: Icon, iconColor }) {
  const bw = 0.015;
  const inner = size - bw * 2;

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color={borderColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[inner, inner]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      {Icon && (
        <Html
          center
          distanceFactor={3.5}
          style={{ pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon style={{ color: iconColor, fontSize: `${size * 28}px`, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.12))" }} />
        </Html>
      )}
    </group>
  );
}

function TechCube({ cubeData, position, index }) {
  const groupRef = useRef();
  const [themeColors, setThemeColors] = useState(getThemeColors);
  const s = cubeData.size;
  const half = s / 2;
  const time = useRef(index * 0.7);

  useEffect(() => {
    const observer = new MutationObserver(() => setThemeColors(getThemeColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    time.current += delta;

    groupRef.current.position.y =
      position[1] + Math.sin(time.current * 0.5 + index) * 0.08;
    groupRef.current.rotation.y =
      0.4 + Math.sin(time.current * 0.25 + index * 2) * 0.12;
    groupRef.current.rotation.x =
      -0.25 + Math.cos(time.current * 0.2 + index * 1.5) * 0.06;
  });

  const Icon = cubeData.icon;

  return (
    <group ref={groupRef} position={position} rotation={[-0.25, 0.4, 0]}>
      <CubeFace position={[0, 0, half]} rotation={[0, 0, 0]} size={s} color={themeColors.front} borderColor={themeColors.border} icon={Icon} iconColor={cubeData.color} />
      <CubeFace position={[0, 0, -half]} rotation={[0, Math.PI, 0]} size={s} color={themeColors.side} borderColor={themeColors.border} />
      <CubeFace position={[half, 0, 0]} rotation={[0, Math.PI / 2, 0]} size={s} color={themeColors.side} borderColor={themeColors.border} />
      <CubeFace position={[-half, 0, 0]} rotation={[0, -Math.PI / 2, 0]} size={s} color={themeColors.side} borderColor={themeColors.border} />
      <CubeFace position={[0, half, 0]} rotation={[-Math.PI / 2, 0, 0]} size={s} color={themeColors.top} borderColor={themeColors.border} />
      <CubeFace position={[0, -half, 0]} rotation={[Math.PI / 2, 0, 0]} size={s} color={themeColors.bottom} borderColor={themeColors.border} />
    </group>
  );
}

function Scene() {
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const hw = viewport.width / 2;
    const hh = viewport.height / 2;
    const safeX = 0.75;
    const safeY = 0.95;

    return CUBES.map((cube, i) => {
      const angle = (i / CUBES.length) * Math.PI * 2;
      const orbitRX = 1.3 + Math.sin(i * 1.7) * 0.25;
      const orbitRY = 1.5 + Math.cos(i * 2.3) * 0.25;
      let x = Math.cos(angle) * orbitRX;
      let y = Math.sin(angle) * orbitRY;

      const dist = Math.sqrt((x / safeX) ** 2 + (y / safeY) ** 2);
      if (dist < 1) {
        const push = (1 / dist) * 1.15;
        x *= push;
        y *= push;
      }

      x = Math.max(-hw + cube.size, Math.min(hw - cube.size, x));
      y = Math.max(-hh + cube.size, Math.min(hh - cube.size, y));

      const z = -0.2 + Math.sin(i * 0.8) * 0.4;
      return [x, y, z];
    });
  }, [viewport.width, viewport.height]);

  return (
    <>
      <ambientLight intensity={1} />
      {CUBES.map((cube, i) => (
        <TechCube
          key={i}
          cubeData={cube}
          position={positions[i]}
          index={i}
        />
      ))}
    </>
  );
}

export default function TechCubesScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
      }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}

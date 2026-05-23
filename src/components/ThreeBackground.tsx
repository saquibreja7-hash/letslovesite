"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface ThreeBackgroundProps {
  colorA: string;
  colorB: string;
  colorBg: string;
}

export default function ThreeBackground({
  colorA,
  colorB,
  colorBg,
}: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniformsRef = useRef<{
    u_time: { value: number };
    u_mouse: { value: THREE.Vector2 };
    u_colorA: { value: THREE.Color };
    u_colorB: { value: THREE.Color };
    u_colorBg: { value: THREE.Color };
  } | null>(null);

  // Smooth mouse movement state
  const mouseRef = useRef({
    currentX: 0.5,
    currentY: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // 2. WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 3. Shaders
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform vec3 u_colorBg;
      varying vec2 vUv;

      // Simple 2D noise based on hash
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      // 2D fBm (fractional Brownian motion)
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        vec2 p = uv * 2.0 - 1.0;
        
        // Interactive coordinates warped by mouse position
        vec2 m = u_mouse * 2.0 - 1.0;
        float distToMouse = length(p - m);
        float mouseForce = smoothstep(0.8, 0.0, distToMouse) * 0.15;
        
        // Coordinate warping (domain warping)
        vec2 q = vec2(
          fbm(p + vec2(0.0, 0.0) + u_time * 0.05),
          fbm(p + vec2(5.2, 1.3) + u_time * 0.05)
        );
        
        vec2 r = vec2(
          fbm(p + 4.0 * q + vec2(1.7, 9.2) + u_time * 0.02 + m.x * 0.1),
          fbm(p + 4.0 * q + vec2(8.3, 2.8) + u_time * 0.02 + m.y * 0.1)
        );
        
        float f = fbm(p + 4.0 * r);
        
        // Mix colors based on noise patterns and coordinate warping
        vec3 color = mix(u_colorBg, u_colorA, f);
        color = mix(color, u_colorB, length(q));
        color = mix(color, vec3(1.0), mouseForce * 0.3 * f);
        
        // Add dark vignettes on borders for high-end cinematic feel
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
        color *= mix(0.75, 1.0, vignette);
        
        gl_FragColor = vec4(color, 0.25);
      }
    `;

    // 4. Geometry and Material
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_colorA: { value: new THREE.Color(colorA) },
      u_colorB: { value: new THREE.Color(colorB) },
      u_colorBg: { value: new THREE.Color(colorBg) },
    };
    
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 5. Mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Touch tracker for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX / window.innerWidth;
        mouseRef.current.targetY = 1.0 - (e.touches[0].clientY / window.innerHeight);
      }
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // 6. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      uniforms.u_time.value = elapsedTime;

      // Inertia interpolation for mouse movement
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;
      
      uniforms.u_mouse.value.set(
        mouseRef.current.currentX,
        mouseRef.current.currentY
      );

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Update uniforms when props change using GSAP for smooth color morphing
  useEffect(() => {
    if (!uniformsRef.current) return;
    
    const uniforms = uniformsRef.current;
    
    // Smooth transition for Color A
    const targetColorA = new THREE.Color(colorA);
    gsap.to(uniforms.u_colorA.value, {
      r: targetColorA.r,
      g: targetColorA.g,
      b: targetColorA.b,
      duration: 1.5,
      ease: "power2.out",
    });

    // Smooth transition for Color B
    const targetColorB = new THREE.Color(colorB);
    gsap.to(uniforms.u_colorB.value, {
      r: targetColorB.r,
      g: targetColorB.g,
      b: targetColorB.b,
      duration: 1.5,
      ease: "power2.out",
    });

    // Smooth transition for Canvas Background Color
    const targetColorBg = new THREE.Color(colorBg);
    gsap.to(uniforms.u_colorBg.value, {
      r: targetColorBg.r,
      g: targetColorBg.g,
      b: targetColorBg.b,
      duration: 1.5,
      ease: "power2.out",
    });
  }, [colorA, colorB, colorBg]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

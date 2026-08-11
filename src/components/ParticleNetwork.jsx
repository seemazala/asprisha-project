import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Interactive floating particle network — connected glowing dots that
// drift in 3D space and gently react to mouse movement. Lives behind
// the hero content (zIndex 0), fully self-contained and cleaned up on
// unmount so switching pages doesn't leak WebGL contexts.
const PARTICLE_COUNT = window.innerWidth < 768 ? 45 : 85;
const MAX_DISTANCE = 130;
const COLOR = 0x0dcfcf;

const ParticleNetwork = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---- Particles ----
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width;
      positions[i * 3 + 1] = (Math.random() - 0.5) * height;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
      velocities.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.35,
      });
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: COLOR,
      size: 4,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);

    // ---- Connection lines (rebuilt each frame between nearby particles) ----
    const lineMaterial = new THREE.LineBasicMaterial({
      color: COLOR,
      transparent: true,
      opacity: 0.12,
    });
    let lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ---- Mouse tracking (subtle camera parallax) ----
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
    };
    mount.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const posAttr = particleGeometry.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x = posAttr.getX(i) + velocities[i].x;
        let y = posAttr.getY(i) + velocities[i].y;
        let z = posAttr.getZ(i) + velocities[i].z;

        if (x > width / 2 || x < -width / 2) velocities[i].x *= -1;
        if (y > height / 2 || y < -height / 2) velocities[i].y *= -1;
        if (z > 200 || z < -200) velocities[i].z *= -1;

        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;

      // Rebuild connecting lines between nearby particles
      const linePositions = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = posAttr.getX(i) - posAttr.getX(j);
          const dy = posAttr.getY(i) - posAttr.getY(j);
          const dz = posAttr.getZ(i) - posAttr.getZ(j);
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < MAX_DISTANCE) {
            linePositions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
            linePositions.push(posAttr.getX(j), posAttr.getY(j), posAttr.getZ(j));
          }
        }
      }
      lineGeometry.dispose();
      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      lines.geometry = lineGeometry;

      // Gentle camera parallax toward mouse position
      camera.position.x += (mouse.x * 60 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 60 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleNetwork;
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Scroll3DKingCanvas
 *
 * 3D Scroll Progress King Companion for the Experience Page.
 * Realistic Soft Radial Shadow Integration:
 * - Uses a procedural soft radial gradient texture (feathered circular falloff with 0 sharp edges).
 * - Dynamically synchronizes with jump physics: shadow diffuses/softens during airborne hops,
 *   and sharpens on landing impact.
 * - Interactive Drag & Drop with strict navigation sidebar barriers.
 * - Positioned strictly at z-0 below glossy frosted glass cards (z-10).
 */

const getResponsiveConfig = (w: number) => {
  if (w < 768) {
    return { initialX: 2.1, baseScale: 0.38, opacity: 0.45 };
  } else if (w < 1024) {
    return { initialX: 2.8, baseScale: 0.5, opacity: 0.85 };
  } else {
    return { initialX: 3.6, baseScale: 0.62, opacity: 1.0 };
  }
};

export const Scroll3DKingCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Viewport dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;
    let config = getResponsiveConfig(width);

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup - Top-down elevated tabletop perspective (~50° pitch)
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
    camera.position.set(2.4, 4.6, 4.0);
    camera.lookAt(2.0, 0.4, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4a. Turned-Wood Canvas Texture Generator
    const createWoodTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, "#e8d6bd");
        grad.addColorStop(0.5, "#d2b893");
        grad.addColorStop(1, "#8e6949");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = "rgba(74, 53, 37, 0.16)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 50; i++) {
          ctx.beginPath();
          ctx.arc(256, 256, 12 + i * 9, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(92, 64, 42, 0.05)";
        for (let j = 0; j < 100; j++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          ctx.fillRect(x, y, Math.random() * 80 + 20, Math.random() * 3 + 1);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    // 4b. Procedural Soft Radial Shadow Texture Generator (Feathered circular contact shadow)
    const createShadowTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
        grad.addColorStop(0, "rgba(24, 18, 15, 0.48)");
        grad.addColorStop(0.4, "rgba(24, 18, 15, 0.25)");
        grad.addColorStop(0.7, "rgba(24, 18, 15, 0.08)");
        grad.addColorStop(1, "rgba(24, 18, 15, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
      }

      return new THREE.CanvasTexture(canvas);
    };

    const woodTexture = createWoodTexture();
    const shadowTexture = createShadowTexture();

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.5);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc9a982, 0.8);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.5);
    rimLight.position.set(-5, 4, -3);
    scene.add(rimLight);

    // 6. Build Turned Wood King Mesh
    const kingGroup = new THREE.Group();
    scene.add(kingGroup);

    const lathePoints: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.68, 0),
      new THREE.Vector2(0.72, 0.08),
      new THREE.Vector2(0.62, 0.18),
      new THREE.Vector2(0.54, 0.25),
      new THREE.Vector2(0.44, 0.48),
      new THREE.Vector2(0.36, 0.78),
      new THREE.Vector2(0.34, 0.98),
      new THREE.Vector2(0.5, 1.08),
      new THREE.Vector2(0.46, 1.18),
      new THREE.Vector2(0.39, 1.25),
      new THREE.Vector2(0.56, 1.58),
      new THREE.Vector2(0.6, 1.72),
      new THREE.Vector2(0.48, 1.78),
      new THREE.Vector2(0, 1.78),
    ];

    const bodyGeo = new THREE.LatheGeometry(lathePoints, 36);
    const woodMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      color: 0xf4ebdc,
      roughness: 0.36,
      metalness: 0.05,
      transparent: true,
      opacity: config.opacity,
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, woodMaterial);
    kingGroup.add(bodyMesh);

    // 3D Cross Emblem
    const crossMat = new THREE.MeshStandardMaterial({
      map: woodTexture,
      color: 0xeddcc4,
      roughness: 0.3,
      transparent: true,
      opacity: config.opacity,
    });

    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.36, 0.1), crossMat);
    vBar.position.y = 1.94;
    kingGroup.add(vBar);

    const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.09, 0.09), crossMat);
    hBar.position.y = 1.98;
    kingGroup.add(hBar);

    // Realistic Radial Soft Shadow Plane (Feathered circular contact shadow)
    const shadowGeo = new THREE.PlaneGeometry(2.0, 2.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Initial position & scale
    kingGroup.position.set(config.initialX, 0, 0);
    kingGroup.scale.set(config.baseScale, config.baseScale, config.baseScale);
    shadowMesh.position.set(config.initialX, 0, 0);

    // Interaction & Physics state
    let animFrameId: number;
    let targetProgress = 0;
    let smoothProgress = 0;

    // Interactive Dragging Variables
    let isDragging = false;
    let userOffsetX = 0;
    let userOffsetY = 0;
    let targetUserOffsetX = 0;
    let targetUserOffsetY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 7. Raycasting Window Drag Handlers
    const onPointerDown = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(kingGroup.children, true);
      if (intersects.length > 0) {
        isDragging = true;
        document.body.style.cursor = "grabbing";
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        // Clamp X between 0.2 and 4.0 to prevent crossing into left sidebar menu
        const rawX = mouse.x * 3.4;
        const clampedX = Math.min(4.0, Math.max(0.2, rawX));
        targetUserOffsetX = clampedX - config.initialX;

        const rawY = mouse.y * 2.2;
        const clampedY = Math.min(1.2, Math.max(-2.4, rawY));
        targetUserOffsetY = clampedY;
      }
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = "default";
        targetUserOffsetX = 0;
        targetUserOffsetY = 0;
      }
    };

    // 8. Scroll Listener
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    // 9. Resize Listener for Viewport Responsiveness
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      config = getResponsiveConfig(width);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      woodMaterial.opacity = config.opacity;
      crossMat.opacity = config.opacity;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    // 10. 60 FPS Physics Loop
    const animate = () => {
      if (!prefersReducedMotion) {
        // Smooth lerp for scroll and drag offsets
        smoothProgress += (targetProgress - smoothProgress) * 0.08;
        userOffsetX += (targetUserOffsetX - userOffsetX) * 0.1;
        userOffsetY += (targetUserOffsetY - userOffsetY) * 0.1;

        const totalSteps = 4;
        const stepProgress = smoothProgress * totalSteps;
        const phase = stepProgress % 1.0;

        // Y position tracking along scroll progression
        const yBasePos = 1.4 - smoothProgress * 3.4 + userOffsetY;

        let jumpY = 0;
        let scaleY = 1.0;
        let scaleXZ = 1.0;
        let tiltX = 0;

        if (phase > 0.04 && phase < 0.96 && !isDragging) {
          const t = (phase - 0.04) / 0.92;

          if (t < 0.15) {
            // Anticipation crouch
            const crouch = Math.sin((t / 0.15) * (Math.PI / 2));
            scaleY = 1.0 - 0.1 * crouch;
            scaleXZ = 1.0 + 0.06 * crouch;
            jumpY = -0.04 * crouch;
          } else if (t < 0.82) {
            // Upward Arc Hop
            const arcT = (t - 0.15) / 0.67;
            const arcSin = Math.sin(arcT * Math.PI);
            jumpY = arcSin * 0.5;
            scaleY = 1.0 + 0.08 * arcSin;
            scaleXZ = 1.0 - 0.05 * arcSin;
            tiltX = arcSin * 0.15;
          } else {
            // Landing impact squash
            const impactT = (t - 0.82) / 0.18;
            const squash = Math.sin(impactT * Math.PI);
            scaleY = 1.0 - 0.12 * squash;
            scaleXZ = 1.0 + 0.08 * squash;
            jumpY = -0.03 * squash;
          }
        }

        // Apply physical transforms directly to King Group
        const finalX = config.initialX + userOffsetX;
        kingGroup.position.set(finalX, yBasePos + Math.max(-0.04, jumpY), 0);
        kingGroup.scale.set(
          config.baseScale * scaleXZ,
          config.baseScale * scaleY,
          config.baseScale * scaleXZ
        );
        kingGroup.rotation.x = tiltX;
        kingGroup.rotation.y = smoothProgress * Math.PI * 0.5;

        // Synchronize Soft Radial Contact Shadow
        shadowMesh.position.set(finalX, yBasePos + 0.01, 0);
        const shadowScale = config.baseScale * (1.0 + jumpY * 0.4);
        shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
        shadowMat.opacity = Math.max(0.06, (config.opacity * 0.38) / (1.0 + jumpY * 2.8));
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 11. Cleanup
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      bodyGeo.dispose();
      woodMaterial.dispose();
      woodTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      title="3D Scroll Progress King Companion (Interactive Drag Enabled)"
    >
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};

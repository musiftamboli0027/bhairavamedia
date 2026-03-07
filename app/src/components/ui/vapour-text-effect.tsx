"use client";

import React, { useRef, useEffect, useState, createElement, useMemo, useCallback, memo } from "react";

export const Component = () => {
    return (
        <div className='bg-black h-screen w-screen flex justify-center items-center'>
            <VaporizeTextCycle
                texts={["21st.dev", "Is", "Cool"]}
                font={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "70px",
                    fontWeight: 600
                }}
                color="rgb(255,255, 255)"
                spread={5}
                density={5}
                animation={{
                    vaporizeDuration: 2,
                    fadeInDuration: 1,
                    waitDuration: 0.5
                }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H1}
                />
        </div>
    )
}

export const Tag = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  P: "p",
} as const;

export type Tag = (typeof Tag)[keyof typeof Tag];

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

export function VaporizeTextCycle({
  texts = ["Next.js", "React"],
  font = {
    fontFamily: "sans-serif",
    fontSize: "50px",
    fontWeight: 400,
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.5,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useIsInView(wrapperRef as React.RefObject<HTMLElement>);
  const lastFontRef = useRef<string | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "waiting">("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  // Calculate device pixel ratio
  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.devicePixelRatio * 1.5 || 1;
    }
    return 1;
  }, []);

  // Memoize static styles
  const wrapperStyle = useMemo(() => ({
    width: "100%",
    height: "100%",
    pointerEvents: "none" as const,
  }), []);

  const canvasStyle = useMemo(() => ({
    minWidth: "30px",
    minHeight: "20px",
    pointerEvents: "none" as const,
  }), []);

  // Memoize animation durations
  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 0.5) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  // Memoize font and spread calculations
  const fontConfig = useMemo(() => {
    let fontSizeValue = 50;
    if (typeof window !== "undefined" && font.fontSize) {
      if (font.fontSize.includes("px")) {
        fontSizeValue = parseInt(font.fontSize);
      } else {
        const temp = document.createElement("div");
        temp.style.fontSize = font.fontSize;
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        document.body.appendChild(temp);
        fontSizeValue = parseInt(window.getComputedStyle(temp).fontSize);
        document.body.removeChild(temp);
      }
    }
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSizeValue);
    const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
    return {
      fontSize: fontSizeValue,
      VAPORIZE_SPREAD,
      MULTIPLIED_VAPORIZE_SPREAD,
      font: `${font.fontWeight ?? 400} ${fontSizeValue * globalDpr}px ${font.fontFamily ?? "sans-serif"}`,
    };
  }, [font.fontSize, font.fontWeight, font.fontFamily, spread, globalDpr]);

  // Memoize particle update function
  const memoizedUpdateParticles = useCallback((particles: Particle[], vaporizeX: number, deltaTime: number) => {
    return updateParticles(
      particles,
      vaporizeX,
      deltaTime,
      fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
      animationDurations.VAPORIZE_DURATION,
      direction,
      transformedDensity
    );
  }, [fontConfig.MULTIPLIED_VAPORIZE_SPREAD, animationDurations.VAPORIZE_DURATION, direction, transformedDensity]);

  // Memoize render function
  const memoizedRenderParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    renderParticles(ctx, particles, globalDpr);
  }, [globalDpr]);

  // Start animation cycle when in view
  useEffect(() => {
    if (isInView) {
      const startAnimationTimeout = setTimeout(() => {
        setAnimationState("vaporizing");
      }, 0);
      return () => clearTimeout(startAnimationTimeout);
    } else {
      setAnimationState("static");
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isInView]);

  // Animation loop
  useEffect(() => {
    if (!isInView) return;

    let lastTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (animationState) {
        case "static": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
        case "vaporizing": {
          vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000);
          const textBoundaries = canvas.textBoundaries;
          if (!textBoundaries) break;

          const progress = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX = direction === "left-to-right"
            ? textBoundaries.left + textBoundaries.width * progress / 100
            : textBoundaries.right - textBoundaries.width * progress / 100;

          const allVaporized = memoizedUpdateParticles(particlesRef.current, vaporizeX, deltaTime);
          memoizedRenderParticles(ctx, particlesRef.current);

          if (vaporizeProgressRef.current >= 100 && allVaporized) {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
          }
          break;
        }
        case "fadingIn": {
          fadeOpacityRef.current += deltaTime * 1000 / animationDurations.FADE_IN_DURATION;
          ctx.save();
          ctx.scale(globalDpr, globalDpr);
          particlesRef.current.forEach(particle => {
            particle.x = particle.originalX;
            particle.y = particle.originalY;
            const opacity = Math.min(fadeOpacityRef.current, 1) * particle.originalAlpha;
            const colorVal = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.fillStyle = colorVal;
            ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
          });
          ctx.restore();

          if (fadeOpacityRef.current >= 1) {
            setAnimationState("waiting");
            setTimeout(() => {
              setAnimationState("vaporizing");
              vaporizeProgressRef.current = 0;
              resetParticles(particlesRef.current);
            }, animationDurations.WAIT_DURATION);
          }
          break;
        }
        case "waiting": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [
    animationState, 
    isInView, 
    texts.length, 
    direction, 
    globalDpr, 
    memoizedUpdateParticles, 
    memoizedRenderParticles, 
    animationDurations.FADE_IN_DURATION, 
    animationDurations.WAIT_DURATION, 
    animationDurations.VAPORIZE_DURATION
  ]);

  useEffect(() => {
    renderCanvas({
      texts,
      font: fontConfig.font,
      color,
      alignment,
      canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      wrapperSize,
      particlesRef,
      globalDpr,
      currentTextIndex,
    });

    const currentFont = font.fontFamily || "sans-serif";
    if (currentFont !== lastFontRef.current) {
        lastFontRef.current = currentFont;
        const timeoutId = setTimeout(() => {
            renderCanvas({
                texts,
                font: fontConfig.font,
                color,
                alignment,
                canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
                wrapperSize,
                particlesRef,
                globalDpr,
                currentTextIndex,
            });
        }, 1000);
        return () => clearTimeout(timeoutId);
    }
  }, [texts, fontConfig, color, alignment, wrapperSize, currentTextIndex, globalDpr, transformedDensity]);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWrapperSize({ width, height });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setWrapperSize({ width: rect.width, height: rect.height });
    }
  }, []);

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

const SeoElement = memo(({ tag = Tag.P, texts }: { tag: Tag, texts: string[] }) => {
  const style = useMemo(() => ({
    position: "absolute" as const,
    width: "0",
    height: "0",
    overflow: "hidden",
    userSelect: "none" as const,
    pointerEvents: "none" as const,
  }), []);
  const safeTag = (Object.values(Tag) as string[]).includes(tag) ? tag : "p";
  return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

const renderCanvas = ({
  texts,
  font,
  color,
  alignment,
  canvasRef,
  wrapperSize,
  particlesRef,
  globalDpr,
  currentTextIndex,
}: {
  texts: string[];
  font: string;
  color: string;
  alignment: "left" | "center" | "right";
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperSize: { width: number; height: number };
  particlesRef: React.MutableRefObject<Particle[]>;
  globalDpr: number;
  currentTextIndex: number;
}) => {
  const canvas = canvasRef.current;
  if (!canvas || !wrapperSize.width || !wrapperSize.height) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = wrapperSize;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width * globalDpr);
  canvas.height = Math.floor(height * globalDpr);

  const textY = canvas.height / 2;
  const currentText = texts[currentTextIndex] || "Next.js";
  const parsedColor = parseColor(color);

  let textX;
  if (alignment === "center") {
    textX = canvas.width / 2;
  } else if (alignment === "left") {
    textX = 0;
  } else {
    textX = canvas.width;
  }

  const { particles, textBoundaries } = createParticles(ctx, canvas, currentText, textX, textY, font, parsedColor, alignment);
  particlesRef.current = particles;
  canvas.textBoundaries = textBoundaries;
};

const createParticles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  textX: number,
  textY: number,
  font: string,
  color: string,
  alignment: "left" | "center" | "right"
) => {
  const particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "middle";
  
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textLeft = alignment === "center" ? textX - textWidth / 2 : alignment === "left" ? textX : textX - textWidth;
  
  const textBoundaries = {
    left: textLeft,
    right: textLeft + textWidth,
    width: textWidth,
  };

  ctx.fillText(text, textX, textY);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const currentDPR = canvas.width / parseInt(canvas.style.width);
  const sampleRate = Math.max(1, Math.round(currentDPR / 2));

  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3];
      if (alpha > 0) {
        const originalAlpha = (alpha / 255) * (sampleRate / currentDPR);
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`,
          opacity: originalAlpha,
          originalAlpha,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        });
      }
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { particles, textBoundaries };
};

const updateParticles = (
  particles: Particle[],
  vaporizeX: number,
  deltaTime: number,
  MULTIPLIED_VAPORIZE_SPREAD: number,
  VAPORIZE_DURATION: number,
  direction: string,
  density: number
) => {
  let allParticlesVaporized = true;
  particles.forEach(particle => {
    const shouldVaporize = direction === "left-to-right" ? particle.originalX <= vaporizeX : particle.originalX >= vaporizeX;
    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        particle.shouldFadeQuickly = Math.random() > density;
      }
      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const dampingFactor = Math.max(0.95, 1 - Math.sqrt(dx*dx + dy*dy) / (100 * MULTIPLIED_VAPORIZE_SPREAD));
        particle.velocityX = (particle.velocityX + (Math.random() - 0.5) * MULTIPLIED_VAPORIZE_SPREAD * 3 + dx * 0.002) * dampingFactor;
        particle.velocityY = (particle.velocityY + (Math.random() - 0.5) * MULTIPLIED_VAPORIZE_SPREAD * 3 + dy * 0.002) * dampingFactor;
        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;
        particle.opacity = Math.max(0, particle.opacity - deltaTime * 0.25 * (2000 / VAPORIZE_DURATION));
      }
      if (particle.opacity > 0.01) allParticlesVaporized = false;
    } else {
      allParticlesVaporized = false;
    }
  });
  return allParticlesVaporized;
};

const renderParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], globalDpr: number) => {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  particles.forEach(particle => {
    if (particle.opacity > 0) {
      const colorVal = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fillStyle = colorVal;
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
    }
  });
  ctx.restore();
};

const resetParticles = (particles: Particle[]) => {
  particles.forEach(p => {
    p.x = p.originalX; p.y = p.originalY; p.opacity = p.originalAlpha;
    p.speed = 0; p.velocityX = 0; p.velocityY = 0;
  });
};

const calculateVaporizeSpread = (fontSize: number) => {
  if (fontSize <= 20) return 0.2;
  if (fontSize >= 100) return 1.5;
  return 0.2 + (fontSize - 20) * (1.3 / 80);
};

const parseColor = (color: string) => {
  const rgb = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  const rgba = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (rgba) return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${rgba[4]})`;
  if (rgb) return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, 1)`;
  return "rgba(255, 255, 255, 1)";
};

function transformValue(input: number, inputRange: number[], outputRange: number[], clamp = false): number {
  const [iMin, iMax] = inputRange;
  const [oMin, oMax] = outputRange;
  let res = oMin + ((input - iMin) / (iMax - iMin)) * (oMax - oMin);
  if (clamp) res = oMax > oMin ? Math.min(Math.max(res, oMin), oMax) : Math.min(Math.max(res, oMax), oMin);
  return res;
}

function useIsInView(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0, rootMargin: '50px' });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return isInView;
}

export default VaporizeTextCycle;

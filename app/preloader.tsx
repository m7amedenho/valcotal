"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [faded, setFaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, dismiss immediately
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFaded(true);
      setRemoved(true);
      return;
    }

    // Keep preloader visible for a smooth, premium impression
    const fadeTimer = setTimeout(() => {
      setFaded(true);
    }, 800);

    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 1450);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes valcotalLogoPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 18px rgba(136, 99, 223, 0.28));
          }
          50% {
            transform: scale(1.035);
            filter: drop-shadow(0 8px 28px rgba(188, 165, 246, 0.5));
          }
        }
        @keyframes valcotalGlowPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.92);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.12);
          }
        }
        @keyframes valcotalBarSlide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(25%);
          }
          100% {
            transform: translateX(110%);
          }
        }
      `}} />
      <div
        id="site-preloader"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          height: "100dvh",
          zIndex: 999999,
          backgroundColor: "#131417",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: faded ? 0 : 1,
          visibility: faded ? "hidden" : "visible",
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease",
          pointerEvents: faded ? "none" : "all",
          userSelect: "none",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
        aria-hidden={faded}
        role="status"
        aria-label="جاري التحميل"
      >
        {/* Ambient background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(circle at 50% 48%, rgba(136, 99, 223, 0.16) 0%, rgba(19, 20, 23, 0.95) 70%, #131417 100%)",
          }}
        />

        {/* Centered content box */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "22px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          {/* Logo container */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "220px",
                height: "100px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(188, 165, 246, 0.3) 0%, transparent 70%)",
                filter: "blur(18px)",
                animation: "valcotalGlowPulse 2.4s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            <img
              src="/logo-transparent.png"
              alt="VALCOTAL"
              width={185}
              height={90}
              style={{
                width: "185px",
                height: "auto",
                maxWidth: "75vw",
                objectFit: "contain",
                display: "block",
                animation: "valcotalLogoPulse 2.4s ease-in-out infinite",
              }}
              // @ts-ignore
              fetchPriority="high"
            />
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "170px",
              height: "3px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: "99px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "60%",
                background: "linear-gradient(90deg, #8863df 0%, #bca5f6 50%, #96b0ef 100%)",
                borderRadius: "99px",
                animation: "valcotalBarSlide 1.35s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              }}
            />
          </div>

          {/* Subtitle badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "#9e9ba7",
              direction: "rtl",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-code), monospace",
                fontWeight: 600,
                color: "#e8e4f3",
                letterSpacing: "0.18em",
              }}
            >
              VALCOTAL
            </span>
            <span style={{ color: "#8863df", opacity: 0.8 }}>•</span>
            <span
              style={{
                fontFamily: "var(--font-arabic), sans-serif",
                color: "#b0adc0",
                fontSize: "12px",
              }}
            >
              حلول معمارية متكاملة
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

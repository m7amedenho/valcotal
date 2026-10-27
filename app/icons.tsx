import type { SVGProps } from "react";

export type IconName = "arrow" | "chevron" | "menu" | "close" | "layers" | "window" | "shield" | "ruler" | "spark" | "building" | "clock" | "check" | "pin" | "phone" | "mail" | "message" | "sun" | "tools" | "compass" | "globe" | "pause" | "play" | "plus";
const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M6 18 18 6M6 6h12v12" /></>,
  chevron: <path d="m14 6-6 6 6 6" />,
  menu: <><path d="M4 7h16M8 12h12M4 17h16" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  layers: <><path d="m12 3 10 6-10 6L2 9Z" /><path d="m2 13 10 6 10-6M2 17l10 6 10-6" /></>,
  window: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M12 3v18M4 11h16M15 14v3" /></>,
  shield: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z" /><path d="m8 12 3 3 5-6" /></>,
  ruler: <><path d="m3 16 13-13 5 5L8 21Z" /><path d="m14 5 2 2M11 8l3 3M8 11l2 2M5 14l3 3" /></>,
  spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" /></>,
  building: <><path d="M4 21V5l10-3v19M14 9h6v12M2 21h20M8 7h2M8 11h2M8 15h2M17 13h1M17 17h1" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  phone: <path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c-1 5-4 5-8 3C8 18 5 15 3 10 1 6 2 3 7 3Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  message: <><path d="M21 11a9 9 0 0 1-13 8l-6 3 2-6A9 9 0 1 1 21 11Z" /><path d="M8 10h8M8 14h5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 1v2M12 21v2M1 12h2M21 12h2M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2" /></>,
  tools: <><path d="m14 6 4 4 3-3a6 6 0 0 1-8 8l-6 6-4-4 6-6a6 6 0 0 1 8-8Z" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2 6-6 2 2-6Z" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  pause: <><path d="M9 5v14M15 5v14" /></>,
  play: <path d="m8 4 12 8-12 8Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

export function FacadeDrawing() {
  return <svg className="facade-drawing" viewBox="0 0 420 460" fill="none" aria-hidden="true">
    <defs><linearGradient id="facade-stroke" x1="50" y1="60" x2="360" y2="400"><stop stopColor="#b7a3ff" /><stop offset="1" stopColor="#739bed" /></linearGradient></defs>
    <g stroke="url(#facade-stroke)" strokeWidth="1">
      <path d="m75 120 180-70 105 52v282l-180 58-105-70Z" />
      <path d="m75 120 105 52 180-70M180 172v270M255 50v283L75 392" opacity=".35" />
      {[0,1,2,3,4].map(i=><path key={i} d={`M${105+i*15} ${135+i*7.4}v273M${210+i*30} ${160-i*11.6}v275`} opacity=".75" />)}
      {[0,1,2,3,4,5].map(i=><path key={i} d={`m75 ${158+i*40} 105 52 180-70`} opacity=".65" />)}
      <path d="M55 120V90l195-76M390 100v280M65 410l110 54M25 372V120" strokeDasharray="3 5" opacity=".5" />
      <path d="m48 100 7-10 7 5m180-76 8-5-2 10M385 107l5-7 5 7m-10 266 5 7 5-7" />
    </g>
    <circle cx="180" cy="172" r="5" fill="#b7a3ff" />
    <circle cx="360" cy="102" r="4" fill="#739bed" />
  </svg>;
}

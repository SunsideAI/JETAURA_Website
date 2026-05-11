export interface HeroStage {
  index: 1 | 2 | 3 | 4 | 5;
  name: "Mist" | "Emergence" | "Cruise" | "Approach" | "Vanish";
  scrollStart: number;
  scrollEnd: number;
}

export interface HUDState {
  flightLevel: number;
  mach: number;
  progress: number;
}

export interface CloudLayerProps {
  src: string;
  alt?: string;
  className?: string;
  layerRef: React.RefObject<HTMLDivElement | null>;
}

export interface JetProps {
  jetRef: React.RefObject<HTMLDivElement | null>;
}

export interface HUDProps {
  hudRef: React.RefObject<HTMLDivElement | null>;
  flRef: React.RefObject<HTMLSpanElement | null>;
  machRef: React.RefObject<HTMLSpanElement | null>;
  progressRef: React.RefObject<HTMLSpanElement | null>;
  tailRef: React.RefObject<HTMLDivElement | null>;
}

export interface HeadlinesProps {
  headline1Ref: React.RefObject<HTMLDivElement | null>;
  headline2Ref: React.RefObject<HTMLDivElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
}

export const easings = {
  expoOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  expoInOut: "cubic-bezier(0.87, 0, 0.13, 1)",
  quartOut: "cubic-bezier(0.25, 1, 0.5, 1)",
  gsap: {
    out: "power3.out",
    inOut: "power3.inOut",
    sine: "sine.inOut",
    none: "none",
  },
} as const;

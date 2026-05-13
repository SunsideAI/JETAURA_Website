"use client";

import { createContext, useContext } from "react";

export type Lang = "en" | "de";

interface LanguageCtx {
  lang: Lang;
  toggleLang: () => void;
}

export const LanguageContext = createContext<LanguageCtx>({
  lang: "en",
  toggleLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

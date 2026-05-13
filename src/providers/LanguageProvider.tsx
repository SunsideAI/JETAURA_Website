"use client";

import { useState } from "react";
import { LanguageContext, type Lang } from "@/contexts/LanguageContext";

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, toggleLang: () => setLang((l) => (l === "en" ? "de" : "en")) }}>
      {children}
    </LanguageContext.Provider>
  );
}

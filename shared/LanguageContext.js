import { createContext } from "react";

export const LanguageContext = createContext({
  language: 1,
  setLanguage: newLanguage => {
    this.language = newLanguage;
  }
});
// 1 is French
// 2 is Italian
// 3 is English
// 4 is Deutsch

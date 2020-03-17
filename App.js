import React, { createContext, useState, useEffect } from "react";
import { LanguageContext } from "./shared/LanguageContext";
import Navigator from "./routes/Drawer";
import storage from "./utils/storage";
export default function App() {
  const [language, setLanguage] = useState(3);
  useEffect(() => {
    fetchLanguage();
  }, []);

  let fetchLanguage = async () => {
    let languageLocal = await storage.getLanguageSetting();
    if (languageLocal && languageLocal > 0) {
      setLanguage(languageLocal);
    }
  };
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Navigator />
    </LanguageContext.Provider>
  );
}

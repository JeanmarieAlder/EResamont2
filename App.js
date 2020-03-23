import React, { createContext, useState, useEffect } from "react";
import { LanguageContext } from "./shared/LanguageContext";
import { LoadingContext } from "./shared/LoadingContext";
import Navigator from "./routes/Drawer";
import storage from "./utils/storage";
export default function App() {
  const [language, setLanguage] = useState(3);
  const [loading, setLoading] = useState(true);
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
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Navigator />
      </LanguageContext.Provider>
    </LoadingContext.Provider>
  );
}

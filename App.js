import React, { useState, useEffect } from "react";
import { LanguageContext } from "./shared/LanguageContext";
import { LoadingContext } from "./shared/LoadingContext";
import Navigator from "./routes/Drawer";
import storage from "./utils/storage";
import { Auth2Provider } from "./shared/LoginMidataContext";
export default function App() {
  const [language, setLanguage] = useState(1); //French default
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
    <Auth2Provider>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <Navigator />
        </LanguageContext.Provider>
      </LoadingContext.Provider>
    </Auth2Provider>
  );
}

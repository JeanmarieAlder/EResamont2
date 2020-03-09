import React, { createContext, useState } from "react";
import { LanguageContext } from "./shared/LanguageContext";
import Navigator from "./routes/Drawer";

export default function App() {
  const [language, setLanguage] = useState(3);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Navigator />
    </LanguageContext.Provider>
  );
}

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children, blogs, copyrightText, privacyPolicyText, cookiesSettingsText }) => {
  // Store the initial values passed from props in the context state
  const [storedBlogs, setStoredBlogs] = useState(blogs || []);
  const [storedCopyrightText, setStoredCopyrightText] = useState(copyrightText || "");
  const [storedPrivacyPolicyText, setStoredPrivacyPolicyText] = useState(privacyPolicyText || "");
  const [storedCookiesSettingsText, setStoredCookiesSettingsText] = useState(cookiesSettingsText || "");

  return (
    <AppContext.Provider value={{
      blogs: storedBlogs,
      setBlogs: setStoredBlogs,
      copyrightText: storedCopyrightText,
      setCopyrightText: setStoredCopyrightText,
      privacyPolicyText: storedPrivacyPolicyText, // Add Privacy Policy text to context
      setPrivacyPolicyText: setStoredPrivacyPolicyText, // Add setter for Privacy Policy text
      cookiesSettingsText: storedCookiesSettingsText, // Add Cookies Settings text to context
      setCookiesSettingsText: setStoredCookiesSettingsText, // Add setter for Cookies Settings text
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

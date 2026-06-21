import { useState, useEffect } from "react";
import type { View } from "./types";
import { LoginPage } from "./pages/LoginPage";
import { AdminPortal } from "./pages/AdminPortal";
import { UserPortal } from "./pages/UserPortal";
import { SettingsProvider } from "./context/SettingsContext";

// ── App Root ───────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<View>("login");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  function handleLogin(role: "admin" | "user") {
    setView(role === "admin" ? "admin" : "user");
  }

  function toggleTheme() {
    setIsDark(d => !d);
  }

  const content = () => {
    if (view === "login") return <LoginPage onLogin={handleLogin} />;
    if (view === "admin") return <AdminPortal onLogout={() => setView("login")} isDark={isDark} toggleTheme={toggleTheme} />;
    return <UserPortal onLogout={() => setView("login")} isDark={isDark} toggleTheme={toggleTheme} />;
  };

  return (
    <SettingsProvider>
      {content()}
    </SettingsProvider>
  );
}

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SettingsState {
  "Real-time Updates": boolean;
  "Emergency Alerts": boolean;
  "GPS Tracking": boolean;
  "AI Auto-Recommend": boolean;
}

interface SettingsContextType {
  settings: SettingsState;
  toggleSetting: (key: keyof SettingsState) => void;
}

const defaultSettings: SettingsState = {
  "Real-time Updates": true,
  "Emergency Alerts": true,
  "GPS Tracking": true,
  "AI Auto-Recommend": true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('lifelink_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse settings");
      }
    }
  }, []);

  const toggleSetting = (key: keyof SettingsState) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('lifelink_settings', JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface SettingsState {
  "Real-time Updates": boolean;
  "Emergency Alerts": boolean;
  "GPS Tracking": boolean;
  "AI Auto-Recommend": boolean;
}

interface SettingsContextType {
  settings: SettingsState;
  toggleSetting: (key: keyof SettingsState) => void;
  updateSetting: (key: keyof SettingsState, value: boolean) => void;
  saveSettings: () => Promise<void>;
  saving: boolean;
  lastSaved: Date | null;
}

const defaultSettings: SettingsState = {
  "Real-time Updates": true,
  "Emergency Alerts": true,
  "GPS Tracking": true,
  "AI Auto-Recommend": true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const API_BASE = 'http://localhost:3001';

function getToken(): string | null {
  return localStorage.getItem('lifelink_token');
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load settings on mount — try backend first, fall back to localStorage
  useEffect(() => {
    async function loadSettings() {
      const token = getToken();
      if (token) {
        try {
          const res = await fetch(`${API_BASE}/api/settings`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setSettings(data);
            localStorage.setItem('lifelink_settings', JSON.stringify(data));
            return;
          }
        } catch (e) {
          console.warn('Could not load settings from server, using localStorage fallback');
        }
      }
      // Fallback to localStorage
      const saved = localStorage.getItem('lifelink_settings');
      if (saved) {
        try {
          setSettings(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse settings from localStorage");
        }
      }
    }
    loadSettings();
  }, []);

  // Persist settings to backend
  const persistToBackend = useCallback(async (newSettings: SettingsState) => {
    const token = getToken();
    if (!token) return;
    try {
      await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSettings),
      });
    } catch (e) {
      console.warn('Failed to persist settings to backend');
    }
  }, []);

  const toggleSetting = useCallback((key: keyof SettingsState) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('lifelink_settings', JSON.stringify(next));
      persistToBackend(next);
      return next;
    });
  }, [persistToBackend]);

  const updateSetting = useCallback((key: keyof SettingsState, value: boolean) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem('lifelink_settings', JSON.stringify(next));
      persistToBackend(next);
      return next;
    });
  }, [persistToBackend]);

  const saveSettings = useCallback(async () => {
    setSaving(true);
    localStorage.setItem('lifelink_settings', JSON.stringify(settings));
    await persistToBackend(settings);
    setLastSaved(new Date());
    setSaving(false);
  }, [settings, persistToBackend]);

  return (
    <SettingsContext.Provider value={{ settings, toggleSetting, updateSetting, saveSettings, saving, lastSaved }}>
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

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchSettings } from '../api/settingsApi';

export const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        fetchSettings()
            .then(setSettings)
            .catch(() => setSettings({}));
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
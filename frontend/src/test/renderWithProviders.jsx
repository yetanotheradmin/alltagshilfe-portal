import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SettingsContext } from '../context/SettingsContext'
import { AuthContext } from '../context/AuthContext'

const mockSettings = {
    portalName: 'TestPortal',
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    contactEmail: 'test@example.de',
    contactPhone: '0123 456789',
    footerText: 'Testfooter',
}

const mockAuth = {
    user: null,
    login: () => { },
    logout: () => { },
}

export function renderWithProviders(ui, { route = '/' } = {}) {
    return render(
        <SettingsContext.Provider value={{ settings: mockSettings, setSettings: () => { } }}>
            <AuthContext.Provider value={mockAuth}>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </AuthContext.Provider>
        </SettingsContext.Provider>
    )
}
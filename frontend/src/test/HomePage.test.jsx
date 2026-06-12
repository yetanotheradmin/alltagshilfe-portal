import { describe, it, expect, vi, beforeAll } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from './renderWithProviders'

// Muss vor dem Import der Komponente stehen
vi.mock('../api/settingsApi', () => ({
    fetchSettings: vi.fn().mockResolvedValue({
        portalTitle: 'TestPortal',
        municipalityName: 'Musterstadt',
        primaryColor: '#1976d2',
        secondaryColor: '#dc004e',
        contactEmail: 'test@example.de',
        contactPhone: '0123 456789',
        footerText: 'Testfooter',
    }),
}))

// Import NACH vi.mock
const { default: HomePage } = await import('../pages/HomePage')

describe('HomePage', () => {
    it('rendert ohne Fehler', async () => {
        renderWithProviders(<HomePage />)
        expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
    })
})
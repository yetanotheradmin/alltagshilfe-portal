import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from './renderWithProviders'
import AccessibilityToolbar from '../components/AccessibilityToolbar'

describe('AccessibilityToolbar', () => {
    it('rendert ohne Fehler', () => {
        renderWithProviders(<AccessibilityToolbar />)
        expect(screen.getByLabelText('Barrierefreiheitseinstellungen')).toBeInTheDocument()
    })

    it('enthält den Kontrast-Button', () => {
        renderWithProviders(<AccessibilityToolbar />)
        expect(screen.getByLabelText('Hohen Kontrast aktivieren')).toBeInTheDocument()
    })
})
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from './renderWithProviders'
import RequestFormPage from '../pages/RequestFormPage'

describe('Anfrageformular', () => {
    it('rendert das Formular', () => {
        renderWithProviders(<RequestFormPage />)
        expect(screen.getByRole('button', { name: /absenden|senden|anfrage/i })).toBeInTheDocument()
    })
})
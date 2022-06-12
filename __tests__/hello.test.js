import { render, screen } from '@testing-library/react'
import Home from '../pages/hello'
import '@testing-library/jest-dom'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const text = screen.getByText(/Welcome to COLA Day!/i);

        expect(text).toBeInTheDocument()
    })
})

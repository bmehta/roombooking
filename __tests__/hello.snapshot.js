// __tests__/snapshot.js

import { render } from '@testing-library/react'
import Home from '../pages/hello'

it('renders homepage unchanged', () => {

    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
})
